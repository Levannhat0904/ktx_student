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
  Descriptions,
  Tag,
  Image,
} from "antd";
import { ToolOutlined, PlusOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import { MaintenanceRequest } from "@/types/student";
import MaintenanceRequestTable from "@/components/organisms/student/MaintenanceRequestTable";
import MaintenanceRequestForm from "@/components/organisms/student/MaintenanceRequestForm";
import dayjs from "dayjs";
import {
  useGetRoomMaintenanceRequests,
  useCancelMaintenanceRequest,
  useGetCurrentStudentDetail,
} from "@/api/student";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const { Content } = Layout;
const { Title, Text } = Typography;

// Thêm styles cho Swiper
const swiperStyles = `
  .maintenance-swiper {
    width: 100%;
    height: 100%;
  }
  .maintenance-swiper .swiper-slide {
    width: 100% !important;
    display: flex;
    justify-content: center;
  }
  .maintenance-swiper .swiper-button-next,
  .maintenance-swiper .swiper-button-prev {
    color: #1890ff;
  }
  .maintenance-swiper .swiper-pagination-bullet-active {
    background: #1890ff;
  }
`;

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
        title: 'Xác nhận hủy yêu cầu',
        content: 'Bạn có chắc chắn muốn hủy yêu cầu bảo trì này không?',
        okText: 'Đồng ý',
        cancelText: 'Hủy',
        onOk: async () => {
          await cancelRequestMutation.mutateAsync(requestId);
          message.success('Hủy yêu cầu bảo trì thành công');
          // Refresh danh sách
          refetch();
        }
      });
    } catch (error) {
      console.error('Error canceling request:', error);
      message.error('Không thể hủy yêu cầu. Vui lòng thử lại sau.');
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
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Content style={{ padding: "20px" }}>
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

        {/* Detail modal */}
        <Modal
          title="Chi tiết yêu cầu bảo trì"
          open={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          footer={null}
          width={700}
        >
          <style>{swiperStyles}</style>
          {selectedRequest && (
            <Descriptions bordered column={1} className="mt-4">
              <Descriptions.Item label="Mã yêu cầu">
                {selectedRequest.requestNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Loại yêu cầu">
                {selectedRequest.requestType}
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả">
                {selectedRequest.description}
              </Descriptions.Item>
              <Descriptions.Item label="Mức độ ưu tiên">
                <Tag
                  color={
                    selectedRequest.priority === "high"
                      ? "red"
                      : selectedRequest.priority === "normal"
                      ? "blue"
                      : selectedRequest.priority === "urgent"
                      ? "red"
                      : "green"
                  }
                >
                  {selectedRequest.priority === "high"
                    ? "Cao"
                    : selectedRequest.priority === "normal"
                    ? "Trung bình"
                    : selectedRequest.priority === "urgent"
                    ? "Khẩn cấp"
                    : "Thấp"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag
                  color={
                    selectedRequest.status === "pending"
                      ? "gold"
                      : selectedRequest.status === "processing"
                      ? "blue"
                      : selectedRequest.status === "completed"
                      ? "green"
                      : "red"
                  }
                >
                  {selectedRequest.status === "pending"
                    ? "Đang chờ"
                    : selectedRequest.status === "processing"
                    ? "Đang xử lý"
                    : selectedRequest.status === "completed"
                    ? "Hoàn thành"
                    : "Từ chối"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {dayjs(selectedRequest.createdAt).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item>
              {selectedRequest.resolvedAt && (
                <Descriptions.Item label="Ngày hoàn thành">
                  {dayjs(selectedRequest.resolvedAt).format("DD/MM/YYYY HH:mm")}
                </Descriptions.Item>
              )}
              {selectedRequest.resolutionNote && (
                <Descriptions.Item label="Ghi chú xử lý">
                  {selectedRequest.resolutionNote}
                </Descriptions.Item>
              )}
              {selectedRequest?.imagePaths && selectedRequest.imagePaths.length > 0 && (
                <Descriptions.Item label="Hình ảnh">
                  <div style={{ width: '100%', maxWidth: '100%' }}>
                    <Swiper
                      modules={[Navigation, Pagination]}
                      navigation
                      pagination={{ 
                        clickable: true,
                        dynamicBullets: true
                      }}
                      className="maintenance-swiper"
                      spaceBetween={0}
                      slidesPerView={1}
                      loop={false}
                      allowTouchMove={true}
                      watchSlidesProgress={true}
                      preventClicks={true}
                      grabCursor={true}
                      noSwiping={false}
                      simulateTouch={true}
                      resistance={true}
                      resistanceRatio={0.85}
                      shortSwipes={true}
                      touchRatio={1}
                      style={{ 
                        width: '100%',
                        margin: '0 auto'
                      }}
                    >
                      {selectedRequest.imagePaths.map((path, index) => (
                        <SwiperSlide key={index} style={{ width: '100%' }}>
                          <div style={{ 
                            width: '100%', 
                            height: '300px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#f0f2f5',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            padding: '10px'
                          }}>
                            <Image
                              src={path}
                              alt={`Ảnh ${index + 1}`}
                              style={{
                                maxWidth: '100%',
                                maxHeight: '280px',
                                objectFit: 'contain'
                              }}
                              preview={{
                                mask: (
                                  <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    padding: '8px',
                                    background: 'rgba(0,0,0,0.45)',
                                    color: '#fff',
                                    textAlign: 'center'
                                  }}>
                                    Nhấn để xem ảnh đầy đủ ({index + 1}/{selectedRequest?.imagePaths?.length})
                                  </div>
                                )
                              }}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default MaintenancePage;
