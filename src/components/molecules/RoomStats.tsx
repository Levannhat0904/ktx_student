import React from "react";
import { Card, Typography } from "antd";
import { TeamOutlined, DollarOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface RoomStatsProps {
  occupiedBeds?: number;
  capacity?: number;
  pricePerMonth?: number;
  loading?: boolean;
  description?: string;
}

const RoomStats: React.FC<RoomStatsProps> = ({
  occupiedBeds = 0,
  capacity = 0,
  pricePerMonth = 0,
  loading = false,
  description = "",
}) => {
  return (
    <Card className="shadow-md rounded-lg">
      <div className="flex flex-col gap-4">
        <div>
          <Text className="text-gray-600">Sức chứa</Text>
          <div className="flex items-center gap-2 ">
            <TeamOutlined className="text-xl text-green-600" />
            <Text className="text-2xl font-semibold">
              {occupiedBeds}/{capacity}
            </Text>
          </div>
        </div>

        <div>
          <Text className="text-gray-600">Giá phòng/tháng</Text>
          <div className="flex items-center gap-2 ">
            <DollarOutlined className="text-xl text-green-600" />
            <Text className="text-2xl font-semibold text-green-600">
              {pricePerMonth.toLocaleString("vi-VN")} VNĐ
            </Text>
          </div>
        </div>
        <div>
          <Text className="text-gray-600">Ghi chú</Text>
          <div className="flex items-center gap-2 ">
            <InfoCircleOutlined className="text-xl text-blue-600" />
            <Text className="text-2xl font-semibold text-blue-600">
              {description || "Không có"}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoomStats; 