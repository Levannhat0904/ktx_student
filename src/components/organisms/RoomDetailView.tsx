import React from "react";
import { Row, Col, Card, Typography } from "antd";
import RoomHeader from "../molecules/RoomHeader";
import RoomStats from "../molecules/RoomStats";
import RoomDetails from "../molecules/RoomDetails";
import ResidentList from "../molecules/ResidentList";
import { RoomDetail } from "@/api/room";

const { Text } = Typography;

interface RoomDetailViewProps {
  roomData: RoomDetail;
}

const RoomDetailView: React.FC<RoomDetailViewProps> = ({ roomData }) => {
  const { room, residents } = roomData;

  return (
    <div className="p-6 space-y-6">
      <RoomHeader
        roomNumber={room.roomNumber}
        buildingName={room.buildingName}
        floorNumber={room.floorNumber}
        status={room.status}
      />

      <Row gutter={24}>
        <Col span={8}>
          <RoomStats
            occupiedBeds={room.occupiedBeds}
            capacity={room.capacity}
            pricePerMonth={room.pricePerMonth}
            description={room.notes}
          />
        </Col>

        <Col span={16}>
          <RoomDetails
            roomType={room.roomType}
            roomArea={room.roomArea}
            lastCleaned={room.lastCleaned}
            amenities={room.amenities}
          />
        </Col>
      </Row>

      <ResidentList residents={residents} />

      {room.description && (
        <Card title="Mô tả" className="shadow-md">
          <Text>{room.description}</Text>
        </Card>
      )}
    </div>
  );
};

export default RoomDetailView; 