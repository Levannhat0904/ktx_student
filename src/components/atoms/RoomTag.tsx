import React from "react";
import { Tag } from "antd";
import { cn } from "@/utils";

interface RoomTagProps {
  status: string;
  className?: string;
}

const RoomTag: React.FC<RoomTagProps> = ({ status, className }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "available":
        return {
          text: "Còn chỗ",
          className: "bg-green-50 text-green-600 border-green-200"
        };
      case "full":
        return {
          text: "Đã đầy",
          className: "bg-orange-50 text-orange-600 border-orange-200"
        };
      case "maintenance":
        return {
          text: "Bảo trì",
          className: "bg-red-50 text-red-600 border-red-200"
        };
      default:
        return {
          text: "Không xác định",
          className: "bg-gray-50 text-gray-600 border-gray-200"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Tag 
      className={cn(
        "m-0 rounded-full border",
        config.className,
        className
      )}
    >
      {config.text}
    </Tag>
  );
};

export default RoomTag; 