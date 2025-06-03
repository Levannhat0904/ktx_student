"use client";
import React from 'react';
import { motion } from "framer-motion";
import {
  Button,
  Row,
  Col,
  Divider,
} from "antd";
import {
  HomeOutlined,
  UserOutlined,
  BankOutlined,
  PhoneOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";

const FooterLandingPage = () => {
    const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
  return (
    <>
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-orange-900 to-yellow-900 text-white"
      >
        <div className="max-w-7xl mx-auto py-8 px-4">
          <Row gutter={[32, 24]}>
            <Col xs={24} md={8}>
              <h3 className="text-xl font-bold mb-4">KTX SINH VIÊN</h3>
              <p className="text-gray-300 mb-4">
                Môi trường sống lý tưởng cho sinh viên với đầy đủ tiện nghi và
                dịch vụ hỗ trợ.
              </p>
              <div className="flex gap-4">
                <Button
                  shape="circle"
                  icon={<i className="fab fa-facebook-f"></i>}
                  className="bg-blue-600 text-white border-0 hover:bg-blue-700"
                />
                <Button
                  shape="circle"
                  icon={<i className="fab fa-twitter"></i>}
                  className="bg-cyan-500 text-white border-0 hover:bg-cyan-600"
                />
                <Button
                  shape="circle"
                  icon={<i className="fab fa-instagram"></i>}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white border-0"
                />
              </div>
            </Col>
            <Col xs={24} md={8}>
              <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Loại phòng
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Tiện ích
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Quy định
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </Col>
            <Col xs={24} md={8}>
              <h3 className="text-xl font-bold mb-4">Giờ làm việc</h3>
              <p className="text-gray-300 mb-2">
                Thứ Hai - Thứ Sáu: 8:00 - 17:00
              </p>
              <p className="text-gray-300 mb-2">Thứ Bảy: 8:00 - 12:00</p>
              <p className="text-gray-300">Chủ Nhật: Đóng cửa</p>
              <p className="text-gray-300 mt-4">
                Văn phòng quản lý KTX luôn sẵn sàng hỗ trợ bạn.
              </p>
            </Col>
          </Row>
          <Divider className="border-yellow-800" />
          <div className="text-center text-gray-300">
            <p>
              &copy; {new Date().getFullYear()} Ký túc xá Sinh viên. Bản quyền
              thuộc về KTX Sinh viên.
            </p>
          </div>
        </div>
      </motion.footer>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
        <div className="flex justify-around items-center py-3 px-2">
          {[
            { icon: <HomeOutlined />, text: "Trang chủ", section: "home" },
            { icon: <BankOutlined />, text: "Phòng ở", section: "rooms" },
            {
              icon: <CoffeeOutlined />,
              text: "Tiện ích",
              section: "facilities",
            },
            { icon: <PhoneOutlined />, text: "Liên hệ", section: "contact" },
            { icon: <UserOutlined />, text: "Đăng ký", section: "register" },
          ].map((item, index) => (
            <motion.div
              key={index}
              onClick={() => scrollToSection(item.section)}
              className="flex flex-col items-center w-16"
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-1">
                <span className="text-xl active:text-orange-500">
                  {item.icon}
                </span>
              </div>
              <span className="text-xs font-medium text-gray-600">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FooterLandingPage;