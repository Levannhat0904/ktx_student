import React from "react";
import {
  Card,
  Typography,
  Alert,
  Image,
  Divider,
  Button,
  Descriptions,
  Space,
  message,
} from "antd";
import {
  QrcodeOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { InvoicePayment } from "@/types/student";
import { generateQRCode } from "@/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const { Title, Text } = Typography;

interface QRCodePaymentProps {
  invoiceDetails: InvoicePayment;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
  paymentMethod: string;
}

const QRCodePayment: React.FC<QRCodePaymentProps> = ({
  invoiceDetails,
  isSubmitting,
  onBack,
  onSubmit,
  paymentMethod,
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const formatCurrency = (amount?: number) => {
    if (!amount) return "0";
    return amount.toLocaleString("vi-VN");
  };

  const qrValue = generateQRCode(
    paymentMethod,
    Number(invoiceDetails?.totalAmount),
    `KTX${invoiceDetails?.invoiceNumber || ""}`.replace(/[-\s]/g, "")
  );

  return (
    <Card className="shadow-sm border-0" style={{ borderRadius: "16px" }}>
      <Title level={4} className="!mb-6 flex items-center gap-2 text-[#1a3353]">
        <QrcodeOutlined className="text-[#1B4FA7]" />
        Quét mã QR để thanh toán
      </Title>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="bg-white p-6 rounded-xl shadow-sm border mb-6 w-full md:w-auto">
            <div className="text-center mb-4">
              <Text strong className="text-lg md:text-xl text-[#1B4FA7]">
                Số tiền cần thanh toán
              </Text>
              <div className="text-2xl md:text-3xl font-bold text-[#f5222d] mt-1">
                {formatCurrency(Number(invoiceDetails?.totalAmount))} VNĐ
              </div>
            </div>
            <Divider className="my-4" />
            <div className="w-full h-full flex flex-col items-center">
              <Image
                src={qrValue}
                alt="QR Code"
                width={isMobile ? 250 : 500}
                height={isMobile ? 250 : 600}
                className="mx-auto"
                preview={false}
              />
              <div className="text-center">
                <Text strong className="text-gray-600 block mb-2">
                  Nội dung chuyển khoản
                </Text>
                <Space>
                  <div
                    className="text-lg py-2 bg-gray-50 flex items-center p-2 gap-2 cursor-pointer hover:bg-gray-100 transition-all duration-300"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `KTX-${invoiceDetails?.invoiceNumber || ""}`.replace(
                          /[-\s]/g,
                          ""
                        )
                      );
                      message.success("Đã copy nội dung chuyển khoản");
                    }}
                  >
                    {`KTX-${invoiceDetails?.invoiceNumber || ""}`.replace(
                      /[-\s]/g,
                      ""
                    )}
                    <CopyOutlined />
                  </div>
                </Space>
                <Alert
                  message="Hướng dẫn thanh toán"
                  description={
                    <ol className="list-decimal mb-0 text-left space-y-1">
                      <li>Mở ứng dụng ngân hàng trên điện thoại</li>
                      <li>Chọn tính năng quét mã QR</li>
                      <li>Quét mã QR ở trên</li>
                      <li>Kiểm tra thông tin và xác nhận thanh toán</li>
                    </ol>
                  }
                  type="info"
                  showIcon
                  className="w-full !mt-2"
                />
              </div>
            </div>
            <Divider className="my-4" />
          </div>
        </div>
        <div className="flex-1">
          <Card
            title={<span className="text-[#1a3353]">Thông tin thanh toán</span>}
            className="mb-6"
            size={isMobile ? "small" : "default"}
          >
            <Descriptions
              bordered
              column={1}
              size={isMobile ? "small" : "default"}
              labelStyle={{
                fontWeight: 500,
                backgroundColor: "#fafafa",
                width: "35%",
              }}
              contentStyle={{
                backgroundColor: "white",
              }}
            >
              <Descriptions.Item label="Mã hóa đơn">
                {invoiceDetails?.invoiceNumber || "--"}
              </Descriptions.Item>
              <Descriptions.Item label="Phòng">
                {invoiceDetails?.roomNumber && invoiceDetails?.floorNumber
                  ? `${invoiceDetails.roomNumber}, Tầng ${invoiceDetails.floorNumber}`
                  : "--"}
              </Descriptions.Item>
              <Descriptions.Item label="Tòa nhà">
                {invoiceDetails?.buildingName || "--"}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Alert
            message="Lưu ý quan trọng"
            description={
              <ul className="list-disc pl-4 mb-0 space-y-1">
                <li>Vui lòng kiểm tra kỹ thông tin trước khi thanh toán</li>
                <li>Giao dịch có thể mất vài phút để được xác nhận</li>
                <li>
                  Không tắt trang cho đến khi nhận được thông báo thành công
                </li>
              </ul>
            }
            type="warning"
            showIcon
            className="!mt-6"
          />
        </div>
      </div>

      <Divider />

      <div className="flex flex-col md:flex-row-reverse justify-between gap-4 md:gap-0">
        <Button
          type="primary"
          onClick={onSubmit}
          loading={isSubmitting}
          icon={<CheckCircleOutlined />}
          size={isMobile ? "middle" : "large"}
          className="w-full md:w-auto px-8"
          style={{
            background: "linear-gradient(to right, #1B4FA7, #5C8FE6)",
            borderColor: "#1B4FA7",
          }}
        >
          Xác nhận đã thanh toán
        </Button>
        <Button
          onClick={onBack}
          icon={<ArrowLeftOutlined />}
          size={isMobile ? "middle" : "large"}
          className="w-full md:w-auto px-6"
        >
          Quay lại
        </Button>
      </div>
    </Card>
  );
};

export default QRCodePayment;
