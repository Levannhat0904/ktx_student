"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Layout,
  Typography,
  Card,
  Spin,
  Empty,
  Row,
  Col,
  Tabs,
  message,
  List,
  Modal,
  Descriptions,
  Button,
  Tag,
  Timeline,
} from "antd";
import {
  FileTextOutlined,
  FilePdfOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import contractApi from "@/api/contract";
import { Contract } from "@/types/student";
import { useStudent } from "@/contexts/StudentContext";
import ContractPreview from "@/components/molecules/ContractPreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import studentApi from "@/api/student";

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

/**
 * Trang quản lý hợp đồng của sinh viên
 * Hiển thị danh sách hợp đồng, chi tiết hợp đồng, lịch sử hợp đồng
 */
const ContractPage: React.FC = () => {
  const { studentData } = useStudent();
  console.log("studentData", studentData);
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [allTimelineData, setAllTimelineData] = useState<any[]>([]);
  const [allTimelineLoading, setAllTimelineLoading] = useState(false);
  const contractRef = useRef<HTMLDivElement>(null);

  // Hàm lấy timeline cho tất cả các hợp đồng
  const fetchAllContractsTimeline = async () => {
    if (contracts && contracts.length > 0) {
      setAllTimelineLoading(true);
      try {
        // Lấy các ID của tất cả hợp đồng
        const contractIds = contracts.map(contract => contract.id).filter(id => id !== undefined);
        
        // Gọi API để lấy timeline cho tất cả hợp đồng
        if (contractIds.length > 0) {
          const timelineResponse = await studentApi.getActivityLogs(
            "contract",
            undefined,
            undefined,
            undefined,
            contractIds
          );

          const sortedTimeline = timelineResponse.data.data.logs.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setAllTimelineData(sortedTimeline || []);
        }
      } catch (error) {
        console.error("Error fetching timeline:", error);
        message.error("Không thể tải lịch sử hoạt động");
      } finally {
        setAllTimelineLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setLoading(true);
        setAllTimelineLoading(true);
        if (studentData?.student?.id) {
          // Fetch contracts for the student
          const response = await contractApi.getContractsByStudent(
            studentData.student.id
          );
          setContracts(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching contracts:", error);
        message.error("Không thể tải thông tin hợp đồng");
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [studentData]);

  useEffect(() => {
    // Khi danh sách hợp đồng thay đổi, fetch timeline cho tất cả hợp đồng
    fetchAllContractsTimeline();
  }, [contracts]);

  // Cập nhật timeline khi chọn hợp đồng mới
  const handleViewContractDetail = async (contractId: number) => {
    try {
      setLoading(true);
      // Fetch contract details
      const response = await contractApi.getContractById(contractId);
      setSelectedContract(response.data);
      
      // Fetch timeline cho hợp đồng được chọn
      const timelineResponse = await studentApi.getActivityLogs(
        "contract",
        undefined,
        undefined,
        undefined,
        contractId,
        undefined
      );
      
      const sortedTimeline = timelineResponse.data.data.logs.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setAllTimelineData(sortedTimeline || []);
      
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching contract details:", error);
      message.error("Không thể tải chi tiết hợp đồng");
    } finally {
      setLoading(false);
    }
  };

  // Hàm đóng modal và hiển thị timeline cho tất cả hợp đồng
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedContract(null);
    fetchAllContractsTimeline();
  };

  const handleDownloadContract = async () => {
    if (!contractRef.current || !selectedContract) return;

    try {
      setLoading(true);
      const canvas = await html2canvas(contractRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        imgWidth,
        imgHeight
      );

      pdf.save(`hop-dong-${selectedContract.contractNumber}.pdf`);
      message.success("Tải hợp đồng thành công!");
    } catch (error) {
      console.error("Error downloading contract:", error);
      message.error("Không thể tải hợp đồng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm lấy màu cho tag trạng thái
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      active: "success",
      expired: "error",
      terminated: "error",
      pending: "warning",
    };
    return statusColors[status] || "default";
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang hiệu lực";
      case "expired":
        return "Đã hết hạn";
      case "terminated":
        return "Đã chấm dứt";
      default:
        return "Không xác định";
    }
  };

  // Sắp xếp hợp đồng theo trạng thái và ngày bắt đầu
  const activeContracts = contracts.filter(
    (contract) => contract.status === "active"
  );
  const expiredContracts = contracts.filter(
    (contract) =>
      contract.status === "expired" || contract.status === "terminated"
  );

  const ContractItem = ({ contract }: { contract: Contract }) => (
    <Card
      hoverable
      style={{ marginBottom: 16, borderRadius: 8 }}
      onClick={() => contract.id && handleViewContractDetail(contract.id)}
    >
      <Row gutter={16} align="middle">
        <Col xs={4} sm={2}>
          <FilePdfOutlined style={{ fontSize: 32, color: "#fa8c16" }} />
        </Col>
        <Col xs={20} sm={16}>
          <div style={{ fontWeight: "bold" }}>
            Hợp đồng #{contract.contractNumber}
          </div>
          <div>
            <ClockCircleOutlined style={{ marginRight: 8 }} />
            {contract.startDate
              ? new Date(contract.startDate).toLocaleDateString("vi-VN")
              : ""}{" "}
            -{" "}
            {contract.endDate
              ? new Date(contract.endDate).toLocaleDateString("vi-VN")
              : ""}
          </div>
        </Col>
        <Col xs={24} sm={6} style={{ textAlign: "right" }}>
          <Tag color={getStatusColor(contract.status || "")}>
            {getStatusText(contract.status || "")}
          </Tag>
        </Col>
      </Row>
    </Card>
  );

  const getTimelineItemColor = (action: string) => {
    switch (action) {
      case "create":
        return "green";
      case "update":
        return "blue";
      case "delete":
        return "red";
      case "status_change":
        return "orange";
      default:
        return "gray";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Content style={{ padding: "20px" }}>
        <Card style={{ marginBottom: 20, borderRadius: 8 }}>
          <Title level={3} style={{ color: "#fa8c16", margin: 0 }}>
            <FileTextOutlined /> Quản lý hợp đồng
          </Title>
          <Text>Xem và quản lý các hợp đồng thuê phòng ký túc xá của bạn</Text>
        </Card>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Card style={{ borderRadius: 8 }}>
            <Tabs defaultActiveKey="active">
              <TabPane
                tab={
                  <span>
                    <CheckCircleOutlined /> Hợp đồng hiện tại
                  </span>
                }
                key="active"
              >
                {/* activeContracts */}
                {contracts.length > 0 ? (
                  contracts.map((contract) => (
                    <ContractItem key={contract.id} contract={contract} />
                  ))
                ) : (
                  <Empty
                    description="Bạn không có hợp đồng đang hiệu lực"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <InfoCircleOutlined /> Lịch sử
                  </span>
                }
                key="expired"
              >
                <Card title="Lịch sử hoạt động">
                  {allTimelineLoading ? (
                    <div style={{ textAlign: "center", padding: "20px 0" }}>
                      <Spin />
                    </div>
                  ) : allTimelineData.length > 0 ? (
                    <Timeline>
                      {allTimelineData.map((item) => (
                        <Timeline.Item
                          key={item.id}
                          color={getTimelineItemColor(item.action)}
                        >
                          <div>
                            <strong>{item.userName}</strong>
                            <p>{item.description}</p>
                            <p style={{ fontSize: "12px", color: "#888" }}>
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
              </TabPane>
            </Tabs>
          </Card>
        )}

        <Modal
          title={`Chi tiết hợp đồng #${selectedContract?.contractNumber}`}
          open={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="preview" onClick={() => setIsPreviewVisible(true)}>
              Xem hợp đồng
            </Button>,
            <Button key="close" onClick={handleCloseModal}>
              Đóng
            </Button>,
            // <Button
            //   key="download"
            //   type="primary"
            //   style={{ background: "#fa8c16", borderColor: "#fa8c16" }}
            //   onClick={handleDownloadContract}
            //   loading={loading}
            // >
            //   <FilePdfOutlined /> Tải hợp đồng
            // </Button>,
          ]}
          width={800}
        >
          <Tabs defaultActiveKey="info">
            <TabPane
              tab={
                <span>
                  <InfoCircleOutlined /> Thông tin
                </span>
              }
              key="info"
            >
              {selectedContract ? (
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Mã hợp đồng">
                    {selectedContract.contractNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày bắt đầu">
                    {selectedContract.startDate
                      ? new Date(selectedContract.startDate).toLocaleDateString(
                          "vi-VN"
                        )
                      : ""}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày kết thúc">
                    {selectedContract.endDate
                      ? new Date(selectedContract.endDate).toLocaleDateString(
                          "vi-VN"
                        )
                      : ""}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tiền đặt cọc">
                    {Number(selectedContract.depositAmount)?.toLocaleString(
                      "vi-VN"
                    )}{" "}
                    VNĐ
                  </Descriptions.Item>
                  <Descriptions.Item label="Phí hàng tháng">
                    {Number(selectedContract.monthlyFee)?.toLocaleString(
                      "vi-VN"
                    )}{" "}
                    VNĐ
                  </Descriptions.Item>
                  <Descriptions.Item label="Trạng thái">
                    <Tag color={getStatusColor(selectedContract.status || "")}>
                      {getStatusText(selectedContract.status || "")}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày tạo">
                    {selectedContract.createdAt
                      ? new Date(selectedContract.createdAt).toLocaleDateString(
                          "vi-VN"
                        )
                      : ""}
                  </Descriptions.Item>
                </Descriptions>
              ) : (
                <Spin />
              )}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <HistoryOutlined /> Lịch sử hoạt động
                </span>
              }
              key="timeline"
            >
              {allTimelineLoading ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <Spin />
                </div>
              ) : allTimelineData.length > 0 ? (
                <Timeline>
                  {allTimelineData.map((item) => (
                    <Timeline.Item
                      key={item.id}
                      color={getTimelineItemColor(item.action)}
                    >
                      <div>
                        <strong>{item.userName}</strong>
                        <p>{item.description}</p>
                        <p style={{ fontSize: "12px", color: "#888" }}>
                          {formatTimestamp(item.createdAt)}
                        </p>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              ) : (
                <Empty description="Không có lịch sử hoạt động" />
              )}
            </TabPane>
          </Tabs>
        </Modal>

        <Modal
          title="Xem trước hợp đồng"
          open={isPreviewVisible}
          onCancel={() => setIsPreviewVisible(false)}
          width={800}
          footer={[
            <Button key="close" onClick={() => setIsPreviewVisible(false)}>
              Đóng
            </Button>,
            <Button
              key="download"
              type="primary"
              onClick={handleDownloadContract}
              loading={loading}
              style={{ background: "#fa8c16", borderColor: "#fa8c16" }}
            >
              <FilePdfOutlined /> Tải hợp đồng
            </Button>,
          ]}
        >
          <div ref={contractRef}>
            {selectedContract && studentData && (
              <ContractPreview
                contractData={{
                  contractNumber: selectedContract.contractNumber || "",
                  studentName: studentData?.student?.fullName || "",
                  studentId: studentData?.student?.studentId || "",
                  roomNumber: selectedContract.roomNumber || "",
                  buildingName: selectedContract.buildingName || "",
                  startDate: selectedContract.startDate || "",
                  endDate: selectedContract.endDate || "",
                  depositAmount: selectedContract.depositAmount || 0,
                  monthlyFee: selectedContract.monthlyFee || 0,
                  studentCode: studentData?.student?.studentCode || "",
                }}
              />
            )}
          </div>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ContractPage;
