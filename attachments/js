// WILTravel - Central Shared State and Database Script v2.0

// 1. TOUR DATABASE (12 Tours với đầy đủ thông tin)
const tours = [
  {
    id: 1,
    name: "Phú Quốc 4N3Đ All Inclusive",
    location: "Phú Quốc",
    category: ["Biển", "Trong nước"],
    price: 3290000,
    image: "images/tour-phuquoc.jpg",
    rating: 4.8,
    reviews: 120,
    duration: "4 ngày 3 đêm",
    badge: "Bán chạy",
    includes: ["Vé máy bay khứ hồi", "Resort 4 sao sát biển", "Ăn sáng buffet & 2 bữa chính", "Hướng dẫn viên & xe đưa đón"],
    notes: ["Cần mang theo CMND/CCCD", "Đăng ký trước tối thiểu 7 ngày", "Trẻ em dưới 2 tuổi miễn phí vé"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Phú Quốc - Khám phá thị trấn Dương Đông", desc: "Tập trung tại sân bay Tân Sơn Nhất, bay ra Phú Quốc. Nhận phòng resort, nghỉ ngơi. Buổi tối khám phá chợ đêm Phú Quốc, thưởng thức hải sản tươi sống." },
      { day: "Ngày 2", title: "Tour Đảo - Câu Cá - Lặn Ngắm San Hô", desc: "Sáng ra khơi trên tàu gỗ, tham quan hòn Móng Tay, hòn Gầm Ghì. Câu cá, lặn ngắm san hô, nghe nhạc trên tàu. Ăn trưa hải sản tươi ngoài biển khơi." },
      { day: "Ngày 3", title: "VinWonders - Lễ hội ánh sáng", desc: "Tham quan VinWonders Phú Quốc, cáp treo vượt biển Hòn Thơm dài nhất thế giới. Tối tham quan khu Grand World, ngắm nhạc nước." },
      { day: "Ngày 4", title: "Mua sắm & Trở về", desc: "Sáng tự do mua sắm tại chợ Dương Đông. Đặc sản mang về: hồ tiêu Phú Quốc, nước mắm, ngọc trai. Bay về TP.HCM, kết thúc hành trình." }
    ]
  },
  {
    id: 2,
    name: "Sapa - Hà Giang 5N4Đ",
    location: "Sapa",
    category: ["Núi", "Trong nước"],
    price: 4190000,
    image: "images/tour-sapa.jpg",
    rating: 4.7,
    reviews: 95,
    duration: "5 ngày 4 đêm",
    badge: "Mới",
    includes: ["Xe giường nằm chất lượng cao", "Khách sạn 3 sao view núi", "Ăn uống theo chương trình Tây Bắc", "Vé tham quan các điểm Bản Cát Cát, Đèo Mã Pí Lèng"],
    notes: ["Nên mang theo giày thể thao đi bộ", "Mang theo áo ấm vì nhiệt độ vùng cao thấp", "Lịch trình có thể thay đổi nhẹ tùy thời tiết"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Hà Nội → Sapa", desc: "Bay đến Hà Nội, đón xe lên Sapa. Nhận phòng khách sạn view núi. Tối đi bộ tham quan thị trấn Sapa về đêm, thưởng thức thắng cố và rượu táo mèo." },
      { day: "Ngày 2", title: "Fansipan - Bản Cát Cát", desc: "Sáng lên cáp treo Fansipan - Nóc nhà Đông Dương 3.143m. Chiều khám phá bản Cát Cát của người H'Mông, xem múa khèn, mặc thử trang phục dân tộc." },
      { day: "Ngày 3", title: "Sapa → Hà Giang", desc: "Di chuyển lên Hà Giang, ghé thăm cột cờ Lũng Cú - điểm cực Bắc của Tổ quốc. Ngắm cao nguyên đá Đồng Văn - Di sản địa chất toàn cầu UNESCO." },
      { day: "Ngày 4", title: "Đèo Mã Pí Lèng - Sông Nho Quế", desc: "Chinh phục đèo Mã Pí Lèng hùng vĩ, ngắm sông Nho Quế uốn lượn xanh ngọc dưới vực thẳm. Check-in vách đá Tu Sản nổi tiếng." },
      { day: "Ngày 5", title: "Hà Giang → Hà Nội → Về", desc: "Di chuyển về Hà Nội, ghé thăm phố cổ Hà Nội, ăn bún chả, phở Hà Nội. Bay về TP.HCM, kết thúc hành trình." }
    ]
  },
  {
    id: 3,
    name: "Bali Thiên Đường 6N5Đ",
    location: "Bali",
    category: ["Biển", "Quốc tế"],
    price: 18500000,
    image: "images/tour-bali.jpg",
    rating: 4.9,
    reviews: 200,
    duration: "6 ngày 5 đêm",
    badge: "Hot",
    includes: ["Vé máy bay khứ hồi từ Việt Nam", "Khách sạn/Resort 4 sao có hồ bơi", "Các bữa ăn đặc sản Bali", "Sim 4G du lịch & Vé vào cổng các đền thờ cổ"],
    notes: ["Hộ chiếu còn hạn trên 6 tháng", "Đổi tiền USD hoặc IDR trước khi đi", "Trang phục lịch sự khi vào đền thờ"],
    itinerary: [
      { day: "Ngày 1", title: "Bay đến Bali - Kuta - Legian Beach", desc: "Đáp xuống sân bay quốc tế Ngurah Rai. Nhận phòng resort. Tắm biển Kuta, ngắm hoàng hôn tuyệt đẹp từ bờ biển Legian." },
      { day: "Ngày 2", title: "Ubud - Rừng Khỉ - Ruộng Bậc Thang Tegalalang", desc: "Khám phá Ubud - trung tâm nghệ thuật. Tham quan Monkey Forest, cầu treo Bali Swing, check-in ruộng bậc thang Tegalalang nổi tiếng." },
      { day: "Ngày 3", title: "Đền Tanah Lot & Đền Uluwatu", desc: "Thăm đền Tanah Lot trên đá biển lúc hoàng hôn. Tối xem múa Kecak truyền thống tại đền Uluwatu." },
      { day: "Ngày 4", title: "Cổng Trời Lempuyang - Núi Lửa Agung", desc: "Check-in cổng trời Lempuyang huyền bí với view núi lửa Agung. Ngắm hồ Batur, tắm suối nước nóng tự nhiên." },
      { day: "Ngày 5", title: "Nusa Dua - Mua sắm", desc: "Tắm biển cát trắng Nusa Dua. Mua sắm đặc sản Bali: batik, đồ thủ công mỹ nghệ, cà phê Luwak, dầu dừa." },
      { day: "Ngày 6", title: "Tự do & Bay về", desc: "Sáng tự do. Dùng bữa buffet chia tay. Ra sân bay, bay về Việt Nam với hành trang kỷ niệm." }
    ]
  },
  {
    id: 4,
    name: "Vịnh Hạ Long - Lan Hạ 4N3Đ",
    location: "Hạ Long",
    category: ["Biển", "Trong nước"],
    price: 5690000,
    image: "images/tour-halong.jpg",
    rating: 4.6,
    reviews: 110,
    duration: "4 ngày 3 đêm",
    badge: "",
    includes: ["Du thuyền sang trọng 5 sao (1 đêm)", "Khách sạn 4 sao tại Tuần Châu (2 đêm)", "Chèo thuyền kayak miễn phí", "Vé tham quan động Thiên Cung, hang Sửng Sốt"],
    notes: ["Mang theo đồ bơi & kem chống nắng", "Đăng ký quốc tịch trước khi lên tàu", "Nước uống miễn phí 2 chai/phòng/ngày"],
    itinerary: [
      { day: "Ngày 1", title: "Hà Nội → Hạ Long - Lên Du Thuyền", desc: "Xe đón tại Hà Nội, di chuyển đến Hạ Long. Lên du thuyền 5 sao, làm thủ tục nhận phòng. Tham quan hang Sửng Sốt, chèo kayak qua các hòn đảo đá vôi." },
      { day: "Ngày 2", title: "Thăm Đảo Ti Tốp - Lan Hạ Bay", desc: "Sáng sớm ngắm bình minh trên vịnh. Thăm đảo Ti Tốp, leo 400 bậc thang ngắm toàn cảnh Hạ Long. Di chuyển sang Lan Hạ Bay còn nguyên sơ." },
      { day: "Ngày 3", title: "Tuần Châu - Vịnh Bái Tử Long", desc: "Rời du thuyền, nhận phòng khách sạn Tuần Châu. Tham quan Bái Tử Long, thăm làng chài nổi của ngư dân, tìm hiểu cuộc sống trên biển." },
      { day: "Ngày 4", title: "Tham Quan & Về Hà Nội", desc: "Thăm động Thiên Cung lộng lẫy với nhũ đá muôn màu. Mua hải sản khô, đặc sản vùng biển. Xe đưa về Hà Nội, kết thúc tour." }
    ]
  },
  {
    id: 5,
    name: "Đà Nẵng - Hội An 4N3Đ",
    location: "Đà Nẵng",
    category: ["Biển", "Trong nước"],
    price: 3890000,
    image: "images/tour-danang.jpg",
    rating: 4.7,
    reviews: 140,
    duration: "4 ngày 3 đêm",
    badge: "Bán chạy",
    includes: ["Vé máy bay khứ hồi", "Khách sạn 4 sao gần biển Mỹ Khê", "Vé cáp treo Bà Nà Hills & Buffet trưa", "Vé tham quan phố cổ Hội An"],
    notes: ["Bà Nà Hills thường có sương mù vào chiều", "Chuẩn bị mũ nón cho các điểm ngoài trời", "Hỗ trợ xe điện di chuyển trong phố cổ"],
    itinerary: [
      { day: "Ngày 1", title: "Bay đến Đà Nẵng - Bà Nà Hills", desc: "Bay đến Đà Nẵng. Trực chỉ Bà Nà Hills - leo cáp treo dài nhất thế giới, thăm Cầu Vàng trong mây, vườn hoa Le Jardin d'Amour." },
      { day: "Ngày 2", title: "Hội An - Phố Cổ Đêm", desc: "Di chuyển sang Hội An. Khám phá Phố cổ Hội An - Di sản Văn hóa Thế giới UNESCO. Tham quan Chùa Cầu, phố Đèn lồng. Thả đèn hoa đăng trên sông Hoài." },
      { day: "Ngày 3", title: "Mỹ Sơn - Biển Mỹ Khê", desc: "Thăm Thánh địa Mỹ Sơn của người Chăm. Chiều về tắm biển Mỹ Khê - một trong những bãi biển đẹp nhất hành tinh theo Forbes." },
      { day: "Ngày 4", title: "Ngũ Hành Sơn - Bay về", desc: "Tham quan núi đá cẩm thạch Ngũ Hành Sơn, mua đặc sản: bánh mì Phượng, mì Quảng, cao lầu Hội An. Bay về TP.HCM." }
    ]
  },
  {
    id: 6,
    name: "Nhật Bản Mùa Hoa Anh Đào",
    location: "Tokyo - Osaka",
    category: ["Thành phố", "Quốc tế"],
    price: 32900000,
    image: "images/tour-japan.jpg",
    rating: 5.0,
    reviews: 250,
    duration: "6 ngày 5 đêm",
    badge: "Premium",
    includes: ["Vé máy bay khứ hồi Vietnam Airlines", "Lệ phí visa du lịch Nhật Bản", "Khách sạn 3-4 sao trung tâm", "Trải nghiệm tắm Onsen truyền thống & Tàu Shinkansen"],
    notes: ["Hồ sơ visa nộp trước tối thiểu 1 tháng", "Thời tiết mùa xuân lạnh (10-15°C)", "Cần tuân thủ quy định hướng dẫn viên"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Tokyo - Narita", desc: "Bay đêm đến Tokyo. Nhận phòng khách sạn tại Shinjuku. Tối dạo phố Shibuya, ngắm Crossing nổi tiếng nhất thế giới." },
      { day: "Ngày 2", title: "Tokyo - Công viên Ueno - Asakusa", desc: "Thăm đền Senso-ji cổ kính tại Asakusa. Ngắm hoa anh đào tại công viên Ueno. Tham quan Akihabara - thiên đường điện tử." },
      { day: "Ngày 3", title: "Hakone - Núi Phú Sĩ", desc: "Lên tàu Shinkansen đến Hakone. Ngắm Phú Sĩ từ hồ Ashi. Tắm Onsen suối nước nóng truyền thống Nhật Bản, mặc Yukata." },
      { day: "Ngày 4", title: "Kyoto - Chùa Kinkaku-ji", desc: "Di chuyển Shinkansen đến Kyoto. Thăm chùa Vàng Kinkaku-ji. Dạo con đường Triết học ngắm hoa anh đào. Tham quan Fushimi Inari - ngàn cổng torii đỏ." },
      { day: "Ngày 5", title: "Osaka - Mua sắm", desc: "Thăm lâu đài Osaka, phố Dotonbori ẩm thực sầm uất. Mua sắm tại Shinsaibashi. Thưởng thức takoyaki, okonomiyaki, ramen Osaka chính gốc." },
      { day: "Ngày 6", title: "Bay về Việt Nam", desc: "Sáng tự do mua sắm. Đến sân bay Kansai, bay về TP.HCM. Kết thúc hành trình đáng nhớ tại đất nước mặt trời mọc." }
    ]
  },
  {
    id: 7,
    name: "Đà Lạt Lãng Mạn 3N2Đ",
    location: "Đà Lạt",
    category: ["Núi", "Trong nước"],
    price: 2490000,
    image: "images/tour-dalat.jpg",
    rating: 4.5,
    reviews: 80,
    duration: "3 ngày 2 đêm",
    badge: "",
    includes: ["Xe limousine đưa đón từ TP.HCM", "Khách sạn trung tâm gần chợ Đà Lạt", "Vé tham quan Thung lũng tình yêu, Langbiang", "Lẩu rau buffet Đà Lạt"],
    notes: ["Đà Lạt se lạnh về đêm và sáng sớm", "Nên chuẩn bị trang phục giữ ấm nhẹ", "Có thời gian tự do khám phá chợ đêm"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Đà Lạt - Thác Datanla", desc: "Xe limousine khởi hành sáng sớm. Đến Đà Lạt, tham quan Thác Datanla, trượt ray máng hào hứng. Chiều khám phá Vườn hoa Đà Lạt rực rỡ." },
      { day: "Ngày 2", title: "Langbiang - Thung Lũng Tình Yêu", desc: "Leo núi Langbiang bằng xe jeep, ngắm Đà Lạt từ độ cao 2.167m. Tham quan Thung lũng Tình Yêu thơ mộng. Tối chợ đêm Đà Lạt, thử bánh tráng nướng, sữa đậu nành nóng." },
      { day: "Ngày 3", title: "Vườn Dâu - Làng Cù Lần - Về TP.HCM", desc: "Hái dâu tại vườn nông nghiệp. Ghé Làng Cù Lần nguyên sơ. Mua đặc sản mang về: mứt, rượu vang Đà Lạt, hoa khô, cà phê weasel. Xe về TP.HCM." }
    ]
  },
  {
    id: 8,
    name: "Nha Trang - Ninh Hòa 3N2Đ",
    location: "Nha Trang",
    category: ["Biển", "Trong nước"],
    price: 2890000,
    image: "images/tour-nhatrang.jpg",
    rating: 4.6,
    reviews: 105,
    duration: "3 ngày 2 đêm",
    badge: "",
    includes: ["Xe giường nằm đưa đón", "Khách sạn 3 sao sát biển Trần Phú", "Tour đảo 3 vịnh có lặn ngắm san hô", "Vé tắm bùn khoáng nóng chăm sóc sức khỏe"],
    notes: ["Nên mang theo túi chống nước điện thoại", "Uống đủ nước khi đi tour đảo", "Có dịch vụ chụp hình dưới nước có phí"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Nha Trang - Tháp Chàm", desc: "Xe giường nằm khởi hành tối. Đến Nha Trang sáng sớm, nhận phòng, nghỉ ngơi. Chiều thăm Tháp Bà Ponagar, tắm biển Trần Phú." },
      { day: "Ngày 2", title: "Tour 4 Đảo - Lặn Ngắm San Hô", desc: "Lên tàu đi tour 4 đảo: Hòn Tằm, Hòn Miễu, Hòn Mun. Lặn ngắm san hô đẹp nhất Đông Nam Á. Ăn trưa hải sản tươi ngoài biển. Chiều tắm bùn khoáng Nha Trang." },
      { day: "Ngày 3", title: "Vinpearl - Mua sắm - Về TP.HCM", desc: "Tham quan Vinpearl Land hoặc tự do. Mua đặc sản: yến sào Khánh Hòa, mực khô, bánh căn. Tối xe về TP.HCM." }
    ]
  },
  {
    id: 9,
    name: "Singapore - Malaysia 5N4Đ",
    location: "Singapore",
    category: ["Thành phố", "Quốc tế"],
    price: 10990000,
    image: "images/hero3.jpg",
    rating: 4.8,
    reviews: 165,
    duration: "5 ngày 4 đêm",
    badge: "Hot",
    includes: ["Vé máy bay khứ hồi quốc tế", "Khách sạn 3-4 sao tiện nghi", "Vé tham quan Gardens by the Bay, Cao nguyên Genting", "Xe du lịch đưa đón suốt tuyến"],
    notes: ["Hộ chiếu hạn trên 6 tháng", "Không mang kẹo cao su vào Singapore", "Múi giờ đi nhanh hơn Việt Nam 1 tiếng"],
    itinerary: [
      { day: "Ngày 1", title: "Bay đến Singapore - Orchard Road", desc: "Bay đến Changi Airport - sân bay đẹp nhất thế giới 8 năm liền. Khám phá Jewel Changi với thác nước trong nhà cao nhất thế giới. Dạo phố mua sắm Orchard Road." },
      { day: "Ngày 2", title: "Marina Bay - Gardens by the Bay", desc: "Tham quan Merlion - biểu tượng Singapore. Marina Bay Sands Sky Park. Gardens by the Bay với siêu cây phát sáng. Tối xem Light & Sound Show." },
      { day: "Ngày 3", title: "Đảo Sentosa - Universal Studios", desc: "Qua eo biển đến đảo Sentosa. Trải nghiệm Universal Studios Singapore hoặc tắm biển Palawan. Cáp treo Cable Car." },
      { day: "Ngày 4", title: "Malaysia - Cao nguyên Genting - KL", desc: "Xe di chuyển sang Malaysia. Lên Genting Highlands - Las Vegas của Châu Á. Thành phố Kuala Lumpur, Tháp Đôi Petronas, Central Market." },
      { day: "Ngày 5", title: "KL - Bay về Việt Nam", desc: "Khám phá Batu Caves nổi tiếng. Mua sắm tại Bukit Bintang. Bay về Việt Nam, kết thúc hành trình." }
    ]
  },
  {
    id: 10,
    name: "Thái Lan - Bangkok - Pattaya 5N4Đ",
    location: "Thái Lan",
    category: ["Biển", "Quốc tế"],
    price: 6490000,
    image: "images/bali.jpg",
    rating: 4.7,
    reviews: 180,
    duration: "5 ngày 4 đêm",
    badge: "Bán chạy",
    includes: ["Vé máy bay khứ hồi kèm hành lý ký gửi", "Khách sạn 4 sao sang trọng", "Vé xem Alcazar Show / Tiffany Show", "Ăn buffet nhà hàng xoay 86 tầng Baiyoke Sky"],
    notes: ["Chuẩn bị tiền Baht Thái tiêu dùng", "Mặc quần áo dài qua gối khi thăm Chùa Bình Minh", "Nên thử massage Thái truyền thống"],
    itinerary: [
      { day: "Ngày 1", title: "Bay đến Bangkok - Wat Arun", desc: "Bay đến Suvarnabhumi. Tham quan chùa Wat Arun - Chùa Bình Minh rực rỡ. Tối du thuyền sông Chao Phraya, ngắm Bangkok về đêm." },
      { day: "Ngày 2", title: "Cung điện Hoàng Gia - Wat Pho", desc: "Tham quan Grand Palace tráng lệ, chùa Wat Pho với tượng Phật Nằm khổng lồ. Tối buffet tầng 86 nhà hàng xoay Baiyoke Sky." },
      { day: "Ngày 3", title: "Bangkok → Pattaya", desc: "Di chuyển xuống Pattaya. Thăm chùa Phật sườn đồi. Tối xem show Alcazar / Tiffany nổi tiếng thế giới." },
      { day: "Ngày 4", title: "Đảo Coral - Lặn Biển", desc: "Tàu ra đảo Coral Island. Tham gia các hoạt động: Parasailing, Jet Ski, lặn ống thở. Ăn trưa hải sản tươi. Tối walking street Pattaya." },
      { day: "Ngày 5", title: "Pattaya → Bangkok - Về VN", desc: "Mua sắm tại Pattaya, gems gallery. Xe về Bangkok. Bay về Việt Nam." }
    ]
  },
  {
    id: 11,
    name: "Miền Tây Sông Nước Cần Thơ - Bến Tre 2N1Đ",
    location: "Mekong",
    category: ["Trong nước"],
    price: 1790000,
    image: "images/hero2.jpg",
    rating: 4.5,
    reviews: 74,
    duration: "2 ngày 1 đêm",
    badge: "",
    includes: ["Xe du lịch máy lạnh đưa đón", "Khách sạn 3 sao có hồ bơi tại Cần Thơ", "Xuồng chèo ba lá đi len lỏi rạch dừa nước", "Vé tham quan Chợ nổi Cái Răng, vườn cây ăn trái"],
    notes: ["Nên mang theo thuốc chống muỗi", "Chuẩn bị nón lá và áo khoác mỏng", "Mua trái cây tại vườn giá rất rẻ"],
    itinerary: [
      { day: "Ngày 1", title: "TP.HCM → Bến Tre → Cần Thơ", desc: "Khởi hành sáng sớm. Đến Bến Tre, đi xuồng len lỏi rạch dừa nước xanh mướt. Thăm làng nghề kẹo dừa, làm kẹo dừa thủ công. Chiều di chuyển về Cần Thơ, nhận phòng." },
      { day: "Ngày 2", title: "Chợ Nổi Cái Răng - Về TP.HCM", desc: "4h30 sáng ra thuyền đến chợ nổi Cái Răng độc đáo. Thưởng thức bún cá, bánh cống Cần Thơ. Tham quan vườn trái cây, tự tay hái và thưởng thức. Xe về TP.HCM." }
    ]
  },
  {
    id: 12,
    name: "Hà Nội - Tràng An - Bái Đính 3N2Đ",
    location: "Ninh Bình",
    category: ["Núi", "Trong nước"],
    price: 2990000,
    image: "images/hero1.jpg",
    rating: 4.6,
    reviews: 90,
    duration: "3 ngày 2 đêm",
    badge: "Mới",
    includes: ["Xe đưa đón tham quan theo lịch trình", "Khách sạn tại phố cổ Hà Nội (2 đêm)", "Vé đò Tràng An & Vé xe điện chùa Bái Đính", "Ăn uống đặc sản dê núi Ninh Bình"],
    notes: ["Đường đi chùa Bái Đính đi bộ khá nhiều", "Nên mặc trang phục trang nghiêm khi viếng chùa", "Nên thử bánh mì và cafe trứng Hà Nội"],
    itinerary: [
      { day: "Ngày 1", title: "Bay đến Hà Nội - Phố Cổ", desc: "Bay đến Nội Bài. Khám phá phố cổ Hà Nội 36 phố phường. Thăm Hồ Gươm, đền Ngọc Sơn, cầu Thê Húc. Tối thưởng thức bún chả, cafe trứng huyền thoại." },
      { day: "Ngày 2", title: "Ninh Bình - Tràng An - Bái Đính", desc: "Di chuyển đến Ninh Bình. Đi đò thuyền Tràng An qua các hang động kỳ bí. Thăm chùa Bái Đính - ngôi chùa lớn nhất Đông Nam Á. Ăn thịt dê núi đặc sản." },
      { day: "Ngày 3", title: "Hà Nội - Mua sắm - Bay về", desc: "Thăm Văn Miếu Quốc Tử Giám. Mua đặc sản: bánh cốm, ô mai, trà sen. Bay về TP.HCM, kết thúc hành trình đất Bắc." }
    ]
  }
];

// 2. LOCAL STORAGE CORE FUNCTIONS

// Auth Management
function getCurrentUser() {
  const user = localStorage.getItem('wil_current_user');
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem('wil_current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('wil_current_user');
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

async function googleLogin(lastName, firstName, email) {
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
        body: JSON.stringify({ lastName, firstName, email })
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
    { orderId: "ORD1001", tourId: 1, date: "2026-06-01", quantity: 1, price: 3290000, total: 3290000, status: "Chờ Xác Nhận" },
    { orderId: "ORD1002", tourId: 2, date: "2026-05-25", quantity: 1, price: 4190000, total: 4190000, status: "Hoàn Tất" }
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
    { name: "Hành trình di sản Huế cổ kính 3N2Đ", price: 2490000, duration: "3 ngày 2 đêm", badge: "Hot" },
    { name: "Nghỉ dưỡng Lăng Cô - Huế Premium 4N3Đ", price: 4890000, duration: "4 ngày 3 đêm", badge: "Trọn gói" },
    { name: "Tour Huế - Đà Nẵng - Hội An Di Sản Miền Trung 5N4Đ", price: 5290000, duration: "5 ngày 4 đêm", badge: "Bán chạy" },
    { name: "Khám phá ẩm thực & văn hóa cố đô Huế 2N1Đ", price: 1690000, duration: "2 ngày 1 đêm", badge: "Giá tốt" }
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
      includes: ["Khách sạn trung tâm tiện nghi", "Ăn uống đặc sản cố đô", "Vé tham quan Đại Nội, các lăng tẩm", "Hướng dẫn viên nhiệt tình"],
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
      includes: ["Vé máy bay khứ hồi hoặc xe du lịch đời mới", "Khách sạn tiêu chuẩn tiện nghi đầy đủ", "Vé tham quan các điểm trong chương trình", "Bảo hiểm du lịch trọn gói"],
      notes: ["Mang theo trang phục phù hợp thời tiết", "Chú ý lịch khởi hành và thời gian tập trung", "Trẻ em nhận ưu đãi giá theo chiều cao"],
      itinerary
    });
  }
}

// Injected Dark Mode Styles (Tailwind overrides)
function injectDarkModeStyles() {
  const css = `
    body.dark-mode {
      background-color: #0f172a !important;
      color: #f8fafc !important;
    }
    body.dark-mode nav {
      background-color: #1e293b !important;
      border-color: #334155 !important;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2) !important;
    }
    body.dark-mode nav #mobile-menu {
      background-color: #1e293b !important;
      border-color: #334155 !important;
    }
    body.dark-mode nav a, body.dark-mode nav button, body.dark-mode nav div, body.dark-mode nav span {
      color: #e2e8f0 !important;
    }
    body.dark-mode nav a:hover, body.dark-mode nav button:hover {
      color: #4ade80 !important;
    }
    body.dark-mode nav .bg-green-600 {
      background-color: #16a34a !important;
      color: white !important;
    }
    body.dark-mode nav .bg-green-600:hover {
      background-color: #15803d !important;
    }
    body.dark-mode .bg-white,
    body.dark-mode .bg-gray-50,
    body.dark-mode .bg-gray-100,
    body.dark-mode .bg-gray-50\\/50 {
      background-color: #1e293b !important;
      color: #e2e8f0 !important;
    }
    body.dark-mode .shadow-xl,
    body.dark-mode .shadow-2xl,
    body.dark-mode .shadow-md {
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3) !important;
    }
    body.dark-mode .border,
    body.dark-mode .border-gray-200,
    body.dark-mode .border-gray-300,
    body.dark-mode .border-gray-100,
    body.dark-mode .border-gray-150 {
      border-color: #334155 !important;
    }
    body.dark-mode .text-gray-800,
    body.dark-mode .text-gray-700,
    body.dark-mode .text-gray-600,
    body.dark-mode .text-gray-500,
    body.dark-mode .text-gray-400 {
      color: #cbd5e1 !important;
    }
    body.dark-mode .text-black {
      color: #ffffff !important;
    }
    body.dark-mode input,
    body.dark-mode select,
    body.dark-mode textarea {
      background-color: #0f172a !important;
      color: #ffffff !important;
      border-color: #334155 !important;
    }
    body.dark-mode input::placeholder,
    body.dark-mode textarea::placeholder {
      color: #475569 !important;
    }
    body.dark-mode .search-container {
      background-color: #1e293b !important;
    }
    body.dark-mode .search-container input {
      background-color: transparent !important;
    }
    body.dark-mode #chatbot-window {
      background-color: #1e293b !important;
      border-color: #334155 !important;
    }
    body.dark-mode #chatbot-window .bg-white {
      background-color: #1e293b !important;
    }
    body.dark-mode #chat-messages {
      background-color: #0f172a !important;
    }
    body.dark-mode .chat-bubble-tina {
      background-color: #334155 !important;
      color: #f8fafc !important;
    }
    body.dark-mode .bg-emerald-50, 
    body.dark-mode .bg-green-50,
    body.dark-mode .bg-green-100 {
      background-color: #064e3b !important;
      color: #a7f3d0 !important;
    }
    body.dark-mode .text-green-600,
    body.dark-mode .text-green-700,
    body.dark-mode .text-emerald-600,
    body.dark-mode .text-emerald-700 {
      color: #4ade80 !important;
    }
    body.dark-mode footer,
    body.dark-mode .bg-gray-900 {
      background-color: #020617 !important;
      color: #94a3b8 !important;
    }
    body.dark-mode footer a, body.dark-mode footer p {
      color: #94a3b8 !important;
    }
    body.dark-mode footer a:hover {
      color: #4ade80 !important;
    }
    body.dark-mode footer .brightness-0.invert {
      filter: brightness(0) invert(1) !important;
    }
  `;
  const style = document.createElement('style');
  style.id = 'dark-mode-injected-styles';
  style.innerHTML = css;
  document.head.appendChild(style);
}

// Generate 100 tours on script load
generateMoreTours();
injectDarkModeStyles();

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

  // 4. Inject Desktop Dark Mode Toggle Button dynamically next to Cart
  const firstCartLink = document.querySelector('a[href="cart.html"]');
  if (firstCartLink && firstCartLink.parentElement) {
    const parent = firstCartLink.parentElement;
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
      background-color: #f3f4f6;
      color: #1f2937;
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
      background-color: #ecfdf5;
      border-color: #10b981;
      color: #047857;
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
    <div id="chatbot-window" class="w-[calc(100vw-48px)] sm:w-[380px] h-[500px] max-h-[70vh] bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col mb-4">
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 to-emerald-700 p-4 text-white flex items-center justify-between shadow-sm shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 text-xl font-bold relative">
            T
            <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-green-600 rounded-full"></span>
          </div>
          <div>
            <h4 class="font-bold text-sm">Trợ lý ảo Tina</h4>
            <p class="text-[11px] text-green-100 flex items-center gap-1"><i class="fa-solid fa-circle text-[6px] text-emerald-400"></i> Sẵn sàng hỗ trợ 24/7</p>
          </div>
        </div>
        <button onclick="toggleTinaChat()" class="text-white/80 hover:text-white text-2xl px-2">×</button>
      </div>

      <!-- Messages Body -->
      <div id="chat-messages" class="flex-grow p-4 overflow-y-auto space-y-3 bg-gray-50/50 text-sm">
        <!-- Welcome Message -->
        <div class="flex gap-2 items-start">
          <div class="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">T</div>
          <div class="p-3 chat-bubble-tina max-w-[80%] leading-relaxed shadow-sm">
            Xin chào! Mình là <strong>Tina</strong> - trợ lý ảo của WILTravel. Mình có thể giúp gì cho bạn hôm nay? 😊
          </div>
        </div>
      </div>

      <!-- Quick Replies -->
      <div class="px-4 py-2 bg-white border-t border-gray-100 flex flex-wrap gap-1.5 shrink-0">
        <button onclick="askTina('Tư vấn Tour du lịch')" class="chat-quick-reply px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 font-medium bg-white">🗺️ Tư vấn Tour</button>
        <button onclick="askTina('Hỏi đáp FAQ & Chính sách')" class="chat-quick-reply px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 font-medium bg-white">❓ Chính sách & FAQ</button>
        <button onclick="askTina('Giới thiệu WILTravel')" class="chat-quick-reply px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 font-medium bg-white">🏢 Về công ty</button>
        <button onclick="askTina('Liên hệ nhân viên hỗ trợ')" class="chat-quick-reply px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 font-medium bg-white">📞 Gặp hỗ trợ</button>
      </div>

      <!-- Input Form -->
      <form onsubmit="handleTinaSubmit(event)" class="p-3 bg-white border-t border-gray-150 flex gap-2 shrink-0">
        <input type="text" id="tina-input" placeholder="Nhập câu hỏi của bạn..." class="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:border-green-500 bg-gray-50/50">
        <button type="submit" class="bg-green-600 hover:bg-green-700 text-white w-10 h-10 rounded-2xl flex items-center justify-center transition shadow-md shadow-green-600/10 shrink-0">
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

window.askTina = function(text) {
  addMessage(text, 'user');
  showTinaTyping();
  setTimeout(() => {
    hideTinaTyping();
    const response = getTinaResponse(text);
    addMessage(response, 'tina');
  }, 1200);
};

window.handleTinaSubmit = function(e) {
  e.preventDefault();
  const input = document.getElementById('tina-input');
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';

  showTinaTyping();
  setTimeout(() => {
    hideTinaTyping();
    const response = getTinaResponse(text);
    addMessage(response, 'tina');
  }, 1200);
};

function addMessage(text, sender) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const isTina = sender === 'tina';
  const msgHtml = isTina 
    ? `<div class="flex gap-2 items-start">
         <div class="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">T</div>
         <div class="p-3 chat-bubble-tina max-w-[80%] leading-relaxed shadow-sm">${text}</div>
       </div>`
    : `<div class="flex justify-end">
         <div class="p-3 chat-bubble-user max-w-[80%] leading-relaxed shadow-sm">${text}</div>
       </div>`;

  container.insertAdjacentHTML('beforeend', msgHtml);
  container.scrollTop = container.scrollHeight;
}

// Intelligent response matching engine
function getTinaResponse(userInput) {
  const query = userInput.toLowerCase();

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

  // Smart matching for Huế and Backend Info
  if (query.includes('huế') || query.includes('hương') || query.includes('kinh thành') || query.includes('cố đô')) {
    return `🏯 <strong>Tour Cố Đô Huế Cổ Kính:</strong><br>
      Khám phá Kinh Thành Huế (Đại Nội), nghe ca Huế trên Sông Hương, viếng chùa Thiên Mụ cổ kính và thưởng thức tinh hoa ẩm thực Cung đình. WILTravel đang cung cấp các tour Huế giá cực tốt:<br>
      - <strong>Hành trình di sản Huế cổ kính 3N2Đ:</strong> Giá chỉ từ 2.49tr VNĐ.<br>
      - <strong>Nghỉ dưỡng Lăng Cô - Huế Premium 4N3Đ:</strong> Resort sát biển Lăng Cô cực sang chảnh.<br>
      👉 <a href="tours.html" class="text-green-600 font-bold hover:underline">Xem danh sách Tour Huế ngay</a>`;
  }

  if (query.includes('backend') || query.includes('cơ sở dữ liệu') || query.includes('lưu') || query.includes('tài khoản')) {
    return `💾 <strong>Hệ thống Backend & Cơ sở dữ liệu:</strong><br>
      - WILTravel đã tích hợp hệ thống backend Node.js & Express thực tế!<br>
      - Thông tin tài khoản đăng ký và lịch sử đăng nhập được lưu trữ an toàn trong cơ sở dữ liệu file JSON của máy chủ (\`data/users.json\`).<br>
      - Nếu bạn chạy ở chế độ file tĩnh (\`file://\`), hệ thống sẽ tự động dùng \`localStorage\` dự phòng tiện lợi.`;
  }

  // 1. Tour consultation & Flight Intent
  if (query.includes('vé máy bay') || query.includes('chuyến bay') || query.includes('bay đi')) {
    return `✈️ <strong>Dịch vụ Vé máy bay WILTravel:</strong><br>
      Bên mình hợp tác với hơn 10 hãng hàng không lớn, giá rẻ hơn thị trường từ 10-15%.<br>
      👉 Bạn có thể tự tra cứu chuyến bay và đặt vé ngay tại đây: <a href="flight.html" class="text-green-600 font-bold hover:underline">Hệ thống Đặt vé máy bay</a>.`;
  }
  
  if (query.includes('đặt tour') || query.includes('mua tour') || query.includes('cách đặt')) {
    return `🛍️ <strong>Hướng dẫn Đặt Tour:</strong><br>
      1. Tìm tour ưng ý trên website.<br>
      2. Bấm "Thêm vào giỏ" hoặc "Đặt tour".<br>
      3. Vào giỏ hàng điền thông tin và thanh toán (chuyển khoản / MoMo).<br>
      👉 Xem giỏ hàng của bạn tại: <a href="cart.html" class="text-green-600 font-bold hover:underline">Giỏ hàng</a>.`;
  }

  if (query.includes('tour') && !query.includes('tìm') && query.length < 15) {
    // Basic tour greeting
    if (typeof tours !== 'undefined' && tours.length > 0) {
      const topTours = tours.slice(0, 3);
      let list = `<p class="mb-2">WILTravel hiện có nhiều tour du lịch chất lượng cao. Dưới đây là 3 tour tiêu biểu được yêu thích nhất hiện tại:</p><ul class="space-y-2.5 mt-2">`;
      topTours.forEach(t => {
        list += `<li class="bg-white p-2.5 rounded-xl border border-gray-100 shadow-xs">
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

  // 2. Advanced NLP Scoring System for Tour Search
  let scoredTours = tours.map(t => {
    let score = 0;
    const term = query.trim().toLowerCase();
    
    // Explicit location match
    if (term.includes(t.location.toLowerCase())) score += 10;
    
    // Explicit name match
    if (t.name.toLowerCase().includes(term) && term.length > 3) score += 5;
    
    // Category mapping (e.g. "biển", "núi")
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

  // If there are specific queries but no matches
  if (scoredTours.length > 0) {
    const topTours = scoredTours.slice(0, 3);
    let list = `✨ <strong>Mình tìm thấy ${scoredTours.length} tour phù hợp với yêu cầu của bạn:</strong><br><ul class="space-y-2.5 mt-2">`;
    topTours.forEach(t => {
      list += `<li class="bg-white p-2.5 rounded-xl border border-gray-100 shadow-xs">
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

  // 3. Price & Discounts
  if (query.includes('giá') || query.includes('bao nhiêu') || query.includes('tiền') || query.includes('khuyến mãi') || query.includes('mã giảm') || query.includes('rẻ') || query.includes('coupon')) {
    return `💵 <strong>Chương trình ưu đãi hiện tại của WILTravel:</strong><br>
      - Giá tour của chúng mình cam kết cạnh tranh nhất thị trường, chỉ từ 1.79tr VNĐ.<br>
      - Áp dụng mã <strong class="text-green-600 font-mono">SAVE100</strong> để giảm 100k cho hóa đơn trên 2tr VNĐ.<br>
      - Áp dụng mã <strong class="text-green-600 font-mono">FRIEND20</strong> giảm ngay 20% khi đặt theo nhóm hoặc giới thiệu bạn bè.<br>
      👉 Xem thêm các ưu đãi flash sale tại trang <a href="deals.html" class="text-green-600 font-bold hover:underline">Khuyến mãi & Ưu đãi</a>.`;
  }

  // 4. Payment & Billing
  if (query.includes('thanh toán') || query.includes('chuyển khoản') || query.includes('ngân hàng') || query.includes('momo') || query.includes('tiền mặt')) {
    return `💳 <strong>Phương thức thanh toán:</strong><br>
      WILTravel hỗ trợ đa dạng phương thức thanh toán an toàn:<br>
      1. Chuyển khoản ngân hàng qua mã VietQR (MB Bank).<br>
      2. Thanh toán ví điện tử MoMo cực nhanh.<br>
      3. Thẻ tín dụng/ghi nợ nội địa và quốc tế (Visa, Mastercard, JCB).<br>
      Hệ thống thanh toán của chúng mình được bảo mật đa tầng, cam kết an toàn tuyệt đối.`;
  }

  // 5. Cancellation & Refunds
  if (query.includes('hủy') || query.includes('hoàn tiền') || query.includes('trả phòng') || query.includes('đổi ngày') || query.includes('chính sách')) {
    return `🔄 <strong>Chính sách Hủy & Hoàn tiền:</strong><br>
      Chúng mình cam kết hoàn tiền linh hoạt nếu kế hoạch của bạn thay đổi:<br>
      - Hủy trước 30 ngày khởi hành: Hoàn tiền <strong>100%</strong>.<br>
      - Hủy từ 15 đến 30 ngày: Hoàn tiền <strong>80%</strong>.<br>
      - Hủy từ 7 đến 15 ngày: Hoàn tiền <strong>50%</strong>.<br>
      - Đổi ngày tour miễn phí trước 7 ngày (nếu còn chỗ trống).<br>
      👉 Đọc chi tiết tại trang <a href="faq.html" class="text-green-600 font-bold hover:underline">Câu hỏi thường gặp (FAQ)</a>.`;
  }

  // 6. Company profile
  if (query.includes('địa chỉ') || query.includes('văn phòng') || query.includes('đâu') || query.includes('thành lập') || query.includes('năm') || query.includes('công ty')) {
    return `🏢 <strong>Về Công ty Du lịch WILTravel:</strong><br>
      - <strong>Thành lập năm:</strong> 2011.<br>
      - <strong>Tên pháp lý:</strong> Công ty TNHH Thương mại Dịch vụ Du lịch WILTRAVEL.<br>
      - <strong>Trụ sở chính:</strong> 72/10/6 Văn Chung, Quận Tân Bình, Tp.HCM.<br>
      - <strong>Sứ mệnh:</strong> Mang đến những hành trình du lịch chất lượng cao, an toàn và mức giá tối ưu nhất cho người Việt.<br>
      👉 Chi tiết thêm tại trang <a href="about.html" class="text-green-600 font-bold hover:underline">Về chúng tôi</a>.`;
  }

  // 7. Human Support
  if (query.includes('nhân viên') || query.includes('hotline') || query.includes('điện thoại') || query.includes('gặp') || query.includes('phương') || query.includes('sđt') || query.includes('gọi')) {
    return `📞 <strong>Liên hệ Hỗ trợ Trực tiếp:</strong><br>
      Bạn muốn gặp nhân viên tư vấn trực tiếp? Vui lòng liên hệ với hotline hoặc zalo:<br>
      - <strong>Hotline/Zalo:</strong> <a href="tel:0905025737" class="text-green-600 font-bold hover:underline">0905 025 737</a> gặp <strong>Ms. Phương</strong>.<br>
      - <strong>Email hỗ trợ:</strong> info@wil-travel.com.<br>
      Chúng mình trực hotline 24/7 để đồng hành cùng chuyến đi của bạn!`;
  }

  // 8. Simple greetings
  if (query.includes('chào') || query.includes('hi') || query.includes('hello') || query.includes('tina') || query.includes('ở đó không')) {
    return "Xin chào! Mình là Tina đây. Mình có thể hỗ trợ tư vấn các tour du lịch, cung cấp thông tin về công ty, chính sách hoàn tiền hoặc kết nối bạn với nhân viên hỗ trợ. Bạn muốn tìm hiểu về dịch vụ nào? 😊";
  }
  if (query.includes('cảm ơn') || query.includes('thanks') || query.includes('tốt quá') || query.includes('ok')) {
    return "Rất vui được giúp ích cho bạn! Chúc bạn có một ngày vui vẻ và những chuyến đi đầy ắp kỷ niệm đẹp cùng WILTravel. Nếu cần gì thêm, cứ nhắn Tina nhé! ❤️";
  }
  if (query.includes('tạm biệt') || query.includes('bye')) {
    return "Tạm biệt bạn! Hẹn gặp lại bạn trong những hành trình khám phá thế giới tuyệt vời sắp tới! 👋🌸";
  }

  // 9. Fallback response with AI behavior simulation
  const greetings = [
    "Dạ, Tina chưa hiểu rõ ý bạn lắm.",
    "Bạn có thể nói rõ hơn một chút được không?",
    "Tina đang học hỏi thêm, bạn có thể diễn đạt lại câu hỏi giúp Tina nhé!"
  ];
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  
  return `🤖 ${randomGreeting} Bạn có thể thử các câu hỏi chi tiết hơn như:<br>
    - <em>"Tôi muốn đi biển 3 ngày 2 đêm giá rẻ"</em><br>
    - <em>"Có tour nào đi Sapa sang trọng không?"</em><br>
    - <em>"Tôi muốn mua vé máy bay đi Hà Nội"</em><br>
    Hoặc liên hệ trực tiếp với <strong>Ms. Phương (Hotline: 0905 025 737)</strong> để nhận hỗ trợ ngay nhé!`;
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

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Apply dark mode immediately
  if (isDarkMode()) applyDarkMode(true);

  updateNavbar();
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
