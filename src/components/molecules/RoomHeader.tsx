import React from "react";
import { Card, Row, Col, Typography, Space, Skeleton, Tooltip } from "antd";
import { HomeOutlined, EnvironmentOutlined } from "@ant-design/icons";
import RoomTag from "../atoms/RoomTag";

const { Title, Text } = Typography;

interface RoomHeaderProps {
  roomNumber?: string;
  buildingName?: string;
  floorNumber?: number;
  status?: string;
  loading?: boolean;
}

const RoomHeader: React.FC<RoomHeaderProps> = ({
  roomNumber,
  buildingName,
  floorNumber,
  status,
  loading = false,
}) => {
  if (loading) {
    return (
      <Card className="shadow-md rounded-lg">
        <Skeleton active paragraph={{ rows: 2 }} />
      </Card>
    );
  }

  return (
    <Card className="shadow-md rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <HomeOutlined className="text-xl text-gray-600" />
          <Title level={4} className="!m-0">Phòng {roomNumber}</Title>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <EnvironmentOutlined className="text-base" />
            <Text className="text-base">
              Tòa nhà {buildingName} - Tầng {floorNumber}
            </Text>
          </div>
          
          <RoomTag 
            status={status || "available"} 
            className="text-sm px-3 py-1 bg-green-50 text-green-600 border-green-200"
          />
        </div>
      </div>
    </Card>
  );
};

export default RoomHeader; 