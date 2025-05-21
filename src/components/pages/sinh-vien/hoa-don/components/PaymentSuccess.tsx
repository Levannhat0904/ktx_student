import React from "react";
import { Card, Result, Button } from "antd";

interface PaymentSuccessProps {
  onBack: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ onBack }) => {
  return (
    <Card className="shadow-sm border-0" style={{ borderRadius: '16px' }}>
      <Result
        status="success"
        title={
          <span className="text-[#52c41a] font-semibold">
            Gửi yêu cầu thanh toán thành công!
          </span>
        }
        subTitle="Nhân viên quản lý sẽ xác nhận giao dịch và cập nhật trạng thái hóa đơn trong thời gian sớm nhất."
        extra={[
          <Button
            type="primary"
            key="home"
            onClick={onBack}
            size="large"
            className="px-8"
            style={{ 
              background: "linear-gradient(to right, #fa8c16, #ffd591)",
              borderColor: "#fa8c16"
            }}
          >
            Về trang hóa đơn
          </Button>,
        ]}
      />
    </Card>
  );
};

export default PaymentSuccess; 