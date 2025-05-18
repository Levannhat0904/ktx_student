import React from "react";
import { Card, List, Typography, Space, Tag } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import ResidentAvatar from "../atoms/ResidentAvatar";

const { Text } = Typography;

interface Resident {
  id: number;
  fullName: string;
  studentCode: string;
  avatarPath?: string;
  paymentStatus: string;
  joinDate: string;
}

interface ResidentListProps {
  residents: Resident[];
}

const ResidentList: React.FC<ResidentListProps> = ({ residents = [] }) => {
  return (
    <Card title="Danh sách sinh viên" className="shadow-md">
      <List
        dataSource={residents}
        grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
        renderItem={(resident) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <ResidentAvatar 
                  src={resident.avatarPath} 
                  size={64}
                />
              }
              title={
                <Space wrap>
                  <Text strong className="text-base">{resident.fullName}</Text>
                  <Tag color={resident.paymentStatus === "paid" ? "success" : "error"}>
                    {resident.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                  </Tag>
                </Space>
              }
              description={
                <Space direction="vertical" size="small" className="mt-2">
                  <Text>MSSV: {resident.studentCode}</Text>
                  <Text>
                    <CalendarOutlined className="mr-2" />
                    Ngày vào: {new Date(resident.joinDate).toLocaleDateString("vi-VN")}
                  </Text>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ResidentList; 