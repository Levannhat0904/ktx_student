"use client";

import React from "react";
import StudentLayout from "@/components/layouts/MainLayout";

export default function StudentRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
