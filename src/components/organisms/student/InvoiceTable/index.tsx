import React, { useState } from "react";
import { Table, Tag, Space, Button, Typography, Card, message } from "antd";
import { Invoice } from "@/types/student";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { formatDateMonthYear } from "@/utils";
import { useRouter } from "next/navigation";
import InvoiceDetailModal from "@/components/pages/sinh-vien/hoa-don/components/InvoiceDetailModal";

interface InvoiceTableProps {
  invoices: Invoice[];
  onViewInvoiceDetail?: (invoiceId: number) => void;
  onPayInvoice?: (invoiceId: number) => void;
}

/**
 * Component hiển thị bảng danh sách hóa đơn của sinh viên
 * Hiển thị các thông tin như: số hóa đơn, tháng, ngày hết hạn, tổng tiền, trạng thái
 * Cho phép sinh viên xem chi tiết và thanh toán hóa đơn
 */
const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  onViewInvoiceDetail,
  onPayInvoice,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const handlePayInvoice = (invoiceId: number | undefined) => {
    if (invoiceId) {
      router.push(`/sinh-vien/hoa-don/payment?id=${invoiceId}`);
    } else {
      message.error("Không thể tìm thấy mã hóa đơn");
    }
  };
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };
  const getStatusColor = (status: string | undefined) => {
    if (!status) return "default";
    const statusColors: Record<string, string> = {
      paid: "success",
      pending: "warning",
      overdue: "error",
      waiting_for_approval: "warning",
    };
    return statusColors[status] || "default";
  };

  const getStatusText = (status: string | undefined) => {
    if (!status) return "Không xác định";
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

  const formatDate = (date: string | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatMonth = (date: string | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("vi-VN", {
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number | undefined) => {
    if (!amount) return "0 VNĐ";
    return Number(amount)?.toLocaleString("vi-VN") + " VNĐ";
  };

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
      width: 150,
      render: (date: string) => formatDateMonthYear(date),
    },
    {
      title: "Hạn thanh toán",
      dataIndex: "dueDate",
      key: "dueDate",
      width: 130,
      render: (date: string) => formatDate(date),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 150,
      render: (amount: number) => (
        <Typography.Text strong className="text-orange-500">
          {formatCurrency(Number(amount))}
        </Typography.Text>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 130,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: "Ngày TT",
      dataIndex: "paymentDate",
      key: "paymentDate",
      width: 130,
      render: (date: string) => formatDate(date),
    },
    {
      title: "Hành động",
      key: "action",
      fixed: isMobile ? undefined : ("left" as const),
      width: 250,
      render: (_: any, record: Invoice) => (
        <Space size="middle">
          {record.paymentStatus !== "paid" && (
            <Button
              type={
                record.paymentStatus === "waiting_for_approval"
                  ? "dashed"
                  : "primary"
              }
              style={{
                background:
                  record.paymentStatus === "waiting_for_approval"
                    ? ""
                    : "#fa8c16",
                borderColor:
                  record.paymentStatus === "waiting_for_approval"
                    ? ""
                    : "#fa8c16",
              }}
              disabled={record.paymentStatus === "waiting_for_approval"}
              onClick={() => handlePayInvoice(record.id)}
            >
              {record.paymentStatus === "waiting_for_approval"
                ? "Đang chờ duyệt"
                : "Thanh toán"}
            </Button>
          )}
          <Button
            onClick={() => {
              setSelectedInvoiceId(record.id || null);
              setIsDetailModalOpen(true);
            }}
          >
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg p-4">
      <Table
        columns={columns}
        dataSource={invoices}
        rowKey="id"
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
          showSizeChanger: false,
        }}
        scroll={{ x: 900 }}
        className="invoice-table"
      />
      <InvoiceDetailModal
        invoiceId={selectedInvoiceId}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />
    </div>
  );
};

export default InvoiceTable;
