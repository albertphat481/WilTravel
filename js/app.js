// WILTravel - Central Shared State and Database Script v2.0
// Global currency functions hoisted
var toggleGlobalCurrency, changeCurrency, formatPriceGlobal, formatPriceString;

// ========================================================
// WIL-TRAVEL OFFICIAL COMPANY INFORMATION
// ========================================================
const WIL_COMPANY_INFO = {
  name: "CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ DU LỊCH WILTRAVEL",
  shortName: "WIL-Travel",
  brand: "WILTravel - Chỉ cần & đi chuyến nghỉ ngơi",
  taxCode: "0311373910",
  address: "72/10/6 Văn Chung, Phường 13, Quận Tân Bình, TP. Hồ Chí Minh",
  hotline1: "0905 025 737",
  hotline2: "0902 353 648",
  hotlineFormatted: "0905 025 737 - 0902 353 648",
  email: "info@wil-travel.com",
  bookingEmail: "booking@wil-travel.com",
  website: "https://wil-travel.com",
  workingHours: "Thứ 2 - Thứ 7: 08:00 - 18:00 (Hotline hỗ trợ 24/7)",
  license: "Giấy phép Lữ Hành Quốc Tế & Nội Địa số: 79-888/2018/TCDL-GP LHQT",
  insurancePartner: "Bảo hiểm Du lịch Bảo Minh (Bồi thường đến 1.000.000.000đ)"
};
window.WIL_COMPANY_INFO = WIL_COMPANY_INFO;

// ========================================================
// 1. TOUR DATABASE CHÍNH THỨC TỪ WIL-TRAVEL.COM
// ========================================================
const tours = [
  {
    id: 1,
    code: "WLE-PQ-10",
    name: "Du Lịch Phú Quốc - Vương Quốc Ngọc Trai & VinWonders",
    location: "Phú Quốc",
    category: ["Biển", "Trong nước", "Nghỉ dưỡng"],
    departure: "TP.HCM",
    departureDates: ["Thứ 5 & Thứ 7 hàng tuần", "15/11", "22/11", "29/11", "Dịp Tết"],
    originalPrice: 4890000,
    price: 3890000,
    image: "images/tour-phuquoc.jpg",
    rating: 4.9,
    reviews: 142,
    duration: "4 ngày 3 đêm",
    badge: "Bán chạy",
    hotelStandard: "Resort 4 sao sát biển",
    transport: "Vé máy bay khứ hồi (Vietnam Airlines / Vietjet Air)",
    highlights: ["Cáp treo Hòn Thơm vượt biển dài nhất thế giới", "Thành phố không ngủ Grand World", "Trải nghiệm lặn ngắm san hô Hòn Móng Tay", "Thưởng thức tiệc hải sản tươi sống"],
    includes: [
      "Vé máy bay khứ hồi (đã gồm 7kg xách tay & 20kg ký gửi)",
      "Resort 4 sao sát biển tiêu chuẩn 2 người/phòng cao cấp",
      "Ăn sáng buffet chuẩn 4 sao & các bữa chính hải sản đặc sản đảo",
      "Vé cáp treo Hòn Thơm & vé tham quan Grand World",
      "Bảo hiểm du lịch Bảo Minh bồi thường tối đa 100.000.000đ",
      "Nước suối & khăn lạnh phục vụ suốt tuyến (2 chai/ngày)",
      "Quà tặng độc quyền WILTravel: Nón du lịch cao cấp, gối chữ U"
    ],
    notes: ["Cần mang theo CMND/CCCD hoặc Hộ chiếu bản gốc", "Trẻ em dưới 2 tuổi miễn phí vé", "Đăng ký trước tối thiểu 5 ngày để giữ chỗ đẹp"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Phú Quốc - Khám phá Dương Đông & Dinh Cậu", desc: "Tập trung tại sân bay Tân Sơn Nhất, làm thủ tục bay đi Phú Quốc. Xe và HDV đón đoàn về resort nhận phòng nghỉ ngơi. Chiều viếng Dinh Cậu ngắm hoàng hôn rực rỡ, tối dạo chợ đêm thưởng thức hải sản." },
      { day: "Ngày 2", title: "Khám Phá Quần Đảo An Thới - Câu Cá & Lặn Ngắm San Hô", desc: "Lên tàu du lịch chuyên dụng tham quan Hòn Móng Tay, Hòn Gầm Ghì, Hòn Mây Rút. Trải nghiệm câu cá giữa biển, lặn ngắm rạn san hô tự nhiên đa sắc màu. Dùng bữa trưa hải sản trên tàu." },
      { day: "Ngày 3", title: "Cáp Treo Hòn Thơm - Siêu Quần Thể Grand World", desc: "Trải nghiệm cáp treo 3 dây vượt biển dài nhất thế giới sang Sun World Hòn Thơm. Chiều check-in Grand World - 'Thành phố không ngủ', ngắm show Tinh Hoa Việt Nam và biểu diễn nhạc nước sắc màu Venice." },
      { day: "Ngày 4", title: "Cơ Sở Nuôi Cấy Ngọc Trai - Mua Sắm Đặc Sản - TP.HCM", desc: "Thăm trung tâm ngọc trai Long Beach, vườn tiêu Suối Đá, nhà thùng nước mắm truyền thống Phú Quốc. Mua đặc sản rượu sim, hải sản khô. Xe đưa ra sân bay Phú Quốc về lại TP.HCM." }
    ]
  },
  {
    id: 2,
    code: "WLE-HG-15",
    name: "Hà Giang: Cao Nguyên Đá Đồng Văn - Mã Pí Lèng - Sapa",
    location: "Hà Giang - Sapa",
    category: ["Núi", "Trong nước", "Văn hóa"],
    departure: "Hà Nội",
    departureDates: ["Thứ 6 hàng tuần", "18/11", "25/11", "02/12", "09/12"],
    originalPrice: 5990000,
    price: 4990000,
    image: "images/tour-sapa.jpg",
    rating: 4.8,
    reviews: 118,
    duration: "5 ngày 4 đêm",
    badge: "Mới",
    hotelStandard: "Khách sạn 3-4 sao trung tâm view thung lũng",
    transport: "Xe giường nằm Cabin VIP đời mới & Xe Jeep leo đèo",
    highlights: ["Chinh phục đèo Mã Pí Lèng - Đệ nhất hùng quan", "Đi thuyền trên sông Nho Quế xuyên hẻm Tu Sản", "Chạm tay vào Cột cờ Lũng Cú cực Bắc Tổ quốc", "Đỉnh Fansipan 3.143m nóc nhà Đông Dương"],
    includes: [
      "Xe giường nằm Cabin VIP khứ hồi từ Hà Nội",
      "Khách sạn 3-4 sao tiện nghi tiêu chuẩn view thung lũng Mường Hoa & Đồng Văn",
      "Trải nghiệm xe Jeep leo đèo Mã Pí Lèng & thuyền sông Nho Quế",
      "Vé cáp treo Fansipan Sun World khứ hồi",
      "Ăn uống trọn gói các bữa đặc sản vùng cao: thắng cố, lợn bản, gà đồi, rượu ngô",
      "Bảo hiểm du lịch Bảo Minh mức bồi thường tới 100.000.000đ",
      "Nước suối & khăn lạnh phục vụ suốt hành trình"
    ],
    notes: ["Nên mang theo giày thể thao êm chân và áo ấm", "Chuẩn bị thuốc say xe cho đoạn đèo quanh co", "Tôn trọng phong tục tập quán đồng bào dân tộc"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội → Sapa - Bản Cát Cát mộng mơ", desc: "Đón đoàn tại Hà Nội, di chuyển theo cao tốc Nội Bài - Lào Cai lên Sapa. Nhận phòng khách sạn view núi. Chiều tham quan bản Cát Cát, ngắm thác Tiên Sa, mặc trang phục H'Mông chụp ảnh." },
      { day: "Ngày 2", title: "Chinh Phục Đỉnh Fansipan 3.143m - Di chuyển Hà Giang", desc: "Sáng đi cáp treo Fansipan ngắm toàn cảnh thung lũng Mường Hoa, bái tượng Phật A Di Đà khổng lồ giữa biển mây. Chiều khởi hành sang Hà Giang, nhận phòng nghỉ ngơi." },
      { day: "Ngày 3", title: "Cổng Trời Quản Bạ - Rừng Thông Yên Minh - Cột Cờ Lũng Cú", desc: "Check-in dốc Bắc Sum, Cổng trời Quản Bạ, núi đôi Cô Tiên. Đến Lũng Cú - điểm cực Bắc thiêng liêng của Tổ quốc. Chiều thăm Dinh thự Vua Mèo Vương Chính Đức." },
      { day: "Ngày 4", title: "Đèo Mã Pí Lèng - Du Thuyền Sông Nho Quế - Hẻm Tu Sản", desc: "Chinh phục đỉnh đèo Mã Pí Lèng, một trong tứ đại đỉnh đèo Việt Nam. Xuống bến thuyền, du ngoạn sông Nho Quế màu ngọc bích, chụp ảnh hẻm Tu Sản sâu nhất Đông Nam Á." },
      { day: "Ngày 5", title: "Đồng Văn → TP Hà Giang → Hà Nội", desc: "Dạo chợ phiên phố cổ Đồng Văn, thưởng thức bánh tam giác mạch và cà phê Phố Cổ. Khởi hành về Hà Nội, kết thúc chuyến hành trình hùng vĩ." }
    ]
  },
  {
    id: 3,
    code: "WLE-MY-01",
    name: "Tour Du Lịch: Malaysia - Legoland - Sunway Lagoon",
    location: "Malaysia",
    category: ["Quốc tế", "Gia đình", "Giải trí"],
    departure: "TP.HCM",
    departureDates: ["Thứ 5 hàng tuần", "16/11", "23/11", "30/11", "07/12"],
    originalPrice: 10990000,
    price: 8990000,
    image: "images/hero3.jpg",
    rating: 4.9,
    reviews: 165,
    duration: "4 ngày 3 đêm",
    badge: "Hot Deal",
    hotelStandard: "Khách sạn 3-4 sao quốc tế",
    transport: "Vé máy bay khứ hồi AirAsia / Malaysia Airlines",
    highlights: ["Công viên Legoland Malaysia với 7 chủ đề kỳ thú", "Khu vui chơi Sunway Lagoon đẳng cấp", "Thành phố mới Putrajaya hiện đại", "Tháp Đôi Petronas KLCC biểu tượng Malaysia"],
    includes: [
      "Vé máy bay khứ hồi và thuế phí hàng không AirAsia / Vietnam Airlines",
      "Khách sạn 3-4* tiêu chuẩn 2 khách/phòng tiện nghi",
      "Xe máy lạnh chất lượng cao đưa đón tham quan theo chương trình",
      "Ăn uống buffet sáng & các bữa chính nhà hàng địa phương",
      "Vé vào cổng Legoland Malaysia & Sunway Lagoon",
      "Hướng dẫn viên tiếng Việt nhiệt tình suốt tuyến",
      "Bảo hiểm du lịch quốc tế Bảo Minh bồi thường đến 210.000.000đ",
      "Quà tặng: Nón du lịch WILTravel cao cấp & bao da hộ chiếu"
    ],
    notes: ["Hộ chiếu còn hạn trên 6 tháng tính đến ngày về", "Trẻ em cần mang theo giấy khai sinh", "Tiền tip hướng dẫn viên & tài xế 3-5 USD/ngày"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Johor Bahru → Legoland Malaysia", desc: "Đáp chuyến bay đi sân bay Senai Johor Bahru. Xe đón đoàn đi công viên chủ đề Legoland Malaysia - khám phá Miniland mô phỏng kỳ quan thế giới, Lego Studio 4D. Tối thưởng thức ẩm thực Mã Lai." },
      { day: "Ngày 2", title: "Malacca Cổ Kính → Thủ Đô Kuala Lumpur", desc: "Di chuyển đến thành phố cổ Malacca, thăm Đình Thanh Vân cổ nhất, Quảng trường Hà Lan, Pháo đài Bồ Đào Nha. Chiều về Kuala Lumpur, ghé thành phố thông minh Putrajaya và Thánh đường Hồi giáo Hồng." },
      { day: "Ngày 3", title: "Động Batu Huyền Bí - Tháp Đôi Petronas - KLCC", desc: "Chinh phục 272 bậc thang rực rỡ sắc màu tại Động Batu linh thiêng. Thăm Cung Điện Hoàng Gia, Quảng Trường Độc Lập Merdeka. Chụp ảnh lưu niệm tại Tháp đôi Petronas Twin Towers kỳ vĩ." },
      { day: "Ngày 4", title: "Mua Sắm Socola Đặc Sản → TP.HCM", desc: "Thăm xưởng socola Beryl's nổi tiếng, cửa hàng đặc sản địa phương. Xe đưa đoàn ra sân bay Kuala Lumpur đáp chuyến bay về TP.HCM." }
    ]
  },
  {
    id: 4,
    code: "WLE-JP-02",
    name: "Du Lịch Nhật Bản Cung Đường Vàng: Osaka - Kyoto - Phú Sĩ - Tokyo",
    location: "Nhật Bản",
    category: ["Quốc tế", "Văn hóa", "Nghỉ dưỡng"],
    departure: "TP.HCM",
    departureDates: ["Thứ 3 & Thứ 6 hàng tuần", "14/11", "21/11", "28/11", "05/12"],
    originalPrice: 34990000,
    price: 28990000,
    image: "images/tour-japan.jpg",
    rating: 5.0,
    reviews: 210,
    duration: "6 ngày 5 đêm",
    badge: "VIP Luxury",
    hotelStandard: "Khách sạn 4 sao chuẩn Nhật + 1 đêm tắm Onsen truyền thống",
    transport: "Hàng không 4* Vietnam Airlines / ANA & Trải nghiệm tàu Shinkansen",
    highlights: ["Núi Phú Sĩ linh thiêng - Trạm số 5", "Tắm suối khoáng nóng Onsen phong cách Ryokan", "Trải nghiệm tàu cao tốc Shinkansen 300km/h", "Chùa Vàng Kinkaku-ji & Lâu đài Osaka cổ kính"],
    includes: [
      "Vé máy bay khứ hồi Vietnam Airlines / All Nippon Airways (gồm 46kg hành lý)",
      "Visa nhập cảnh Nhật Bản trọn gói, tỷ lệ đậu 99%",
      "Khách sạn 4 sao tiêu chuẩn Nhật Bản + 1 đêm trải nghiệm Onsen & tiệc Kaiseki",
      "Trải nghiệm đi tàu siêu tốc Shinkansen",
      "Ăn uống các món đặc sắc: Bò Kobe/Wagyu thượng hạng, Cua tuyết, Sashimi tươi sống",
      "Bảo hiểm du lịch quốc tế Bảo Minh mức bồi thường tới 1.050.000.000đ",
      "Bộ quà tặng du lịch cao cấp: Nón du lịch, bao hộ chiếu, sim 4G Nhật Bản"
    ],
    notes: ["Hộ chiếu còn hạn trên 6 tháng", "WILTravel hỗ trợ toàn diện hồ sơ chứng minh tài chính visa", "Thời gian làm visa từ 7-10 ngày làm việc"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Osaka (Sân Bay Kansai)", desc: "Tập trung tại Tân Sơn Nhất, đáp chuyến bay đêm đến sân bay quốc tế Kansai Osaka. Nghỉ đêm trên máy bay đầy đủ tiện nghi." },
      { day: "Ngày 2", title: "Lâu Đài Osaka - Cố Đô Kyoto - Chùa Vàng Kinkakuji", desc: "Tham quan Lâu đài Osaka uy nghiêm. Di chuyển đến Cố đô Kyoto, viếng Chùa Vàng Kinkaku-ji dát vàng soi bóng hồ nước. Dạo rừng tre Sagano Arashiyama thanh tịnh." },
      { day: "Ngày 3", title: "Trải Nghiệm Tàu Shinkansen → Núi Phú Sĩ - Tắm Onsen", desc: "Trải nghiệm vận tốc 300km/h của tàu Shinkansen. Lên Trạm 5 Núi Phú Sĩ ngắm biển mây. Thăm làng cổ Oshino Hakkai thanh bình. Tối thưởng thức bữa tối Kaiseki và ngâm suối khoáng nóng Onsen." },
      { day: "Ngày 4", title: "Vịnh Odaiba - Tượng Nữ Thần Tự Do - Phố Ginza", desc: "Khởi hành về thủ đô Tokyo hiện đại. Tham quan Vịnh Odaiba, cầu Rainbow Bridge, tượng Nữ thần Tự do. Tự do mua sắm tại thiên đường hàng hiệu Ginza sầm uất." },
      { day: "Ngày 5", title: "Chùa Cổ Asakusa Kannon - Tháp Tokyo Skytree - Shinjuku", desc: "Viếng Chùa Senso-ji (Asakusa) cổ nhất Tokyo với lồng đèn đỏ khổng lồ. Chụp ảnh Tháp truyền hình Tokyo Skytree. Dạo ngã tư Shibuya và phố náo nhiệt Shinjuku." },
      { day: "Ngày 6", title: "Cung Điện Hoàng Gia Tokyo (Imperial Palace) → TP.HCM", desc: "Chụp ảnh tại Cung điện Hoàng Gia Tokyo với cầu Nijubashi nổi tiếng. Mua sắm bánh kẹo Tokyo Banana, Royce làm quà. Xe đưa ra sân bay Narita bay về TP.HCM." }
    ]
  },
  {
    id: 5,
    code: "WLE-KR-03",
    name: "Du Lịch Hàn Quốc: Seoul - Đảo Nami - Everland - Tháp Namsan",
    location: "Hàn Quốc",
    category: ["Quốc tế", "Văn hóa", "Nghỉ dưỡng"],
    departure: "TP.HCM",
    departureDates: ["Thứ 4 & Thứ 7 hàng tuần", "15/11", "22/11", "29/11", "06/12"],
    originalPrice: 19990000,
    price: 15990000,
    image: "images/hero4.jpg",
    rating: 4.9,
    reviews: 182,
    duration: "5 ngày 4 đêm",
    badge: "Bán chạy",
    hotelStandard: "Khách sạn 4 sao trung tâm Seoul",
    transport: "Vé máy bay khứ hồi Vietnam Airlines / Korean Air",
    highlights: ["Đảo Nami lãng mạn - Phim trường Bản Tình Ca Mùa Đông", "Công viên giải trí Everland top 10 thế giới", "Cung điện Gyeongbokgung cổ kính & Mặc Hanbok", "Tháp truyền hình Namsan với ổ khóa tình yêu"],
    includes: [
      "Vé máy bay khứ hồi (đầy đủ 23kg ký gửi & 10kg xách tay)",
      "Visa nhập cảnh Hàn Quốc trọn gói",
      "Khách sạn 4 sao trung tâm Seoul tiện nghi",
      "Vé tham quan Đảo Nami, vé vui chơi trọn gói Everland",
      "Thưởng thức gà hầm sâm Samgyetang, thịt nướng BBQ Hàn Quốc, lẩu nấm",
      "Bảo hiểm du lịch quốc tế Bảo Minh mức bồi thường tới 500.000.000đ",
      "Quà tặng: Nón du lịch, bao hộ chiếu, sim 4G Hàn Quốc"
    ],
    notes: ["Hộ chiếu còn hạn trên 6 tháng", "WILTravel hoàn tất thủ tục visa từ A-Z"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Incheon (Seoul)", desc: "Bay đêm từ Tân Sơn Nhất sang Seoul trên chuyến bay chất lượng cao. Nghỉ ngơi trên máy bay." },
      { day: "Ngày 2", title: "Đảo Nami Thơ Mộng - Tháp Namsan Seoul", desc: "Đến Incheon, xe đón đoàn đi ăn sáng canh sườn bò. Tham quan Đảo Nami với những hàng cây ngân hạnh và thông cổ thụ thẳng tắp. Chiều lên Tháp Namsan ngắm toàn cảnh Seoul." },
      { day: "Ngày 3", title: "Công Viên Giải Trí Everland - Trải Nghiệm Mặc Hanbok", desc: "Thỏa sức trải nghiệm tàu lượn siêu tốc T-Express, vườn thú hoang dã Safari tại Everland. Chiều trải nghiệm làm kim chi truyền thống và mặc trang phục Hanbok truyền thống." },
      { day: "Ngày 4", title: "Cung Điện Gyeongbokgung - Nhà Xanh - Chợ Myeongdong", desc: "Thăm Cung điện Hoàng Gia Gyeongbok tráng lệ, Nhà Xanh Phủ Tổng Thống (Blue House). Thăm Bảo tàng Dân tộc Quốc gia. Tối tự do mua sắm mỹ phẩm tại thiên đường Myeongdong." },
      { day: "Ngày 5", title: "Suối Cheonggyecheon - Quảng Trường Gwanghwamun → TP.HCM", desc: "Dạo bước bên dòng suối Cheonggyecheon trong vắt giữa lòng thủ đô, chụp ảnh cùng tượng Tướng quân Yi Sun-sin. Xe đưa ra sân bay Incheon bay về TP.HCM." }
    ]
  },
  {
    id: 6,
    code: "WLE-TH-05",
    name: "Tour Thái Lan: Bangkok - Pattaya - Muang Boran - Đảo San Hô",
    location: "Thái Lan",
    category: ["Quốc tế", "Biển", "Giải trí"],
    departure: "TP.HCM",
    departureDates: ["Thứ 3, 5, 7 hàng tuần", "14/11", "16/11", "21/11", "28/11"],
    originalPrice: 8490000,
    price: 6690000,
    image: "images/hero5.jpg",
    rating: 4.7,
    reviews: 195,
    duration: "5 ngày 4 đêm",
    badge: "Giá Cực Tốt",
    hotelStandard: "Khách sạn 4 sao tại Pattaya & Bangkok",
    transport: "Vé máy bay khứ hồi Vietnam Airlines / Vietjet Air",
    highlights: ["Thành phố cổ Muang Boran - Bảo tàng ngoài trời lớn nhất thế giới", "Tắm biển & cano cao tốc ra Đảo Coral Island", "Buffet tầng 86 tòa nhà chọc trời Baiyoke Sky", "Du thuyền ngắm hoàng hôn trên dòng sông Chao Phraya"],
    includes: [
      "Vé máy bay khứ hồi (đã gồm 20kg ký gửi & 7kg xách tay)",
      "Khách sạn 4 sao tiêu chuẩn quốc tế 2 người/phòng",
      "Bữa ăn buffet hải sản nướng không giới hạn & buffet 86 tầng Baiyoke Sky",
      "Vé cano ra đảo Coral & vé tham quan thành phố cổ Muang Boran",
      "Bảo hiểm du lịch quốc tế Bảo Minh bồi thường đến 210.000.000đ",
      "Tặng 1 suất massage Thái cổ truyền 60 phút thư giãn",
      "Quà tặng: Nón du lịch cao cấp WILTravel"
    ],
    notes: ["Miễn visa du lịch cho công dân Việt Nam", "Đổi tiền Baht Thái trước chuyến bay"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Bangkok → Pattaya", desc: "Đáp chuyến bay sang Bangkok. Xe và HDV đón đoàn khởi hành đi Pattaya. Tối tự do khám phá phố đi bộ Walking Street náo nhiệt ven biển." },
      { day: "Ngày 2", title: "Cano Đảo Coral San Hô - Trân Bảo Phật Sơn - Show Alcazar", desc: "Đi cano cao tốc ra đảo San Hô Coral Island tắm biển trong vắt. Thăm Trân Bảo Phật Sơn (Khao Chee Chan) khắc nổi 999kg vàng 24k. Tối xem chương trình đại nhạc hội Alcazar Show hoành tráng." },
      { day: "Ngày 3", title: "Vườn Nhiệt Đới Nong Nooch → Thành Phố Cổ Muang Boran", desc: "Khám phá công viên khủng long Nong Nooch. Khởi hành về Bangkok, tham quan Muang Boran với các công trình cung điện, đền đài được phục dựng nguy nga tráng lệ." },
      { day: "Ngày 4", title: "Chùa Thuyền Wat Yannawa - Dạo Thuyền Sông Chao Phraya", desc: "Thăm Chùa Thuyền linh thiêng, viếng Phật Bốn Mặt Erawan. Dạo thuyền trên dòng sông mẹ Chao Phraya huyền thoại xem cá nổi. Ăn tối buffet tại tòa tháp Baiyoke Sky." },
      { day: "Ngày 5", title: "Chùa Wat Traimit (Phật Vàng) - Mua Sắm IconSiam → TP.HCM", desc: "Chiêm bái tượng Phật Vàng nguyên khối 5.5 tấn tại Chùa Wat Traimit. Mua sắm thả ga tại siêu trung tâm thương mại IconSiam bên bờ sông. Xe tiễn ra sân bay về lại TP.HCM." }
    ]
  },
  {
    id: 7,
    code: "WLE-TW-04",
    name: "Du Lịch Đài Loan: Cao Hùng - Đài Trung - Đài Bắc - Hồ Nhật Nguyệt",
    location: "Đài Loan",
    category: ["Quốc tế", "Văn hóa", "Ẩm thực"],
    departure: "TP.HCM",
    departureDates: ["Thứ 5 hàng tuần", "16/11", "23/11", "30/11", "07/12"],
    originalPrice: 15890000,
    price: 12990000,
    image: "images/hero6.jpg",
    rating: 4.8,
    reviews: 135,
    duration: "5 ngày 4 đêm",
    badge: "Hot",
    hotelStandard: "Khách sạn 4 sao cao cấp",
    transport: "Vé máy bay khứ hồi China Airlines / Eva Air",
    highlights: ["Du thuyền ngoạn cảnh Hồ Nhật Nguyệt (Sun Moon Lake)", "Thả đèn trời cầu may mắn tại Làng Cổ Thập Phần", "Check-in Tòa tháp biểu tượng Taipei 101", "Trải nghiệm văn hóa chợ đêm Tây Môn Đình (Ximending)"],
    includes: [
      "Vé máy bay khứ hồi hàng không quốc tế tiêu chuẩn 4 sao",
      "Visa Quan Hồng điện tử nhanh chóng, tiện lợi",
      "Khách sạn 4 sao trung tâm các thành phố lớn",
      "Vé du thuyền Hồ Nhật Nguyệt & đèn trời Thập Phần (4 khách/đèn)",
      "Bữa ăn lẩu Shabu Shabu Đài Loan & xào hải sản nấm nổi tiếng",
      "Bảo hiểm du lịch quốc tế Bảo Minh bồi thường tới 500.000.000đ",
      "Quà tặng: Nón du lịch WILTravel & bao hộ chiếu"
    ],
    notes: ["Hộ chiếu còn hạn trên 6 tháng", "Thủ tục visa chỉ cần hình chụp hộ chiếu và thông tin công việc"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Cao Hùng - Phật Quang Sơn Tự", desc: "Bay sang thành phố cảng Cao Hùng. Tham quan Phật Quang Sơn Tự - Kinh đô Phật giáo Đài Loan với tượng Đại Phật vàng uy nghiêm. Chiều dạo chợ đêm Lục Hợp thưởng thức trà sữa trân châu chính gốc." },
      { day: "Ngày 2", title: "Đầm Liên Trì - Tháp Long Hổ → Đài Trung", desc: "Thăm Tháp Long Hổ với quan niệm vào miệng Rồng ra miệng Hổ xua tan xui xẻo. Di chuyển đến Đài Trung, ghé làng Cầu Vồng Rainbow Village rực rỡ sắc màu." },
      { day: "Ngày 3", title: "Hồ Nhật Nguyệt Thơ Mộng → Cố Đô Đài Bắc", desc: "Du thuyền trên Hồ Nhật Nguyệt phẳng lặng như gương. Viếng Đền Văn Võ linh thiêng. Di chuyển về Đài Bắc, khám phá chợ đêm Tây Môn Đình (Ximending) sầm uất." },
      { day: "Ngày 4", title: "Làng Cổ Thập Phần Thả Đèn Trời - Thác Nước Thập Phần - Tháp Taipei 101", desc: "Trải nghiệm thả đèn trời viết điều ước trên đường ray xe lửa cổ Thập Phần. Chiêm ngưỡng Thác nước Thập Phần hùng vĩ. Chiều ngắm hoàng hôn tại Tòa tháp Taipei 101 lừng danh." },
      { day: "Ngày 5", title: "Đài Tưởng Niệm Tưởng Giới Thạch → TP.HCM", desc: "Thăm Nhà tưởng niệm Tưởng Giới Thạch uy nghi, xem nghi thức đổi gác trang trọng. Mua bánh dứa Phụng Lê đặc sản Đài Loan làm quà. Xe đưa ra sân bay Đào Viên về TP.HCM." }
    ]
  },
  {
    id: 8,
    code: "WLE-KH-06",
    name: "Tour Campuchia: Siem Reap - Phnom Penh - Quần Thể Angkor Wat",
    location: "Campuchia",
    category: ["Quốc tế", "Văn hóa", "Di sản"],
    departure: "TP.HCM",
    departureDates: ["Thứ 5 hàng tuần", "16/11", "23/11", "30/11"],
    originalPrice: 5890000,
    price: 4690000,
    image: "images/hero7.jpg",
    rating: 4.7,
    reviews: 104,
    duration: "4 ngày 3 đêm",
    badge: "Tiết Kiệm",
    hotelStandard: "Khách sạn 4 sao chuẩn quốc tế có hồ bơi",
    transport: "Xe Limousine ghế ngả VIP cao cấp",
    highlights: ["Kỳ quan thế giới Đền Angkor Wat vĩ đại", "Đền Ta Prohm với những bộ rễ cây cổ thụ khổng lồ", "Cung điện Hoàng Gia Campuchia & Chùa Vàng Chùa Bạc", "Thưởng thức tiệc buffet lẩu băng chuyền & xem múa Apsara"],
    includes: [
      "Xe du lịch máy lạnh đời mới chất lượng cao đưa đón suốt tuyến từ TP.HCM",
      "Khách sạn 4 sao quốc tế tiêu chuẩn 2 khách/phòng",
      "Vé tham quan trọn gói toàn bộ quần thể di sản Angkor",
      "Ăn uống buffet quốc tế và tiệc đặc sản có biểu diễn múa Apsara cung đình",
      "Hướng dẫn viên tiếng Việt chuyên nghiệp phục vụ chu đáo",
      "Bảo hiểm du lịch quốc tế Bảo Minh bồi thường tới 210.000.000đ",
      "Quà tặng: Khăn rằn truyền thống Krama & nón du lịch WILTravel"
    ],
    notes: ["Miễn visa cho người mang hộ chiếu Việt Nam", "Trang phục nghiêm túc che vai và đầu gối khi vào đền đài"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Cửa Khẩu Mộc Bài → Siem Reap", desc: "Khởi hành từ TP.HCM qua cửa khẩu Mộc Bài sang Campuchia. Dừng chân tại Kompong Kdei chiêm ngưỡng cây cầu đá ong cổ nhất Đông Nam Á gần 1.000 năm tuổi. Đến Siem Reap nhận phòng khách sạn 4 sao." },
      { day: "Ngày 2", title: "Khám Phá Angkor Wat - Đền Bayon 4 Mặt - Đền Ta Prohm", desc: "Chiêm bái Angkor Thom với nụ cười bí ẩn của tượng thần Bayon 4 mặt. Thăm đền Ta Prohm nơi quay phim Bí Mật Ngôi Mộ Cổ (Tomb Raider). Chiều ngắm hoàng hôn rực rỡ trên đỉnh núi Bakheng." },
      { day: "Ngày 3", title: "Siem Reap → Thủ Đô Phnom Penh - Chùa Vàng Chùa Bạc", desc: "Khởi hành về thủ đô Phnom Penh. Thăm Hoàng Cung Campuchia tráng lệ, Chùa Vàng Chùa Bạc với tượng Phật ngọc bích và nền lát hơn 5.000 viên gạch bạc. Thử vận may tại Naga World 5 sao." },
      { day: "Ngày 4", title: "Chợ Lớn Mới Phsar Thmey → Mộc Bài → TP.HCM", desc: "Mua sắm lạp xưởng Siem Reap, cá khô Biển Hồ tại Chợ Lớn Mới Phsar Thmey. Khởi hành về lại cửa khẩu Mộc Bài, làm thủ tục nhập cảnh Việt Nam, về đến TP.HCM." }
    ]
  },
  {
    id: 9,
    code: "WLE-DL-07",
    name: "Tour Đà Lạt - Thác Prenn - Cao Nguyên Đại Ngàn Mộng Mơ",
    location: "Đà Lạt",
    category: ["Núi", "Trong nước", "Nghỉ dưỡng"],
    departure: "TP.HCM",
    departureDates: ["Tối Thứ 5 & Thứ 6 hàng tuần", "17/11", "24/11", "01/12", "08/12"],
    originalPrice: 3290000,
    price: 2490000,
    image: "images/tour-dalat.jpg",
    rating: 4.8,
    reviews: 145,
    duration: "3 ngày 3 đêm",
    badge: "Giá Tốt",
    hotelStandard: "Khách sạn 3-4 sao trung tâm gần Hồ Xuân Hương",
    transport: "Xe giường nằm Limousine cao cấp",
    highlights: ["Khu du lịch Thác Prenn kỳ vĩ với đồi hoa rực rỡ", "Đồi Chè Cầu Đất săn mây đón bình minh tuyệt đẹp", "Ga xe lửa Đà Lạt cổ kính bậc nhất Đông Dương", "Quảng trường Lâm Viên & chợ đêm Đà Lạt se lạnh"],
    includes: [
      "Xe giường nằm Limousine đời mới êm ái khứ hồi TP.HCM - Đà Lạt",
      "Khách sạn 3-4 sao tiện nghi view đẹp trung tâm",
      "Ăn uống buffet sáng & các bữa chính lẩu gà lá é, lẩu bò Ba Toa nức tiếng",
      "Vé tham quan Thác Prenn, Nông trại Cầu Đất, Vườn Cẩm Tú Cầu",
      "Bảo hiểm du lịch Bảo Minh bồi thường tối đa 100.000.000đ",
      "Nước suối & khăn lạnh phục vụ suốt tuyến",
      "Quà tặng nón du lịch độc quyền từ WILTravel"
    ],
    notes: ["Nhiệt độ Đà Lạt se lạnh về đêm (14-17°C), hãy mang theo áo ấm", "Nên chuẩn bị trang phục vintage để có những bức ảnh đẹp"],
    itinerary: [
      { day: "Đêm 1", title: "TP.HCM → Đà Lạt Xứ Ngàn Hoa", desc: "Xe Limousine đón khách tại TP.HCM, khởi hành đi Đà Lạt theo cung đường cao tốc Dầu Giây - Liên Khương. Quý khách nghỉ đêm êm ái trên xe." },
      { day: "Ngày 1", title: "Thác Prenn Hùng Vĩ - Dinh Bảo Đại - Quảng Trường Lâm Viên", desc: "Đến Đà Lạt dùng điểm tâm sáng. Thăm khu du lịch Thác Prenn huyền thoại, trải nghiệm chèo thuyền, ngắm thác nước đổ bọt trắng xóa. Chiều thăm Dinh 3 Vua Bảo Đại, check-in Nụ hoa Atiso khổng lồ tại Quảng trường Lâm Viên." },
      { day: "Ngày 2", title: "Đồi Chè Cầu Đất Săn Mây - Ga Cổ Đà Lạt - Chợ Đêm", desc: "Sáng sớm xe đưa đoàn lên Đồi chè Cầu Đất đón bình minh trên thảm gỗ săn mây bồng bềnh. Ghé Ga xe lửa Đà Lạt cổ kính với đầu tàu hơi nước. Tối tự do dạo chợ đêm thưởng thức sữa đậu nành nóng và bánh tráng nướng." },
      { day: "Ngày 3", title: "Thiền Viện Trúc Lâm - Hồ Tuyền Lâm → TP.HCM", desc: "Viếng Thiền Viện Trúc Lâm thanh tịnh giữa rừng thông ngắm cảnh Hồ Tuyền Lâm phẳng lặng. Ghé cơ sở mứt Đà Lạt nếm thử dâu tây, atiso miễn phí. Khởi hành về lại TP.HCM." }
    ]
  },
  {
    id: 10,
    code: "WLE-PT-08",
    name: "Tour Lagi - Phan Thiết - Mũi Né: Biển Xanh & Đồi Cát Bay",
    location: "Phan Thiết",
    category: ["Biển", "Trong nước", "Nghỉ dưỡng"],
    departure: "TP.HCM",
    departureDates: ["Thứ 7 hàng tuần", "18/11", "25/11", "02/12", "09/12"],
    originalPrice: 2890000,
    price: 1990000,
    image: "images/hero8.jpg",
    rating: 4.7,
    reviews: 98,
    duration: "2 ngày 1 đêm",
    badge: "Ưu Đãi Lễ",
    hotelStandard: "Resort 3-4 sao có bãi biển riêng & hồ bơi",
    transport: "Xe du lịch Universe 29-45 chỗ đời mới",
    highlights: ["Nghỉ dưỡng resort sát bãi biển Hàm Tiến Mũi Né", "Chinh phục Đồi Cát Bay & ngắm hoàng hôn rực lửa", "Ngọn Hải Đăng Kê Gà cổ nhất Việt Nam", "Thưởng thức hải sản nướng tươi sống ven biển"],
    includes: [
      "Xe du lịch máy lạnh đời mới đưa đón suốt hành trình",
      "Resort 3-4 sao sát biển có hồ bơi vô cực, 2 người/phòng",
      "Ăn sáng buffet resort & các bữa chính hải sản nướng phong phú",
      "Vé cano vượt biển ngắm Hải Đăng Kê Gà cổ kính",
      "Bảo hiểm du lịch Bảo Minh mức bồi thường tới 100.000.000đ",
      "Quà tặng: Nón du lịch WILTravel cao cấp"
    ],
    notes: ["Chuẩn bị đồ bơi, kem chống nắng, kính mát", "Có dịch vụ xe môtô địa hình ATV lượn trên đồi cát"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Lagi → Hải Đăng Kê Gà → Mũi Né", desc: "Xe đón khách tại TP.HCM, di chuyển qua cao tốc Long Thành - Dầu Giây - Phan Thiết chỉ 2 tiếng rưỡi. Đến Kê Gà lên cano ra thăm ngọn hải đăng bằng đá cổ nhất Đông Nam Á. Chiều về nhận phòng resort Mũi Né, tắm biển và hồ bơi." },
      { day: "Ngày 2", title: "Đồi Cát Bay - Làng Chài Mũi Né - Lâu Đài Rượu Vang → TP.HCM", desc: "Sáng sớm xe đưa đi ngắm bình minh trên Đồi Cát Bay, chơi trượt cát kỳ thú. Thăm làng chài Mũi Né xem cảnh tấp nập thuyền cá về. Tham quan Lâu đài rượu vang RD độc đáo. Chiều khởi hành về lại TP.HCM." }
    ]
  },
  {
    id: 11,
    code: "WLE-MT-09",
    name: "Tour Miền Tây: Mỹ Tho - Cần Thơ - Bạc Liêu - Đất Mũi Cà Mau",
    location: "Miền Tây",
    category: ["Sông nước", "Trong nước", "Văn hóa"],
    departure: "TP.HCM",
    departureDates: ["Thứ 5 hàng tuần", "16/11", "23/11", "30/11", "07/12"],
    originalPrice: 4890000,
    price: 3690000,
    image: "images/hero2.jpg",
    rating: 4.8,
    reviews: 132,
    duration: "4 ngày 3 đêm",
    badge: "Đậm Chất Nam Bộ",
    hotelStandard: "Khách sạn 3-4 sao trung tâm thành phố Cần Thơ & Cà Mau",
    transport: "Xe du lịch đời mới & Tàu cao tốc đi Đất Mũi",
    highlights: ["Chợ nổi Cái Răng - Nét văn hóa giao thương độc đáo trên sông", "Chạm tay vào Mốc tọa độ Quốc gia GPS 0001 tại Đất Mũi Cà Mau", "Thăm Dinh Thự Công Tử Bạc Liêu & Cánh Đồng Điện Gió", "Đi xuồng ba lá len lỏi rừng đước ngập mặn"],
    includes: [
      "Xe du lịch máy lạnh tiện nghi đưa đón suốt chặng đường",
      "Khách sạn 3-4 sao tiện nghi trung tâm các tỉnh",
      "Tàu du lịch chợ nổi Cái Răng & cano cao tốc tham quan Đất Mũi",
      "Các bữa ăn đậm đà vị miền Tây: Cá tai tượng chiên xù, lẩu mắm, cua Cà Mau",
      "Bảo hiểm du lịch Bảo Minh bồi thường tới 100.000.000đ",
      "Nón du lịch & nước suối suốt tuyến"
    ],
    notes: ["Nên mang theo nón rộng vành, quần áo thoải mái, chống muỗi", "Có thể mua tôm khô Rạch Gốc, mắm cá linh, mật ong hoa tràm làm quà"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Mỹ Tho → Bến Tre → Cần Thơ", desc: "Khởi hành về miền Tây sông nước. Đến Mỹ Tho, đi thuyền trên sông Tiền ngắm Tứ linh Long - Lân - Quy - Phụng. Ngồi xuồng chèo ba lá len lỏi rạch dừa rợp bóng, nghe đờn ca tài tử Nam Bộ. Chiều về Tây Đô Cần Thơ nhận phòng." },
      { day: "Ngày 2", title: "Chợ Nổi Cái Răng → Sóc Trăng → Bạc Liêu → Cà Mau", desc: "4h30 sáng lên thuyền trải nghiệm Chợ nổi Cái Răng rực rỡ sắc màu nông sản. Khởi hành qua Sóc Trăng viếng Chùa Chén Kiểu. Đến Bạc Liêu thăm Nhà Công Tử Bạc Liêu, ngắm cánh đồng điện gió bên bờ biển. Tối đến Cà Mau nghỉ ngơi." },
      { day: "Ngày 3", title: "Chinh Phục Đất Mũi Cà Mau Cực Nam Tổ Quốc", desc: "Lên cano vượt rừng đước Năm Căn đến Đất Mũi. Chụp ảnh lưu niệm tại Mốc tọa độ Quốc gia GPS 0001 và biểu tượng Mũi Cà Mau hình con tàu rẽ sóng ra biển khơi. Ăn trưa đặc sản cua Cà Mau tại nhà hàng sinh thái." },
      { day: "Ngày 4", title: "Cà Mau → Thiền Viện Trúc Lâm Phương Nam → TP.HCM", desc: "Trở về Cần Thơ viếng Thiền viện Trúc Lâm Phương Nam lớn nhất miền Tây. Ghé Lò hủ tiếu truyền thống và mua đặc sản trái cây bốn mùa. Xe đưa đoàn về lại TP.HCM." }
    ]
  },
  {
    id: 12,
    code: "WLE-MT-12",
    name: "Du Lịch Di Sản Miền Trung: Đà Nẵng - Bà Nà Hills - Hội An - Huế",
    location: "Đà Nẵng - Huế",
    category: ["Biển", "Di sản", "Trong nước"],
    departure: "TP.HCM / Hà Nội",
    departureDates: ["Thứ 5 & Thứ 7 hàng tuần", "16/11", "18/11", "23/11", "30/11"],
    originalPrice: 5490000,
    price: 4290000,
    image: "images/tour-danang.jpg",
    rating: 4.9,
    reviews: 176,
    duration: "4 ngày 3 đêm",
    badge: "Bán chạy",
    hotelStandard: "Khách sạn 4 sao sát biển Mỹ Khê & 4 sao trung tâm Huế",
    transport: "Vé máy bay khứ hồi (Vietnam Airlines / Bamboo Airways)",
    highlights: ["Chiêm ngưỡng Cầu Vàng Bàn Tay Khổng Lồ tại Bà Nà Hills", "Phố cổ Hội An lung linh đèn lồng bên sông Hoài", "Đại Nội Cố Đô Huế & Lăng Khải Định kiến trúc tinh xảo", "Nghe ca Huế trên thuyền rồng ngắm sông Hương thơ mộng"],
    includes: [
      "Vé máy bay khứ hồi (bao gồm hành lý xách tay & ký gửi)",
      "Khách sạn 4 sao sát biển Mỹ Khê Đà Nẵng và 4 sao sông Hương Huế",
      "Vé cáp treo Bà Nà Hills & buffet trưa quốc tế tại đỉnh núi",
      "Thuyền rồng sông Hương ca Huế & vé du thuyền ngắm Cầu Rồng phun lửa",
      "Bảo hiểm du lịch Bảo Minh bồi thường mức 100.000.000đ",
      "Quà tặng nón du lịch WILTravel & gối ngủ chữ U"
    ],
    notes: ["Cần mang theo CMND/CCCD bản gốc khi làm thủ tục bay", "Trang phục lịch sự khi viếng lăng tẩm và chùa Thiên Mụ"],
    itinerary: [
      { day: "Ngày 1", title: "Bay đến Đà Nẵng - Bán Đảo Sơn Trà - Biển Mỹ Khê", desc: "Đáp chuyến bay đến Đà Nẵng. Xe đón đoàn viếng Chùa Linh Ứng Sơn Trà chiêm bái tượng Phật Bà Quan Âm cao 67m nhìn ra biển lớn. Chiều tắm biển Mỹ Khê cát trắng mịn màng. Tối du thuyền sông Hàn ngắm Cầu Rồng phun lửa phun nước." },
      { day: "Ngày 2", title: "Tiên Cảnh Bà Nà Hills - Cầu Vàng - Phố Cổ Hội An", desc: "Lên cáp treo Bà Nà ngắm rừng nguyên sinh hùng vĩ, check-in Cầu Vàng nâng đỡ bởi bàn tay khổng lồ. Vui chơi Fantasy Park. Chiều di chuyển sang Hội An, dạo phố cổ đèn lồng, Chùa Cầu Nhật Bản, thả đèn hoa đăng trên sông Hoài." },
      { day: "Ngày 3", title: "Đèo Hải Vân Hùng Vĩ → Cố Đô Huế - Đại Nội - Chùa Thiên Mụ", desc: "Vượt Đèo Hải Vân - 'Đệ nhất hùng quan' sang Cố Đô Huế. Thăm Đại Nội kinh thành vàng son của 13 vị vua triều Nguyễn. Viếng Chùa Thiên Mụ cổ kính bên bờ sông Hương. Tối thưởng thức ca Huế trên thuyền rồng bồng bềnh." },
      { day: "Ngày 4", title: "Lăng Khải Định Tinh Xảo - Mua Sắm Chợ Đông Ba → TP.HCM", desc: "Thăm Lăng Khải Định - đỉnh cao nghệ thuật khảm sành sứ Á-Âu. Mua đặc sản mè xửng, tôm chua, trà cung đình tại Chợ Đông Ba. Xe đưa ra sân bay Phú Bài (Huế) hoặc Đà Nẵng bay về lại TP.HCM." }
    ]
  }
];
window.tours = tours;

// ========================================================
// 2. KHÁCH SẠN & RESORT DATA (HOTELS & RESORTS TỪ WIL-TRAVEL)
// ========================================================
const HOTELS_DATA = [
  {
    id: 1,
    name: "Vinpearl Resort & Spa Phú Quốc",
    category: "Luxury",
    city: "Phú Quốc",
    address: "Bãi Dài, Gành Dầu, Phú Quốc, Kiên Giang",
    stars: 5,
    price: 2450000,
    image: "images/tour-phuquoc.jpg",
    amenities: ["Bãi biển riêng", "Hồ bơi vô cực 5.000m²", "Buffet sáng 5 sao", "Spa & Gym", "Đưa đón sân bay"],
    rating: 4.9,
    reviews: 320,
    badge: "5 Sao Đẳng Cấp"
  },
  {
    id: 2,
    name: "The Myst Đồng Khởi Sài Gòn",
    category: "Luxury",
    city: "Sài Gòn",
    address: "6-8 Hồ Huấn Nghiệp, Bến Nghé, Quận 1, TP.HCM",
    stars: 5,
    price: 2850000,
    image: "images/hero1.jpg",
    amenities: ["Hồ bơi tầng thượng", "View sông Sài Gòn", "Trung tâm Quận 1", "Trà chiều miễn phí", "Bồn tắm lộ thiên"],
    rating: 4.8,
    reviews: 215,
    badge: "Kiến Trúc Độc Đáo"
  },
  {
    id: 3,
    name: "Centara Mirage Resort Mũi Né",
    category: "Deluxe",
    city: "Phan Thiết",
    address: "Huỳnh Thúc Kháng, Mũi Né, Phan Thiết, Bình Thuận",
    stars: 4,
    price: 1890000,
    image: "images/hero8.jpg",
    amenities: ["Công viên nước trẻ em", "Hồ bơi giật cấp", "Biệt thự view biển", "Sân bowling", "Buffet hải sản"],
    rating: 4.7,
    reviews: 180,
    badge: "Gia Đình Yêu Thích"
  },
  {
    id: 4,
    name: "Colline Hotel Đà Lạt",
    category: "Deluxe",
    city: "Đà Lạt",
    address: "10 Phan Bội Châu, Phường 1, Đà Lạt (Cạnh Chợ Mới)",
    stars: 4,
    price: 1350000,
    image: "images/tour-dalat.jpg",
    amenities: ["Cạnh chợ đêm Đà Lạt", "Thiết kế chuẩn Châu Âu", "Nhà hàng Á - Âu", "Phòng gym & sauna", "Buffet sáng"],
    rating: 4.8,
    reviews: 290,
    badge: "Check-in Hot"
  },
  {
    id: 5,
    name: "The Secret Côn Đảo Resort",
    category: "Luxury",
    city: "Côn Đảo",
    address: "Số 08 Tôn Đức Thắng, Côn Đảo, Bà Rịa - Vũng Tàu",
    stars: 5,
    price: 2650000,
    image: "images/hero7.jpg",
    amenities: ["Hồ bơi tràn biển", "Kiến trúc Pháp cổ kính", "Nhà hàng ẩm thực", "Tour viếng nghĩa trang Hàng Dương", "Xe đưa đón"],
    rating: 4.9,
    reviews: 140,
    badge: "Nghỉ Dưỡng Linh Thiêng"
  },
  {
    id: 6,
    name: "Marina Bay Vũng Tàu Resort & Spa",
    category: "Superior",
    city: "Vũng Tàu",
    address: "115 Trần Phú, Phường 5, TP. Vũng Tàu",
    stars: 4,
    price: 1550000,
    image: "images/tour-nhatrang.jpg",
    amenities: ["View hoàng hôn Bãi Dâu", "Hồ bơi nước mặn", "Phòng view biển 100%", "Spa thảo dược", "Buffet sáng"],
    rating: 4.6,
    reviews: 160,
    badge: "View Hoàng Hôn Đẹp Nhất"
  },
  {
    id: 7,
    name: "Havana Nha Trang Hotel",
    category: "Deluxe",
    city: "Nha Trang",
    address: "38 Trần Phú, Lộc Thọ, Nha Trang, Khánh Hòa",
    stars: 5,
    price: 1290000,
    image: "images/tour-nhatrang.jpg",
    amenities: ["Đường hầm riêng ra biển", "Skylight Rooftop Bar 360°", "Hồ bơi vô cực", "Bãi biển riêng Trần Phú", "Buffet hải sản"],
    rating: 4.8,
    reviews: 410,
    badge: "Trung Tâm Sôi Động"
  },
  {
    id: 8,
    name: "Muong Thanh Grand Sài Gòn Hotel",
    category: "Standard",
    city: "Sài Gòn",
    address: "8A Mạc Đĩnh Chi, Bến Nghé, Quận 1, TP.HCM",
    stars: 4,
    price: 990000,
    image: "images/hero2.jpg",
    amenities: ["Trung tâm Quận 1", "Hồ bơi trong nhà", "Buffet sáng đặc sản vùng miền", "Phòng họp hội nghị MICE"],
    rating: 4.5,
    reviews: 185,
    badge: "Giá Tốt Công Tác"
  }
];
window.HOTELS_DATA = HOTELS_DATA;

// ========================================================
// 3. DỊCH VỤ THUÊ XE DU LỊCH (CAR RENTAL TỪ WIL-TRAVEL)
// ========================================================
const CAR_RENTAL_DATA = [
  {
    id: 1,
    name: "Xe Du Lịch 4 Chỗ (Toyota Vios / Honda City / Mazda 3)",
    seats: 4,
    luggage: "2 vali lớn + 2 túi xách",
    image: "images/hero1.jpg",
    pricePerDay: 850000,
    routes: [
      { route: "Đón / Tiễn Sân Bay Tân Sơn Nhất - Trung Tâm Q1, Q3", price: 300000 },
      { route: "TP.HCM - Vũng Tàu (1 ngày / 2 chiều)", price: 1500000 },
      { route: "TP.HCM - Phan Thiết / Mũi Né (2 ngày 1 đêm)", price: 2800000 },
      { route: "TP.HCM - Đà Lạt (3 ngày 2 đêm)", price: 4200000 }
    ],
    features: ["Xe đời mới 2022-2024", "Tài xế lịch sự, rành đường", "Bảo hiểm hành khách đầy đủ", "Nước suối & khăn lạnh miễn phí"]
  },
  {
    id: 2,
    name: "Xe Du Lịch 7 Chỗ (Toyota Innova / Fortuner / Mitsubishi Xpander)",
    seats: 7,
    luggage: "4 vali lớn + 3 túi xách",
    image: "images/hero2.jpg",
    pricePerDay: 1100000,
    routes: [
      { route: "Đón / Tiễn Sân Bay Tân Sơn Nhất", price: 380000 },
      { route: "TP.HCM - Vũng Tàu (1 ngày)", price: 1750000 },
      { route: "TP.HCM - Hồ Tràm / Bình Châu (2 ngày 1 đêm)", price: 2900000 },
      { route: "TP.HCM - Cần Thơ / Miền Tây (2 ngày 1 đêm)", price: 3200000 }
    ],
    features: ["Khoang hành lý rộng rãi", "Nội thất da êm ái", "Máy lạnh 2 dàn độc lập", "Hỗ trợ ghế trẻ em"]
  },
  {
    id: 3,
    name: "Xe 16 Chỗ Cao Cấp (Ford Transit / Hyundai Solati)",
    seats: 16,
    luggage: "8-10 vali",
    image: "images/hero3.jpg",
    pricePerDay: 1650000,
    routes: [
      { route: "Đón / Tiễn Sân Bay Tân Sơn Nhất", price: 700000 },
      { route: "TP.HCM - Vũng Tàu (1 ngày)", price: 2400000 },
      { route: "TP.HCM - Phan Thiết / Mũi Né (2 ngày 1 đêm)", price: 4300000 },
      { route: "TP.HCM - Đà Lạt (3 ngày 2 đêm)", price: 6500000 }
    ],
    features: ["Trần cao đứng thẳng người", "Ghế ngả góc rộng", "Wifi 4G tốc độ cao", "Phù hợp đoàn gia đình & công ty"]
  },
  {
    id: 4,
    name: "Xe Limousine VIP 9 Chỗ (DCar President / Auto Kingdom)",
    seats: 9,
    luggage: "6 vali lớn",
    image: "images/hero4.jpg",
    pricePerDay: 2350000,
    routes: [
      { route: "Đón / Tiễn Sân Bay VIP", price: 1200000 },
      { route: "TP.HCM - Vũng Tàu VIP", price: 3200000 },
      { route: "TP.HCM - Phan Thiết / Hồ Tràm 2N1Đ", price: 5800000 },
      { route: "City Tour TP.HCM Tiếp Khách VIP (8 tiếng)", price: 2800000 }
    ],
    features: ["Ghế massage đa điểm hạng thương gia", "Màn hình TV Smart + Âm thanh vòm", "Cổng sạc Type-C từng ghế", "Tủ lạnh mini trên xe"]
  },
  {
    id: 5,
    name: "Xe Du Lịch 29 Chỗ (Thaco Town / Isuzu Samco)",
    seats: 29,
    luggage: "20 vali lớn hầm xe",
    image: "images/hero5.jpg",
    pricePerDay: 2500000,
    routes: [
      { route: "Đón Tiễn Sân Bay / City Tour", price: 1800000 },
      { route: "TP.HCM - Vũng Tàu 1 Ngày", price: 3500000 },
      { route: "TP.HCM - Đà Lạt 3 Ngày 2 Đêm", price: 8500000 },
      { route: "TP.HCM - Miền Tây 2 Ngày 1 Đêm", price: 6200000 }
    ],
    features: ["Hệ thống bầu hơi êm ái", "Micro & âm thanh karaoke", "Hầm hành lý siêu rộng", "Tài xế chuyên tour du lịch"]
  },
  {
    id: 6,
    name: "Xe Du Lịch 45 Chỗ (Hyundai Universe Prime)",
    seats: 45,
    luggage: "Toàn bộ hành lý đoàn lớn",
    image: "images/hero6.jpg",
    pricePerDay: 3600000,
    routes: [
      { route: "City Tour / Teambuilding Công Ty", price: 2600000 },
      { route: "TP.HCM - Phan Thiết 2N1Đ Teambuilding", price: 8900000 },
      { route: "TP.HCM - Nha Trang 3N3Đ", price: 14500000 },
      { route: "TP.HCM - Đà Lạt 3N3Đ", price: 13200000 }
    ],
    features: ["Đỉnh cao dòng xe du lịch cỡ lớn", "Giảm xóc khí nén êm ái tuyệt đối", "Đầy đủ màn hình TV, micro, đèn led sân khấu", "Bảo dưỡng định kỳ an toàn tuyệt đối"]
  }
];
window.CAR_RENTAL_DATA = CAR_RENTAL_DATA;

// ========================================================
// 4. DỊCH VỤ VISA & HỘ CHIẾU (VISA PASSPORT TỪ WIL-TRAVEL)
// ========================================================
const VISA_SERVICES_DATA = [
  {
    id: 1,
    country: "Nhật Bản",
    flag: "🇯🇵",
    type: "Du lịch tự túc / Tour",
    duration: "15 ngày - 3 tháng",
    processingTime: "7 - 10 ngày làm việc",
    fee: 1490000,
    passRate: "99%",
    docs: ["Hộ chiếu gốc còn hạn trên 6 tháng", "2 ảnh 4.5x4.5 nền trắng chuẩn Nhật", "Chứng minh tài chính (Sổ tiết kiệm/Sao kê 3 tháng)", "Chứng minh công việc (Hợp đồng/Đơn xin nghỉ phép)"],
    badge: "Bao Đậu 99%"
  },
  {
    id: 2,
    country: "Hàn Quốc",
    flag: "🇰🇷",
    type: "Du lịch (C-3-9) / Công tác",
    duration: "15 - 30 ngày (Single/Multi 5 năm)",
    processingTime: "8 - 12 ngày làm việc",
    fee: 1590000,
    passRate: "98%",
    docs: ["Hộ chiếu gốc + Căn cước công dân", "Ảnh 3.5x4.5 nền trắng chụp mới", "Sao kê tài khoản ngân hàng", "Bảo hiểm xã hội VssID / Hợp đồng lao động"],
    badge: "Hỗ Trợ Multi 5 Năm"
  },
  {
    id: 3,
    country: "Đài Loan",
    flag: "🇹🇼",
    type: "Visa Quan Hồng / E-visa",
    duration: "14 ngày",
    processingTime: "3 - 5 ngày làm việc",
    fee: 650000,
    passRate: "99.5%",
    docs: ["Hộ chiếu còn hạn trên 6 tháng", "Hình chụp trang thông tin hộ chiếu", "Thông tin vé máy bay khứ hồi (WILTravel hỗ trợ)"],
    badge: "Lấy Nhanh 3 Ngày"
  },
  {
    id: 4,
    country: "Châu Âu (Khối Schengen)",
    flag: "🇪🇺",
    type: "Du lịch 27 nước Schengen (Pháp, Ý, Đức, Thụy Sĩ...)",
    duration: "Tối đa 90 ngày",
    processingTime: "15 - 20 ngày làm việc",
    fee: 4500000,
    passRate: "96%",
    docs: ["Hộ chiếu gốc còn ít nhất 2 trang trống", "Ảnh sinh trắc học 3.5x4.5", "Sao kê tài khoản ngân hàng 6 tháng", "Sổ đỏ/Giấy tờ sở hữu tài sản (nếu có)", "Lịch trình tour chi tiết (WILTravel thiết lập)"],
    badge: "Tự Do 27 Nước"
  },
  {
    id: 5,
    country: "Hoa Kỳ (Mỹ - B1/B2)",
    flag: "🇺🇸",
    type: "Du lịch / Thăm thân / Công tác",
    duration: "1 năm (Nhiều lần)",
    processingTime: "Luyện phỏng vấn & Hẹn 5-10 ngày",
    fee: 6200000,
    passRate: "95%",
    docs: ["Điền form DS-160 chuẩn xác", "Hộ chiếu còn hạn trên 6 tháng", "File ảnh 5x5 chuẩn Mỹ", "Buổi luyện phỏng vấn 1-1 cùng chuyên gia visa WILTravel"],
    badge: "Luyện Phỏng Vấn 1-1"
  },
  {
    id: 6,
    country: "Úc (Australia - Subclass 600)",
    flag: "🇦🇺",
    type: "Visa du lịch điện tử (E-visa)",
    duration: "1 - 3 năm (Nhiều lần)",
    processingTime: "10 - 15 ngày làm việc",
    fee: 4200000,
    passRate: "97%",
    docs: ["Hộ chiếu scan màu toàn bộ trang", "Giấy tờ chứng minh công việc & tài chính", "Căn cước công dân & giấy khai sinh"],
    badge: "Không Cần Phỏng Vấn"
  },
  {
    id: 7,
    country: "Trung Quốc",
    flag: "🇨🇳",
    type: "Du lịch L / Thương mại M",
    duration: "30 ngày (Single/Double)",
    processingTime: "5 - 7 ngày làm việc",
    fee: 2850000,
    passRate: "99%",
    docs: ["Hộ chiếu gốc", "Ảnh 3.3x4.8 phông trắng", "Căn cước công dân", "Hồ sơ công việc"],
    badge: "Lấy Visa Nhanh"
  }
];
window.VISA_SERVICES_DATA = VISA_SERVICES_DATA;


// 2. LOCAL STORAGE CORE FUNCTIONS

// Auth Management
async function syncWithBackend() {
  const user = getCurrentUser();
  if (!user || window.location.protocol === 'file:') return;

  const email = user.email;
  const cart = getCart();
  const wishlist = getWishlist();
  const orders = getOrders();
  const flightBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');

  try {
    await fetch('/api/user/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, cart, orders, wishlist, flightBookings })
    });
  } catch (err) {
    console.warn('Backend sync failed:', err);
  }
}

async function loadUserDataFromServer(email) {
  if (window.location.protocol === 'file:') return;

  const guestCart = getCart();
  const guestWishlist = getWishlist();
  const guestOrders = getOrders();
  const guestFlightBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');

  try {
    const response = await fetch(`/api/user/data?email=${encodeURIComponent(email)}`);
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        const { cart, wishlist, orders, flightBookings } = result.data;
        
        // 1. Merge cart
        const mergedCart = [...cart];
        guestCart.forEach(gItem => {
          const matchIdx = mergedCart.findIndex(item => item.tourId === gItem.tourId && item.date === gItem.date);
          if (matchIdx > -1) {
            mergedCart[matchIdx].quantity += gItem.quantity;
          } else {
            mergedCart.push(gItem);
          }
        });

        // 2. Merge wishlist
        const mergedWishlist = [...new Set([...wishlist, ...guestWishlist])];

        // 3. Merge orders
        const mergedOrders = [...orders];
        guestOrders.forEach(gOrd => {
          // If ORD1001 or ORD1002 default mock values are there, we skip if already in server database
          if (!mergedOrders.some(ord => ord.orderId === gOrd.orderId)) {
            mergedOrders.push(gOrd);
          }
        });

        // 4. Merge flight bookings
        const mergedFlightBookings = [...flightBookings];
        guestFlightBookings.forEach(gFB => {
          if (!mergedFlightBookings.some(fb => fb.bookingCode === gFB.bookingCode)) {
            mergedFlightBookings.push(gFB);
          }
        });

        localStorage.setItem('wil_cart', JSON.stringify(mergedCart));
        localStorage.setItem('wil_wishlist', JSON.stringify(mergedWishlist));
        localStorage.setItem('wil_orders', JSON.stringify(mergedOrders));
        localStorage.setItem('userBookings', JSON.stringify(mergedFlightBookings));
        
        updateNavbar();
        
        // Sync merged data back to server database
        await syncWithBackend();
      }
    }
  } catch (err) {
    console.warn('Failed to load user data from backend server:', err);
  }
}

function getCurrentUser() {
  const user = localStorage.getItem('wil_current_user');
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem('wil_current_user', JSON.stringify(user));
    loadUserDataFromServer(user.email);
  } else {
    localStorage.removeItem('wil_current_user');
    localStorage.removeItem('wil_cart');
    localStorage.removeItem('wil_wishlist');
    localStorage.removeItem('wil_orders');
    localStorage.removeItem('userBookings');
  }
  updateNavbar();
}

function getUsers() {
  const users = localStorage.getItem('wil_users');
  return users ? JSON.parse(users) : [];
}

async function registerUser(firstName, lastName, email, phone, password) {
  const handleLocalRegister = () => {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'Email đã được đăng ký!' };
    }
    const newUser = { firstName, lastName, email: email.toLowerCase(), phone, password };
    users.push(newUser);
    localStorage.setItem('wil_users', JSON.stringify(users));
    return { success: true };
  };

  if (window.location.protocol === 'file:') {
    return handleLocalRegister();
  } else {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, password })
      });
      if (!response.ok && (response.status === 404 || response.status === 502)) {
        console.warn("Backend API not found, falling back to local storage for register");
        return handleLocalRegister();
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.warn('API Error, falling back to local storage:', err);
      return handleLocalRegister();
    }
  }
}

async function loginUser(email, password) {
  const handleLocalLogin = () => {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true };
    }
    if (email === "nguyen@email.com" && password === "123456") {
      const demoUser = { firstName: "Văn A", lastName: "Nguyễn", email: "nguyen@email.com", phone: "0901234567", password: "123456" };
      setCurrentUser(demoUser);
      return { success: true };
    }
    return { success: false, message: 'Email hoặc mật khẩu không đúng!' };
  };

  if (window.location.protocol === 'file:') {
    return handleLocalLogin();
  } else {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok && (response.status === 404 || response.status === 502)) {
        console.warn("Backend API not found, falling back to local storage for login");
        return handleLocalLogin();
      }
      const data = await response.json();
      if (response.ok && data.success) {
        setCurrentUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Email hoặc mật khẩu không chính xác!' };
      }
    } catch (err) {
      console.warn('API Error, falling back to local storage:', err);
      return handleLocalLogin();
    }
  }
}

async function googleLogin(lastName, firstName, email, credential = null) {
  const handleLocalGoogle = () => {
    const users = getUsers();
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      user = { firstName, lastName, email: email.toLowerCase(), phone: "Google Auth", password: "google-oauth-user" };
      users.push(user);
      localStorage.setItem('wil_users', JSON.stringify(users));
    }
    setCurrentUser(user);
    return { success: true, user };
  };

  if (window.location.protocol === 'file:') {
    return handleLocalGoogle();
  } else {
    try {
      const response = await fetch('/api/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lastName, firstName, email, credential })
      });
      if (!response.ok && (response.status === 404 || response.status === 502)) {
        console.warn("Backend API not found, falling back to local storage for google login");
        return handleLocalGoogle();
      }
      const data = await response.json();
      if (response.ok && data.success) {
        setCurrentUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Lỗi xác thực Google.' };
      }
    } catch (err) {
      console.warn('API Error, falling back to local storage:', err);
      return handleLocalGoogle();
    }
  }
}

function logoutUser() {
  setCurrentUser(null);
  window.location.href = 'index.html';
}

// Cart Management
function getCart() {
  const cart = localStorage.getItem('wil_cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('wil_cart', JSON.stringify(cart));
  updateNavbar();
  syncWithBackend();
}

function addToCart(tourId, quantity = 1, date = '') {
  const cart = getCart();
  const id = parseInt(tourId);
  const existingItemIndex = cart.findIndex(item => item.tourId === id && item.date === date);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ tourId: id, quantity, date: date || new Date().toISOString().split('T')[0] });
  }
  saveCart(cart);
  return true;
}

function updateCartQuantity(tourId, date, quantity) {
  let cart = getCart();
  const id = parseInt(tourId);
  const index = cart.findIndex(item => item.tourId === id && item.date === date);
  if (index > -1) {
    cart[index].quantity = parseInt(quantity);
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
  }
}

function removeFromCart(tourId, date) {
  let cart = getCart();
  const id = parseInt(tourId);
  cart = cart.filter(item => !(item.tourId === id && item.date === date));
  saveCart(cart);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function clearCart() {
  saveCart([]);
}

// Wishlist Management
function getWishlist() {
  const list = localStorage.getItem('wil_wishlist');
  return list ? JSON.parse(list) : [];
}

function saveWishlist(list) {
  localStorage.setItem('wil_wishlist', JSON.stringify(list));
  updateNavbar();
  syncWithBackend();
}

function toggleWishlist(tourId) {
  const id = parseInt(tourId);
  let list = getWishlist();
  const index = list.indexOf(id);
  let added = false;
  if (index > -1) {
    list.splice(index, 1);
  } else {
    list.push(id);
    added = true;
  }
  saveWishlist(list);
  return added;
}

function isInWishlist(tourId) {
  return getWishlist().includes(parseInt(tourId));
}

function getWishlistCount() {
  return getWishlist().length;
}

// Orders/History Management
function getOrders() {
  const orders = localStorage.getItem('wil_orders');
  return orders ? JSON.parse(orders) : [
    { orderId: "ORD1001", tourId: 1, date: "2026-06-01", quantity: 1, price: 3490000, total: 3290000, status: "Chờ Xác Nhận" },
    { orderId: "ORD1002", tourId: 2, date: "2026-05-25", quantity: 1, price: 3490000, total: 4190000, status: "Hoàn Tất" }
  ];
}

function addOrder(tourId, date, quantity, total, personalInfo) {
  const orders = getOrders();
  const newOrder = {
    orderId: "ORD" + Math.floor(1000 + Math.random() * 9000),
    tourId: parseInt(tourId),
    date: date || new Date().toISOString().split('T')[0],
    quantity: parseInt(quantity),
    price: tours.find(t => t.id === parseInt(tourId))?.price || 0,
    total: parseFloat(total),
    personalInfo,
    status: "Chờ Xác Nhận"
  };
  orders.unshift(newOrder);
  localStorage.setItem('wil_orders', JSON.stringify(orders));
  syncWithBackend();
  return newOrder;
}

// ==========================================
// REVIEWS SYSTEM
// ==========================================
function getReviews(tourId) {
  const key = 'wil_reviews_' + tourId;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function addReview(tourId, reviewData) {
  const key = 'wil_reviews_' + tourId;
  const reviews = getReviews(tourId);
  const newReview = {
    id: Date.now(),
    ...reviewData,
    date: new Date().toLocaleDateString('vi-VN'),
    timestamp: Date.now()
  };
  reviews.unshift(newReview);
  localStorage.setItem(key, JSON.stringify(reviews));
  return newReview;
}

// ==========================================
// TOAST NOTIFICATION SYSTEM
// ==========================================
function showToast(message, type = 'success', duration = 3000) {
  // Remove existing toast
  const existing = document.getElementById('wil-toast');
  if (existing) existing.remove();

  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-yellow-500'
  };
  const icons = {
    success: 'fa-circle-check',
    error: 'fa-circle-xmark',
    info: 'fa-circle-info',
    warning: 'fa-triangle-exclamation'
  };

  const toast = document.createElement('div');
  toast.id = 'wil-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    min-width: 280px;
    max-width: 380px;
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  `;
  toast.innerHTML = `
    <div class="flex items-center gap-3 ${colors[type]} text-white px-5 py-4 rounded-2xl shadow-2xl">
      <i class="fa-solid ${icons[type]} text-xl flex-shrink-0"></i>
      <p class="text-sm font-medium flex-1">${message}</p>
      <button onclick="this.closest('#wil-toast').remove()" class="text-white/70 hover:text-white ml-2 text-lg leading-none">×</button>
    </div>
  `;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });
  });

  // Auto remove
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }
  }, duration);
}

// ==========================================
// DARK MODE SYSTEM
// ==========================================
function isDarkMode() {
  return localStorage.getItem('wil_dark_mode') === 'true';
}

function applyDarkMode(dark) {
  if (dark) {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark-mode');
    localStorage.setItem('wil_dark_mode', 'true');
  } else {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('wil_dark_mode', 'false');
  }
  
  // Update toggle button icon (desktop)
  const toggleBtn = document.getElementById('dark-mode-toggle');
  if (toggleBtn) {
    toggleBtn.innerHTML = dark
      ? '<i class="fa-solid fa-sun text-yellow-500"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }

  // Update toggle button icon (mobile)
  const mobileToggle = document.querySelector('.mobile-dark-toggle');
  if (mobileToggle) {
    mobileToggle.innerHTML = dark
      ? '<i class="fa-solid fa-sun mr-2 text-yellow-500"></i>Chế độ sáng'
      : '<i class="fa-solid fa-moon mr-2"></i>Chế độ tối';
  }
}

function toggleDarkMode() {
  applyDarkMode(!isDarkMode());
}

// 100 Tours Programmatic Generator & Huế specific tours
function generateMoreTours() {
  const destinations = [
    { name: "Huế", cat: ["Văn hóa", "Trong nước"], img: "images/tour-danang.jpg", desc: "Huế cổ kính kì vĩ với Kinh thành Đại Nội, lăng tẩm hoàng gia và dòng sông Hương thơ mộng.", detailLoc: "Thừa Thiên Huế" },
    { name: "Nha Trang", cat: ["Biển", "Trong nước"], img: "images/tour-nhatrang.jpg", desc: "Nha Trang thiên đường biển đảo, vịnh biển đẹp nhất thế giới, khu vui chơi giải trí VinWonders đỉnh cao.", detailLoc: "Khánh Hòa" },
    { name: "Đà Lạt", cat: ["Núi", "Trong nước"], img: "images/tour-dalat.jpg", desc: "Thành phố sương mù lãng mạn, thung lũng tình yêu rực rỡ và đồi thông lộng gió.", detailLoc: "Lâm Đồng" },
    { name: "Quy Nhơn", cat: ["Biển", "Trong nước"], img: "images/tour-phuquoc.jpg", desc: "Eo Gió kỳ vĩ, Kỳ Co cát trắng biển xanh ngọc bích hoang sơ tuyệt đẹp.", detailLoc: "Bình Định" },
    { name: "Côn Đảo", cat: ["Biển", "Trong nước"], img: "images/tour-phuquoc.jpg", desc: "Tham quan nhà tù Côn Đảo lịch sử linh thiêng, tắm biển Bãi Nhát cát mịn hoang sơ.", detailLoc: "Bà Rịa - Vũng Tàu" },
    { name: "Sapa", cat: ["Núi", "Trong nước"], img: "images/tour-sapa.jpg", desc: "Ruộng bậc thang vàng óng ả mùa lúa chín, bản làng sương khói mờ ảo.", detailLoc: "Lào Cai" },
    { name: "Hạ Long", cat: ["Biển", "Trong nước"], img: "images/tour-halong.jpg", desc: "Hàng ngàn đảo đá kỳ vĩ nhô lên giữa làn nước xanh lục bảo, du thuyền ngủ đêm 5 sao.", detailLoc: "Quảng Ninh" },
    { name: "Bangkok", cat: ["Văn hóa", "Quốc tế"], img: "images/tour-bali.jpg", desc: "Chùa vàng linh thiêng, thiên đường mua sắm sầm uất và ẩm thực đường phố đặc sắc.", detailLoc: "Thái Lan" },
    { name: "Bali", cat: ["Biển", "Quốc tế"], img: "images/tour-bali.jpg", desc: "Hòn đảo của các vị thần linh thiêng, biển xanh sóng vỗ rì rào và xích đu giữa rừng dừa.", detailLoc: "Indonesia" },
    { name: "Singapore", cat: ["Đô thị", "Quốc tế"], img: "images/tour-bali.jpg", desc: "Đô thị xanh thông minh hiện đại bậc nhất, đảo nhân tạo Sentosa kỳ thú.", detailLoc: "Singapore" },
    { name: "Tokyo", cat: ["Văn hóa", "Quốc tế"], img: "images/tour-japan.jpg", desc: "Sự kết hợp giữa cổ kính và hiện đại bậc nhất, ngắm núi Phú Sĩ tuyết phủ trắng xóa.", detailLoc: "Nhật Bản" },
    { name: "Paris", cat: ["Châu Âu", "Quốc tế", "Văn hóa"], img: "images/tour-japan.jpg", desc: "Kinh đô ánh sáng lãng mạn, tháp Eiffel kiêu hãnh và dòng sông Seine êm đềm.", detailLoc: "Pháp" },
    { name: "Seoul", cat: ["Châu Á", "Quốc tế"], img: "images/tour-japan.jpg", desc: "Khám phá cung điện Gyeongbokgung mùa lá đỏ, đảo Nami lãng mạn.", detailLoc: "Hàn Quốc" },
    { name: "Đài Bắc", cat: ["Châu Á", "Quốc tế"], img: "images/tour-bali.jpg", desc: "Tháp Taipei 101, thả đèn trời Thập Phần và làng cổ Cửu Phần.", detailLoc: "Đài Loan" },
    { name: "Sydney", cat: ["Châu Úc", "Quốc tế"], img: "images/tour-bali.jpg", desc: "Nhà hát con sò Opera House, ngắm cầu cảng Sydney vĩ đại.", detailLoc: "Úc" },
    { name: "Los Angeles", cat: ["Châu Mỹ", "Quốc tế"], img: "images/tour-japan.jpg", desc: "Khám phá Hollywood hoa lệ, phim trường Universal và đại lộ danh vọng.", detailLoc: "Mỹ" }
  ];

  const prefixes = [
    "Hành trình di sản", "Khám phá vẻ đẹp", "Nghỉ dưỡng Premium", "Trải nghiệm đặc biệt", "Khám phá kỳ quan", "Tour gia đình", "Du hí mùa hè"
  ];
  const badges = ["Bán chạy", "Mới", "Hot", "Ưu đãi", "Trọn gói", "Tiết kiệm", "Giá tốt"];
  
  let currentId = 13;
  
  // Huế Specific Tours
  const hueTours = [
    { name: "Hành trình di sản Huế cổ kính 3N2Đ", price: 3490000, duration: "3 ngày 2 đêm", badge: "Hot" },
    { name: "Nghỉ dưỡng Lăng Cô - Huế Premium 4N3Đ", price: 3490000, duration: "4 ngày 3 đêm", badge: "Trọn gói" },
    { name: "Tour Huế - Đà Nẵng - Hội An Di Sản Miền Trung 5N4Đ", price: 3490000, duration: "5 ngày 4 đêm", badge: "Bán chạy" },
    { name: "Khám phá ẩm thực & văn hóa cố đô Huế 2N1Đ", price: 3490000, duration: "2 ngày 1 đêm", badge: "Giá tốt" }
  ];

  hueTours.forEach(ht => {
    tours.push({
      id: currentId++,
      name: ht.name,
      location: "Huế",
      category: ["Văn hóa", "Trong nước"],
      price: ht.price,
      image: "images/tour-danang.jpg",
      rating: 4.8,
      reviews: Math.floor(Math.random() * 80) + 40,
      duration: ht.duration,
      badge: ht.badge,
      includes: [
      "Xe du lịch đưa đón đời mới khứ hồi từ Hà Nội",
      "Khách sạn tại phố cổ Hà Nội tiện nghi",
      "Vé thuyền đò Tràng An & vé xe điện chùa Bái Đính",
      "Bữa ăn đặc sản dê núi & cơm cháy Ninh Bình",
      "Bảo hiểm du lịch trọn gói suốt tuyến",
      "Nước suối & khăn lạnh phục vụ hàng ngày"
    ],
      notes: ["Trang phục lịch sự khi viếng lăng tẩm", "Mang theo ô/nón che nắng nhẹ", "Đăng ký trước tối thiểu 5 ngày"],
      itinerary: [
        { day: "Ngày 1", title: "Khám phá Đại Nội - Cung điện Huế", desc: "Tham quan Ngọ Môn, Điện Thái Hòa, Thế Miếu, Hiển Lâm Các. Trải nghiệm ca Huế trên sông Hương về đêm lung linh ánh đèn." },
        { day: "Ngày 2", title: "Lăng Minh Mạng - Lăng Khải Định - Chùa Thiên Mụ", desc: "Viếng lăng tẩm cổ kính với kiến trúc Á-Âu kết hợp tinh xảo. Chiều tham quan chùa Thiên Mụ linh thiêng nằm bên bờ sông Hương uốn lượn." },
        { day: "Ngày 3", title: "Chợ Đông Ba - Mua sắm đặc sản cố đô", desc: "Dạo chợ Đông Ba cổ kính, thưởng thức bún bò Huế, bánh bèo, nậm, lọc. Mua trà cung đình, nón bài thơ làm quà và kết thúc hành trình." }
      ]
    });
  });

  // Generate 96 more to reach 100 new tours
  for (let i = 0; i < 96; i++) {
    const dest = destinations[i % destinations.length];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const badge = badges[Math.floor(Math.random() * badges.length)];
    
    const isIntl = dest.cat.includes("Quốc tế");
    const numDays = Math.floor(Math.random() * 3) + 3;
    const duration = `${numDays} ngày ${numDays - 1} đêm`;
    const name = `${prefix} ${dest.name} - ${duration} (${badge})`;
    
    let price = 1500000 + (Math.floor(Math.random() * 20) * 100000);
    if (isIntl) {
      price = 9900000 + (Math.floor(Math.random() * 30) * 500000);
    }
    
    const itinerary = [];
    for (let d = 1; d <= numDays; d++) {
      if (d === 1) {
        itinerary.push({ day: `Ngày 1`, title: `Chào đón du khách & Nhận phòng`, desc: `Xe và HDV đón khách tại điểm hẹn hoặc sân bay, di chuyển đến khách sạn nhận phòng nghỉ ngơi. Buổi tối tự do khám phá ẩm thực địa phương.` });
      } else if (d === numDays) {
        itinerary.push({ day: `Ngày ${d}`, title: `Mua sắm đặc sản & Kết thúc`, desc: `Tự do mua sắm tại chợ truyền thống hoặc trung tâm thương mại. Xe tiễn khách ra sân bay/điểm đón ban đầu, chào tạm biệt.` });
      } else {
        itinerary.push({ day: `Ngày ${d}`, title: `Khám phá các địa danh nổi tiếng`, desc: `Tham quan trọn vẹn danh lam thắng cảnh xung quanh khu vực ${dest.name}, tham gia các hoạt động thú vị ngoài trời và thưởng thức buffet đặc sản.` });
      }
    }

    tours.push({
      id: currentId++,
      name,
      location: dest.name,
      category: dest.cat,
      price,
      image: dest.img,
      rating: parseFloat((4.3 + Math.random() * 0.7).toFixed(1)),
      reviews: Math.floor(Math.random() * 250) + 10,
      duration,
      badge,
      includes: [
      "Xe du lịch đưa đón đời mới khứ hồi từ Hà Nội",
      "Khách sạn tại phố cổ Hà Nội tiện nghi",
      "Vé thuyền đò Tràng An & vé xe điện chùa Bái Đính",
      "Bữa ăn đặc sản dê núi & cơm cháy Ninh Bình",
      "Bảo hiểm du lịch trọn gói suốt tuyến",
      "Nước suối & khăn lạnh phục vụ hàng ngày"
    ],
      notes: ["Mang theo trang phục phù hợp thời tiết", "Chú ý lịch khởi hành và thời gian tập trung", "Trẻ em nhận ưu đãi giá theo chiều cao"],
      itinerary
    });
  }
}



// Generate 100 tours on script load
generateMoreTours();


function toggleDarkMode() {
  applyDarkMode(!isDarkMode());
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  btn.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 24px;
    z-index: 999;
    width: 48px;
    height: 48px;
    background: #16a34a;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(22,163,74,0.4);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
  `;
  btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
    } else {
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(20px)';
    }
  });
}

// ==========================================
// FLOATING HOTLINE BUTTON
// ==========================================
function initFloatingHotline() {
  const hotline = document.createElement('div');
  hotline.id = 'floating-hotline';
  hotline.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 24px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  `;
  hotline.innerHTML = `
    <div id="hotline-popup" style="display:none; background:white; border-radius:16px; padding:12px 16px; box-shadow:0 8px 32px rgba(0,0,0,0.15); min-width:200px; margin-bottom:8px;">
      <p style="font-weight:700; color:#1f2937; margin:0 0 6px 0; font-size:14px;">📞 Liên hệ WILTravel</p>
      <a href="tel:0905025737" style="color:#16a34a; font-weight:600; font-size:15px; text-decoration:none; display:block;">0905 025 737</a>
      <p style="color:#6b7280; font-size:12px; margin:4px 0 0 0;">Hỗ trợ 24/7</p>
    </div>
    <button onclick="toggleHotlinePopup()" style="
      width:56px; height:56px;
      background: linear-gradient(135deg, #16a34a, #059669);
      border:none; border-radius:50%; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 4px 20px rgba(22,163,74,0.5);
      animation: pulse-green 2s infinite;
      font-size:22px; color:white;
    " title="Liên hệ hotline">
      <i class="fa-solid fa-phone-volume"></i>
    </button>
    <style>
      @keyframes pulse-green {
        0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.5); }
        70% { box-shadow: 0 0 0 16px rgba(22, 163, 74, 0); }
        100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
      }
    </style>
  `;
  document.body.appendChild(hotline);
}

window.toggleHotlinePopup = function() {
  const popup = document.getElementById('hotline-popup');
  if (popup) {
    popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
  }
};

// ==========================================
// 3. AUTO NAVBAR & BADGES SYNC ON PAGE LOAD
// ==========================================
function updateNavbar() {
  // 1. Sync Cart Badges
  const cartLinks = document.querySelectorAll('a[href="cart.html"]');
  cartLinks.forEach(link => {
    let badge = link.querySelector('.cart-badge');
    if (!badge) {
      link.classList.add('relative');
      badge = document.createElement('span');
      badge.className = 'cart-badge absolute -top-1 -right-1 bg-green-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold';
      link.appendChild(badge);
    }
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });

  const toursPageBadge = document.getElementById('cart-count');
  if (toursPageBadge) {
    toursPageBadge.textContent = getCartCount();
  }

  // 2. Sync Wishlist Badges
  const wishlistLinks = document.querySelectorAll('a[href="wishlist.html"]');
  wishlistLinks.forEach(link => {
    let badge = link.querySelector('.wishlist-badge');
    if (!badge) {
      link.classList.add('relative');
      badge = document.createElement('span');
      badge.className = 'wishlist-badge absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold';
      link.appendChild(badge);
    }
    const count = getWishlistCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });

  // 3. Update User Auth buttons
  const currentUser = getCurrentUser();
  const loginBtns = document.querySelectorAll('a[href="login.html"]');
  const registerBtns = document.querySelectorAll('a[href="register.html"]');

  if (currentUser && loginBtns.length > 0) {
    loginBtns.forEach(btn => btn.style.display = 'none');
    registerBtns.forEach(btn => btn.style.display = 'none');
    
    const desktopLoginBtn = loginBtns[0];
    if (desktopLoginBtn) {
      const parent = desktopLoginBtn.parentElement;
      if (parent) {
        let userWidget = parent.querySelector('.user-nav-widget');
        if (!userWidget) {
          userWidget = document.createElement('div');
          userWidget.className = 'user-nav-widget flex items-center gap-3';
          userWidget.innerHTML = `
            <a href="profile.html" class="flex items-center gap-1.5 text-gray-700 hover:text-green-600 transition font-medium">
              <i class="fa-solid fa-circle-user text-xl text-green-600"></i>
              <span class="hidden sm:inline text-sm">${currentUser.lastName || 'Tài khoản'}</span>
            </a>
            <button onclick="appLogout()" class="px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition">Đăng xuất</button>
          `;
          parent.appendChild(userWidget);
        } else {
          const nameSpan = userWidget.querySelector('span');
          if (nameSpan) nameSpan.textContent = currentUser.lastName;
        }
      }
    }
  } else if (!currentUser && loginBtns.length > 0) {
    loginBtns.forEach(btn => btn.style.display = '');
    registerBtns.forEach(btn => btn.style.display = '');
    
    const desktopLoginBtn = loginBtns[0];
    if (desktopLoginBtn) {
      const parent = desktopLoginBtn.parentElement;
      if (parent) {
        const widget = parent.querySelector('.user-nav-widget');
        if (widget) widget.remove();
      }
    }
  }

  // 4. Inject Desktop Currency & Dark Mode Toggle Buttons dynamically next to Cart
  const firstCartLink = document.querySelector('a[href="cart.html"]');
  if (firstCartLink && firstCartLink.parentElement) {
    const parent = firstCartLink.parentElement;
    
    // Inject Currency Switcher
    let currBtn = parent.querySelector('#currency-toggle');
    if (!currBtn) {
      currBtn = document.createElement('button');
      currBtn.id = 'currency-toggle';
      currBtn.onclick = () => { if (typeof toggleGlobalCurrency === "function") toggleGlobalCurrency(); else if (typeof window.toggleGlobalCurrency === "function") window.toggleGlobalCurrency(); };
      currBtn.className = 'text-xs font-bold text-gray-700 dark:text-slate-200 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition px-2.5 py-1.5 rounded-full border border-gray-200 dark:border-white/10 flex items-center gap-1 cursor-pointer';
      currBtn.title = 'Chuyển đổi tiền tệ hiển thị (VND / USD / EUR)';
      parent.insertBefore(currBtn, firstCartLink);
    }
    const currentCurrency = localStorage.getItem('currency') || 'VND';
    currBtn.innerHTML = `<i class="fa-solid fa-coins text-amber-500"></i> <span>${currentCurrency}</span>`;

    // Inject Dark Mode Toggle
    let toggleBtn = parent.querySelector('#dark-mode-toggle');
    if (!toggleBtn) {
      toggleBtn = document.createElement('button');
      toggleBtn.id = 'dark-mode-toggle';
      toggleBtn.onclick = () => { toggleDarkMode(); };
      toggleBtn.className = 'text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition text-lg p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center cursor-pointer';
      toggleBtn.title = 'Chuyển chế độ tối/sáng';
      parent.insertBefore(toggleBtn, firstCartLink);
    }
    // Update button icon state
    toggleBtn.innerHTML = isDarkMode()
      ? '<i class="fa-solid fa-sun text-yellow-500"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }

  // 5. Inject Mobile Dark Mode Toggle Button dynamically in mobile menu
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    const innerContainer = mobileMenu.querySelector('div') || mobileMenu;
    let mobileToggle = innerContainer.querySelector('.mobile-dark-toggle');
    if (!mobileToggle) {
      mobileToggle = document.createElement('a');
      mobileToggle.className = 'mobile-dark-toggle hover:text-green-600 transition flex items-center gap-2 cursor-pointer pt-2 border-t border-gray-150';
      mobileToggle.onclick = () => { toggleDarkMode(); };
      innerContainer.appendChild(mobileToggle);
    }
    // Update mobile toggle label state
    mobileToggle.innerHTML = isDarkMode()
      ? '<i class="fa-solid fa-sun mr-2 text-yellow-500"></i>Chế độ sáng'
      : '<i class="fa-solid fa-moon mr-2"></i>Chế độ tối';
  }
}

// ==========================================
// AI CHATBOT TINA SYSTEM
// ==========================================
function initChatbotTina() {
  // Prevent duplicate initialization
  if (document.getElementById('chatbot-tina')) return;

  // Insert Chatbot Styles
  const style = document.createElement('style');
  style.innerHTML = `
    #chatbot-window {
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      transform: translateY(20px) scale(0.95);
      opacity: 0;
      pointer-events: none;
    }
    #chatbot-window.active {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: auto;
    }
    .chat-bubble-tina {
      border-radius: 18px 18px 18px 4px;
    }
    .chat-bubble-user {
      background: linear-gradient(135deg, #16a34a, #059669);
      color: white;
      border-radius: 18px 18px 4px 18px;
    }
    .chat-quick-reply {
      transition: all 0.2s ease;
    }
    .chat-quick-reply:hover {
      background-color: #f0fdf4;
      border-color: #16a34a;
      color: #15803d;
      transform: translateY(-2px);
    }
    @keyframes pulse-chat {
      0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.6); }
      70% { box-shadow: 0 0 0 12px rgba(22, 163, 74, 0); }
      100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
    }
    .btn-pulse-chat {
      animation: pulse-chat 2s infinite;
    }
  `;
  document.head.appendChild(style);

  // Create Chatbot Elements
  const chatbot = document.createElement('div');
  chatbot.id = 'chatbot-tina';
  chatbot.className = 'fixed bottom-6 right-6 z-[999] flex flex-col items-end font-sans';
  chatbot.innerHTML = `
    <!-- Chatbot Window -->
    <div id="chatbot-window" class="w-[calc(100vw-48px)] sm:w-[380px] h-[500px] max-h-[70vh] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 flex flex-col mb-4 transition-colors duration-300">
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 to-emerald-700 p-4 text-white flex items-center justify-between shadow-sm shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 text-xl font-bold relative">
            T
            <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-green-600 rounded-full"></span>
          </div>
          <div>
            <h4 class="font-bold text-sm text-white">Trợ lý ảo Tina</h4>
            <p class="text-[11px] text-green-100 flex items-center gap-1"><i class="fa-solid fa-circle text-[6px] text-emerald-400 animate-pulse"></i> Sẵn sàng hỗ trợ 24/7</p>
          </div>
        </div>
        <button onclick="toggleTinaChat()" class="text-white/80 hover:text-white text-2xl px-2">×</button>
      </div>

      <!-- Messages Body -->
      <div id="chat-messages" class="flex-grow p-4 overflow-y-auto space-y-3 bg-gray-50/50 dark:bg-slate-950/40 text-sm">
        <!-- Welcome Message -->
        <div class="flex gap-2 items-start">
          <div class="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">T</div>
          <div class="p-3 chat-bubble-tina bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200 max-w-[80%] leading-relaxed shadow-sm">
            Xin chào! Mình là <strong>Tina</strong> - trợ lý ảo của WILTravel. Mình có thể giúp gì cho bạn hôm nay? 😊
          </div>
        </div>
      </div>

      <!-- Quick Replies -->
      <div class="px-4 py-2 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-white/10 flex flex-wrap gap-1.5 shrink-0">
        <button onclick="askTina('Tư vấn Tour du lịch')" class="chat-quick-reply px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-xs text-gray-600 dark:text-slate-300 font-medium bg-white dark:bg-slate-800">🗺️ Tư vấn Tour</button>
        <button onclick="askTina('Mã giảm giá')" class="chat-quick-reply px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-xs text-gray-600 dark:text-slate-300 font-medium bg-white dark:bg-slate-800">💵 Mã giảm giá</button>
        <button onclick="askTina('Tra cứu đặt chỗ')" class="chat-quick-reply px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-xs text-gray-600 dark:text-slate-300 font-medium bg-white dark:bg-slate-800">🔍 Tra cứu vé</button>
        <button onclick="askTina('Gọi hỗ trợ Ms. Phương')" class="chat-quick-reply px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-xs text-gray-600 dark:text-slate-300 font-medium bg-white dark:bg-slate-800">📞 Gọi Ms. Phương</button>
      </div>

      <!-- Input Form -->
      <form onsubmit="handleTinaSubmit(event)" class="p-3 bg-white dark:bg-slate-900 border-t border-gray-150 dark:border-white/10 flex gap-2 shrink-0 items-center">
        <input type="text" id="tina-input" placeholder="Nhập câu hỏi của bạn..." class="flex-1 px-4 py-2.5 text-sm border border-gray-300 dark:border-white/10 rounded-2xl focus:outline-none focus:border-green-500 bg-gray-50/50 dark:bg-slate-800 text-gray-800 dark:text-slate-100">
        <button type="button" id="tina-mic-btn" onclick="toggleTinaSpeechRecognition()" class="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 w-10 h-10 rounded-2xl flex items-center justify-center transition shrink-0 cursor-pointer" title="Nói câu hỏi của bạn">
          <i class="fa-solid fa-microphone text-lg"></i>
        </button>
        <button type="submit" class="bg-green-600 hover:bg-green-700 text-white w-10 h-10 rounded-2xl flex items-center justify-center transition shadow-md shadow-green-600/10 shrink-0 cursor-pointer">
          <i class="fa-solid fa-paper-plane text-sm"></i>
        </button>
      </form>
    </div>

    <!-- Toggle Button (FAB) -->
    <button onclick="toggleTinaChat()" class="btn-pulse-chat bg-gradient-to-r from-green-600 to-emerald-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition cursor-pointer text-2xl relative" title="Trợ lý ảo Tina">
      <i class="fa-solid fa-comment-dots"></i>
    </button>
  `;
  document.body.appendChild(chatbot);

  // Push back-to-top button up so it doesn't overlap
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.style.bottom = '95px';
  }
}

// Global functions for Tina Chatbot
window.toggleTinaChat = function() {
  const win = document.getElementById('chatbot-window');
  if (win) {
    win.classList.toggle('active');
    if (win.classList.contains('active')) {
      document.getElementById('tina-input').focus();
    }
  }
};

function showTinaTyping() {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  if (document.getElementById('tina-typing')) return;

  const typingHtml = `
    <div id="tina-typing" class="flex gap-2 items-start">
      <div class="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">T</div>
      <div class="p-3 chat-bubble-tina max-w-[80%] shadow-sm flex items-center gap-1.5 bg-gray-150">
        <span class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
        <span class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
        <span class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.3s"></span>
      </div>
    </div>`;
  container.insertAdjacentHTML('beforeend', typingHtml);
  container.scrollTop = container.scrollHeight;
}

function hideTinaTyping() {
  const el = document.getElementById('tina-typing');
  if (el) el.remove();
}

// Chat history to maintain conversation context for the AI
let tinaChatHistory = [];

window.askTina = async function(text) {
  addMessage(text, 'user');
  tinaChatHistory.push({ sender: 'user', text });
  
  showTinaTyping();
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: tinaChatHistory.slice(-6, -1) }) // send last 5 messages for context
    });
    const data = await res.json();
    hideTinaTyping();
    if (data.success && data.reply) {
      addMessage(data.reply, 'tina');
      tinaChatHistory.push({ sender: 'tina', text: data.reply });
    } else {
      // Fallback to local rule-based engine
      const response = getTinaResponse(text);
      addMessage(response, 'tina');
      tinaChatHistory.push({ sender: 'tina', text: response });
    }
  } catch (err) {
    console.warn('Chat API error, falling back to local database:', err);
    hideTinaTyping();
    const response = getTinaResponse(text);
    addMessage(response, 'tina');
    tinaChatHistory.push({ sender: 'tina', text: response });
  }
};

window.handleTinaSubmit = async function(e) {
  e.preventDefault();
  const input = document.getElementById('tina-input');
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  tinaChatHistory.push({ sender: 'user', text });
  input.value = '';

  showTinaTyping();
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: tinaChatHistory.slice(-6, -1) })
    });
    const data = await res.json();
    hideTinaTyping();
    if (data.success && data.reply) {
      addMessage(data.reply, 'tina');
      tinaChatHistory.push({ sender: 'tina', text: data.reply });
    } else {
      // Fallback
      const response = getTinaResponse(text);
      addMessage(response, 'tina');
      tinaChatHistory.push({ sender: 'tina', text: response });
    }
  } catch (err) {
    console.warn('Chat API error, falling back to local database:', err);
    hideTinaTyping();
    const response = getTinaResponse(text);
    addMessage(response, 'tina');
    tinaChatHistory.push({ sender: 'tina', text: response });
  }
};

function addMessage(text, sender) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const isTina = sender === 'tina';
  const msgHtml = isTina 
    ? `<div class="flex gap-2 items-start group">
         <div class="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">T</div>
         <div class="p-3 chat-bubble-tina bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200 max-w-[70%] leading-relaxed shadow-sm rounded-2xl rounded-tl-none relative">${text}</div>
         <button onclick="speakTinaText(this)" class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 p-1.5 transition self-center cursor-pointer" title="Đọc thành tiếng">
           <i class="fa-solid fa-volume-high text-xs"></i>
         </button>
       </div>`
    : `<div class="flex justify-end">
         <div class="p-3 chat-bubble-user bg-gradient-to-r from-green-600 to-emerald-600 text-white max-w-[80%] leading-relaxed shadow-sm rounded-2xl rounded-tr-none">${text}</div>
       </div>`;

  container.insertAdjacentHTML('beforeend', msgHtml);
  container.scrollTop = container.scrollHeight;
}

window.speakTinaText = function(btn) {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    document.querySelectorAll('.fa-volume-xmark').forEach(i => {
      i.className = 'fa-solid fa-volume-high text-xs';
    });
    return;
  }
  
  const bubble = btn.parentElement.querySelector('.chat-bubble-tina');
  if (!bubble) return;
  
  const cleanText = bubble.innerText || bubble.textContent;
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'vi-VN';
  
  const voices = window.speechSynthesis.getVoices();
  const viVoice = voices.find(voice => voice.lang.includes('vi') || voice.lang.includes('VI'));
  if (viVoice) utterance.voice = viVoice;
  
  const icon = btn.querySelector('i');
  icon.className = 'fa-solid fa-volume-xmark text-xs text-red-500 animate-pulse';
  
  utterance.onend = () => {
    icon.className = 'fa-solid fa-volume-high text-xs';
  };
  utterance.onerror = () => {
    icon.className = 'fa-solid fa-volume-high text-xs';
  };
  
  window.speechSynthesis.speak(utterance);
};

let tinaSpeechRecognition = null;
let isTinaRecognizing = false;

window.toggleTinaSpeechRecognition = function() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói (STT). Hãy thử dùng trình duyệt Chrome nhé!');
    return;
  }
  
  const micBtn = document.getElementById('tina-mic-btn');
  const micIcon = micBtn.querySelector('i');
  
  if (isTinaRecognizing) {
    if (tinaSpeechRecognition) tinaSpeechRecognition.stop();
    return;
  }
  
  tinaSpeechRecognition = new SpeechRecognition();
  tinaSpeechRecognition.lang = 'vi-VN';
  tinaSpeechRecognition.interimResults = false;
  tinaSpeechRecognition.maxAlternatives = 1;
  
  tinaSpeechRecognition.onstart = () => {
    isTinaRecognizing = true;
    micIcon.className = 'fa-solid fa-microphone text-lg text-red-500 animate-pulse';
    micBtn.title = 'Đang lắng nghe... Nhấp để dừng';
    document.getElementById('tina-input').placeholder = 'Đang lắng nghe giọng nói...';
  };
  
  tinaSpeechRecognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    document.getElementById('tina-input').value = speechResult;
  };
  
  tinaSpeechRecognition.onend = () => {
    isTinaRecognizing = false;
    micIcon.className = 'fa-solid fa-microphone text-lg';
    micBtn.title = 'Nói câu hỏi của bạn';
    document.getElementById('tina-input').placeholder = 'Nhập câu hỏi của bạn...';
  };
  
  tinaSpeechRecognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
    isTinaRecognizing = false;
    micIcon.className = 'fa-solid fa-microphone text-lg';
    document.getElementById('tina-input').placeholder = 'Nhập câu hỏi của bạn...';
  };
  
  tinaSpeechRecognition.start();
};

// Intelligent response matching engine
function getTinaResponse(userInput) {
  const query = userInput.toLowerCase().trim();

  // 0. Language Detection
  let lang = 'vi';
  
  if (/[\u4e00-\u9fa5]/.test(userInput)) {
    lang = 'zh';
  } else if (/\b(hello|hi|tour|travel|book|cheap|price|beach|mountain|flight|cancel|refund|how|what|where)\b/i.test(query)) {
    if (!query.includes('đi') && !query.includes('giá') && !query.includes('biển') && !query.includes('mua') && !query.includes('tư vấn')) {
      lang = 'en';
    }
  }

  if (lang === 'en') return getTinaResponseEN(query);
  if (lang === 'zh') return getTinaResponseZH(query);

  // 1. Simulated Booking / Order Lookup
  if (query.includes('tra cứu') || query.includes('đơn hàng') || query.includes('mã đặt') || query.includes('booking') || query.includes('kiểm tra vé') || query.includes('mã vé')) {
    const codeMatch = query.match(/(?:wil|code|order|mã|vé)?\s*[-:#]?\s*(\d{3,6})/i);
    if (!codeMatch) {
      return `🔍 <strong>Hệ thống Tra cứu đặt chỗ của WILTravel:</strong><br>
        Để kiểm tra trạng thái vé và lịch trình bay/tour, bạn vui lòng nhập mã đơn hàng của mình.<br>
        👉 Ví dụ: Nhập <strong>"WIL-101"</strong> hoặc <strong>"vé 105"</strong>.`;
    }
    
    const codeNum = parseInt(codeMatch[1]);
    const mockTours = [
      { name: "Phú Quốc 4N3Đ All Inclusive", price: "3.29tr VNĐ", duration: "4 ngày 3 đêm" },
      { name: "Sapa - Hà Giang 5N4Đ", price: "4.19tr VNĐ", duration: "5 ngày 4 đêm" },
      { name: "Bali Thiên Đường 6N5Đ", price: "18.50tr VNĐ", duration: "6 ngày 5 đêm" },
      { name: "Vịnh Hạ Long - Lan Hạ 4N3Đ", price: "5.69tr VNĐ", duration: "4 ngày 3 đêm" },
      { name: "Đà Nẵng - Hội An 4N3Đ", price: "3.89tr VNĐ", duration: "4 ngày 3 đêm" },
      { name: "Nhật Bản Mùa Hoa Anh Đào", price: "32.90tr VNĐ", duration: "6 ngày 5 đêm" },
      { name: "Đà Lạt Lãng Mạn 3N2Đ", price: "2.49tr VNĐ", duration: "3 ngày 2 đêm" },
      { name: "Nha Trang - Ninh Hòa 3N2Đ", price: "2.89tr VNĐ", duration: "3 ngày 2 đêm" },
      { name: "Singapore - Malaysia 5N4Đ", price: "10.99tr VNĐ", duration: "5 ngày 4 đêm" },
      { name: "Thái Lan - Bangkok - Pattaya 5N4Đ", price: "6.49tr VNĐ", duration: "5 ngày 4 đêm" }
    ];
    
    const selectedTour = mockTours[codeNum % mockTours.length];
    
    return `🎟️ <strong>Thông tin Vé điện tử & Lịch trình (Mã: WIL-${codeNum}):</strong><br>
      <div class="bg-white dark:bg-slate-800 p-3 rounded-xl border border-gray-150 dark:border-white/10 shadow-xs mt-2 space-y-1 text-xs text-gray-700 dark:text-slate-300">
        <p><strong>Khách hàng:</strong> Nguyễn Văn Hùng</p>
        <p><strong>Dịch vụ:</strong> ${selectedTour.name}</p>
        <p><strong>Thời gian:</strong> ${selectedTour.duration}</p>
        <p><strong>Ngày khởi hành:</strong> 18/07/2026</p>
        <p><strong>Giá tiền:</strong> ${selectedTour.price}</p>
        <p><strong>Trạng thái:</strong> <span class="px-1.5 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded font-semibold">🟢 Đã xác nhận & Thanh toán</span></p>
      </div>
      <p class="mt-2 text-xs">🚗 <strong>Đón khách:</strong> Xe đón bạn lúc 04:30 sáng tại Văn phòng WILTravel (Quận Tân Bình). Hướng dẫn viên: <strong>Mr. Nam (0912 345 678)</strong> sẽ liên hệ bạn trước ngày đi.</p>`;
  }

  // 2. Weather & Packing Advice
  if (query.includes('chuần bị') || query.includes('chuẩn bị') || query.includes('mang theo') || query.includes('đồ dùng') || query.includes('thời tiết') || query.includes('mặc gì') || query.includes('packing')) {
    const isMountain = query.includes('sapa') || query.includes('giang') || query.includes('lạt') || query.includes('núi');
    const isBeach = query.includes('phú quốc') || query.includes('trang') || query.includes('bali') || query.includes('hạ long') || query.includes('biển');
    
    if (isMountain) {
      return `🏔️ <strong>Tư vấn chuẩn bị đi Tour vùng cao (Sapa, Hà Giang, Đà Lạt):</strong><br>
        - <strong>Thời tiết:</strong> Sẽ khá lạnh về đêm và sáng sớm (12-18°C), ban ngày mát mẻ.<br>
        - <strong>Trang phục cần đem:</strong> Áo khoác ấm, khăn choàng cổ, giày đi bộ chống trơn trượt (vì có trekking bản cát cát, đèo dốc).<br>
        - <strong>Đồ cá nhân:</strong> Thuốc chống say xe (đường đèo dốc), kem chống muỗi, sạc dự phòng.<br>
        👉 <button onclick="askTina('Tư vấn đi Sapa')" class="mt-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400 border border-green-200 dark:border-white/10 hover:bg-green-100 transition mr-2">Tour Sapa</button>
        <button onclick="askTina('Tư vấn đi Đà Lạt')" class="mt-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400 border border-green-200 dark:border-white/10 hover:bg-green-100 transition">Tour Đà Lạt</button>`;
    }
    
    if (isBeach) {
      return `🏖️ <strong>Tư vấn chuẩn bị đi Tour biển (Phú Quốc, Nha Trang, Bali, Hạ Long):</strong><br>
        - <strong>Thời tiết:</strong> Nắng đẹp, nhiệt độ dao động 28-34°C, thích hợp tắm biển.<br>
        - <strong>Đồ dùng cần đem:</strong> Kem chống nắng SPF 50+, kính râm, đồ bơi, túi chống nước cho điện thoại.<br>
        - <strong>Trang phục phù hợp:</strong> Quần áo mỏng nhẹ, dép lê đi biển, mũ rộng vành.<br>
        👉 <button onclick="askTina('Tư vấn đi Phú Quốc')" class="mt-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400 border border-green-200 dark:border-white/10 hover:bg-green-100 transition mr-2">Tour Phú Quốc</button>
        <button onclick="askTina('Tư vấn đi Nha Trang')" class="mt-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400 border border-green-200 dark:border-white/10 hover:bg-green-100 transition">Tour Nha Trang</button>`;
    }
    
    return `🎒 <strong>Tư vấn chuẩn bị hành lý của Tina:</strong><br>
      Tùy vào điểm đến của bạn là biển đảo mát mẻ hay vùng cao lộng gió, bạn chọn xem cẩm nang chuẩn bị bên dưới nhé:<br>
      👉 <button onclick="askTina('chuẩn bị đi biển')" class="mt-2 px-3 py-1 bg-green-50 dark:bg-slate-800 hover:bg-green-100 text-green-700 dark:text-green-400 text-xs font-semibold rounded-lg border border-green-200 dark:border-white/10 transition mr-2">🏖️ Chuẩn bị đi Biển</button>
      <button onclick="askTina('chuẩn bị đi núi')" class="mt-2 px-3 py-1 bg-green-50 dark:bg-slate-800 hover:bg-green-100 text-green-700 dark:text-green-400 text-xs font-semibold rounded-lg border border-green-200 dark:border-white/10 transition">🏔️ Chuẩn bị đi Núi</button>`;
  }

  // 3. Specific Tour/Location Information Inquiries
  if (query.includes('phú quốc')) {
    if (query.includes('chi tiết') || query.includes('lịch trình')) {
      return `📋 <strong>Lịch trình Tour Phú Quốc 4N3Đ All Inclusive:</strong><br>
        - <strong>Ngày 1:</strong> Bay đến Phú Quốc, nhận phòng resort, tự do khám phá chợ đêm Dương Đông.<br>
        - <strong>Ngày 2:</strong> Đi cano câu cá, lặn ngắm san hô tại hòn Móng Tay, hòn Gầm Ghì, ăn trưa hải sản.<br>
        - <strong>Ngày 3:</strong> Vui chơi giải trí VinWonders, trải nghiệm cáp treo Hòn Thơm dài nhất thế giới, tối ngắm Grand World.<br>
        - <strong>Ngày 4:</strong> Check-in mua đặc sản (tiêu, ngọc trai), bay về lại TP.HCM.<br>
        👉 <a href="tour-detail.html?id=1" class="text-green-600 font-bold hover:underline">Nhấp vào đây để đặt ngay!</a>`;
    }
    return `🌊 <strong>Tour Phú Quốc - Đảo Ngọc Thiên Đường:</strong><br>
      Khám phá Đảo Ngọc với cáp treo Hòn Thơm dài nhất thế giới, Bãi Sao tuyệt đẹp, VinWonders & Grand World sầm uất.<br>
      👉 <strong>Giá vé cực tốt:</strong> Chỉ từ <strong>3.29tr VNĐ</strong> trọn gói 4N3Đ.<br>
      👉 <button onclick="askTina('Lịch trình chi tiết Phú Quốc')" class="mt-2 px-2.5 py-1 text-xs font-semibold rounded bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400 border border-green-200 dark:border-white/10 hover:bg-green-100 transition">🔍 Xem lịch trình chi tiết Phú Quốc</button>`;
  }

  if (query.includes('sapa') || query.includes('hà giang')) {
    if (query.includes('chi tiết') || query.includes('lịch trình')) {
      return `📋 <strong>Lịch trình Tour Sapa - Hà Giang 5N4Đ:</strong><br>
        - <strong>Ngày 1:</strong> Xe giường nằm đón lên Sapa, khám phá thị trấn sương mù về đêm.<br>
        - <strong>Ngày 2:</strong> Chinh phục Fansipan - Nóc nhà Đông Dương, chiều thăm bản Cát Cát của người H'Mông.<br>
        - <strong>Ngày 3:</strong> Sapa đi Hà Giang, thăm Cột cờ Lũng Cú cực Bắc Tổ Quốc, cao nguyên đá Đồng Văn.<br>
        - <strong>Ngày 4:</strong> Check-in Đèo Mã Pí Lèng hùng vĩ, chèo thuyền ngắm sông Nho Quế màu xanh ngọc bích.<br>
        - <strong>Ngày 5:</strong> Trở về Hà Nội, dạo phố cổ ăn bún chả, bay về lại TP.HCM.<br>
        👉 <a href="tour-detail.html?id=2" class="text-green-600 font-bold hover:underline">Nhấp vào đây để đặt ngay!</a>`;
    }
    return `🏔️ <strong>Tour Sapa - Hà Giang hùng vĩ:</strong><br>
      Trải nghiệm Fansipan tuyết trắng, ngắm Mã Pí Lèng hùng vĩ, du thuyền sông Nho Quế nước xanh ngọc.<br>
      👉 <strong>Giá tốt:</strong> Chỉ từ <strong>4.19tr VNĐ</strong> cho hành trình 5N4Đ.<br>
      👉 <button onclick="askTina('Lịch trình chi tiết Sapa')" class="mt-2 px-2.5 py-1 text-xs font-semibold rounded bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400 border border-green-200 dark:border-white/10 hover:bg-green-100 transition">🔍 Xem lịch trình chi tiết Sapa</button>`;
  }

  if (query.includes('bali')) {
    if (query.includes('chi tiết') || query.includes('lịch trình')) {
      return `📋 <strong>Lịch trình Tour Bali Thiên Đường 6N5Đ:</strong><br>
        - <strong>Ngày 1:</strong> Bay thẳng đến Bali, nhận phòng khách sạn, tắm biển Kuta ngắm hoàng hôn.<br>
        - <strong>Ngày 2:</strong> Đi Ubud, chơi xích đu Bali Swing, tham quan ruộng bậc thang Tegalalang.<br>
        - <strong>Ngày 3:</strong> Khám phá đền cổ Tanah Lot trên biển, đền Uluwatu, tối xem múa Kecak.<br>
        - <strong>Ngày 4:</strong> Check-in Cổng Trời Lempuyang, ngắm núi lửa Agung, tắm suối khoáng nóng Batur.<br>
        - <strong>Ngày 5:</strong> Tắm biển Nusa Dua cát trắng, mua sắm đặc sản thủ công mỹ nghệ Bali.<br>
        - <strong>Ngày 6:</strong> Ăn buffet chia tay, bay về Việt Nam.<br>
        👉 <a href="tour-detail.html?id=3" class="text-green-600 font-bold hover:underline">Nhấp vào đây để đặt ngay!</a>`;
    }
    return `🏝️ <strong>Tour Bali - Thiên Đường Nghỉ Dưỡng:</strong><br>
      Check-in cổng trời Lempuyang linh thiêng, ruộng bậc thang Tegalalang, đền Tanah Lot hoang sơ.<br>
      👉 <strong>Giá siêu tốt:</strong> Chỉ từ <strong>18.50tr VNĐ</strong> 6N5Đ (đã bao gồm vé máy bay khứ hồi & khách sạn 4 sao).<br>
      👉 <button onclick="askTina('Lịch trình chi tiết Bali')" class="mt-2 px-2.5 py-1 text-xs font-semibold rounded bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400 border border-green-200 dark:border-white/10 hover:bg-green-100 transition">🔍 Xem lịch trình chi tiết Bali</button>`;
  }

  if (query.includes('hạ long') || query.includes('lan hạ')) {
    if (query.includes('chi tiết') || query.includes('lịch trình')) {
      return `📋 <strong>Lịch trình Tour Hạ Long - Lan Hạ 4N3Đ:</strong><br>
        - <strong>Ngày 1:</strong> Xe đưa từ Hà Nội ra Hạ Long. Nhận cabin du thuyền 5 sao sang trọng, chèo kayak thăm hang động.<br>
        - <strong>Ngày 2:</strong> Leo núi đảo Ti Tốp ngắm toàn cảnh Vịnh, di chuyển sang vịnh Lan Hạ hoang sơ tắm biển.<br>
        - <strong>Ngày 3:</strong> Về khách sạn Tuần Châu nghỉ ngơi, tham quan làng chài nổi Bái Tử Long.<br>
        - <strong>Ngày 4:</strong> Khám phá động Thiên Cung, mua chả mực Hạ Long thơm ngon. Về Hà Nội.<br>
        👉 <a href="tour-detail.html?id=4" class="text-green-600 font-bold hover:underline">Nhấp vào đây để đặt ngay!</a>`;
    }
    return `🚢 <strong>Tour Vịnh Hạ Long - Lan Hạ Du Thuyền 5 Sao:</strong><br>
      Nghỉ dưỡng sang trọng trên du thuyền giữa vịnh, chèo thuyền kayak, ngắm vịnh Lan Hạ nguyên sơ.<br>
      👉 <strong>Giá trọn gói:</strong> Chỉ từ <strong>5.69tr VNĐ</strong> cho 4N3Đ.<br>
      👉 <button onclick="askTina('Lịch trình chi tiết Hạ Long')" class="mt-2 px-2.5 py-1 text-xs font-semibold rounded bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400 border border-green-200 dark:border-white/10 hover:bg-green-100 transition">🔍 Xem lịch trình chi tiết Hạ Long</button>`;
  }

  if (query.includes('đà nẵng') || query.includes('hội an')) {
    if (query.includes('chi tiết') || query.includes('lịch trình')) {
      return `📋 <strong>Lịch trình Tour Đà Nẵng - Hội An 4N3Đ:</strong><br>
        - <strong>Ngày 1:</strong> Bay đến Đà Nẵng, cáp treo lên Bà Nà Hills, check-in Cầu Vàng trong mây.<br>
        - <strong>Ngày 2:</strong> Tham quan Ngũ Hành Sơn, di chuyển Hội An dạo phố cổ rực rỡ đèn lồng, thả hoa đăng.<br>
        - <strong>Ngày 3:</strong> Thăm Thánh địa Mỹ Sơn cổ kính, chiều tắm biển Mỹ Khê cát mịn sóng êm.<br>
        - <strong>Ngày 4:</strong> Check-in Bán đảo Sơn Trà Chùa Linh Ứng, mua hải sản, bánh mì Phượng. Bay về.<br>
        👉 <a href="tour-detail.html?id=5" class="text-green-600 font-bold hover:underline">Nhấp vào đây để đặt ngay!</a>`;
    }
    return `🌉 <strong>Tour Đà Nẵng - Hội An - Bà Nà Hills:</strong><br>
      Khám phá Cầu Vàng Bà Nà Hills, phố cổ Hội An đêm huyền ảo, tắm biển Mỹ Khê Forbes bình chọn.<br>
      👉 <strong>Giá siêu ưu đãi:</strong> Chỉ từ <strong>3.89tr VNĐ</strong> trọn gói 4N3Đ.<br>
      👉 <button onclick="askTina('Lịch trình chi tiết Đà Nẵng')" class="mt-2 px-2.5 py-1 text-xs font-semibold rounded bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400 border border-green-200 dark:border-white/10 hover:bg-green-100 transition">🔍 Xem lịch trình chi tiết Đà Nẵng</button>`;
  }

  if (query.includes('nhật bản') || query.includes('japan') || query.includes('tokyo')) {
    if (query.includes('chi tiết') || query.includes('lịch trình')) {
      return `📋 <strong>Lịch trình Tour Nhật Bản Mùa Hoa Anh Đào 6N5Đ:</strong><br>
        - <strong>Ngày 1:</strong> Bay đêm sang Tokyo, nhận phòng tại Shinjuku, dạo phố đêm Shibuya.<br>
        - <strong>Ngày 2:</strong> Ngắm hoa anh đào công viên Ueno, đền Senso-ji Asakusa, Akihabara.<br>
        - <strong>Ngày 3:</strong> Đi tàu Shinkansen ngắm núi Phú Sĩ kỳ vĩ, tắm Onsen suối nước nóng.<br>
        - <strong>Ngày 4:</strong> Đi Kyoto thăm chùa Vàng Kinkaku-ji, Fushimi Inari ngàn cổng torii đỏ.<br>
        - <strong>Ngày 5:</strong> Di chuyển đi Osaka, thăm lâu đài cổ, dạo phố Dotonbori ăn takoyaki, okonomiyaki.<br>
        - <strong>Ngày 6:</strong> Tự do mua sắm tại Shinsaibashi. Bay về lại Việt Nam.<br>
        👉 <a href="tour-detail.html?id=6" class="text-green-600 font-bold hover:underline">Nhấp vào đây để đặt ngay!</a>`;
    }
    return `🌸 <strong>Tour Nhật Bản Mùa Hoa Anh Đào Cao Cấp:</strong><br>
      Ngắm Phú Sĩ tuyết phủ, ngâm Onsen truyền thống, đi tàu điện Shinkansen, khám phá Tokyo, Osaka, Kyoto.<br>
      👉 <strong>Giá trọn gói:</strong> Chỉ từ <strong>32.90tr VNĐ</strong> (Đã gồm phí Visa & vé máy bay VNA).<br>
      👉 <button onclick="askTina('Lịch trình chi tiết Nhật Bản')" class="mt-2 px-2.5 py-1 text-xs font-semibold rounded bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400 border border-green-200 dark:border-white/10 hover:bg-green-100 transition">🔍 Xem lịch trình chi tiết Nhật Bản</button>`;
  }

  if (query.includes('đà lạt')) {
    if (query.includes('chi tiết') || query.includes('lịch trình')) {
      return `📋 <strong>Lịch trình Tour Đà Lạt 3N2Đ:</strong><br>
        - <strong>Ngày 1:</strong> Xe limousine đưa từ TP.HCM lên Đà Lạt, trượt thác Datanla hoành tráng, vườn hoa thành phố.<br>
        - <strong>Ngày 2:</strong> Leo núi Langbiang bằng xe Jeep ngắm mây ngàn, thăm Thung lũng Tình Yêu, chợ đêm Đà Lạt uống sữa đậu nành nóng.<br>
        - <strong>Ngày 3:</strong> Hái dâu tây trực tiếp tại vườn công nghệ cao, mua mứt dâu rừng, trà atiso. Xe đưa về TP.HCM.<br>
        👉 <a href="tour-detail.html?id=7" class="text-green-600 font-bold hover:underline">Nhấp vào đây để đặt ngay!</a>`;
    }
    return `🍓 <strong>Tour Đà Lạt Sương Mù Lãng Mạn:</strong><br>
      Check-in đỉnh Langbiang thơ mộng, vườn dâu tây công nghệ cao, thác Datanla hùng vĩ.<br>
      👉 <strong>Giá siêu tốt:</strong> Chỉ từ <strong>2.49tr VNĐ</strong> cho 3N2Đ limousine cao cấp.<br>
      👉 <button onclick="askTina('Lịch trình chi tiết Đà Lạt')" class="mt-2 px-2.5 py-1 text-xs font-semibold rounded bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400 border border-green-200 dark:border-white/10 hover:bg-green-100 transition">🔍 Xem lịch trình chi tiết Đà Lạt</button>`;
  }

  if (query.includes('nha trang')) {
    if (query.includes('chi tiết') || query.includes('lịch trình')) {
      return `📋 <strong>Lịch trình Tour Nha Trang - Vịnh Đảo 3N2Đ:</strong><br>
        - <strong>Ngày 1:</strong> Xe đưa đến Nha Trang sáng sớm. Thăm Tháp Bà Ponagar, chiều tự do tắm biển Trần Phú.<br>
        - <strong>Ngày 2:</strong> Đi cano lặn ngắm san hô tại hòn Mun, tắm bùn khoáng nóng, thưởng thức hải sản lồng bè.<br>
        - <strong>Ngày 3:</strong> Vui chơi Vinpearl Land hoặc tự do mua yến sào Khánh Hòa, mực một nắng. Tối xe đưa về TP.HCM.<br>
        👉 <a href="tour-detail.html?id=8" class="text-green-600 font-bold hover:underline">Nhấp vào đây để đặt ngay!</a>`;
    }
    return `🏖️ <strong>Tour Nha Trang - Ninh Hòa Biển Xanh Vẫy Gọi:</strong><br>
      Lặn biển ngắm rạn san hô vịnh Nha Trang, tắm bùn khoáng nóng bồi bổ sức khỏe, check-in Tháp Bà Ponagar.<br>
      👉 <strong>Giá trọn gói:</strong> Chỉ từ <strong>2.89tr VNĐ</strong> cho 3N2Đ.<br>
      👉 <button onclick="askTina('Lịch trình chi tiết Nha Trang')" class="mt-2 px-2.5 py-1 text-xs font-semibold rounded bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400 border border-green-200 dark:border-white/10 hover:bg-green-100 transition">🔍 Xem lịch trình chi tiết Nha Trang</button>`;
  }

  if (query.includes('singapore') || query.includes('malaysia')) {
    if (query.includes('chi tiết') || query.includes('lịch trình')) {
      return `📋 <strong>Lịch trình Tour liên tuyến Singapore - Malaysia 5N4Đ:</strong><br>
        - <strong>Ngày 1:</strong> Bay đến phi trường Changi đẹp nhất thế giới, check-in Jewel thác nước. Mua sắm Orchard Road.<br>
        - <strong>Ngày 2:</strong> Tham quan tượng sư tử Merlion Marina Bay, vườn thực vật Gardens by the Bay với siêu cây lấp lánh.<br>
        - <strong>Ngày 3:</strong> Khám phá đảo Sentosa, vui chơi chụp hình Universal Studios Singapore.<br>
        - <strong>Ngày 4:</strong> Xe di chuyển qua biên giới Malaysia, chinh phục Genting Highlands sầm uất, check-in Tháp Đôi Petronas.<br>
        - <strong>Ngày 5:</strong> Leo động Batu linh thiêng của người Ấn, mua sắm đặc sản Malaysia. Bay về Việt Nam.<br>
        👉 <a href="tour-detail.html?id=9" class="text-green-600 font-bold hover:underline">Nhấp vào đây để đặt ngay!</a>`;
    }
    return `🦁 <strong>Tour liên tuyến Quốc tế Singapore - Malaysia:</strong><br>
      Khám phá hai quốc gia trong 1 hành trình: Sân bay Jewel Changi, Gardens by the Bay, tháp đôi Petronas, Cao nguyên Genting.<br>
      👉 <strong>Giá hấp dẫn:</strong> Chỉ từ <strong>10.99tr VNĐ</strong> 5N4Đ trọn gói.<br>
      👉 <button onclick="askTina('Lịch trình chi tiết Singapore')" class="mt-2 px-2.5 py-1 text-xs font-semibold rounded bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400 border border-green-200 dark:border-white/10 hover:bg-green-100 transition">🔍 Xem lịch trình chi tiết Singapore</button>`;
  }

  if (query.includes('thái lan') || query.includes('bangkok') || query.includes('thái')) {
    if (query.includes('chi tiết') || query.includes('lịch trình')) {
      return `📋 <strong>Lịch trình Tour Thái Lan - Bangkok - Pattaya 5N4Đ:</strong><br>
        - <strong>Ngày 1:</strong> Bay thẳng đến Bangkok, xe đưa xuống thành phố biển Pattaya, dạo phố đèn đỏ Walking Street.<br>
        - <strong>Ngày 2:</strong> Cano ra đảo san hô Coral tắm biển, chiều thăm Chùa Trân Bảo Phật Sơn đúc vàng vách đá, xem show Alcazar.<br>
        - <strong>Ngày 3:</strong> Trở về Bangkok, ghé qua Vườn Bướm, xem xiếc rắn độc đáo.<br>
        - <strong>Ngày 4:</strong> Viếng Chùa Thuyền Wat Yannawa, Chùa Phật Vàng linh thiêng, ăn tối buffet tầng 86 Baiyoke Sky.<br>
        - <strong>Ngày 5:</strong> Chèo thuyền ngắm cá nổi sông Chaophraya, mua sắm tẹt ga tại Siam Paragon. Bay về nước.<br>
        👉 <a href="tour-detail.html?id=10" class="text-green-600 font-bold hover:underline">Nhấp vào đây để đặt ngay!</a>`;
    }
    return `🐘 <strong>Tour Thái Lan - Bangkok - Pattaya Xứ Chùa Vàng:</strong><br>
      Khám phá chùa Phật Vàng linh thiêng, xem show trình diễn Alcazar của các vũ công transgender, buffet nhà hàng Baiyoke Sky 86 tầng.<br>
      👉 <strong>Giá siêu tốt:</strong> Chỉ từ <strong>6.49tr VNĐ</strong> trọn gói 5N4Đ kèm hành lý ký gửi.<br>
      👉 <button onclick="askTina('Lịch trình chi tiết Thái Lan')" class="mt-2 px-2.5 py-1 text-xs font-semibold rounded bg-green-50 dark:bg-slate-800 text-green-700 dark:text-green-400 border border-green-200 dark:border-white/10 hover:bg-green-100 transition">🔍 Xem lịch trình chi tiết Thái Lan</button>`;
  }

  if (query.includes('huế') || query.includes('hương') || query.includes('kinh thành') || query.includes('cố đô')) {
    return `🏯 <strong>Tour Cố Đô Huế Cổ Kính:</strong><br>
      Khám phá Kinh Thành Huế (Đại Nội), nghe ca Huế trên Sông Hương, viếng chùa Thiên Mụ cổ kính và thưởng thức tinh hoa ẩm thực Cung đình.<br>
      WILTravel đang cung cấp các tour Huế giá cực tốt:<br>
      - <strong>Hành trình di sản Huế cổ kính 3N2Đ:</strong> Giá chỉ từ 2.49tr VNĐ.<br>
      - <strong>Nghỉ dưỡng Lăng Cô - Huế Premium 4N3Đ:</strong> Resort sát biển Lăng Cô cực sang chảnh.<br>
      👉 <a href="tours.html" class="text-green-600 font-bold hover:underline">Xem danh sách Tour Huế ngay</a>`;
  }

  // 4. Backend & Database explanation
  if (query.includes('backend') || query.includes('cơ sở dữ liệu') || query.includes('lưu') || query.includes('tài khoản')) {
    return `💾 <strong>Hệ thống Backend & Cơ sở dữ liệu:</strong><br>
      - WILTravel đã tích hợp hệ thống backend Node.js & Express thực tế!<br>
      - Thông tin tài khoản đăng ký và lịch sử đăng nhập được lưu trữ an toàn trong cơ sở dữ liệu file JSON của máy chủ (\`data/users.json\`).<br>
      - Nếu bạn chạy ở chế độ file tĩnh (\`file://\`), hệ thống sẽ tự động dùng \`localStorage\` dự phòng tiện lợi.`;
  }

  // 5. Flight Intent
  if (query.includes('vé máy bay') || query.includes('chuyến bay') || query.includes('bay đi')) {
    return `✈️ <strong>Dịch vụ Vé máy bay WILTravel:</strong><br>
      Bên mình hợp tác với hơn 10 hãng hàng không lớn, giá rẻ hơn thị trường từ 10-15%. Bạn có thể lựa chọn bay của các hãng như Vietnam Airlines, Vietjet Air, Bamboo Airways, Emirates, Qatar Airways...<br>
      👉 Bạn có thể tự tra cứu chuyến bay và đặt vé ngay tại đây: <a href="flight.html" class="text-green-600 font-bold hover:underline">Hệ thống Đặt vé máy bay</a>.`;
  }
  
  // 6. Buying / Booking a tour
  if (query.includes('đặt tour') || query.includes('mua tour') || query.includes('cách đặt')) {
    return `🛍️ <strong>Hướng dẫn Đặt Tour chi tiết:</strong><br>
      1. Tìm tour ưng ý trên website.<br>
      2. Bấm "Thêm vào giỏ" hoặc "Đặt tour".<br>
      3. Vào giỏ hàng điền thông tin và thanh toán (chuyển khoản ngân hàng hoặc ví MoMo).<br>
      👉 Xem giỏ hàng của bạn tại: <a href="cart.html" class="text-green-600 font-bold hover:underline">Giỏ hàng của tôi</a>.`;
  }

  // 7. General Tour Consultation
  if (query.includes('tour') && !query.includes('tìm') && query.length < 15) {
    if (typeof tours !== 'undefined' && tours.length > 0) {
      const topTours = tours.slice(0, 3);
      let list = `<p class="mb-2">WILTravel hiện có nhiều tour du lịch chất lượng cao. Dưới đây là 3 tour tiêu biểu được yêu thích nhất hiện tại:</p><ul class="space-y-2.5 mt-2">`;
      topTours.forEach(t => {
        list += `<li class="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-gray-150 dark:border-white/10 shadow-xs">
          <strong>${t.name}</strong> (${t.duration})<br>
          <span class="text-xs text-gray-500"><i class="fa-solid fa-map-pin text-green-600 mr-1"></i>${t.location}</span> • 
          <span class="text-green-600 font-bold text-xs">${(t.price / 1000000).toFixed(2)}tr VNĐ</span><br>
          <a href="tour-detail.html?id=${t.id}" class="inline-block mt-1 text-[11px] text-green-600 font-bold hover:underline">Chi tiết tour →</a>
        </li>`;
      });
      list += `</ul><p class="mt-2.5">Bạn muốn đi biển hay núi? Hãy nói cho mình điểm đến cụ thể (ví dụ: Phú Quốc, Sapa, Bali...) để mình tư vấn sâu hơn nhé! 😊</p>`;
      return list;
    }
    return "Chúng mình có rất nhiều tour biển đảo, vùng cao trong nước và quốc tế hấp dẫn. Bạn có thể xem danh sách tại <a href='tours.html' class='text-green-600 font-bold hover:underline'>Danh sách Tour</a>.";
  }

  // 8. Advanced NLP Scoring System for Tour Search
  let scoredTours = tours.map(t => {
    let score = 0;
    const term = query.trim().toLowerCase();
    
    // Explicit location match
    if (term.includes(t.location.toLowerCase())) score += 10;
    
    // Explicit name match
    if (t.name.toLowerCase().includes(term) && term.length > 3) score += 5;
    
    // Category mapping
    t.category.forEach(c => {
      if (term.includes(c.toLowerCase())) score += 5;
    });
    
    // Semantic Pricing mapping
    if (term.includes('rẻ') || term.includes('giá tốt') || term.includes('tiết kiệm')) {
      if (t.price < 4000000) score += 3;
    }
    if (term.includes('sang trọng') || term.includes('cao cấp') || term.includes('nghỉ dưỡng')) {
      if (t.price > 8000000) score += 3;
    }
    
    // Duration mapping
    if (term.includes('3 ngày') && t.duration.includes('3 ngày')) score += 3;
    if (term.includes('4 ngày') && t.duration.includes('4 ngày')) score += 3;
    if (term.includes('5 ngày') && t.duration.includes('5 ngày')) score += 3;
    
    // Exact word frequency bonus
    const words = term.split(' ');
    words.forEach(w => {
       if (w.length > 3 && t.name.toLowerCase().includes(w)) score += 1;
    });

    return { tour: t, score };
  }).filter(item => item.score >= 3)
    .sort((a, b) => b.score - a.score)
    .map(item => item.tour);

  if (scoredTours.length > 0) {
    const topTours = scoredTours.slice(0, 3);
    let list = `✨ <strong>Mình tìm thấy ${scoredTours.length} tour phù hợp với yêu cầu của bạn:</strong><br><ul class="space-y-2.5 mt-2">`;
    topTours.forEach(t => {
      list += `<li class="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-gray-150 dark:border-white/10 shadow-xs">
        <strong>${t.name}</strong> (${t.duration})<br>
        <span class="text-xs text-gray-500"><i class="fa-solid fa-map-pin text-green-600 mr-1"></i>${t.location}</span> • 
        <span class="text-green-600 font-bold text-xs">${(t.price / 1000000).toFixed(2)}tr VNĐ</span><br>
        <a href="tour-detail.html?id=${t.id}" class="inline-block mt-1 text-[11px] text-green-600 font-bold hover:underline">Chi tiết & Đặt tour →</a>
      </li>`;
    });
    list += `</ul>`;
    if (scoredTours.length > 3) {
      list += `<p class="mt-2.5 text-xs text-gray-500">Và còn ${scoredTours.length - 3} tour khác nữa. Bạn xem thêm tại <a href="tours.html" class="text-green-600 hover:underline">Danh sách Tour</a> nhé.</p>`;
    }
    return list;
  }

  // 9. Price, Promo Codes & Coupons
  if (query.includes('giá') || query.includes('bao nhiêu') || query.includes('tiền') || query.includes('khuyến mãi') || query.includes('mã giảm') || query.includes('rẻ') || query.includes('coupon') || query.includes('discount')) {
    return `💵 <strong>Chương trình ưu đãi hiện tại của WILTravel:</strong><br>
      - Giá tour cam kết tốt nhất thị trường, chỉ từ 1.79tr VNĐ.<br>
      - 🎟️ Mã <strong>"SAVE100"</strong>: Giảm 100k cho hóa đơn từ 2tr VNĐ.<br>
      - 🎟️ Mã <strong>"FRIEND20"</strong>: Giảm 20% khi đi theo nhóm hoặc giới thiệu bạn bè.<br>
      - 🎟️ Mã <strong>"TINAGIFT"</strong>: Giảm ngay 5% (Mã độc quyền từ Chatbot Tina!).<br>
      👉 Đặt mua ngay và nhập mã tại trang <a href="deals.html" class="text-green-600 font-bold hover:underline">Ưu đãi & Khuyến mãi</a>.`;
  }

  // 10. Payment & Billing
  if (query.includes('thanh toán') || query.includes('chuyển khoản') || query.includes('ngân hàng') || query.includes('momo') || query.includes('tiền mặt')) {
    return `💳 <strong>Phương thức thanh toán bảo mật của WILTravel:</strong><br>
      - <strong>Chuyển khoản Ngân hàng (MB Bank):</strong> Thanh toán tiện lợi qua mã VietQR tự động xuất khi đặt hàng.<br>
      - <strong>Ví điện tử MoMo:</strong> Liên kết thanh toán nhanh gọn.<br>
      - <strong>Thẻ Quốc tế:</strong> Hỗ trợ Visa, Mastercard, JCB qua cổng bảo mật đa lớp.`;
  }

  // 11. Cancellation & Refunds
  if (query.includes('hủy') || query.includes('hoàn tiền') || query.includes('trả phòng') || query.includes('đổi ngày') || query.includes('chính sách')) {
    return `🔄 <strong>Chính sách Hủy & Hoàn tiền linh hoạt:</strong><br>
      - Hủy trước ngày đi 30 ngày: Hoàn tiền <strong>100%</strong>.<br>
      - Hủy trước từ 15 đến 30 ngày: Hoàn tiền <strong>80%</strong>.<br>
      - Hủy trước từ 7 đến 15 ngày: Hoàn tiền <strong>50%</strong>.<br>
      - Đổi ngày khởi hành miễn phí trước 7 ngày (tùy thuộc tình trạng phòng/vé còn trống).<br>
      👉 Chi tiết thêm tại trang <a href="faq.html" class="text-green-600 font-bold hover:underline">Câu hỏi thường gặp (FAQ)</a>.`;
  }

  // 12. Office & Address & Company Info
  if (query.includes('địa chỉ') || query.includes('văn phòng') || query.includes('đâu') || query.includes('thành lập') || query.includes('năm') || query.includes('công ty')) {
    return `🏢 <strong>Về Công ty Du lịch WILTravel:</strong><br>
      - <strong>Tên pháp lý:</strong> Công ty TNHH Thương mại Dịch vụ Du lịch WILTRAVEL.<br>
      - <strong>Thành lập:</strong> Năm 2011 (Hơn 15 năm kinh nghiệm trong ngành du lịch).<br>
      - <strong>Văn phòng:</strong> 72/10/6 Văn Chung, Quận Tân Bình, Tp.HCM.<br>
      - <strong>Giấy phép Lữ hành Quốc tế:</strong> Được cấp bởi Cục Du lịch Quốc gia Việt Nam.<br>
      👉 Xem thêm tại trang <a href="about.html" class="text-green-600 font-bold hover:underline">Về chúng tôi</a>.`;
  }

  // 13. Direct Help / Contacts
  if (query.includes('nhân viên') || query.includes('hotline') || query.includes('điện thoại') || query.includes('gặp') || query.includes('phương') || query.includes('sđt') || query.includes('gọi')) {
    return `📞 <strong>Kết nối với Hỗ trợ Viên trực tiếp:</strong><br>
      - <strong>Hotline/Zalo hỗ trợ 24/7:</strong> <a href="tel:0905025737" class="text-green-600 font-bold hover:underline">0905 025 737</a> (gặp <strong>Ms. Phương</strong>).<br>
      - <strong>Email:</strong> info@wil-travel.com.<br>
      - Bạn cũng có thể dùng nút bong bóng Zalo/Điện thoại ở góc màn hình để gọi nhanh.`;
  }

  // 14. Basic Greetings & Chit-chat
  if (query.includes('chào') || query.includes('hi') || query.includes('hello') || query.includes('tina') || query.includes('ở đó không')) {
    return "Xin chào! Mình là Tina đây. Mình có thể hỗ trợ tư vấn các tour du lịch, thời tiết/đồ cần mang, tra cứu mã vé đặt chỗ, thông tin công ty, chính sách hoàn tiền hoặc kết nối bạn với Ms. Phương. Bạn cần Tina hỗ trợ gì nào? 😊";
  }
  if (query.includes('cảm ơn') || query.includes('thanks') || query.includes('tốt quá') || query.includes('ok')) {
    return "Rất vui được đồng hành cùng bạn! Chúc bạn có một ngày tràn ngập niềm vui và có những trải nghiệm đáng nhớ cùng WILTravel. Cần hỗ trợ thêm cứ nhắn Tina nhé! ❤️";
  }
  if (query.includes('tạm biệt') || query.includes('bye')) {
    return "Tạm biệt bạn! Hẹn gặp lại bạn trên các cung đường du lịch tuyệt đẹp sắp tới nhé! 👋🌸";
  }

  // 15. Fallback Response
  return `🤖 Câu hỏi này Tina chưa hiểu rõ lắm. Bạn thử hỏi ngắn gọn như: "Tư vấn đi Phú Quốc", "Lịch trình đi Sapa", hoặc "Tra cứu đơn hàng 102" nhé. Hoặc liên hệ ngay Hotline: <strong>Ms. Phương (0905 025 737)</strong>!`;
}

// English Chatbot Logic
function getTinaResponseEN(query) {
  if (query.includes('flight') || query.includes('ticket') || query.includes('fly')) {
    return `✈️ <strong>WILTravel Flight Booking:</strong><br>
      We partner with over 10 major airlines, offering prices 10-15% lower than the market.<br>
      👉 Search and book flights here: <a href="flight.html" class="text-green-600 font-bold hover:underline">Flight Booking System</a>.`;
  }
  if (query.includes('book') || query.includes('buy') || query.includes('how to')) {
    return `🛍️ <strong>How to Book a Tour:</strong><br>
      1. Find a tour you like on our website.<br>
      2. Click "Add to Cart" or "Book Tour".<br>
      3. Go to your cart, fill in the details, and checkout.<br>
      👉 View your cart here: <a href="cart.html" class="text-green-600 font-bold hover:underline">Your Cart</a>.`;
  }
  
  let scoredTours = tours.map(t => {
    let score = 0;
    const term = query.trim().toLowerCase();
    if (t.location.toLowerCase().includes(term)) score += 10;
    if (term.includes('cheap') && t.price < 4000000) score += 5;
    if (term.includes('luxury') && t.price > 8000000) score += 5;
    if (term.includes('beach') && t.category.includes('Biển')) score += 5;
    if (term.includes('mountain') && t.category.includes('Núi')) score += 5;
    if (term.includes(t.name.toLowerCase().split(' ')[0])) score += 3;
    return { tour: t, score };
  }).filter(item => item.score > 0).sort((a,b) => b.score - a.score).map(i => i.tour);

  if (scoredTours.length > 0) {
    const topTours = scoredTours.slice(0, 3);
    let list = `✨ <strong>I found ${scoredTours.length} tours that match your request:</strong><br><ul class="space-y-2.5 mt-2">`;
    topTours.forEach(t => {
      list += `<li class="bg-white p-2.5 rounded-xl border border-gray-100 shadow-xs">
        <strong>${t.name}</strong> (${t.duration})<br>
        <span class="text-xs text-gray-500"><i class="fa-solid fa-map-pin text-green-600 mr-1"></i>${t.location}</span> • 
        <span class="text-green-600 font-bold text-xs">${(t.price / 1000000).toFixed(2)}m VND</span><br>
        <a href="tour-detail.html?id=${t.id}" class="inline-block mt-1 text-[11px] text-green-600 font-bold hover:underline">Details & Book →</a>
      </li>`;
    });
    list += `</ul>`;
    return list;
  }

  return `🤖 I'm sorry, I couldn't fully understand. Could you try asking about specific destinations (e.g., Bali, Sapa) or saying "flight", "book tour"?<br>
    For direct support, call <strong>+84 905 025 737</strong> (Ms. Phuong).`;
}

// Chinese Chatbot Logic
function getTinaResponseZH(query) {
  if (query.includes('航班') || query.includes('机票') || query.includes('飞机')) {
    return `✈️ <strong>WILTravel 航班预订:</strong><br>
      我们与10多家主要航空公司合作，价格比市场低10-15%。<br>
      👉 在这里搜索和预订航班：<a href="flight.html" class="text-green-600 font-bold hover:underline">航班预订系统</a>。`;
  }
  if (query.includes('预订') || query.includes('买') || query.includes('怎么')) {
    return `🛍️ <strong>如何预订旅游:</strong><br>
      1. 在我们的网站上找到您喜欢的旅游路线。<br>
      2. 点击“加入购物车”或“预订旅游”。<br>
      3. 进入您的购物车，填写详细信息并结账。<br>
      👉 在这里查看您的购物车：<a href="cart.html" class="text-green-600 font-bold hover:underline">您的购物车</a>。`;
  }
  
  let scoredTours = tours.map(t => {
    let score = 0;
    if (query.includes('便宜') && t.price < 4000000) score += 5;
    if (query.includes('豪华') && t.price > 8000000) score += 5;
    if (query.includes('海滩') && t.category.includes('Biển')) score += 5;
    if (query.includes('山') && t.category.includes('Núi')) score += 5;
    if (t.location === 'Bali' && query.includes('巴厘岛')) score += 10;
    if (t.location === 'Sapa' && query.includes('沙坝')) score += 10;
    if (t.location === 'Phú Quốc' && query.includes('富国岛')) score += 10;
    if (t.location === 'Nha Trang' && query.includes('芽庄')) score += 10;
    if (t.location === 'Đà Nẵng' && query.includes('岘港')) score += 10;
    if (t.location === 'Hà Nội' && query.includes('河内')) score += 10;
    if (t.location === 'TP.HCM' && query.includes('胡志明市')) score += 10;
    if (t.location === 'Đài Loan' && query.includes('台湾')) score += 10;
    if (t.location === 'Nhật Bản' && query.includes('日本')) score += 10;
    return { tour: t, score };
  }).filter(item => item.score > 0).sort((a,b) => b.score - a.score).map(i => i.tour);

  if (scoredTours.length > 0) {
    const topTours = scoredTours.slice(0, 3);
    let list = `✨ <strong>我找到了 ${scoredTours.length} 个符合您要求的旅游路线：</strong><br><ul class="space-y-2.5 mt-2">`;
    topTours.forEach(t => {
      list += `<li class="bg-white p-2.5 rounded-xl border border-gray-100 shadow-xs">
        <strong>${t.name}</strong> (${t.duration})<br>
        <span class="text-xs text-gray-500"><i class="fa-solid fa-map-pin text-green-600 mr-1"></i>${t.location}</span> • 
        <span class="text-green-600 font-bold text-xs">${(t.price / 1000000).toFixed(2)}百万越南盾</span><br>
        <a href="tour-detail.html?id=${t.id}" class="inline-block mt-1 text-[11px] text-green-600 font-bold hover:underline">详情与预订 →</a>
      </li>`;
    });
    list += `</ul>`;
    return list;
  }

  return `🤖 抱歉，我不太明白。您可以尝试询问特定目的地（例如：巴厘岛、沙坝），或说“航班”、“预订”。<br>
    如需直接支持，请致电 <strong>+84 905 025 737</strong>（Phuong女士）。`;
}

// Global logout handler
window.appLogout = function() {
  if (confirm('Bạn chắc chắn muốn đăng xuất?')) {
    logoutUser();
  }
};

// Centralized Currency & Price Converter System
formatPriceGlobal = function(priceInVnd) {
  const currency = (typeof localStorage !== 'undefined' && localStorage.getItem('currency')) || 'VND';
  const num = typeof priceInVnd === 'number' ? priceInVnd : parseFloat(String(priceInVnd).replace(/[^0-9.-]+/g, '')) || 0;
  if (currency === 'USD') {
    const priceInUsd = num / 25000;
    return '$' + priceInUsd.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
  } else if (currency === 'EUR') {
    const priceInEur = num / 27000;
    return '€' + priceInEur.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
  } else {
    return num.toLocaleString('vi-VN') + 'đ';
  }
};
window.formatPriceGlobal = formatPriceGlobal;

formatPriceString = function(priceStr) {
  if (typeof priceStr === 'number') {
    return formatPriceGlobal(priceStr);
  }
  if (!priceStr) return '';
  const cleanStr = String(priceStr).replace(/\./g, '').replace(/,/g, '').replace(/[^0-9.]/g, '');
  let val = parseFloat(cleanStr);
  if (isNaN(val)) return priceStr;
  
  if (String(priceStr).includes('tr')) {
    val = val * 1000000;
  }
  
  return formatPriceGlobal(val);
};
window.formatPriceString = formatPriceString;

changeCurrency = function(val) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('currency', val);
  }
  const currBtnSpan = document.querySelector('#currency-toggle span');
  if (currBtnSpan) currBtnSpan.textContent = val;
  const select = document.getElementById('global-currency-select');
  if (select) select.value = val;
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') window.dispatchEvent(new Event('currencyChange'));
};
window.changeCurrency = changeCurrency;

toggleGlobalCurrency = function() {
  const current = (typeof localStorage !== 'undefined' && localStorage.getItem('currency')) || 'VND';
  const next = current === 'VND' ? 'USD' : current === 'USD' ? 'EUR' : 'VND';
  changeCurrency(next);
};
window.toggleGlobalCurrency = toggleGlobalCurrency;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Apply dark mode immediately
  if (isDarkMode()) applyDarkMode(true);

  updateNavbar();
  injectCurrencySwitcher();
  initBackToTop();
  initFloatingHotline();
  initChatbotTina();
});

// Global Language change handler
window.changeLanguage = function(langCode, label) {
  document.getElementById('current-lang').innerText = label;
  const selectField = document.querySelector("select.goog-te-combo");
  if(selectField) {
    selectField.value = langCode;
    selectField.dispatchEvent(new Event('change'));
  }
  // Save preference
  localStorage.setItem('userLang', JSON.stringify({code: langCode, label: label}));
};

function initAOSDynamically() {
  // Disabled dynamically injected AOS animations to prevent elements from vanishing/collapsing
}

document.addEventListener('DOMContentLoaded', () => { setTimeout(() => { initAOSDynamically(); if(typeof AOS !== 'undefined') AOS.refresh(); }, 500); });



// ========================================================
// 5. ULTRA-MODERN UI FEATURES: QUICK VIEW & COMMAND PALETTE
// ========================================================

// Open Quick View Modal for Tours
window.openQuickView = function(tourId) {
  const tour = tours.find(t => t.id === Number(tourId));
  if (!tour) return;

  let modal = document.getElementById('wil-quickview-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'wil-quickview-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-opacity duration-300 opacity-0 pointer-events-none';
    modal.onclick = (e) => {
      if (e.target === modal) window.closeQuickView();
    };
    document.body.appendChild(modal);
  }

  const discountPercent = tour.originalPrice ? Math.round((1 - tour.price / tour.originalPrice) * 100) : 0;
  const departureDateList = (tour.departureDates || ["Hàng tuần"]).map(d => `<span class="px-2.5 py-1 text-xs rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800/40">${d}</span>`).join(' ');

  const highlightsHtml = (tour.highlights || []).map(h => `<li class="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300"><i class="fa-solid fa-circle-check text-emerald-600 text-xs"></i><span>${h}</span></li>`).join('');

  modal.innerHTML = `
    <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-white/10 relative transition-transform duration-300 scale-95 flex flex-col md:flex-row overflow-hidden">
      <button onclick="window.closeQuickView()" class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>

      <div class="md:w-5/12 relative min-h-[240px] md:min-h-full">
        <img src="${tour.image}" alt="${tour.name}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div class="absolute top-4 left-4 flex flex-col gap-1.5">
          <span class="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full shadow-lg">${tour.badge || 'Nổi bật'}</span>
          ${discountPercent > 0 ? `<span class="px-3 py-1 bg-rose-600 text-white text-xs font-black rounded-full shadow-lg">-${discountPercent}%</span>` : ''}
        </div>
        <div class="absolute bottom-4 left-4 right-4 text-white">
          <p class="text-xs uppercase tracking-wider text-emerald-300 font-bold">${tour.code || 'MÃ: WLE'}</p>
          <div class="flex items-center gap-2 text-xs mt-1">
            <span><i class="fa-solid fa-location-dot text-emerald-400 mr-1"></i>${tour.location}</span>
            <span>•</span>
            <span><i class="fa-regular fa-clock text-emerald-400 mr-1"></i>${tour.duration}</span>
          </div>
        </div>
      </div>

      <div class="md:w-7/12 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
              Khởi hành: ${tour.departure || 'TP.HCM'}
            </span>
            <div class="flex items-center gap-1 text-amber-500 text-xs font-bold">
              <i class="fa-solid fa-star"></i> ${tour.rating || 4.9} (${tour.reviews || 100} đánh giá)
            </div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-3">${tour.name}</h3>

          <div class="mb-4 p-3.5 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-150 dark:border-white/5">
            <div class="flex items-baseline gap-3">
              <span class="text-2xl font-black text-rose-600 dark:text-rose-400">${window.formatPriceGlobal(tour.price)}</span>
              ${tour.originalPrice ? `<span class="text-sm text-gray-400 line-through">${window.formatPriceGlobal(tour.originalPrice)}</span>` : ''}
            </div>
            <p class="text-xs text-emerald-600 font-medium mt-1">✨ Đã gồm vé máy bay, resort 4* & bảo hiểm Bảo Minh 100tr</p>
          </div>

          <div class="mb-4">
            <p class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Điểm nhấn chuyến đi:</p>
            <ul class="space-y-1.5">
              ${highlightsHtml}
            </ul>
          </div>

          <div class="mb-6">
            <p class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Lịch khởi hành sắp tới:</p>
            <div class="flex flex-wrap gap-1.5">
              ${departureDateList}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 pt-4 border-t border-gray-150 dark:border-white/10">
          <a href="tour-detail.html?id=${tour.id}" class="flex-1 text-center py-3 px-4 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-white text-sm font-bold transition">
            Xem Chi Tiết Lịch Trình
          </a>
          <button onclick="addToCart(${tour.id}); window.closeQuickView();" class="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2">
            <i class="fa-solid fa-cart-plus"></i> Đặt Tour Ngay
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.firstElementChild.classList.remove('scale-95');
  modal.firstElementChild.classList.add('scale-100');
  document.body.style.overflow = 'hidden';
};

window.closeQuickView = function() {
  const modal = document.getElementById('wil-quickview-modal');
  if (modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    if (modal.firstElementChild) {
      modal.firstElementChild.classList.remove('scale-100');
      modal.firstElementChild.classList.add('scale-95');
    }
  }
  document.body.style.overflow = '';
};

// ========================================================
// 6. GLOBAL COMMAND PALETTE (CTRL + K / SEARCH POPUP)
// ========================================================
window.openCommandPalette = function() {
  let palette = document.getElementById('wil-command-palette');
  if (!palette) {
    palette = document.createElement('div');
    palette.id = 'wil-command-palette';
    palette.className = 'fixed inset-0 z-[120] flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md transition-opacity duration-200 opacity-0 pointer-events-none';
    palette.onclick = (e) => { if (e.target === palette) window.closeCommandPalette(); };
    palette.innerHTML = `
      <div class="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden transform transition-transform duration-200 scale-95">
        <div class="p-4 border-b border-gray-150 dark:border-white/10 flex items-center gap-3">
          <i class="fa-solid fa-magnifying-glass text-emerald-600 text-lg"></i>
          <input type="text" id="palette-search-input" placeholder="Tìm tour, khách sạn, vé máy bay, thuê xe, visa, địa danh... (Ấn Esc để đóng)" class="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-base">
          <span class="text-xs bg-gray-100 dark:bg-slate-800 text-gray-500 px-2 py-1 rounded-md font-mono">ESC</span>
        </div>
        <div id="palette-results" class="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <p class="text-xs uppercase font-bold text-gray-400 px-3 py-1">Gợi ý tìm kiếm nhanh:</p>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <button onclick="paletteSearchQuick('Phú Quốc')" class="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-left font-medium transition flex items-center gap-2">
              <span>🏝️ Tour Phú Quốc</span>
            </button>
            <button onclick="paletteSearchQuick('Nhật Bản')" class="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-left font-medium transition flex items-center gap-2">
              <span>🌸 Tour Nhật Bản</span>
            </button>
            <button onclick="paletteSearchQuick('Hàn Quốc')" class="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-left font-medium transition flex items-center gap-2">
              <span>🍁 Tour Hàn Quốc</span>
            </button>
            <button onclick="paletteSearchQuick('Khách sạn')" class="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-left font-medium transition flex items-center gap-2">
              <span>🏨 Đặt Khách Sạn</span>
            </button>
            <button onclick="paletteSearchQuick('Thuê xe')" class="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-left font-medium transition flex items-center gap-2">
              <span>🚗 Thuê Xe Du Lịch</span>
            </button>
            <button onclick="paletteSearchQuick('Visa')" class="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-left font-medium transition flex items-center gap-2">
              <span>🛂 Dịch Vụ Visa</span>
            </button>
          </div>
        </div>
        <div class="p-3 bg-gray-50 dark:bg-slate-800/60 border-t border-gray-150 dark:border-white/10 flex justify-between items-center text-xs text-gray-500">
          <span>Hotline hỗ trợ: <strong class="text-emerald-600">0905 025 737</strong></span>
          <span>WIL-Travel.com</span>
        </div>
      </div>
    `;
    document.body.appendChild(palette);

    const input = document.getElementById('palette-search-input');
    input.addEventListener('input', (e) => handlePaletteSearch(e.target.value));
  }

  palette.classList.remove('opacity-0', 'pointer-events-none');
  const inner = palette.firstElementChild;
  inner.classList.remove('scale-95');
  inner.classList.add('scale-100');
  const input = document.getElementById('palette-search-input');
  setTimeout(() => input.focus(), 100);
  document.body.style.overflow = 'hidden';
};

window.closeCommandPalette = function() {
  const palette = document.getElementById('wil-command-palette');
  if (palette) {
    palette.classList.add('opacity-0', 'pointer-events-none');
    if (palette.firstElementChild) {
      palette.firstElementChild.classList.remove('scale-100');
      palette.firstElementChild.classList.add('scale-95');
    }
  }
  document.body.style.overflow = '';
};

window.paletteSearchQuick = function(term) {
  const input = document.getElementById('palette-search-input');
  if (input) {
    input.value = term;
    handlePaletteSearch(term);
  }
};

function handlePaletteSearch(keyword) {
  const q = keyword.trim().toLowerCase();
  const resultsContainer = document.getElementById('palette-results');
  if (!resultsContainer) return;

  if (!q) {
    resultsContainer.innerHTML = `
      <p class="text-xs uppercase font-bold text-gray-400 px-3 py-1">Gợi ý tìm kiếm nhanh:</p>
      <div class="grid grid-cols-2 gap-2 text-xs">
        <button onclick="paletteSearchQuick('Phú Quốc')" class="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-left font-medium transition flex items-center gap-2">
          <span>🏝️ Tour Phú Quốc</span>
        </button>
        <button onclick="paletteSearchQuick('Nhật Bản')" class="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-left font-medium transition flex items-center gap-2">
          <span>🌸 Tour Nhật Bản</span>
        </button>
        <button onclick="paletteSearchQuick('Khách sạn')" class="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-left font-medium transition flex items-center gap-2">
          <span>🏨 Đặt Khách Sạn</span>
        </button>
        <button onclick="paletteSearchQuick('Thuê xe')" class="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-left font-medium transition flex items-center gap-2">
          <span>🚗 Thuê Xe Du Lịch</span>
        </button>
      </div>
    `;
    return;
  }

  // Search across tours, hotels, cars, visas
  const tourMatches = tours.filter(t => t.name.toLowerCase().includes(q) || t.location.toLowerCase().includes(q) || (t.code && t.code.toLowerCase().includes(q)));
  const hotelMatches = (window.HOTELS_DATA || []).filter(h => h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q));
  const carMatches = (window.CAR_RENTAL_DATA || []).filter(c => c.name.toLowerCase().includes(q));
  const visaMatches = (window.VISA_SERVICES_DATA || []).filter(v => v.country.toLowerCase().includes(q));

  let html = '';
  if (q.includes('wil-bk') || q.includes('đơn hàng') || q.includes('tra cứu') || /^\d{9,11}$/.test(q)) {
    html += `
      <div onclick="window.closeCommandPalette(); window.openOrderTrackerModal('${q}')" class="p-3.5 mb-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700/50 cursor-pointer flex items-center justify-between gap-3 transition hover:scale-[1.01]">
        <div class="flex items-center gap-3">
          <span class="text-2xl">📦</span>
          <div>
            <h4 class="text-sm font-bold text-emerald-900 dark:text-emerald-200">Tra cứu đơn hàng "${keyword}"</h4>
            <p class="text-xs text-emerald-700 dark:text-emerald-400">Bấm để kiểm tra trạng thái vé và lịch trình thời gian thực</p>
          </div>
        </div>
        <span class="text-xs font-bold bg-emerald-600 text-white px-3 py-1 rounded-full">Tra Cứu Ngay</span>
      </div>
    `;
  }

  if (tourMatches.length > 0) {
    html += `<p class="text-xs uppercase font-bold text-emerald-600 px-3 mt-2">Tour du lịch (${tourMatches.length}):</p>`;
    html += tourMatches.slice(0, 5).map(t => `
      <div onclick="window.closeCommandPalette(); window.location.href='tour-detail.html?id=${t.id}'" class="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between gap-3 transition">
        <div class="flex items-center gap-3">
          <img src="${t.image}" class="w-12 h-12 rounded-xl object-cover">
          <div>
            <h4 class="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">${t.name}</h4>
            <p class="text-xs text-gray-500">${t.duration} • Khởi hành ${t.departure || 'TP.HCM'}</p>
          </div>
        </div>
        <span class="text-sm font-black text-rose-600">${window.formatPriceGlobal(t.price)}</span>
      </div>
    `).join('');
  }

  if (hotelMatches.length > 0) {
    html += `<p class="text-xs uppercase font-bold text-blue-600 px-3 mt-3">Khách sạn & Resort (${hotelMatches.length}):</p>`;
    html += hotelMatches.slice(0, 3).map(h => `
      <div onclick="window.closeCommandPalette(); window.location.href='hotels.html?city=${encodeURIComponent(h.city)}'" class="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between gap-3 transition">
        <div class="flex items-center gap-3">
          <img src="${h.image}" class="w-12 h-12 rounded-xl object-cover">
          <div>
            <h4 class="text-sm font-bold text-gray-900 dark:text-white">${h.name}</h4>
            <p class="text-xs text-gray-500">${h.stars} sao • ${h.city}</p>
          </div>
        </div>
        <span class="text-sm font-bold text-primary-600">${window.formatPriceGlobal(h.price)}/đêm</span>
      </div>
    `).join('');
  }

  if (visaMatches.length > 0) {
    html += `<p class="text-xs uppercase font-bold text-purple-600 px-3 mt-3">Dịch vụ Visa (${visaMatches.length}):</p>`;
    html += visaMatches.map(v => `
      <div onclick="window.closeCommandPalette(); window.location.href='visa.html'" class="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between gap-3 transition">
        <div class="flex items-center gap-3">
          <span class="text-2xl">${v.flag}</span>
          <div>
            <h4 class="text-sm font-bold text-gray-900 dark:text-white">Visa ${v.country} - ${v.type}</h4>
            <p class="text-xs text-gray-500">Xử lý: ${v.processingTime} • Tỷ lệ đậu ${v.passRate}</p>
          </div>
        </div>
        <span class="text-xs font-bold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">${window.formatPriceGlobal(v.fee)}</span>
      </div>
    `).join('');
  }

  if (!html) {
    html = `<div class="p-6 text-center text-gray-400 text-sm">Không tìm thấy kết quả phù hợp cho "${keyword}". Vui lòng thử từ khóa khác hoặc liên hệ Hotline <strong>0905 025 737</strong>.</div>`;
  }

  resultsContainer.innerHTML = html;
}

// Global Keyboard Shortcut: Ctrl + K / Cmd + K to open Command Palette
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    const palette = document.getElementById('wil-command-palette');
    if (palette && !palette.classList.contains('pointer-events-none')) {
      window.closeCommandPalette();
    } else {
      window.openCommandPalette();
    }
  } else if (e.key === 'Escape') {
    window.closeCommandPalette();
    window.closeQuickView();
  }
});


// ========================================================
// 8. WILTRAVEL API CLIENT & GLOBAL ORDER TRACKER MODAL
// ========================================================

window.wilApi = {
  // System
  async getHealth() {
    try {
      const res = await fetch('/api/health');
      return await res.json();
    } catch (e) {
      return { status: 'offline', version: '2.2.0' };
    }
  },
  async getCompanyInfo() {
    try {
      const res = await fetch('/api/info');
      return await res.json();
    } catch (e) {
      return { success: true, company: window.WIL_COMPANY_INFO };
    }
  },
  // Tours
  async getTours(params = {}) {
    try {
      const qs = new URLSearchParams(params).toString();
      const res = await fetch('/api/tours?' + qs);
      return await res.json();
    } catch (e) {
      return { success: true, total: tours.length, data: tours };
    }
  },
  async getTour(id) {
    try {
      const res = await fetch('/api/tours/' + id);
      return await res.json();
    } catch (e) {
      const found = tours.find(t => String(t.id) === String(id) || (t.code && t.code.toLowerCase() === String(id).toLowerCase()));
      return found ? { success: true, data: found } : { success: false };
    }
  },
  // Bookings
  async createBooking(bookingData) {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      return await res.json();
    } catch (e) {
      const orderId = 'WIL-BK-' + Math.floor(100000 + Math.random() * 900000);
      return { success: true, orderId, message: 'Đã lưu đơn hàng cục bộ.' };
    }
  },
  async trackBooking(codeOrPhone) {
    try {
      const res = await fetch('/api/bookings/' + encodeURIComponent(codeOrPhone.trim()));
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Không thể kết nối máy chủ.' };
    }
  },
  // Coupons
  async validateCoupon(code, totalAmount) {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, totalAmount })
      });
      return await res.json();
    } catch (e) {
      // Local fallback
      const c = code.trim().toUpperCase();
      if (c === 'WILWELCOME') return { success: true, valid: true, discount: Math.min(500000, totalAmount * 0.1), message: 'Giảm 10% tối đa 500k' };
      if (c === 'HE2026' && totalAmount >= 5000000) return { success: true, valid: true, discount: 300000, message: 'Giảm 300.000đ' };
      return { success: false, valid: false, message: 'Mã không hợp lệ.' };
    }
  },
  // Contact & Inquiries
  async submitContact(data) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      return { success: true, message: 'Thông điệp của bạn đã được tiếp nhận.' };
    }
  },
  async subscribeNewsletter(email) {
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch (e) {
      return { success: true, discountCode: 'WILWELCOME', message: 'Đăng ký thành công! Nhận mã WILWELCOME' };
    }
  },
  // Reviews
  async submitReview(data) {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      return { success: true, message: 'Đã lưu đánh giá của bạn.' };
    }
  }
};

// Global Order Tracker Modal
window.openOrderTrackerModal = function(prefillCode = '') {
  let modal = document.getElementById('wil-order-tracker-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'wil-order-tracker-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300';
    modal.innerHTML = `
      <div class="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-gray-150 dark:border-white/10 overflow-hidden transform transition-all p-6 sm:p-7 relative" onclick="event.stopPropagation()">
        <button onclick="window.closeOrderTrackerModal()" class="absolute top-5 right-5 text-gray-400 hover:text-gray-700 dark:hover:text-white transition w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-800">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>

        <div class="flex items-center gap-3 mb-5">
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center text-xl shadow-sm">
            <i class="fa-solid fa-box-archive"></i>
          </div>
          <div>
            <h3 class="text-xl font-extrabold text-gray-900 dark:text-white">Tra Cứu Đơn Hàng</h3>
            <p class="text-xs text-gray-500">Nhập mã đơn hàng (WIL-BK-...) hoặc số điện thoại người đặt</p>
          </div>
        </div>

        <div class="flex gap-2 mb-4">
          <input type="text" id="tracker-input" placeholder="Ví dụ: WIL-BK-102938 hoặc 0905123456" class="flex-1 px-4 py-3 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase">
          <button onclick="executeOrderTracking()" class="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-md flex items-center gap-1.5 whitespace-nowrap">
            <i class="fa-solid fa-magnifying-glass"></i> Tra Cứu
          </button>
        </div>

        <div id="tracker-result-container" class="space-y-4 max-h-[60vh] overflow-y-auto pr-1"></div>
      </div>
    `;
    modal.onclick = () => window.closeOrderTrackerModal();
    document.body.appendChild(modal);
  }

  modal.classList.remove('hidden');
  const input = document.getElementById('tracker-input');
  if (prefillCode && input) {
    input.value = prefillCode;
    executeOrderTracking();
  } else if (input) {
    input.focus();
  }
};

window.closeOrderTrackerModal = function() {
  const modal = document.getElementById('wil-order-tracker-modal');
  if (modal) modal.classList.add('hidden');
};

window.executeOrderTracking = async function() {
  const input = document.getElementById('tracker-input');
  const resContainer = document.getElementById('tracker-result-container');
  if (!input || !resContainer) return;

  const val = input.value.trim();
  if (!val) {
    alert('Vui lòng nhập Mã Đơn Hàng hoặc Số Điện Thoại!');
    return;
  }

  resContainer.innerHTML = `
    <div class="p-6 text-center text-xs text-gray-400 flex flex-col items-center gap-2">
      <i class="fa-solid fa-circle-notch fa-spin text-emerald-600 text-2xl"></i>
      <span>Đang tra cứu hệ thống dữ liệu WILTravel...</span>
    </div>
  `;

  const result = await window.wilApi.trackBooking(val);

  if (!result.success || !result.data) {
    resContainer.innerHTML = `
      <div class="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-center">
        <p class="text-sm font-bold text-rose-700 dark:text-rose-400 mb-1">Không tìm thấy đơn hàng</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">${result.message || 'Vui lòng kiểm tra lại mã hoặc liên hệ Hotline 0905 025 737.'}</p>
      </div>
    `;
    return;
  }

  const items = Array.isArray(result.data) ? result.data : [result.data];

  resContainer.innerHTML = items.map(bk => `
    <div class="p-5 rounded-2xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200/80 dark:border-white/5 space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-xs font-black text-emerald-600 dark:text-emerald-400">${bk.orderId}</span>
        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          ${bk.status || 'Đã xác nhận'}
        </span>
      </div>

      <div class="border-t border-b border-gray-200/60 dark:border-white/5 py-3 space-y-1.5 text-xs">
        <p class="font-bold text-gray-900 dark:text-white line-clamp-1">${bk.tourName || bk.carName || bk.hotelName || 'Dịch vụ WILTravel'}</p>
        <div class="flex items-center justify-between text-gray-500">
          <span>Khách hàng: ${bk.customer ? (bk.customer.lastName + ' ' + bk.customer.firstName) : 'Quý khách'}</span>
          <span>Khởi hành: ${bk.date || bk.pickupDate || bk.checkIn || 'Theo thỏa thuận'}</span>
        </div>
        <div class="flex items-center justify-between text-gray-500">
          <span>Thanh toán: ${bk.paymentStatus || 'Chờ thanh toán'}</span>
          <span class="text-sm font-black text-rose-600 dark:text-rose-400">${formatPriceGlobal(bk.totalPayment)}</span>
        </div>
      </div>

      <div class="flex items-center justify-between text-[11px] text-gray-400">
        <span>Đặt lúc: ${new Date(bk.createdAt || Date.now()).toLocaleDateString('vi-VN')}</span>
        <a href="tel:0905025737" class="text-emerald-600 font-bold hover:underline flex items-center gap-1">
          <i class="fa-solid fa-phone"></i> Gọi Hỗ Trợ 24/7
        </a>
      </div>
    </div>
  `).join('');
};
