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

function registerUser(firstName, lastName, email, phone, password) {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Email đã được đăng ký!' };
  }
  const newUser = { firstName, lastName, email, phone, password };
  users.push(newUser);
  localStorage.setItem('wil_users', JSON.stringify(users));
  return { success: true };
}

function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
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
  // Update toggle button icon
  const toggleBtn = document.getElementById('dark-mode-toggle');
  if (toggleBtn) {
    toggleBtn.innerHTML = dark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }
}

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
  const loginBtn = document.querySelector('a[href="login.html"]');
  const registerBtn = document.querySelector('a[href="register.html"]');

  if (currentUser && loginBtn) {
    const parent = loginBtn.parentElement;
    if (parent) {
      if (registerBtn) registerBtn.style.display = 'none';
      let userWidget = parent.querySelector('.user-nav-widget');
      if (!userWidget) {
        loginBtn.style.display = 'none';
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
  } else if (!currentUser && loginBtn) {
    loginBtn.style.display = '';
    if (registerBtn) registerBtn.style.display = '';
    const parent = loginBtn.parentElement;
    if (parent) {
      const widget = parent.querySelector('.user-nav-widget');
      if (widget) widget.remove();
    }
  }

  // 4. Dark mode toggle button state
  const toggleBtn = document.getElementById('dark-mode-toggle');
  if (toggleBtn) {
    toggleBtn.innerHTML = isDarkMode()
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }
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
});
