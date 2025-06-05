"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
import { UserOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LOGO_URL } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";

const { Header } = Layout;

const HeaderLandingPage = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { adminProfile: user, onLogout } = useAuth();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [profileDrawerVisible, setProfileDrawerVisible] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleRegisterClick = () => {
    router.push("/dang-ky-ktx");
  };
  const handleHomeClick = () => {
    if (isHomePage) {
      scrollToSection("home");
    } else {
      router.push("/");
      scrollToSection("home");
    }
  };
  const handleAboutClick = () => {
    if (isHomePage) {
      scrollToSection("about");
    } else {
      router.push("/");
    }
  };
  const handleRoomsClick = () => {
    if (isHomePage) {
      scrollToSection("rooms");
    } else {
      router.push("/");
    }
  };
  const handleFacilitiesClick = () => {
    if (isHomePage) {
      scrollToSection("facilities");
    } else {
      router.push("/");
    }
  };
  const handleContactClick = () => {
    if (isHomePage) {
      scrollToSection("contact");
    } else {
      router.push("/");
    }
  };

  const handleLoginClick = () => {
    router.push("/dang-nhap");
  };
  const userMenu = (
    <Menu
      items={[
        {
          key: "profile",
          label: "Hồ sơ cá nhân",
          icon: <UserOutlined />,
          onClick: () => router.push("/sinh-vien"),
        },
        {
          key: "edit",
          label: "Chỉnh sửa thông tin",
          icon: <EditOutlined />,
          onClick: () => setProfileDrawerVisible(true),
        },
        {
          key: "logout",
          label: "Đăng xuất",
          icon: <LogoutOutlined />,
          onClick: () => {
            if (onLogout) {
              console.log("Logging out...");
              onLogout();
            }
          },
        },
      ]}
    />
  );
  return (
    <Header
      className="flex fixed top-0 left-0 right-0 items-center justify-between !p-5 md:!px-10 bg-gradient-to-r from-orange-600 to-yellow-500 shadow-md z-10"
      style={{
        background: "linear-gradient(90deg, #fa8c16 0%, #ffa940 100%)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        height: isMobile ? "64px" : "64px",
      }}
    >
      {/* Logo - hiển thị trên cả mobile và desktop */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        <div className="flex items-center">
          <Link href="/sinh-vien" className="flex items-center">
            <Image
              src={LOGO_URL}
              alt="KTX Logo"
              width={isMobile ? 28 : 32}
              height={isMobile ? 28 : 32}
              className="transition-transform duration-300 hover:scale-105"
            />
            <span className="text-white font-bold text-lg hidden md:inline ml-2">
              KTX UTT
            </span>
          </Link>
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
        {user ? (
          <Dropdown overlay={userMenu} placement="bottomRight">
            <div className="cursor-pointer flex items-center">
              <Avatar
                src={user?.profile?.avatarPath || LOGO_URL}
                alt="avatar"
                size={isMobile ? 32 : 36}
                className="bg-orange-200"
              />
              <span className="ml-2 text-white hidden md:inline">
                {user?.profile?.fullName || "Sinh viên"}
              </span>
            </div>
          </Dropdown>
        ) : (
          <Button
            type="text"
            size="large"
            className="!bg-transparent !text-white hover:bg-transparent border-orange-500"
            onClick={handleLoginClick}
          >
            <span className="hidden md:inline">Đăng nhập</span>
            <UserOutlined className="md:hidden" />
          </Button>
        )}
      </motion.div>
    </Header>
  );
};

export default HeaderLandingPage;
