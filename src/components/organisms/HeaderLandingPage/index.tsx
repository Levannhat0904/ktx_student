"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Button,
  Layout,
} from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

const { Header } = Layout;

const HeaderLandingPage = () => {
     const router = useRouter();
     const pathname = usePathname();
     const isHomePage = pathname === "/landingPage";
     const scrollToSection = (sectionId: string) => {
       const element = document.getElementById(sectionId);
       if (element) {
         element.scrollIntoView({ behavior: "smooth" });
       }
     };

     const handleRegisterClick = () => {
       router.push("/dang-ky-ktx");
     };
     const handleHomeClick = () => {
       if (isHomePage) {
        scrollToSection("home");
       } else {
        router.push("/landingPage");
        scrollToSection("home");
       }
     };
     const handleAboutClick = () => {
       if (isHomePage) {
        scrollToSection("about");
       } else {
        router.push("/landingPage");
       }
     };
     const handleRoomsClick = () => {
       if (isHomePage) {
        scrollToSection("rooms");
       } else {
        router.push("/landingPage");
       
       }
     };
     const handleFacilitiesClick = () => {
       if (isHomePage) {
        scrollToSection("facilities");
       } else {
        router.push("/landingPage");
       }
     };
     const handleContactClick = () => {     
       if (isHomePage) {
        scrollToSection("contact");
       } else {
        router.push("/landingPage");
       }
     };

     const handleLoginClick = () => {
       router.push("/dang-nhap");
     };
  return (
    <Header className="flex fixed top-0 left-0 right-0 items-center justify-between !p-5 md:!px-10 bg-gradient-to-r from-orange-600 to-yellow-500 shadow-md z-10">
      {/* Logo - hiển thị trên cả mobile và desktop */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        <div className="text-xl md:text-2xl font-bold text-white">
          KTX SINH VIÊN
        </div>
      </motion.div>

      {/* Menu - chỉ hiển thị trên desktop */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:flex gap-8 items-center"
      >
        <div
          onClick={handleHomeClick}
          className="bg-transparent text-white hover:bg-transparent border-yellow-500 cursor-pointer"
        >
          Trang chủ
        </div>
        <div
          onClick={handleAboutClick}
          className="bg-transparent text-white hover:bg-transparent border-yellow-500 cursor-pointer"
        >
          Giới thiệu
        </div>
        <div
          onClick={handleRoomsClick}
          className="bg-transparent text-white hover:bg-transparent border-yellow-500 cursor-pointer"
        >
          Phòng ở
        </div>
        <div
          onClick={handleFacilitiesClick}
          className="bg-transparent text-white hover:bg-transparent border-yellow-500 cursor-pointer"
        >
          Tiện ích
        </div>
        <div
          onClick={handleContactClick}
          className="bg-transparent text-white hover:bg-transparent border-yellow-500 cursor-pointer"
        >
          Liên hệ
        </div>
      </motion.div>

      {/* Nút đăng nhập - hiển thị trên cả mobile và desktop */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="text"
          size="large"
          className="!bg-transparent !text-white hover:bg-transparent border-orange-500"
          onClick={handleLoginClick}
        >
          <span className="hidden md:inline">Đăng nhập</span>
          <UserOutlined className="md:hidden" />
        </Button>
      </motion.div>
    </Header>
  );
};

export default HeaderLandingPage;
