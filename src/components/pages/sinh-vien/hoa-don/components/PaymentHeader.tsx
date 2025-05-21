import React from "react";
import { Card, Typography } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import { Invoice } from "@/types/student";
import { formatDateMonthYear } from "@/utils";

const { Title, Text } = Typography;

interface PaymentHeaderProps {
  invoiceDetails: Invoice;
}

const PaymentHeader: React.FC<PaymentHeaderProps> = ({ invoiceDetails }) => {
  const formatDate = formatDateMonthYear(invoiceDetails?.invoiceMonth);

  return (
    <Card 
      className="!mb-8 shadow-sm border-0 overflow-hidden"
      style={{ borderRadius: '16px' }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <Title level={3} className="!mb-2 flex items-center gap-2 text-[#1a3353]">
            <CreditCardOutlined className="text-[#fa8c16]" /> 
            Thanh toán hóa đơn
          </Title>
          <Text className="text-gray-500">
            Thực hiện thanh toán hóa đơn #{invoiceDetails?.invoiceNumber} - Tháng{" "}
            {formatDate}
          </Text>
        </div>
        <div className="mt-4 md:mt-0">
          <Text strong className="text-lg">
            Tổng tiền:{" "}
            <span className="text-[#f5222d]">
              {Number(invoiceDetails?.totalAmount)?.toLocaleString("vi-VN")} VNĐ
            </span>
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default PaymentHeader; 