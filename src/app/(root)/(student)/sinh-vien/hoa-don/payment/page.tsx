import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Thanh toán hóa đơn - Ký túc xá sinh viên",
  description: "Thanh toán hóa đơn phòng ở ký túc xá sinh viên",
};
const PaymentPage = dynamic(
  () => import("@/components/pages/sinh-vien/hoa-don/payment"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <PaymentPage />;
}
