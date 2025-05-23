"use client";

import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Spin,
  Row,
  Col,
  message,
  Button,
  Modal,
  Drawer,
} from "antd";
import { ToolOutlined, PlusOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import { MaintenanceRequest } from "@/types/student";
import MaintenanceRequestTable from "@/components/organisms/student/MaintenanceRequestTable";
import MaintenanceRequestForm from "@/components/organisms/student/MaintenanceRequestForm";
import {
  useGetRoomMaintenanceRequests,
  useCancelMaintenanceRequest,
  useGetCurrentStudentDetail,
} from "@/api/student";
import MaintenanceDetailModal from "./components/MaintenanceDetailModal";

const { Content } = Layout;
const { Title, Text } = Typography;

/**
 * Trang quản lý yêu cầu bảo trì của sinh viên
 * Hiển thị danh sách yêu cầu bảo trì, form tạo yêu cầu mới
 */
const MaintenancePage: React.FC = () => {
  const { adminProfile: user, isPending, onLogout } = useAuth();
  const [maintenanceRequests, setMaintenanceRequests] = useState<
    MaintenanceRequest[]
  >([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<MaintenanceRequest | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [studentId, setStudentId] = useState<number | null>(null);
  const [roomId, setRoomId] = useState<number | null>(null);

  // Fetch current student details to get roomId
  const { data: studentData, isLoading: isLoadingStudent } =
    useGetCurrentStudentDetail();

  // Add debug logs
  console.log("User context:", user);
  console.log("Student data:", studentData);
  console.log("Room ID:", roomId);

  // Effect to extract roomId from student data
  useEffect(() => {
    if (studentData?.success && studentData?.data?.dormitory?.roomId) {
      setRoomId(studentData.data.dormitory.roomId || null);
      setStudentId(studentData.data.student.id || null);
    }
  }, [studentData]);

  // Get maintenance requests data from API
  const {
    data: maintenanceData,
    isLoading: isLoadingRequests,
    refetch,
  } = useGetRoomMaintenanceRequests(roomId || 0);

  // Add more debug logs
  console.log("API response:", maintenanceData);

  // Use real cancel request mutation
  const cancelRequestMutation = useCancelMaintenanceRequest();

  useEffect(() => {
    console.log("Effect triggered, maintenanceData:", maintenanceData);
    if (maintenanceData?.success && maintenanceData?.data) {
      console.log("Setting maintenance requests:", maintenanceData.data);
      setMaintenanceRequests(maintenanceData.data);
    } else if (maintenanceData?.success === false) {
      message.error("Không thể tải danh sách yêu cầu bảo trì.");
      setMaintenanceRequests([]);
    }
  }, [maintenanceData]);

  const handleCreateRequest = () => {
    setIsFormVisible(true);
  };

  const handleCancelRequest = async (requestId: number) => {
    try {
      Modal.confirm({
        title: "Xác nhận hủy yêu cầu",
        content: "Bạn có chắc chắn muốn hủy yêu cầu bảo trì này không?",
        okText: "Đồng ý",
        cancelText: "Hủy",
        onOk: async () => {
          await cancelRequestMutation.mutateAsync(requestId);
          message.success("Hủy yêu cầu bảo trì thành công");
          // Refresh danh sách
          refetch();
        },
      });
    } catch (error) {
      console.error("Error canceling request:", error);
      message.error("Không thể hủy yêu cầu. Vui lòng thử lại sau.");
    }
  };

  const handleViewDetail = (requestId: number) => {
    const request = maintenanceRequests.find((r) => r.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setIsDetailModalVisible(true);
    }
  };

  const handleFormSuccess = () => {
    setIsFormVisible(false);
    message.success("Yêu cầu bảo trì đã được gửi thành công!");
    // Refresh the list
    refetch();
  };

  const isLoading = isLoadingStudent || isLoadingRequests;

  return (
    <Layout className="min-h-screen max-w-screen bg-gray-50">
      <Content className="p-4 md:p-6">
        <Card style={{ marginBottom: 20, borderRadius: 8 }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3} style={{ color: "#fa8c16", margin: 0 }}>
                <ToolOutlined /> Yêu cầu bảo trì
              </Title>
              <Text>
                Quản lý các yêu cầu sửa chữa và bảo trì phòng ký túc xá
              </Text>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreateRequest}
                style={{ background: "#fa8c16", borderColor: "#fa8c16" }}
                disabled={!roomId}
              >
                Tạo yêu cầu mới
              </Button>
            </Col>
          </Row>
        </Card>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Spin size="large" />
          </div>
        ) : !roomId ? (
          <Card
            style={{ borderRadius: 8, textAlign: "center", padding: "40px 0" }}
          >
            <Text type="secondary">Bạn chưa được xếp phòng ký túc xá</Text>
          </Card>
        ) : (
          <Card style={{ borderRadius: 8 }}>
            {maintenanceRequests.length > 0 ? (
              <MaintenanceRequestTable
                maintenanceRequests={maintenanceRequests}
                onViewDetail={handleViewDetail}
                onCancelRequest={handleCancelRequest}
              />
            ) : (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <Text type="secondary">Chưa có yêu cầu bảo trì nào</Text>
              </div>
            )}
          </Card>
        )}

        {/* Form */}
        <Drawer
          title="Tạo yêu cầu bảo trì mới"
          width={600}
          onClose={() => setIsFormVisible(false)}
          open={isFormVisible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <MaintenanceRequestForm
            studentId={studentId || 0}
            roomId={roomId || 0}
            onSuccess={handleFormSuccess}
          />
        </Drawer>

        {/* Replace the old modal with the new component */}
        <MaintenanceDetailModal
          request={selectedRequest}
          isOpen={isDetailModalVisible}
          onClose={() => setIsDetailModalVisible(false)}
        />
      </Content>
    </Layout>
  );
};

export default MaintenancePage;
