import dynamic from "next/dynamic";
import React from "react";

// Import trang quản lý bảo trì từ thư mục components/pages
const ChangePasswordPage = dynamic(
  () => import("@/components/pages/sinh-vien/doi-mat-khau"),
  {
    ssr: false,
  }
);

/**
 * Trang đổi mật khẩu của sinh viên
 */
const StudentChangePasswordPage: React.FC = () => {
  return <ChangePasswordPage />;
};

export default StudentChangePasswordPage;
