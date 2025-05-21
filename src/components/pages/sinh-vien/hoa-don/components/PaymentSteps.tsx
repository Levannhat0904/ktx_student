import React from "react";
import { Card, Steps } from "antd";
import {
  WalletOutlined,
  QrcodeOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

interface PaymentStepsProps {
  currentStep: number;
  isMobile: boolean;
}

const PaymentSteps: React.FC<PaymentStepsProps> = ({ currentStep, isMobile }) => {
  return (
    <Card 
      className="!mb-8 shadow-sm border-0" 
      style={{ borderRadius: '16px' }}
    >
      <Steps
        current={currentStep}
        responsive={true}
        size={isMobile ? "small" : "default"}
        className="px-4 py-2"
      >
        <Step
          title={<span className="font-medium">Phương thức</span>}
          icon={<WalletOutlined />}
          description={isMobile ? null : "Chọn phương thức thanh toán"}
        />
        <Step
          title={<span className="font-medium">Thanh toán</span>}
          icon={<QrcodeOutlined />}
          description={isMobile ? null : "Quét mã QR và thanh toán"}
        />
        <Step
          title={<span className="font-medium">Hoàn tất</span>}
          icon={<CheckCircleOutlined />}
          description={isMobile ? null : "Xác nhận hoàn tất"}
        />
      </Steps>
    </Card>
  );
};

export default PaymentSteps; 