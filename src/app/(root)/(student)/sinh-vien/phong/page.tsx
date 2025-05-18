
import dynamic from "next/dynamic";
import React from "react";

// Import trang quản lý hợp đồng từ thư mục components/pages
const RoomDetailPage = dynamic(
  () => import("@/components/pages/sinh-vien/room"),
  {
    ssr: false,
  }
);

/**
 * Trang quản lý phòng của sinh viên
 */
const StudentRoomPage: React.FC = () => {
  return <RoomDetailPage />;
};

export default StudentRoomPage;
