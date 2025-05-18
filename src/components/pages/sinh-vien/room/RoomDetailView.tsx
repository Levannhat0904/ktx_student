import React from "react";
import { Row, Col, Card, Typography, Timeline, Spin, Empty } from "antd";
import RoomHeader from "../../../molecules/RoomHeader";
import RoomStats from "../../../molecules/RoomStats";
import RoomDetails from "../../../molecules/RoomDetails";
import ResidentList from "../../../molecules/ResidentList";
import { RoomDetail } from "@/api/room";
import { HistoryOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface RoomDetailViewProps {
  roomData: RoomDetail;
  timelineData: any[];
  timelineLoading: boolean;
}

const getTimelineItemColor = (action: string) => {
  switch (action) {
    case 'create':
      return 'green';
    case 'update':
      return 'blue';
    case 'delete':
      return 'red';
    case 'status_change':
      return 'orange';
    default:
      return 'gray';
  }
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const RoomDetailView: React.FC<RoomDetailViewProps> = ({ roomData, timelineData, timelineLoading }) => {
  const { room, residents } = roomData;
  console.log("timelineData", timelineData)
  return (
    <div className="p-6">
      <RoomHeader
        roomNumber={room.roomNumber}
        buildingName={room.buildingName}
        floorNumber={room.floorNumber}
        status={room.status}
      />

      <Row gutter={[24, 16]} className="mt-6">
        {/* Left Column - Room Information */}
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card className="shadow-md h-full">
                <div className="font-medium text-lg mb-4">Sức chứa</div>
                <RoomStats
                  occupiedBeds={room.occupiedBeds}
                  capacity={room.capacity}
                  pricePerMonth={room.pricePerMonth}
                />
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card className="shadow-md h-full">
                <div className="font-medium text-lg mb-4">Thông tin chi tiết</div>
                <RoomDetails
                  roomType={room.roomType}
                  roomArea={room.roomArea}
                  lastCleaned={room.lastCleaned}
                  amenities={room.amenities}
                />
              </Card>
            </Col>
          </Row>

          <div className="mt-6 max-h-[300px] overflow-y-auto">
            <Card className="shadow-md">
              <div className="font-medium text-lg mb-4">Danh sách sinh viên</div>
              <ResidentList residents={residents} />
            </Card>
          </div>

          {room.description && (
            <div className="mt-6">
              <Card title="Mô tả" className="shadow-md">
                <Text>{room.description}</Text>
              </Card>
            </div>
          )}
        </Col>

        {/* Right Column - Timeline */}
        <Col xs={24} lg={8} style={{ display: 'flex', flexDirection: 'column' }}>
          <Card 
            title={
              <span>
                <HistoryOutlined /> Lịch sử hoạt động
              </span>
            } 
            className="shadow-md"
            style={{ 
              height: '100%',
              minHeight: '200px',
              maxHeight: '640px',
              display: 'flex',
              flexDirection: 'column'
            }}
            bodyStyle={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px'
            }}
          >
            {timelineLoading ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <Spin />
              </div>
            ) : timelineData && timelineData.length > 0 ? (
              <Timeline>
                {timelineData.map((item, index) => (
                  <Timeline.Item
                    key={`${item.id}-${index}`}
                    color={getTimelineItemColor(item.action)}
                  >
                    <div>
                      <strong>{item.userName}</strong>
                      <p>{item.description}</p>
                      <p style={{ fontSize: '12px', color: '#888' }}>
                        {formatTimestamp(item.createdAt)}
                      </p>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            ) : (
              <Empty description="Không có lịch sử hoạt động" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RoomDetailView; 