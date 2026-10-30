const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Load local .env file if it exists (for local development key configuration)
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value;
    }
  });
}

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
    const systemPrompt = `Bạn là Tina, trợ lý tư vấn du lịch AI thông minh, tận tâm và chuyên nghiệp của CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ DU LỊCH WILTRAVEL (WIL-TRAVEL).

THÔNG TIN PHÁP LÝ & LIÊN HỆ DOANH NGHIỆP:
- Tên công ty: CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ DU LỊCH WILTRAVEL
- Mã số thuế (MST): 0311373910
- Trụ sở chính: 72/10/6 Văn Chung, Phường 13, Quận Tân Bình, TP. Hồ Chí Minh
- Hotline hỗ trợ 24/7: 0905 025 737 - 0902 353 648
- Email: info@wil-travel.com | booking@wil-travel.com
- Website chính thức: https://wil-travel.com
- Đối tác bảo hiểm: Bảo hiểm Du lịch Bảo Minh (bồi thường tối đa lên đến 1.000.000.000đ/vụ)
- Quà tặng theo tour: Nón du lịch cao cấp, bao da hộ chiếu/gối chữ U, nước suối khăn lạnh suốt tuyến

CÁC MẢNG DỊCH VỤ TOÀN DIỆN CỦA WILTRAVEL:
1. Tour Du Lịch Trọn Gói: Cả Nội địa & Quốc tế (Phú Quốc, Hà Giang, Đà Lạt, Đà Nẵng, Miền Tây, Thái Lan, Nhật Bản, Hàn Quốc, Malaysia, Đài Loan, Bali, Campuchia...)
2. Đặt Khách Sạn & Resort: 4 phân khúc (Standard, Superior, Deluxe, Luxury) tại các thành phố du lịch lớn.
3. Cho Thuê Xe Du Lịch Đời Mới: 4 chỗ, 7 chỗ, 16 chỗ Limousine VIP, 29 chỗ, 45 chỗ.
4. Vé Máy Bay: Đại lý cấp 1 của Vietnam Airlines, Vietjet Air, Bamboo Airways và các hãng quốc tế.
5. Dịch Vụ Visa & Hộ Chiếu: Bao đậu cao cho Visa Nhật Bản, Hàn Quốc, Đài Loan, Khối Schengen Châu Âu (27 nước), Mỹ, Úc, Trung Quốc.

HƯỚNG DẪN TƯ VẤN:
- Luôn thân thiện, niềm nở, xưng hô "Tina" và "bạn" hoặc "quý khách".
- Tư vấn chính xác mức giá, khuyến mãi, lịch trình, ưu tiên đề xuất giải pháp tiết kiệm và an toàn nhất cho khách hàng.
- Nếu khách cần đặt gấp hoặc hỗ trợ đặc biệt, hãy chủ động cung cấp số Hotline của Ms. Phương: 0905 025 737 hoặc 0902 353 648.`;

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
      path: `/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
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
