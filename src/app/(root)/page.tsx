// import StudentHomePage from "@/components/pages/sinh-vien/home";

// export default function Home() {
//   return (
//     <main>
//       <StudentHomePage />
//     </main>
//   );
// }
"use client";
import React, { useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Button,
  Carousel,
  Card,
  Row,
  Col,
  Statistic,
  Layout,
  Form,
  Input,
  Badge,
  message,
  Avatar,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
  FireOutlined,
  TeamOutlined,
  HomeOutlined,
  AppstoreOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeaderLandingPage from "@/components/organisms/HeaderLandingPage";
import FooterLandingPage from "@/components/organisms/FooterLandingPage";
import { LOGO_URL } from "@/constants/common";
import BgMotion from "@/components/organisms/bgMotion";
import {
  CONTACT_CONTENT,
  FAQ_CONTENT,
  FEATURE_CONTENT,
  ROOM_CONTENT,
  SECURITY_CONTENT,
  STATISTIC_CONTENT,
} from "@/components/organisms/landingPage/Security";
import { sendMail } from "@/api/sendmail";

const { Content } = Layout;
const { Meta } = Card;

export default function Home() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [form] = Form.useForm();
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3]);
  const [loading, setLoading] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRegisterClick = () => {
    router.push("/dang-ky-ktx");
  };
  const handleConsultClick = async (
    name: string,
    email: string,
    phone: string,
    roomType: string
  ) => {
    setLoading(true);
    const payload = {
      to: {
        Email: email,
        Name: name,
      },
      subject: "Đăng ký tư vấn phòng KTX",
      text: `Tên: ${name}\nEmail: ${email}\nSố điện thoại: ${phone}\nLoại phòng: ${roomType}`,
      html: `<h1>Đăng ký tư vấn phòng KTX</h1><p>Tên: ${name}</p><p>Email: ${email}</p><p>Số điện thoại: ${phone}</p><p>Loại phòng: ${roomType}</p>`,
    };
    try {
      const result = await sendMail(
        payload.to,
        payload.subject,
        payload.text,
        payload.html
      );
      console.log(result);
      message.success("Đăng ký tư vấn thành công!");
      form.resetFields();
    } catch (error) {
      message.error("Đăng ký tư vấn thất bại!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="min-h-screen">
      {/* Header với gradient màu và slide-in animation */}
      <HeaderLandingPage />

      {/* Hero Section với fade-in animation */}
      <motion.div
        className="progress-bar bg-orange-600 fixed top-16 z-50 left-0 right-0 h-2 origin-left"
        style={{ scaleX }}
      />

      {/* Background logo that scales with scroll */}
      <BgMotion />

      <div id="home" className="relative ">
        <Carousel autoplay className="h-48 md:h-96">
          <div className="h-48 md:h-96 bg-blue-900 flex items-center justify-center text-white">
            <Image
              src="/images/image.png"
              alt="Ký túc xá"
              className="w-full h-full object-cover"
              width={1920}
              height={500}
            />
          </div>
          <div className="h-48 md:h-96 bg-blue-800 flex items-center justify-center text-white">
            <Image
              src="/images/image1.png"
              alt="Sinh viên trong ký túc xá"
              className="w-full h-full object-cover"
              width={1920}
              height={500}
            />
          </div>
        </Carousel>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center flex-col bg-black bg-opacity-50 text-white p-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-center">
            KÝ TÚC XÁ SINH VIÊN
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-center">
            Môi trường sống lý tưởng cho sinh viên
          </p>
          <div className="mt-8 flex gap-4">
            <Button
              type="primary"
              size="large"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 border-0"
              onClick={handleRegisterClick}
            >
              Đăng ký ngay
            </Button>
            <Button
              size="large"
              className="bg-white text-orange-600 hover:text-orange-700 hover:bg-gray-100"
              onClick={() => scrollToSection("about")}
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Features với stagger animation */}
      <Content className="max-w-7xl mx-auto py-16 px-4">
        <div id="about">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-orange-600">
              Tại sao chọn Ký túc xá của chúng tôi?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cung cấp một môi trường sống an toàn, tiện nghi với đầy
              đủ tiện ích và dịch vụ hỗ trợ cho sinh viên.
            </p>
          </motion.div>

          <Row gutter={[32, 32]} className="mb-16">
            {SECURITY_CONTENT.map((index) => (
              <Col xs={24} md={8} key={index.title}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: Number(index.title) * 0.2,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-orange-500">
                    <div className="text-center mb-4">
                      {/* <div className="inline-block p-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white mb-4">
                        {index.icon}
                      </div> */}
                      <Avatar
                        icon={index.icon}
                        size={48}
                        className="!bg-gradient-to-r from-orange-500 to-yellow-500 text-white mb-4"
                      />
                      <h3 className="text-xl font-bold text-orange-600">
                        {index.title}
                      </h3>
                      <p className="text-gray-600">{index.description}</p>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Số liệu thống kê với gradient */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl p-8 mb-16 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              Thống kê KTX
            </h3>
            <Row gutter={[32, 32]}>
              {STATISTIC_CONTENT.map((stat, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-center p-4 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm"
                  >
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <Statistic
                      title={
                        <span className="text-white font-medium text-lg">
                          {stat.title}
                        </span>
                      }
                      value={stat.value}
                      className="text-white"
                      valueStyle={{
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    />
                    <div className="mt-2 h-1 w-16 bg-white mx-auto rounded-full"></div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </div>

        {/* Các loại phòng với ribbon và màu sắc nổi bật */}
        <div id="rooms" className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4 text-center text-orange-600"
          >
            Các loại phòng
          </motion.h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-center mb-8">
            Chúng tôi cung cấp nhiều loại phòng phù hợp với nhu cầu và ngân sách
            của sinh viên.
          </p>

          <Row gutter={[24, 24]}>
            {ROOM_CONTENT.map((index, indexRoom) => (
              <Col xs={24} md={8} key={indexRoom}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: indexRoom * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <Badge.Ribbon text="Phổ biến" color="orange">
                    <Card
                      hoverable
                      cover={
                        <Image
                          alt={index.title}
                          src="/images/image.png"
                          width={500}
                          height={300}
                        />
                      }
                      className="h-full border-0 shadow-lg"
                    >
                      <Meta
                        title={index.title}
                        description={
                          <span className="font-bold text-orange-600">
                            Giá từ: {index.price}
                          </span>
                        }
                      />
                      <ul className="mt-4">
                        <li className="flex items-center mb-2">
                          <CheckCircleOutlined className="text-orange-500 mr-2" />{" "}
                          {index.features?.[0]?.title}
                        </li>
                        <li className="flex items-center mb-2">
                          <CheckCircleOutlined className="text-orange-500 mr-2" />{" "}
                          {index.features?.[1]?.title}
                        </li>
                        <li className="flex items-center">
                          <CheckCircleOutlined className="text-orange-500 mr-2" />{" "}
                          {index.features?.[2]?.title}
                        </li>
                      </ul>
                      <Button
                        type="primary"
                        className="mt-4 w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 border-0"
                        onClick={handleRegisterClick}
                      >
                        Đăng ký ngay
                      </Button>
                    </Card>
                  </Badge.Ribbon>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Tiện ích nổi bật */}
        <div id="facilities" className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4 text-center text-orange-600"
          >
            Tiện ích nổi bật
          </motion.h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-center mb-8">
            Chúng tôi cung cấp đầy đủ tiện ích để đảm bảo sinh viên có môi
            trường sống tốt nhất.
          </p>

          <Row gutter={[24, 24]}>
            {FEATURE_CONTENT.map((index, indexFeature) => (
              <Col xs={24} md={6} key={indexFeature}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: indexFeature * 0.1,
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                  animate={{ y: [0, -10, 0] }}
                >
                  <Card className="text-center bg-gradient-to-b from-white to-orange-50 h-full border-0 shadow-lg md:min-h-[200px]">
                    <div className="text-orange-500 text-4xl mb-4">
                      {index.icon}
                    </div>
                    <h3 className="text-xl font-bold text-orange-600">
                      {index.title}
                    </h3>
                    <p className="text-gray-600">{index.description}</p>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Đăng ký */}
        <div id="register">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-8 rounded-lg mb-16 shadow-lg">
              <Row gutter={32} align="middle">
                <Col xs={24} md={12}>
                  <h2 className="text-3xl font-bold mb-4 text-orange-600">
                    Đăng ký ngay hôm nay
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Điền thông tin của bạn để đăng ký một chỗ ở trong ký túc xá
                    của chúng tôi. Chúng tôi sẽ liên hệ lại trong vòng 24 giờ.
                  </p>
                  <ul className="mb-4">
                    <li className="flex items-center mb-2">
                      <CheckCircleOutlined className="text-orange-500 mr-2" />{" "}
                      Quy trình đăng ký đơn giản
                    </li>
                    <li className="flex items-center mb-2">
                      <CheckCircleOutlined className="text-orange-500 mr-2" />{" "}
                      Không phí đăng ký
                    </li>
                    <li className="flex items-center">
                      <CheckCircleOutlined className="text-orange-500 mr-2" />{" "}
                      Hỗ trợ 24/7
                    </li>
                  </ul>
                </Col>
                <Col xs={24} md={12}>
                  <Card className="border-0 shadow-lg">
                    <Form
                      layout="vertical"
                      form={form}
                      onFinish={(values) =>
                        handleConsultClick(
                          values.name,
                          values.email,
                          values.phone,
                          values.roomType
                        )
                      }
                    >
                      <Form.Item
                        label="Họ và tên"
                        name="name"
                        rules={[
                          { required: true, message: "Vui lòng nhập họ tên" },
                        ]}
                      >
                        <Input
                          prefix={<UserOutlined className="text-orange-500" />}
                          placeholder="Nhập họ tên"
                          className="rounded-lg"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: "Vui lòng nhập email" },
                        ]}
                      >
                        <Input
                          prefix={<MailOutlined className="text-orange-500" />}
                          placeholder="Nhập email"
                          className="rounded-lg"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại",
                          },
                        ]}
                      >
                        <Input
                          prefix={<PhoneOutlined className="text-orange-500" />}
                          placeholder="Nhập số điện thoại"
                          className="rounded-lg"
                        />
                      </Form.Item>
                      <Form.Item label="Loại phòng quan tâm" name="roomType">
                        <Input
                          placeholder="Ví dụ: Phòng 2 người, Phòng 4 người"
                          className="rounded-lg"
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 border-0 rounded-lg h-12 text-lg"
                          loading={loading}
                        >
                          Tư vấn ngay
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </div>
          </motion.div>
        </div>

        {/* FAQ với màu sắc */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4 text-center text-orange-600"
          >
            Câu hỏi thường gặp
          </motion.h2>
          <Row gutter={[16, 16]}>
            {FAQ_CONTENT.map((index, indexFAQ) => (
              <Col xs={24} md={12} key={indexFAQ}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: indexFAQ * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="h-full border-l-4 border-orange-500 shadow-md hover:shadow-lg transition-shadow md:min-h-[170px]">
                    <h3 className="text-lg font-bold mb-2 flex items-center text-orange-600">
                      <QuestionCircleOutlined className="text-orange-500 mr-2" />{" "}
                      {index.title}
                    </h3>
                    <p className="text-gray-600">{index.description}</p>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Liên hệ */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div id="contact">
            <h2 className="text-3xl font-bold mb-4 text-center text-orange-600">
              Liên hệ với chúng tôi
            </h2>
            <Row gutter={[32, 32]}>
              {CONTACT_CONTENT.map((index, indexContact) => (
                <Col xs={24} md={8} key={indexContact}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="text-center h-full hover:shadow-xl transition-shadow bg-gradient-to-b from-white to-orange-50 border-0">
                      <div className="inline-block p-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white mb-4">
                        {index.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-orange-600">
                        {index.title}
                      </h3>
                      <p className="text-gray-600">{index.description}</p>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        </motion.div>
      </Content>

      {/* Footer với fade-in animation */}
      <FooterLandingPage />
    </Layout>
  );
}
