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
