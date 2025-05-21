import React from "react";
import { Card, Typography, Radio, Row, Col, Button, Image } from "antd";
import { ArrowLeftOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { LOGO_MB, LOGO_TCB, LOGO_CAKE } from "@/constants/common";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const { Title, Text } = Typography;

interface PaymentMethodSelectionProps {
  paymentMethod: string;
  onPaymentMethodChange: (e: any) => void;
  onBack: () => void;
  onNext: () => void;
}

const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  onBack,
  onNext,
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <Card className="shadow-sm border-0" style={{ borderRadius: '16px' }}>
      <div className="mb-6">
        <Title level={4} className="!mb-2 text-[#1a3353]">
          Chọn phương thức thanh toán
        </Title>
        <Text className="text-gray-500">
          Vui lòng chọn một phương thức thanh toán bên dưới
        </Text>
      </div>

      <Radio.Group
        onChange={onPaymentMethodChange}
        value={paymentMethod}
        className="w-full"
      >
        <Row gutter={[16, 16]} className="mt-6">
          <Col xs={24} sm={8}>
            <Radio.Button
              value="MBBANK"
              className="w-full h-auto p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              style={{
                backgroundColor: paymentMethod === "MBBANK" ? "#f1f8fe" : "white",
                borderColor: paymentMethod === "MBBANK" ? "#1B4FA7" : "#e6e6e6",
                height: isMobile ? '220px' : '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div className="text-center relative z-10 w-full">
                <div className="mb-4 md:mb-6 transform transition-transform duration-300 hover:scale-105 h-[120px] md:h-[200px] flex items-center justify-center">
                  <Image
                    src={LOGO_MB}
                    alt="MBBANK"
                    width={isMobile ? 150 : 200}
                    height={isMobile ? 100 : 180}
                    style={{ margin: '0 auto' }}
                    className="object-contain"
                    preview={false}
                  />
                </div>
                <div className="font-semibold text-xl md:text-2xl mb-2 md:mb-3 text-[#1B4FA7]">MB Bank</div>
                <div className="text-sm md:text-base text-gray-600">
                  Thanh toán qua ngân hàng MB Bank
                </div>
              </div>
              {paymentMethod === "MBBANK" && (
                <div className="absolute top-2 md:top-4 right-2 md:right-4">
                  <CheckCircleOutlined className="text-xl md:text-2xl text-[#1B4FA7]" />
                </div>
              )}
            </Radio.Button>
          </Col>
          
          <Col xs={24} sm={8}>
            <Radio.Button
              value="TECHCOMBANK"
              className="w-full h-auto p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              style={{
                backgroundColor: paymentMethod === "TECHCOMBANK" ? "#fff7e6" : "white",
                borderColor: paymentMethod === "TECHCOMBANK" ? "#F4292D" : "#e6e6e6",
                height: isMobile ? '220px' : '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div className="text-center relative z-10 w-full">
                <div className="mb-4 md:mb-6 transform transition-transform duration-300 hover:scale-105 h-[120px] md:h-[200px] flex items-center justify-center">
                  <Image
                    src={LOGO_TCB}
                    alt="TCB"
                    width={isMobile ? 150 : 200}
                    height={isMobile ? 100 : 180}
                    style={{ margin: '0 auto' }}
                    className="object-contain"
                    preview={false}
                  />
                </div>
                <div className="font-semibold text-xl md:text-2xl mb-2 md:mb-3 text-[#F4292D]">Techcombank</div>
                <div className="text-sm md:text-base text-gray-600">
                  Chuyển khoản ngân hàng qua mã QR
                </div>
              </div>
              {paymentMethod === "TECHCOMBANK" && (
                <div className="absolute top-2 md:top-4 right-2 md:right-4">
                  <CheckCircleOutlined className="text-xl md:text-2xl text-[#F4292D]" />
                </div>
              )}
            </Radio.Button>
          </Col>
          
          <Col xs={24} sm={8}>
            <Radio.Button
              value="CAKE"
              className="w-full h-auto p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              style={{
                backgroundColor: paymentMethod === "CAKE" ? "#FFF0F5" : "white",
                borderColor: paymentMethod === "CAKE" ? "#E31C79" : "#e6e6e6",
                height: isMobile ? '220px' : '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div className="text-center relative z-10 w-full">
                <div className="mb-4 md:mb-6 transform transition-transform duration-300 hover:scale-105 h-[120px] md:h-[200px] flex items-center justify-center">
                  <Image
                    src={LOGO_CAKE}
                    alt="CAKE BY VPBANK"
                    width={isMobile ? 150 : 200}
                    height={isMobile ? 100 : 180}
                    style={{ margin: '0 auto' }}
                    className="object-contain"
                    preview={false}
                  />
                </div>
                <div className="font-semibold text-xl md:text-2xl mb-2 md:mb-3 text-[#E31C79]">Cake by VPBank</div>
                <div className="text-sm md:text-base text-gray-600">
                  Thanh toán qua Cake by VPBank
                </div>
              </div>
              {paymentMethod === "CAKE" && (
                <div className="absolute top-2 md:top-4 right-2 md:right-4">
                  <CheckCircleOutlined className="text-xl md:text-2xl text-[#E31C79]" />
                </div>
              )}
            </Radio.Button>
          </Col>
        </Row>
      </Radio.Group>

      <div className="flex flex-col-reverse md:flex-row  justify-between gap-4 md:gap-0 mt-8">
      <Button 
              onClick={onBack} 
              icon={<ArrowLeftOutlined />}
              size={isMobile ? "middle" : "large"}
              className="px-6 w-full md:w-auto"
            >
              Quay lại
            </Button>
        <Button
          type="primary"
          onClick={onNext}
          size={isMobile ? "middle" : "large"}
          className="px-8 w-full md:w-auto"
          style={{ 
            background: "linear-gradient(to right, #1B4FA7, #5C8FE6)",
            borderColor: "#1B4FA7"
          }}
        >
          Tiếp tục
        </Button>
           
      </div>
    </Card>
  );
};

export default PaymentMethodSelection; 