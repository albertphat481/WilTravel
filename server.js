const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// 1. Environment Configuration (.env loader for local dev)
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  try {
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
  } catch (err) {
    console.warn('Could not parse .env file:', err.message);
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Request logger for API endpoints
app.use('/api', (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// 3. Resilient Database Layer (Local File System + Serverless Memory Cache)
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}
}

const memoryStore = {};

function readDb(fileName, defaultData = []) {
  if (memoryStore[fileName]) {
    return memoryStore[fileName];
  }
  const filePath = path.join(DATA_DIR, fileName);
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(content);
      memoryStore[fileName] = parsed;
      return parsed;
    }
  } catch (err) {
    console.warn(`[DB] Error reading ${fileName}:`, err.message);
  }
  memoryStore[fileName] = defaultData;
  return defaultData;
}

function writeDb(fileName, data) {
  memoryStore[fileName] = data;
  const filePath = path.join(DATA_DIR, fileName);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    // Vercel serverless environment fallback: write to /tmp
    try {
      const tmpPath = path.join('/tmp', fileName);
      fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (tmpErr) {
      // Memory store is already updated
      return true;
    }
  }
}

// 4. WILTravel Official Company Profile
const WIL_COMPANY_INFO = {
  name: "CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ DU LỊCH WILTRAVEL",
  shortName: "WIL-Travel",
  brand: "WILTravel - Chỉ cần & đi chuyến nghỉ ngơi",
  taxCode: "0311373910",
  address: "72/10/6 Văn Chung, Phường 13, Quận Tân Bình, TP. Hồ Chí Minh",
  hotlines: ["0905 025 737", "0902 353 648"],
  hotlineFormatted: "0905 025 737 - 0902 353 648",
  email: "info@wil-travel.com",
  bookingEmail: "booking@wil-travel.com",
  website: "https://wil-travel.com",
  workingHours: "Thứ 2 - Thứ 7: 08:00 - 18:00 (Hotline hỗ trợ 24/7)",
  license: "Giấy phép Lữ Hành Quốc Tế & Nội Địa số: 79-888/2018/TCDL-GP LHQT",
  insurancePartner: "Bảo hiểm Du lịch Bảo Minh (Bồi thường đến 1.000.000.000đ)"
};

// =========================================================================
// 5. RESTFUL API ENDPOINTS
// =========================================================================

// --- 5.1 SYSTEM & HEALTH API ---
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'WILTravel Backend API',
    version: '2.2.0',
    environment: process.env.NODE_ENV || 'production',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    success: true,
    company: WIL_COMPANY_INFO
  });
});

// --- 5.2 TOURS API ---
// GET /api/tours - List tours with search, filter, sort, pagination
app.get('/api/tours', (req, res) => {
  try {
    let toursList = readDb('tours.json', []);
    const {
      search,
      category,
      departure,
      minPrice,
      maxPrice,
      duration,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    // Filter by keyword search
    if (search) {
      const q = search.trim().toLowerCase();
      toursList = toursList.filter(t => 
        (t.name && t.name.toLowerCase().includes(q)) ||
        (t.location && t.location.toLowerCase().includes(q)) ||
        (t.code && t.code.toLowerCase().includes(q)) ||
        (t.highlights && t.highlights.some(h => h.toLowerCase().includes(q)))
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      const catLower = category.toLowerCase();
      toursList = toursList.filter(t => 
        t.category && t.category.some(c => c.toLowerCase().includes(catLower))
      );
    }

    // Filter by departure hub
    if (departure && departure !== 'all') {
      const depLower = departure.toLowerCase();
      toursList = toursList.filter(t => 
        t.departure && t.departure.toLowerCase().includes(depLower)
      );
    }

    // Filter by price range
    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) toursList = toursList.filter(t => t.price >= min);
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) toursList = toursList.filter(t => t.price <= max);
    }

    // Filter by duration
    if (duration) {
      toursList = toursList.filter(t => t.duration && t.duration.includes(duration));
    }

    // Sorting
    if (sort === 'price-asc') {
      toursList.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      toursList.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      toursList.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'popular') {
      toursList.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    const total = toursList.length;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 12);
    const totalPages = Math.ceil(total / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedTours = toursList.slice(startIndex, startIndex + limitNum);

    res.json({
      success: true,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      data: paginatedTours
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lấy danh sách tour.', error: err.message });
  }
});

// GET /api/tours/featured - Top popular & sale tours
app.get('/api/tours/featured', (req, res) => {
  const toursList = readDb('tours.json', []);
  const featured = toursList.filter(t => t.badge || (t.originalPrice && t.originalPrice > t.price)).slice(0, 8);
  res.json({ success: true, count: featured.length, data: featured });
});

// GET /api/tours/:id - Single tour detail
app.get('/api/tours/:id', (req, res) => {
  const toursList = readDb('tours.json', []);
  const param = req.params.id;
  const tour = toursList.find(t => String(t.id) === param || (t.code && t.code.toLowerCase() === param.toLowerCase()));

  if (!tour) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy thông tin tour du lịch.' });
  }

  // Include reviews for this tour
  const reviews = readDb('reviews.json', []).filter(r => r.tourId === tour.id);

  res.json({
    success: true,
    data: {
      ...tour,
      reviewsList: reviews
    }
  });
});

// GET /api/tours/:id/reviews
app.get('/api/tours/:id/reviews', (req, res) => {
  const tourId = parseInt(req.params.id);
  const reviews = readDb('reviews.json', []).filter(r => r.tourId === tourId);
  res.json({ success: true, count: reviews.length, data: reviews });
});

// --- 5.3 HOTELS & RESORTS API ---
app.get('/api/hotels', (req, res) => {
  let hotelsList = readDb('hotels.json', []);
  const { city, category, stars, minPrice, maxPrice } = req.query;

  if (city && city !== 'all') {
    hotelsList = hotelsList.filter(h => h.city && h.city.toLowerCase().includes(city.toLowerCase()));
  }
  if (category && category !== 'all') {
    hotelsList = hotelsList.filter(h => h.category && h.category.toLowerCase() === category.toLowerCase());
  }
  if (stars) {
    const starNum = parseInt(stars);
    if (!isNaN(starNum)) hotelsList = hotelsList.filter(h => h.stars >= starNum);
  }
  if (minPrice) {
    const min = parseFloat(minPrice);
    if (!isNaN(min)) hotelsList = hotelsList.filter(h => h.price >= min);
  }
  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) hotelsList = hotelsList.filter(h => h.price <= max);
  }

  res.json({ success: true, count: hotelsList.length, data: hotelsList });
});

app.get('/api/hotels/:id', (req, res) => {
  const hotelsList = readDb('hotels.json', []);
  const hotel = hotelsList.find(h => String(h.id) === req.params.id);
  if (!hotel) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy khách sạn.' });
  }
  res.json({ success: true, data: hotel });
});

app.post('/api/hotels/booking', (req, res) => {
  const { hotelId, roomType, checkIn, checkOut, guests = 2, customer, notes } = req.body;

  if (!hotelId || !checkIn || !checkOut || !customer || !customer.phone) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ thông tin đặt phòng!' });
  }

  const hotelsList = readDb('hotels.json', []);
  const hotel = hotelsList.find(h => String(h.id) === String(hotelId));
  if (!hotel) {
    return res.status(404).json({ success: false, message: 'Khách sạn không tồn tại.' });
  }

  const orderId = 'WIL-HT-' + Math.floor(100000 + Math.random() * 900000);
  const bookings = readDb('bookings.json', []);

  const newBooking = {
    orderId,
    serviceType: 'hotel',
    hotelId: hotel.id,
    hotelName: hotel.name,
    city: hotel.city,
    roomType: roomType || 'Standard',
    checkIn,
    checkOut,
    guests,
    pricePerNight: hotel.price,
    totalPayment: hotel.price, // Can be multiplied by nights
    status: 'Đã xác nhận',
    paymentStatus: 'Chờ thanh toán tại khách sạn',
    customer,
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  writeDb('bookings.json', bookings);

  res.json({
    success: true,
    orderId,
    booking: newBooking,
    message: 'Đặt phòng thành công! Bộ phận đặt phòng của WILTravel sẽ liên hệ hỗ trợ bạn qua điện thoại.'
  });
});

// --- 5.4 CAR RENTAL API ---
app.get('/api/cars', (req, res) => {
  const cars = readDb('cars.json', []);
  res.json({ success: true, count: cars.length, data: cars });
});

app.get('/api/cars/routes', (req, res) => {
  const routes = [
    { from: 'Sân bay Tân Sơn Nhất', to: 'Trung tâm Quận 1 / 3 / 5', car4: 250000, car7: 300000, car16: 600000 },
    { from: 'TP. Hồ Chí Minh', to: 'Vũng Tàu (1 ngày / 2 ngày 1 đêm)', car4: 1400000, car7: 1600000, car16: 2800000 },
    { from: 'TP. Hồ Chí Minh', to: 'Phan Thiết - Mũi Né (2N1Đ / 3N2Đ)', car4: 2500000, car7: 2900000, car16: 4500000 },
    { from: 'TP. Hồ Chí Minh', to: 'Đà Lạt Mộng Mơ (3N2Đ / 4N3Đ)', car4: 3800000, car7: 4300000, car16: 6800000 },
    { from: 'TP. Hồ Chí Minh', to: 'Cần Thơ - Miền Tây (2N1Đ)', car4: 2200000, car7: 2600000, car16: 4200000 }
  ];
  res.json({ success: true, data: routes });
});

app.post('/api/cars/booking', (req, res) => {
  const { carId, pickupDate, returnDate, route, withDriver = true, customer, notes } = req.body;

  if (!carId || !pickupDate || !customer || !customer.phone) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ ngày đi và số điện thoại!' });
  }

  const cars = readDb('cars.json', []);
  const car = cars.find(c => String(c.id) === String(carId));
  const carName = car ? car.name : 'Xe du lịch';
  const price = car ? car.pricePerDay : 1500000;

  const orderId = 'WIL-CAR-' + Math.floor(100000 + Math.random() * 900000);
  const bookings = readDb('bookings.json', []);

  const newBooking = {
    orderId,
    serviceType: 'car',
    carId,
    carName,
    pickupDate,
    returnDate: returnDate || pickupDate,
    route: route || 'Nội ô TP.HCM',
    withDriver,
    totalPayment: price,
    status: 'Đang xử lý',
    paymentStatus: 'Thanh toán trực tiếp cho tài xế',
    customer,
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  writeDb('bookings.json', bookings);

  res.json({
    success: true,
    orderId,
    booking: newBooking,
    message: 'Yêu cầu thuê xe đã được ghi nhận! Tài xế và nhân viên điều hành sẽ gọi xác nhận trong 15 phút.'
  });
});

// --- 5.5 VISA SERVICES API ---
app.get('/api/visas', (req, res) => {
  const visas = readDb('visas.json', []);
  res.json({ success: true, count: visas.length, data: visas });
});

app.get('/api/visas/:country', (req, res) => {
  const visas = readDb('visas.json', []);
  const c = req.params.country.toLowerCase();
  const visa = visas.find(v => v.country.toLowerCase().includes(c) || (v.id && String(v.id) === c));
  if (!visa) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy quốc gia visa yêu cầu.' });
  }
  res.json({ success: true, data: visa });
});

app.post('/api/visas/consult', (req, res) => {
  const { country, visaType, applicantCount = 1, customer, notes } = req.body;

  if (!customer || !customer.name || !customer.phone) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp họ tên và số điện thoại liên hệ!' });
  }

  const consultId = 'WIL-VS-' + Math.floor(100000 + Math.random() * 900000);
  const contacts = readDb('contacts.json', []);

  const newInquiry = {
    id: contacts.length + 1,
    consultId,
    name: customer.name,
    email: customer.email || '',
    phone: customer.phone,
    service: `Tư vấn Visa ${country || 'Quốc Tế'} (${visaType || 'Du lịch'}) - ${applicantCount} người`,
    message: notes || 'Yêu cầu tư vấn hồ sơ và thủ tục làm visa trọn gói.',
    status: 'Chờ chuyên viên visa gọi lại',
    createdAt: new Date().toISOString()
  };

  contacts.unshift(newInquiry);
  writeDb('contacts.json', contacts);

  res.json({
    success: true,
    consultId,
    message: `Đã gửi yêu cầu tư vấn Visa ${country}! Chuyên viên Visa của WILTravel sẽ liên hệ hướng dẫn hồ sơ cho bạn sớm nhất.`
  });
});

// --- 5.6 BOOKINGS & ORDER TRACKING API ---
// POST /api/bookings - Create new general booking (tour / flight / combo)
app.post('/api/bookings', (req, res) => {
  const {
    serviceType = 'tour',
    tourId,
    tourName,
    tourCode,
    date,
    quantity = 1,
    totalPayment,
    paymentMethod = 'Chuyển khoản ngân hàng',
    customer,
    notes
  } = req.body;

  if (!customer || !customer.phone) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp thông tin liên hệ và số điện thoại!' });
  }

  const orderId = 'WIL-BK-' + Math.floor(100000 + Math.random() * 900000);
  const bookings = readDb('bookings.json', []);

  const newBooking = {
    orderId,
    serviceType,
    tourId: tourId || null,
    tourName: tourName || 'Tour Du Lịch WILTravel',
    tourCode: tourCode || 'WLE-TOUR',
    date: date || new Date().toISOString().split('T')[0],
    quantity: parseInt(quantity) || 1,
    totalPayment: parseFloat(totalPayment) || 0,
    status: 'Đã xác nhận',
    paymentMethod,
    paymentStatus: 'Chờ thanh toán',
    customer: {
      firstName: customer.firstName || '',
      lastName: customer.lastName || customer.name || 'Khách hàng',
      email: customer.email || '',
      phone: customer.phone,
      address: customer.address || ''
    },
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  writeDb('bookings.json', bookings);

  // If user is registered, also sync into their user account orders
  if (customer.email) {
    const users = readDb('users.json', []);
    const userIdx = users.findIndex(u => u.email.toLowerCase() === customer.email.toLowerCase());
    if (userIdx !== -1) {
      if (!users[userIdx].orders) users[userIdx].orders = [];
      users[userIdx].orders.unshift(newBooking);
      writeDb('users.json', users);
    }
  }

  res.json({
    success: true,
    orderId,
    booking: newBooking,
    message: 'Đặt tour thành công! Quý khách có thể dùng Mã Đơn Hàng này để tra cứu trạng thái bất kỳ lúc nào.'
  });
});

// GET /api/bookings/:code - Tra cứu đơn hàng bằng Mã đơn (WIL-BK-...) hoặc Số điện thoại
app.get('/api/bookings/:code', (req, res) => {
  const query = req.params.code.trim().toUpperCase();
  const bookings = readDb('bookings.json', []);

  // 1. Direct match by Order ID
  const directMatch = bookings.find(b => b.orderId && b.orderId.toUpperCase() === query);
  if (directMatch) {
    return res.json({ success: true, count: 1, data: directMatch });
  }

  // 2. Match by Customer Phone Number
  const cleanPhone = req.params.code.replace(/[^0-9]/g, '');
  if (cleanPhone.length >= 9) {
    const phoneMatches = bookings.filter(b => b.customer && b.customer.phone && b.customer.phone.replace(/[^0-9]/g, '').includes(cleanPhone));
    if (phoneMatches.length > 0) {
      return res.json({ success: true, count: phoneMatches.length, data: phoneMatches });
    }
  }

  // 3. Match by Customer Email
  if (req.params.code.includes('@')) {
    const emailMatches = bookings.filter(b => b.customer && b.customer.email && b.customer.email.toLowerCase() === req.params.code.toLowerCase());
    if (emailMatches.length > 0) {
      return res.json({ success: true, count: emailMatches.length, data: emailMatches });
    }
  }

  res.status(404).json({
    success: false,
    message: `Không tìm thấy đơn hàng với mã hoặc số điện thoại "${req.params.code}". Vui lòng kiểm tra lại hoặc liên hệ Hotline 0905 025 737.`
  });
});

// PUT /api/bookings/:code/cancel - Hủy đơn hàng
app.put('/api/bookings/:code/cancel', (req, res) => {
  const code = req.params.code.trim().toUpperCase();
  const bookings = readDb('bookings.json', []);
  const idx = bookings.findIndex(b => b.orderId && b.orderId.toUpperCase() === code);

  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng cần hủy.' });
  }

  bookings[idx].status = 'Đã hủy';
  bookings[idx].updatedAt = new Date().toISOString();
  writeDb('bookings.json', bookings);

  res.json({
    success: true,
    message: `Đơn hàng ${code} đã được cập nhật sang trạng thái Đã Hủy thành công.`,
    booking: bookings[idx]
  });
});

// --- 5.7 COUPONS & PROMOTIONS API ---
app.get('/api/coupons', (req, res) => {
  const coupons = readDb('coupons.json', []);
  res.json({ success: true, count: coupons.length, data: coupons });
});

app.post('/api/coupons/validate', (req, res) => {
  const { code, totalAmount = 0 } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập mã giảm giá!' });
  }

  const coupons = readDb('coupons.json', []);
  const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());

  if (!coupon) {
    return res.json({
      success: false,
      valid: false,
      message: 'Mã giảm giá không tồn tại hoặc đã hết lượt áp dụng.'
    });
  }

  const total = parseFloat(totalAmount) || 0;
  if (coupon.minOrder && total < coupon.minOrder) {
    return res.json({
      success: false,
      valid: false,
      message: `Mã này chỉ áp dụng cho đơn hàng từ ${coupon.minOrder.toLocaleString('vi-VN')}đ trở lên.`
    });
  }

  let discount = 0;
  if (coupon.type === 'percent') {
    discount = (total * coupon.value) / 100;
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else if (coupon.type === 'fixed') {
    discount = coupon.value;
  }

  const finalAmount = Math.max(0, total - discount);

  res.json({
    success: true,
    valid: true,
    code: coupon.code,
    description: coupon.description,
    discount,
    finalAmount,
    message: `Áp dụng mã thành công! Bạn được giảm ${discount.toLocaleString('vi-VN')}đ.`
  });
});

// --- 5.8 REVIEWS & RATINGS API ---
app.get('/api/reviews', (req, res) => {
  let reviews = readDb('reviews.json', []);
  const { tourId } = req.query;
  if (tourId) {
    reviews = reviews.filter(r => String(r.tourId) === String(tourId));
  }
  res.json({ success: true, count: reviews.length, data: reviews });
});

app.post('/api/reviews', (req, res) => {
  const { tourId = 1, name, rating = 5, comment } = req.body;

  if (!name || !comment) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập tên và nhận xét của bạn!' });
  }

  const reviews = readDb('reviews.json', []);
  const newReview = {
    id: reviews.length + 1,
    tourId: parseInt(tourId) || 1,
    name: name.trim(),
    rating: Math.min(5, Math.max(1, parseInt(rating) || 5)),
    comment: comment.trim(),
    createdAt: new Date().toISOString()
  };

  reviews.unshift(newReview);
  writeDb('reviews.json', reviews);

  res.json({
    success: true,
    review: newReview,
    message: 'Cảm ơn bạn đã gửi đánh giá trải nghiệm du lịch cùng WILTravel!'
  });
});

// --- 5.9 CONTACT & NEWSLETTER API ---
app.post('/api/contact', (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Vui lòng điền họ tên, số điện thoại và nội dung tin nhắn!' });
  }

  const contacts = readDb('contacts.json', []);
  const newContact = {
    id: contacts.length + 1,
    name: name.trim(),
    email: email ? email.trim() : '',
    phone: phone.trim(),
    service: service || 'Tư vấn thông tin du lịch chung',
    message: message.trim(),
    status: 'Chưa xử lý',
    createdAt: new Date().toISOString()
  };

  contacts.unshift(newContact);
  writeDb('contacts.json', contacts);

  res.json({
    success: true,
    contactId: newContact.id,
    message: 'Thông điệp của bạn đã được gửi thành công đến WILTravel! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.'
  });
});

app.get('/api/contacts', (req, res) => {
  const contacts = readDb('contacts.json', []);
  res.json({ success: true, count: contacts.length, data: contacts });
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp địa chỉ email hợp lệ!' });
  }

  const newsletters = readDb('newsletters.json', []);
  const existing = newsletters.find(n => n.email.toLowerCase() === email.toLowerCase());

  if (existing) {
    return res.json({
      success: true,
      message: 'Email này đã đăng ký nhận tin từ trước! Bạn có thể dùng mã "WILWELCOME" để nhận ưu đãi.'
    });
  }

  const newSub = {
    id: newsletters.length + 1,
    email: email.trim().toLowerCase(),
    discountCode: 'WILWELCOME',
    createdAt: new Date().toISOString()
  };

  newsletters.push(newSub);
  writeDb('newsletters.json', newsletters);

  res.json({
    success: true,
    discountCode: 'WILWELCOME',
    message: 'Đăng ký thành công! WILTravel tặng bạn mã giảm giá "WILWELCOME" giảm ngay 200k - 500k cho chuyến đi đầu tiên.'
  });
});

// --- 5.10 AUTHENTICATION & USER PROFILE API ---
app.post('/api/register', (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ thông tin!' });
  }

  const users = readDb('users.json', []);
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email này đã được đăng ký!' });
  }

  const newUser = {
    firstName,
    lastName,
    email: email.toLowerCase(),
    phone,
    password,
    cart: [],
    orders: [],
    wishlist: [],
    flightBookings: [],
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeDb('users.json', users);

  const { password: _, ...safeUser } = newUser;
  res.json({ success: true, user: safeUser, message: 'Đăng ký tài khoản thành công!' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Vui lòng điền email và mật khẩu!' });
  }

  const users = readDb('users.json', []);
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  // Demo user fallback
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
    const { password: _, ...userWithoutPassword } = user;
    return res.json({ success: true, user: userWithoutPassword });
  }

  return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không chính xác!' });
});

app.post('/api/google-login', async (req, res) => {
  const { credential, firstName, lastName, email } = req.body;

  let verifiedEmail = email;
  let verifiedFirst = firstName;
  let verifiedLast = lastName;

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

  const users = readDb('users.json', []);
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
    writeDb('users.json', users);
  }

  const { password: _, ...userWithoutPassword } = user;
  return res.json({ success: true, user: userWithoutPassword });
});

app.get('/api/user/data', (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Thiếu email người dùng.' });
  }

  const users = readDb('users.json', []);
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

app.post('/api/user/sync', (req, res) => {
  const { email, cart, orders, wishlist, flightBookings } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Thiếu email người dùng.' });
  }

  const users = readDb('users.json', []);
  const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng.' });
  }

  if (cart !== undefined) users[idx].cart = cart;
  if (orders !== undefined) users[idx].orders = orders;
  if (wishlist !== undefined) users[idx].wishlist = wishlist;
  if (flightBookings !== undefined) users[idx].flightBookings = flightBookings;

  writeDb('users.json', users);
  return res.json({ success: true, message: 'Đồng bộ dữ liệu thành công!' });
});

// --- 5.11 CHATBOT TINA AI WITH ORDER TRACKING ---
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, message: 'Thiếu tin nhắn.' });
  }

  const lowerMsg = message.toLowerCase();

  // Smart Backend order lookup interception
  if (lowerMsg.includes('đơn hàng') || lowerMsg.includes('tra cứu') || lowerMsg.includes('wil-bk-')) {
    const match = message.match(/WIL-BK-\d+/i) || message.match(/\b\d{9,11}\b/);
    if (match) {
      const code = match[0].toUpperCase();
      const bookings = readDb('bookings.json', []);
      const booking = bookings.find(b => 
        (b.orderId && b.orderId.toUpperCase() === code) || 
        (b.customer && b.customer.phone && b.customer.phone.includes(code))
      );

      if (booking) {
        return res.json({
          success: true,
          reply: `🔍 **Kết quả tra cứu đơn hàng ${booking.orderId}:**\n- **Dịch vụ:** ${booking.tourName || booking.carName || booking.hotelName || 'Dịch vụ WILTravel'}\n- **Khách hàng:** ${booking.customer ? `${booking.customer.lastName} ${booking.customer.firstName}` : 'Quý khách'}\n- **Ngày khởi hành:** ${booking.date || booking.pickupDate || booking.checkIn}\n- **Trạng thái:** ✅ **${booking.status || 'Đã xác nhận'}**\n- **Thanh toán:** ${booking.paymentStatus || 'Chờ thanh toán'}\n- **Tổng thanh toán:** ${booking.totalPayment.toLocaleString('vi-VN')}đ\n\nNếu quý khách cần hỗ trợ thêm, hãy gọi ngay Hotline: **0905 025 737**!`
        });
      }
    }
  }

  const apiKey = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';
  
  if (apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    return res.json({ 
      success: false, 
      message: 'Chưa cấu hình khóa API Gemini trên máy chủ.' 
    });
  }

  try {
    const https = require('https');
    const systemPrompt = `Bạn là Tina, trợ lý tư vấn du lịch AI thông minh, tận tâm và chuyên nghiệp của CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ DU LỊCH WILTRAVEL (WIL-TRAVEL).

THÔNG TIN PHÁP LÝ & LIÊN HỆ:
- Tên công ty: CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ DU LỊCH WILTRAVEL
- Mã số thuế (MST): 0311373910
- Trụ sở: 72/10/6 Văn Chung, Phường 13, Quận Tân Bình, TP. Hồ Chí Minh
- Hotline 24/7: 0905 025 737 - 0902 353 648
- Email: info@wil-travel.com | Website: https://wil-travel.com
- Bảo hiểm: Bảo hiểm Du lịch Bảo Minh (bồi thường đến 1.000.000.000đ/vụ)

DỊCH VỤ TOÀN DIỆN CỦA WILTRAVEL:
1. Tour Du Lịch Trọn Gói: Cả Nội địa & Quốc tế (Phú Quốc, Hà Giang, Đà Lạt, Đà Nẵng, Miền Tây, Thái Lan, Nhật Bản, Hàn Quốc, Malaysia, Đài Loan, Bali, Campuchia...)
2. Khách Sạn & Resort: 4 phân khúc (Standard, Superior, Deluxe, Luxury)
3. Thuê Xe Du Lịch: 4 chỗ, 7 chỗ, 16 chỗ Limousine VIP, 29 chỗ, 45 chỗ
4. Vé Máy Bay: Đại lý cấp 1 các hãng hàng không
5. Dịch Vụ Visa & Hộ Chiếu: Bao đậu cao cho Nhật, Hàn, Đài Loan, Schengen, Mỹ, Úc, Trung Quốc

HƯỚNG DẪN:
- Luôn thân thiện, niềm nở, xưng hô "Tina" và "bạn" hoặc "quý khách".
- Trả lời ngắn gọn, chuẩn xác giá và ưu đãi, cung cấp Hotline khi khách cần đặt gấp.`;

    const contents = [];
    contents.push({
      role: 'user',
      parts: [{ text: `${systemPrompt}\n\nChào bạn Tina!` }]
    });
    contents.push({
      role: 'model',
      parts: [{ text: 'Xin chào! Mình là Tina, trợ lý ảo của WILTravel. Mình rất vui được hỗ trợ bạn tư vấn và đặt tour du lịch. Bạn cần mình giúp gì hôm nay? 😊' }]
    });

    if (history && history.length) {
      history.forEach(item => {
        contents.push({
          role: item.sender === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }]
        });
      });
    }

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
            res.json({ success: false, message: 'Lỗi phản hồi từ AI.' });
          }
        } catch (parseErr) {
          res.json({ success: false, message: 'Lỗi giải mã phản hồi.' });
        }
      });
    });

    reqPost.on('error', (err) => {
      res.json({ success: false, message: 'Không thể kết nối đến máy chủ AI.' });
    });

    reqPost.write(postData);
    reqPost.end();

  } catch (error) {
    res.json({ success: false, message: 'Lỗi xử lý hệ thống.' });
  }
});

// 6. Fallback handler for Single Page routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 7. Start Server if executed directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(` 🚀 WILTRAVEL BACKEND SERVER RUNNING ON PORT ${PORT}`);
    console.log(` 🌐 Local: http://localhost:${PORT}`);
    console.log(` 📚 API Docs: http://localhost:${PORT}/api-docs.html`);
    console.log(`===================================================`);
  });
}

// Export Express app for Vercel Serverless Function compatibility
module.exports = app;
