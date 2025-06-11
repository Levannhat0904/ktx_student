import React from "react";
import { AuthenLayout } from "@/components/layouts";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return <AuthenLayout isFooter={false}>{children}</AuthenLayout>;
}
