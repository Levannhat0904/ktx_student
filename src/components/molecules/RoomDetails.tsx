import React from "react";
import { Card, Typography, Tag, Space } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface RoomDetailsProps {
  roomType?: string;
  roomArea?: number;
  lastCleaned?: string;
  amenities?: string[];
  loading?: boolean;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({
  roomType,
  roomArea,
  lastCleaned,
  amenities = [],
  loading = false,
}) => {
  const parsedAmenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities;
  
  return (
    <Card className="shadow-md rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Text strong className="text-lg">Thông tin chi tiết</Text>
          <InfoCircleOutlined className="text-gray-400" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex">
            <Text className="text-gray-500 w-[120px]">Loại phòng</Text>
            <Text>:</Text>
            <Text className="ml-2">
              {roomType === "male" ? "Nam" : roomType === "female" ? "Nữ" : "Không xác định"}
            </Text>
          </div>

          <div className="flex">
            <Text className="text-gray-500 w-[120px]">Diện tích</Text>
            <Text>:</Text>
            <Text className="ml-2">{roomArea} m²</Text>
          </div>

          <div className="flex">
            <Text className="text-gray-500 w-[120px]">Vệ sinh gần nhất</Text>
            <Text>:</Text>
            <Text className="ml-2">
              {lastCleaned
                ? new Date(lastCleaned).toLocaleDateString("vi-VN")
                : "Chưa có thông tin"}
            </Text>
          </div>

          <div className="flex">
            <Text className="text-gray-500 w-[120px]">Tiện ích</Text>
            <Text>:</Text>
            <div className="ml-2">
              <Space size={[8, 8]} wrap>
                {Array.isArray(parsedAmenities) && parsedAmenities.length > 0 ? (
                  parsedAmenities.map((amenity, index) => (
                    <Tag 
                      key={index}
                      className="m-0 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border-blue-200"
                    >
                      {amenity}
                    </Tag>
                  ))
                ) : (
                  <Text className="text-gray-500">Không có tiện ích</Text>
                )}
              </Space>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoomDetails; 