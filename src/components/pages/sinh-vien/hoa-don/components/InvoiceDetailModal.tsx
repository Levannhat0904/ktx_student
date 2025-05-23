import React from "react";
import { Tag, Spin, Typography, Button, Space } from "antd";
import { useGetInvoiceById } from "@/api/invoice";
import { formatCurrency, formatDateMonthYear } from "@/utils";
import DetailModal from "@/components/molecules/shared/DetailModal";
import { useRouter } from "next/navigation";
import { DollarOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

interface InvoiceDetailModalProps {
  invoiceId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = ({
  invoiceId,
  isOpen,
  onClose,
}) => {
  const { data: invoiceData, isLoading } = useGetInvoiceById(invoiceId || 0);
  const router = useRouter();

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

  const handlePayment = () => {
    if (invoiceId) {
      router.push(`/sinh-vien/hoa-don/payment?id=${invoiceId}`);
      onClose();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spin size="large" />
      </div>
    );
  }

  if (!invoiceData?.data) {
    return null;
  }

  const invoice = invoiceData.data;

  const generalInfo = [
    {
      label: "Số hóa đơn",
      value: invoice.invoiceNumber || "N/A",
    },
    {
      label: "Tháng",
      value: formatDateMonthYear(invoice.invoiceMonth),
    },
    {
      label: "Hạn thanh toán",
      value: invoice.dueDate
        ? new Date(invoice.dueDate).toLocaleDateString("vi-VN")
        : "N/A",
    },
    {
      label: "Trạng thái",
      value: (
        <Tag color={getStatusColor(invoice.paymentStatus)}>
          {getStatusText(invoice.paymentStatus)}
        </Tag>
      ),
    },
  ];

  const roomInfo = [
    {
      label: "Phòng",
      value: invoice.roomNumber,
    },
    {
      label: "Tòa nhà",
      value: invoice.buildingName,
    },
  ];

  const feeDetails = [
    {
      label: "Tiền phòng",
      value: (
        <Text strong className="text-orange-500">
          {formatCurrency(invoice.roomFee || 0)} VNĐ
        </Text>
      ),
    },
    {
      label: "Phí dịch vụ",
      value: (
        <Text strong className="text-orange-500">
          {formatCurrency(invoice.serviceFee || 0)} VNĐ
        </Text>
      ),
    },
    {
      label: "Số điện tiêu thụ",
      value: `${invoice.electricity || 0} kWh`,
    },
    {
      label: "Tiền điện",
      value: (
        <Text strong className="text-orange-500">
          {formatCurrency(invoice.electricFee || 0)} VNĐ
        </Text>
      ),
    },
    {
      label: "Số nước tiêu thụ",
      value: `${invoice.water || 0} m³`,
    },
    {
      label: "Tiền nước",
      value: (
        <Text strong className="text-orange-500">
          {formatCurrency(invoice.waterFee || 0)} VNĐ
        </Text>
      ),
    },
  ];

  const paymentInfo = [
    {
      label: "Tổng tiền",
      value: (
        <Text strong className="text-2xl text-orange-500">
          {formatCurrency(invoice.totalAmount || 0)} VNĐ
        </Text>
      ),
    },
  ];

  if (invoice.paymentDate) {
    paymentInfo.push({
      label: "Ngày thanh toán",
      value: (
        <Text>{new Date(invoice.paymentDate).toLocaleDateString("vi-VN")}</Text>
      ),
    });
  }

  if (invoice.paymentMethod) {
    paymentInfo.push({
      label: "Phương thức thanh toán",
      value: <Text>{invoice.paymentMethod}</Text>,
    });
  }

  const renderFooter = () => {
    if (
      invoice.paymentStatus === "pending" ||
      invoice.paymentStatus === "overdue"
    ) {
      return (
        <Space>
          <Button onClick={onClose}>Đóng</Button>
          <Button
            type="primary"
            icon={<DollarOutlined />}
            onClick={handlePayment}
            style={{ background: "#fa8c16", borderColor: "#fa8c16" }}
          >
            Thanh toán ngay
          </Button>
        </Space>
      );
    }
    return <Button onClick={onClose}>Đóng</Button>;
  };

  return (
    <DetailModal
      title="Chi tiết hóa đơn"
      isOpen={isOpen}
      onClose={onClose}
      items={[
        {
          label: (
            <Title level={5} className="m-0">
              Thông tin chung
            </Title>
          ),
          value: (
            <div className="bg-gray-50 p-4 rounded-lg">
              {generalInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2 last:mb-0"
                >
                  <Text type="secondary">{item.label}:</Text>
                  <div>{item.value}</div>
                </div>
              ))}
            </div>
          ),
        },
        {
          label: (
            <Title level={5} className="m-0">
              Thông tin phòng
            </Title>
          ),
          value: (
            <div className="bg-gray-50 p-4 rounded-lg">
              {roomInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2 last:mb-0"
                >
                  <Text type="secondary">{item.label}:</Text>
                  <div>{item.value}</div>
                </div>
              ))}
            </div>
          ),
        },
        {
          label: (
            <Title level={5} className="m-0">
              Chi tiết phí
            </Title>
          ),
          value: (
            <div className="bg-gray-50 p-4 rounded-lg">
              {feeDetails.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2 last:mb-0"
                >
                  <Text type="secondary">{item.label}:</Text>
                  <div>{item.value}</div>
                </div>
              ))}
            </div>
          ),
        },
        {
          label: (
            <Title level={5} className="m-0">
              Thông tin thanh toán
            </Title>
          ),
          value: (
            <div className="bg-orange-50 p-4 rounded-lg">
              {paymentInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2 last:mb-0"
                >
                  <Text type="secondary">{item.label}:</Text>
                  <div>{item.value}</div>
                </div>
              ))}
            </div>
          ),
        },
      ]}
      footer={renderFooter()}
    />
  );
};

export default InvoiceDetailModal;
