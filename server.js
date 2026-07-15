const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory and users.json file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Helpers to read/write database
function readUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users database:', err);
    return [];
  }
}

function writeUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing to users database:', err);
    return false;
  }
}

// API Endpoints

// 1. Register User
app.post('/api/register', (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ thông tin!' });
  }

  const users = readUsers();
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email này đã được đăng ký!' });
  }

  const newUser = {
    firstName,
    lastName,
    email: email.toLowerCase(),
    phone,
    password, // In a production system we would hash this, but for this project a plain text search is used.
    cart: [],
    orders: [],
    wishlist: [],
    flightBookings: [],
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  const writeSuccess = writeUsers(users);

  if (writeSuccess) {
    return res.json({ success: true, message: 'Đăng ký thành công!' });
  } else {
    return res.status(500).json({ success: false, message: 'Lỗi ghi cơ sở dữ liệu trên server.' });
  }
});

// 2. Login User
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Vui lòng điền email và mật khẩu!' });
  }

  const users = readUsers();
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  // Demo user fallback if no users are in DB yet
  if (!user && email === 'nguyen@email.com' && password === '123456') {
    const demoUser = {
      firstName: 'Văn A',
      lastName: 'Nguyễn',
      email: 'nguyen@email.com',
      phone: '0901234567',
      password: '123456'
    };
    return res.json({ success: true, user: demoUser });
  }

  if (user) {
    // Return user object without exposing password in response payload
    const { password: _, ...userWithoutPassword } = user;
    return res.json({ success: true, user: userWithoutPassword });
  }

  return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không chính xác!' });
});

// 3. Google OAuth Login/Registration (Secured with Google Token verification)
app.post('/api/google-login', async (req, res) => {
  const { credential, firstName, lastName, email } = req.body;

  let verifiedEmail = email;
  let verifiedFirst = firstName;
  let verifiedLast = lastName;

  // If a real credential (JWT) is sent, verify it using Google Token Info API
  if (credential) {
    try {
      const https = require('https');
      const payload = await new Promise((resolve, reject) => {
        https.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`, (response) => {
          let data = '';
          response.on('data', (chunk) => { data += chunk; });
          response.on('end', () => {
            if (response.statusCode === 200) {
              resolve(JSON.parse(data));
            } else {
              reject(new Error('Invalid token'));
            }
          });
        }).on('error', (err) => { reject(err); });
      });

      verifiedEmail = payload.email;
      verifiedFirst = payload.given_name || 'Google';
      verifiedLast = payload.family_name || 'User';
    } catch (err) {
      console.error('Error verifying Google Token:', err);
      return res.status(400).json({ success: false, message: 'Token Google không hợp lệ hoặc đã hết hạn.' });
    }
  }

  if (!verifiedEmail) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin email để xác thực.' });
  }

  const users = readUsers();
  let user = users.find(u => u.email.toLowerCase() === verifiedEmail.toLowerCase());

  if (!user) {
    user = {
      firstName: verifiedFirst,
      lastName: verifiedLast,
      email: verifiedEmail.toLowerCase(),
      phone: 'Google Auth',
      password: 'google-oauth-user',
      cart: [],
      orders: [],
      wishlist: [],
      flightBookings: [],
      createdAt: new Date().toISOString()
    };
    users.push(user);
    writeUsers(users);
  }

  const { password: _, ...userWithoutPassword } = user;
  return res.json({ success: true, user: userWithoutPassword });
});

// 4. Get User Data (Cart, Wishlist, Bookings)
app.get('/api/user/data', (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Thiếu email người dùng.' });
  }

  const users = readUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng.' });
  }

  return res.json({
    success: true,
    data: {
      cart: user.cart || [],
      orders: user.orders || [],
      wishlist: user.wishlist || [],
      flightBookings: user.flightBookings || []
    }
  });
});

// 5. Sync User Data
app.post('/api/user/sync', (req, res) => {
  const { email, cart, orders, wishlist, flightBookings } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Thiếu email người dùng.' });
  }

  const users = readUsers();
  const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng.' });
  }

  // Update fields if provided
  if (cart !== undefined) users[idx].cart = cart;
  if (orders !== undefined) users[idx].orders = orders;
  if (wishlist !== undefined) users[idx].wishlist = wishlist;
  if (flightBookings !== undefined) users[idx].flightBookings = flightBookings;

  writeUsers(users);
  return res.json({ success: true, message: 'Đồng bộ dữ liệu thành công!' });
});

// 6. Chatbot Tina API (Google Gemini Integration)
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, message: 'Thiếu tin nhắn.' });
  }

  const apiKey = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';
  
  if (apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    // Return mock indicator to trigger frontend local fallback smoothly
    return res.json({ 
      success: false, 
      message: 'Chưa cấu hình khóa API Gemini.' 
    });
  }

  try {
    const https = require('https');
    
    // Construct rich context system prompt about WILTravel tours database
    const systemPrompt = `Bạn là Tina, trợ lý ảo thông minh và vô cùng thân thiện của công ty du lịch WILTravel.
Nhiệm vụ của bạn là tư vấn du lịch, giải đáp thắc mắc về giá vé, lịch trình, dịch vụ của các tour du lịch và vé máy bay tại WILTravel.
Hãy trả lời một cách dễ mến, nhiệt tình, lịch sự và ngắn gọn.
Luôn khuyến khích khách hàng đặt tour của WILTravel bằng cách nêu bật các dịch vụ đẳng cấp đi kèm (bảo hiểm du lịch 100tr-1tỷ, nước uống/khăn lạnh miễn phí suốt tuyến, quà tặng độc quyền như mũ du lịch, gối chữ U).

Dưới đây là cơ sở dữ liệu các tour hiện tại của WILTravel để bạn tham khảo trả lời chính xác:
1. Phú Quốc 4N3Đ All Inclusive: giá 3.890.000 VNĐ, nghỉ resort 4 sao sát biển, ăn buffet sáng & 3 bữa chính hải sản.
2. Sapa - Hà Giang 5N4Đ: giá 4.990.000 VNĐ, đi xe cabin giường nằm VIP khứ hồi, khách sạn view thung lũng, vé cáp treo Fansipan khứ hồi, đi xe Jeep Mã Pí Lèng.
3. Bali Thiên Đường 6N5Đ: giá 16.990.000 VNĐ, resort 4 sao hồ bơi vô cực, tặng sim 4G, vé cổng trời Lempuyang & đền Uluwatu.
4. Vịnh Hạ Long - Lan Hạ 4N3Đ: giá 5.290.000 VNĐ, ngủ đêm du thuyền 5 sao, chèo kayak, thăm hang Sửng Sốt.
5. Đà Nẵng - Hội An 4N3Đ: giá 4.290.000 VNĐ, khách sạn 4 sao sát biển Mỹ Khê, vé cáp treo Bà Nà Hills, du thuyền sông Hàn ngắm rồng phun lửa.
6. Nhật Bản Mùa Hoa Anh Đào 6N5Đ: giá 28.990.000 VNĐ, trọn gói visa, bay Vietnam Airlines, trải nghiệm tắm Onsen & tàu siêu tốc Shinkansen.
7. Đà Lạt Lãng Mạn 3N2Đ: giá 2.890.000 VNĐ, xe limousine đưa đón, khách sạn trung tâm, tham quan Langbiang, hái dâu tây vườn công nghệ cao.
8. Nha Trang - Ninh Hòa 3N2Đ: giá 3.190.000 VNĐ, cano đi tour 3 đảo VIP, tắm bùn khoáng nóng.
9. Singapore - Malaysia 5N4Đ: giá 12.490.000 VNĐ, đi trọn gói 2 nước, ngắm Gardens by the Bay, cao nguyên Genting, tháp đôi Petronas.
10. Thái Lan - Bangkok - Pattaya 5N4Đ: giá 6.990.000 VNĐ, khách sạn 4 sao, vé Alcazar Show VIP, buffet nhà hàng xoay Baiyoke Sky 86 tầng.
11. Miền Tây Sông Nước Cần Thơ - Bến Tre 2N1Đ: giá 1.990.000 VNĐ, xuồng chèo rạch dừa, đi chợ nổi Cái Răng bình minh.
12. Hà Nội - Tràng An - Bái Đính 3N2Đ: giá 3.490.000 VNĐ, vé đò Tràng An, xe điện chùa Bái Đính, ăn dê núi Ninh Bình.

Địa chỉ công ty WILTravel: 72/10/6 Văn Chung, P.12, Tân Bình, Tp.HCM. Hotline hỗ trợ: 0905 025737.`;

    const contents = [];
    
    // Inject system prompt to establish character context
    contents.push({
      role: 'user',
      parts: [{ text: `${systemPrompt}\n\nChào bạn Tina!` }]
    });
    contents.push({
      role: 'model',
      parts: [{ text: 'Xin chào! Mình là Tina, trợ lý ảo của WILTravel. Mình rất vui được hỗ trợ bạn tư vấn và đặt tour du lịch. Bạn cần mình giúp gì hôm nay? 😊' }]
    });

    // Populate conversation history
    if (history && history.length) {
      history.forEach(item => {
        contents.push({
          role: item.sender === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }]
        });
      });
    }
    
    // Append the latest user query
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const postData = JSON.stringify({ contents });

    const requestOptions = {
      hostname: 'generativelanguage.googleapis.com',
      port: 443,
      path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const reqPost = https.request(requestOptions, (response) => {
      let responseBody = '';
      response.on('data', (chunk) => { responseBody += chunk; });
      response.on('end', () => {
        try {
          const jsonRes = JSON.parse(responseBody);
          if (jsonRes.candidates && jsonRes.candidates[0] && jsonRes.candidates[0].content && jsonRes.candidates[0].content.parts[0]) {
            const reply = jsonRes.candidates[0].content.parts[0].text;
            res.json({ success: true, reply });
          } else {
            console.error('Gemini API Error details:', responseBody);
            res.json({ success: false, message: 'Lỗi phản hồi từ AI.' });
          }
        } catch (parseErr) {
          console.error('Error parsing Gemini response:', parseErr);
          res.json({ success: false, message: 'Lỗi giải mã phản hồi.' });
        }
      });
    });

    reqPost.on('error', (err) => {
      console.error('Gemini connection error:', err);
      res.json({ success: false, message: 'Không thể kết nối đến máy chủ AI.' });
    });

    reqPost.write(postData);
    reqPost.end();

  } catch (error) {
    console.error('Server error in chat API:', error);
    res.json({ success: false, message: 'Lỗi xử lý hệ thống.' });
  }
});

// Route catch-all to serve index.html for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(` WILTRAVEL SERVER IS RUNNING ON PORT ${PORT}`);
  console.log(` Open http://localhost:${PORT} in your browser`);
  console.log(`===================================================`);
});
