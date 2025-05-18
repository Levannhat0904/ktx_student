"use client";

import React from "react";
import { Layout, ConfigProvider } from "antd";
import StudentHeader from "@/components/organisms/student/StudentHeader";

import { Header } from "antd/es/layout/layout";
const { Content, Footer } = Layout;

// Theme settings với màu cam làm chủ đạo
const theme = {
  token: {
    colorPrimary: "#fa8c16",
    colorLink: "#fa8c16",
    colorLinkHover: "#ffa940",
    borderRadius: 8,
  },
};

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  return (
    <ConfigProvider theme={theme}>
      <Layout className="min-h-screen bg-gray-50">
        <StudentHeader />
        <Header />
        <Content className="m-4 md:m-6">
          <div className="site-layout-content animate-fadeIn">{children}</div>
        </Content>
        <Footer className="text-center bg-white p-4 shadow-inner mb-16 md:mb-0">
          <div className="text-gray-600">
            KTX Management System © {new Date().getFullYear()} - Designed by{" "}
            <span className="text-orange-500 font-medium">UTT</span>
          </div>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default StudentLayout;
