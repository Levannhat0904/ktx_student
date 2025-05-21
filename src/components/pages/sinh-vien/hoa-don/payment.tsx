"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Layout, message, Spin, Result, Button } from "antd";
import { useGetInvoiceById } from "@/api/invoice";
import { useSubmitInvoicePayment } from "@/api/invoice";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import PaymentHeader from "./components/PaymentHeader";
import PaymentSteps from "./components/PaymentSteps";
import PaymentMethodSelection from "./components/PaymentMethodSelection";
import QRCodePayment from "./components/QRCodePayment";
import PaymentSuccess from "./components/PaymentSuccess";
import { InvoicePayment } from "@/types/student";

const { Content } = Layout;

/**
 * Trang thanh toán hóa đơn
 */
const InvoicePaymentPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("id");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("MBBANK");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Get invoice details
  const {
    data: invoiceData,
    isLoading,
    isError,
  } = useGetInvoiceById(invoiceId ? Number(invoiceId) : 0);
  const invoiceDetails = invoiceData?.data;

  // Payment mutation
  const { mutate: submitPayment } = useSubmitInvoicePayment();

  const handleBack = () => {
    router.push("/sinh-vien/hoa-don");
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePaymentMethodChange = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmitPayment = () => {
    if (!invoiceId) {
      message.error("Không tìm thấy thông tin hóa đơn");
      return;
    }

    setIsSubmitting(true);
    submitPayment(
      { invoiceId: Number(invoiceId), paymentMethod },
      {
        onSuccess: (response) => {
          setIsSubmitting(false);
          if (response.success) {
            setPaymentSuccess(true);
            setCurrentStep(2);
          }
        },
        onError: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !invoiceDetails) {
    return (
      <Result
        status="error"
        title="Không thể tải thông tin hóa đơn"
        subTitle="Vui lòng thử lại sau hoặc liên hệ quản trị viên."
        extra={[
          <Button type="primary" key="back" onClick={handleBack}>
            Quay lại trang hóa đơn
          </Button>,
        ]}
      />
    );
  }

  return (
    <Layout className="min-h-screen bg-[#f5f7fa]">
      <Content className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Header Card */}
        <PaymentHeader invoiceDetails={invoiceDetails} />

        {/* Steps Card */}
        <PaymentSteps currentStep={currentStep} isMobile={isMobile} />

        {/* Payment Method Selection */}
        {currentStep === 0 && (
          <PaymentMethodSelection
            paymentMethod={paymentMethod}
            onPaymentMethodChange={handlePaymentMethodChange}
            onBack={handleBack}
            onNext={handleNextStep}
          />
        )}

        {/* QR Code Payment Step */}
        {currentStep === 1 && (
          <QRCodePayment
            // lấy phương thức thanh toán
            paymentMethod={paymentMethod}
            invoiceDetails={invoiceDetails as unknown as InvoicePayment}
            isSubmitting={isSubmitting}
            onBack={handlePrevStep}
            onSubmit={handleSubmitPayment}
          />
        )}

        {/* Success Step */}
        {currentStep === 2 && <PaymentSuccess onBack={handleBack} />}
      </Content>
    </Layout>
  );
};

export default InvoicePaymentPage;
