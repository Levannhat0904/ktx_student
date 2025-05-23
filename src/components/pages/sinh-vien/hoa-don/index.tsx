"use client";

import React, { useState, useEffect } from "react";
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
  Button,
  Table,
  Tag,
  Space,
  Timeline,
} from "antd";
import {
  CreditCardOutlined,
  DollarOutlined,
  FileDoneOutlined,
  FileExclamationOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { useGetCurrentStudentInvoices } from "@/api/invoice";
import { Invoice } from "@/types/student";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useRouter } from "next/navigation";
import studentApi from "@/api/student";
import styles from "./styles.module.scss";
import { formatCurrency, formatDateMonthYear } from "@/utils";
import InvoiceDetailModal from "./components/InvoiceDetailModal";

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

/**
 * Trang quản lý hóa đơn của sinh viên
 * Hiển thị danh sách hóa đơn, chi tiết hóa đơn, lịch sử thanh toán
 */
const InvoicePage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [timelineData, setTimelineData] = useState<any[]>([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const router = useRouter();

  // Use React Query to fetch invoice data
  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useGetCurrentStudentInvoices();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handlePayInvoice = (invoiceId: number | undefined) => {
    if (invoiceId) {
      router.push(`/sinh-vien/hoa-don/payment?id=${invoiceId}`);
    } else {
      message.error("Không thể tìm thấy mã hóa đơn");
    }
  };

  const handleViewDetail = (invoiceId: number) => {
    setSelectedInvoiceId(invoiceId);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedInvoiceId(null);
    setIsDetailModalOpen(false);
  };

  useEffect(() => {
    if (invoiceData?.success && invoiceData?.data?.invoices) {
      setInvoices(invoiceData.data.invoices);

      // Calculate total paid and unpaid amounts
      let unpaid = 0;
      let paid = 0;
      invoiceData.data.invoices.forEach((invoice) => {
        if (
          invoice.paymentStatus === "pending" ||
          invoice.paymentStatus === "overdue"
        ) {
          unpaid += invoice.totalAmount || 0;
        } else if (invoice.paymentStatus === "paid") {
          paid += invoice.totalAmount || 0;
        }
      });
      setTotalUnpaid(unpaid);
      setTotalPaid(paid);
    } else if (isError) {
      console.error("Error fetching invoices:", error);
      message.error("Không thể tải thông tin hóa đơn");
    }
  }, [invoiceData, isError, error]);

  useEffect(() => {
    const fetchTimeline = async () => {
      if (invoices.length > 0) {
        try {
          const timelineResponse = await studentApi.getActivityLogs(
            "invoice",
            invoices[0]?.id
          );
          if (
            timelineResponse.data.success &&
            timelineResponse.data.data.logs
          ) {
            setTimelineData(timelineResponse.data.data.logs);
          }
        } catch (error) {
          console.error("Error fetching timeline:", error);
          message.error("Không thể tải lịch sử hoạt động");
        }
      }
    };
    fetchTimeline();
  }, [invoices]);

  // Hàm lấy màu cho tag trạng thái
  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      paid: "success",
      pending: "warning",
      overdue: "error",
      waiting_for_approval: "processing",
    };
    return statusColors[status] || "default";
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Đã thanh toán";
      case "pending":
        return "Chờ thanh toán";
      case "waiting_for_approval":
        return "Chờ duyệt";
      case "overdue":
        return "Quá hạn";
      default:
        return "Không xác định";
    }
  };

  // Phân loại hóa đơn
  const unpaidInvoices = invoices.filter(
    (invoice) =>
      invoice.paymentStatus === "pending" ||
      invoice.paymentStatus === "overdue" ||
      invoice.paymentStatus === "waiting_for_approval"
  );
  const paidInvoices = invoices.filter(
    (invoice) => invoice.paymentStatus === "paid"
  );

  const columns = [
    {
      title: "Số hóa đơn",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      width: isMobile ? 100 : 120,
      fixed: isMobile ? undefined : ("left" as const),
    },
    {
      title: "Tháng",
      dataIndex: "invoiceMonth",
      key: "invoiceMonth",
      width: isMobile ? 120 : 140,
      render: (date: string) => (date ? formatDateMonthYear(date) : ""),
    },
    {
      title: "Hạn thanh toán",
      dataIndex: "dueDate",
      key: "dueDate",
      width: isMobile ? 100 : 120,
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: isMobile ? 120 : 130,
      render: (amount: number) => (
        <Text strong className="text-orange-500">
          {amount ? `${formatCurrency(Number(amount))} VNĐ` : "0 VNĐ"}
        </Text>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: isMobile ? 100 : 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: "Ngày TT",
      dataIndex: "paymentDate",
      key: "paymentDate",
      width: isMobile ? 100 : 120,
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "-",
    },
    {
      title: "Hành động",
      key: "action",
      fixed: isMobile ? undefined : ("right" as const),
      width: isMobile ? 140 : 160,
      render: (_: any, record: Invoice) => (
        <Space size="small">
          {(record.paymentStatus === "pending" ||
            record.paymentStatus === "overdue") && (
            <Button
              type="primary"
              style={{ background: "#fa8c16", borderColor: "#fa8c16" }}
              size="small"
              onClick={() => {
                handlePayInvoice(record.id);
              }}
            >
              Thanh toán
            </Button>
          )}
          {record.paymentStatus === "waiting_for_approval" && (
            <Button type="dashed" size="small" disabled>
              Đang xử lý
            </Button>
          )}
          <Button size="small" onClick={() => handleViewDetail(record.id || 0)}>
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  // Hàm format nội dung timeline
  const getTimelineContent = (log: any) => {
    console.log("Processing log:", log);
    let color = "blue";
    let icon = <ClockCircleOutlined />;

    switch (log.action) {
      case "payment_submitted":
        color = "orange";
        icon = <ClockCircleOutlined />;
        break;
      case "payment_approved":
        color = "green";
        icon = <CheckCircleOutlined />;
        break;
      case "payment_rejected":
        color = "red";
        icon = <ExclamationCircleOutlined />;
        break;
      case "create":
        color = "blue";
        icon = <FileAddOutlined />;
        break;
      default:
        color = "gray";
        icon = <ClockCircleOutlined />;
    }

    return {
      color,
      dot: icon,
    };
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen max-w-screen bg-gray-50">
      <Content className="p-4 md:p-6">
        {/* Header */}
        <Card style={{ marginBottom: 20, borderRadius: 8 }}>
          <Title level={3} style={{ color: "#fa8c16", margin: 0 }}>
            <CreditCardOutlined /> Quản lý hóa đơn
          </Title>
          <Text>Xem và thanh toán các hóa đơn phòng ký túc xá của bạn</Text>
        </Card>

        <Row gutter={[24, 24]}>
          {/* Left Content */}
          <Col xs={24} lg={16}>
            {/* Thống kê */}
            <Row gutter={[16, 16]} className="mb-6">
              <Col xs={24} sm={12}>
                <Card
                  className="rounded-lg bg-orange-50 border-orange-50 hover:shadow-md transition-shadow"
                  bodyStyle={{ padding: isMobile ? 12 : 16 }}
                >
                  <Row align="middle" gutter={16}>
                    <Col>
                      <DollarOutlined
                        style={{ fontSize: 36, color: "#fa8c16" }}
                      />
                    </Col>
                    <Col>
                      <div style={{ fontSize: 14, color: "#666" }}>
                        Cần thanh toán
                      </div>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: "bold",
                          color: "#fa541c",
                        }}
                      >
                        {Number(totalUnpaid).toLocaleString("vi-VN")} VNĐ
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xs={24} sm={12}>
                <Card
                  style={{
                    borderRadius: 8,
                    backgroundColor: "#e6f7ff",
                    borderColor: "#e6f7ff",
                  }}
                  bodyStyle={{ padding: 16 }}
                >
                  <Row align="middle" gutter={16}>
                    <Col>
                      <FileDoneOutlined
                        style={{ fontSize: 36, color: "#1890ff" }}
                      />
                    </Col>
                    <Col>
                      <div style={{ fontSize: 14, color: "#666" }}>
                        Đã thanh toán
                      </div>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: "bold",
                          color: "#096dd9",
                        }}
                      >
                        {Number(totalPaid).toLocaleString("vi-VN")} VNĐ
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            {/* Invoice Tables */}
            <Card style={{ borderRadius: 8 }}>
              <Tabs
                defaultActiveKey="unpaid"
                className="invoice-tabs"
                size={isMobile ? "small" : "middle"}
              >
                <TabPane
                  tab={
                    <span>
                      <FileExclamationOutlined /> Chờ thanh toán (
                      {unpaidInvoices.length})
                    </span>
                  }
                  key="unpaid"
                >
                  {unpaidInvoices.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table
                        columns={columns}
                        dataSource={unpaidInvoices}
                        rowKey="id"
                        pagination={false}
                        scroll={{ x: 800 }}
                        size={isMobile ? "small" : "middle"}
                        className="whitespace-nowrap"
                      />
                    </div>
                  ) : (
                    <Empty
                      description="Không có hóa đơn nào cần thanh toán"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <FileDoneOutlined /> Đã thanh toán ({paidInvoices.length})
                    </span>
                  }
                  key="paid"
                >
                  {paidInvoices.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table
                        columns={columns}
                        dataSource={paidInvoices}
                        rowKey="id"
                        pagination={false}
                        scroll={{ x: 800 }}
                        size={isMobile ? "small" : "middle"}
                        className="whitespace-nowrap"
                      />
                    </div>
                  ) : (
                    <Empty
                      description="Không có hóa đơn nào đã thanh toán"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </TabPane>
              </Tabs>
            </Card>
          </Col>

          {/* Timeline */}
          <Col xs={24} lg={8}>
            <Card
              title={
                <span className="flex items-center gap-2">
                  <ClockCircleOutlined className="text-blue-500" />
                  <span>Lịch sử hoạt động</span>
                </span>
              }
              className="h-full"
              style={{ borderRadius: 8 }}
              bodyStyle={{
                height: "calc(100% - 57px)",
                overflowY: "auto",
                paddingRight: 12,
              }}
            >
              <div
                className={
                  styles.timeline_custom + " max-h-[450px] overflow-y-auto"
                }
              >
                <Timeline>
                  {timelineData.map((log, index) => {
                    const timelineItem = getTimelineContent(log);
                    return (
                      <Timeline.Item
                        key={log.id}
                        color={timelineItem.color}
                        dot={timelineItem.dot}
                      >
                        <div className="pb-4">
                          <div className="font-medium text-gray-800">
                            {log.userName} ({log.email})
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {log.description}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(log.createdAt).toLocaleString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                      </Timeline.Item>
                    );
                  })}
                </Timeline>
                {timelineData.length === 0 && (
                  <Empty
                    description="Chưa có hoạt động nào"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Add the modal component */}
      <InvoiceDetailModal
        invoiceId={selectedInvoiceId}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />
    </Layout>
  );
};

export default InvoicePage;
