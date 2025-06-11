import { BookOutlined, CustomerServiceOutlined, EnvironmentOutlined, FireOutlined, HomeOutlined, LockOutlined, MailOutlined, PhoneOutlined, SecurityScanOutlined, StarOutlined, TableOutlined, TeamOutlined, TrophyOutlined, WifiOutlined } from "@ant-design/icons";

export const SECURITY_CONTENT = [
  {
    title: "An ninh 24/7",
    description:
      "Hệ thống an ninh hiện đại với bảo vệ trực 24/7 và camera giám sát toàn khu vực.",
    icon: <LockOutlined />,
  },
  {
    title: "Tiện ích",
    description:
      "Đầy đủ tiện ích như wifi, tivi, nước, điện, vệ sinh,..., giữ gìn sạch sẽ, đẹp mắt.",
    icon: <WifiOutlined />,
  },
  {
    title: "Dịch vụ",
    description:
      "Đầy đủ dịch vụ như vệ sinh, sửa chữa, bảo trì,..., tạo không gian sống thoải mái, tiện nghi.",
    icon: <FireOutlined />,
  },
];

export const STATISTIC_CONTENT = [
  {
    title: "Số lượng sinh viên",
    value: "98% - Tỷ lệ hài lòng",
    icon: <TeamOutlined />,
  },
  {
    title: "Phòng",
    value: "24/7 - Bảo vệ an ninh",
    icon: <HomeOutlined />,
  },
  {
    title: "Phòng chất lượng cao",
    value: "5★ - Đánh giá chất lượng",
    icon: <StarOutlined />,
  },
  {
    title: "Dịch vụ",
    value: "100% - Phủ sóng WiFi",
    icon: <CustomerServiceOutlined />,
  },
];

export const ROOM_CONTENT = [
  {
    title: "Phòng 2 người",
    description: "Phòng 2 người",
    icon: <HomeOutlined />,
    price: `800.000đ-1.000.000đ/tháng/người`,
    features: [
      {
        title: "Giường đơn",
      },
      {
        title: "Bàn học",
      },
      {
        title: "Tủ quần áo",
      },
    ],
  },
  {
    title: "Phòng 4 người",
    description: "Phòng 4 người",
    icon: <HomeOutlined />,
    price: `300.000đ-400.000đ/tháng/người`,
    features: [
      {
        title: "Giường đơn",
      },
      {
        title: "Bàn học",
      },
      {
        title: "Tủ quần áo",
      },
      {
        title: "Tivi",
      },
      {
        title: "Nước",
      },
    ],
  },
  {
    title: "Phòng 6 người",
    description: "Phòng 6 người",
    icon: <HomeOutlined />,
    price: `200.000đ-300.000đ/tháng/người`,
    features: [
      {
        title: "Giường đơn",
      },
      {
        title: "Bàn học",
      },
      {
        title: "Tủ quần áo",
      },
      {
        title: "Tivi",
      },
      {
        title: "Nước",
      },
    ],
  },
];
  {
    /* Tiện ích nổi bật */
  }
export const FEATURE_CONTENT = [
  {
    title: "Canteen",
    description:
      "Đa dạng thực phẩm, giá cả phải chăng, thực phẩm ngon, đảm bảo vệ sinh an toàn thực phẩm.",
    icon: <FireOutlined />,
  },
  {
    title: "Thư viện",
    description:
      "Đa dạng sách, tài liệu, giáo trình, tài liệu học tập, tài liệu nghiên cứu, tài liệu tham khảo.",
    icon: <BookOutlined />,
  },
  {
    title: "Khu vực sân thể thao",
    description: "Sân cỏ nhân tạo, sân bóng nâng cao tinh thần thể thao",
    icon: <TrophyOutlined />,
  },
  {
    title: "Bảo vệ 24/7",
    description: "An ninh được đảm bảo tuyệt đối, camera giám sát",
    icon: <SecurityScanOutlined />,
  },
];

export const FAQ_CONTENT = [
  {
    title: "Quy trình đăng ký phòng như thế nào?",
    description:
      "Điền thông tin vào mẫu đăng ký trên website hoặc trực tiếp tại văn phòng KTX. Chúng tôi sẽ xác nhận và liên hệ lại trong vòng 24 giờ.",
  },
  {
    title: "Chi phí thuê phòng KTX là bao nhiêu?",
    description:
      "Chi phí dao động từ 1.200.000 - 1.800.000 VNĐ/tháng tùy theo loại phòng (2 người, 4 người, 6 người). Đã bao gồm điện, nước, internet và các dịch vụ cơ bản.",
  },
  {
    title:
      "Phòng KTX có những tiện nghi gì và có thể mang đồ dùng cá nhân không?",
    description:
      "Mỗi phòng được trang bị giường tầng, tủ quần áo, bàn học, quạt trần. Sinh viên có thể mang đồ dùng cá nhân như chăn màn, đồ học tập,...",
  },
  {
    title: "KTX có quy định về giờ giấc và khách thăm không?",
    description:
      "Có quy định cửa chính đóng lúc 23h00, khách thăm được phép đến 21h00. Sinh viên cần đăng ký trước khi có khách qua đêm và tuân thủ các quy định về an ninh.",
  },
];

 {
   /* Liên hệ */
 }
 export const CONTACT_CONTENT = [
  {
    title: "Địa chỉ",
    description: "Số 54 Triều Khúc, quận Thanh Xuân, Hà Nội",
    icon: <EnvironmentOutlined style={{ fontSize: 24 }} />,
  },
  {
    title: "Điện thoại",
    description: "0909090909",
    icon: <PhoneOutlined style={{ fontSize: 24 }} />,
  },
  {
    title: "Email",
    description: "ktx@gmail.com",
    icon: <MailOutlined style={{ fontSize: 24 }} />,
  },
 ];