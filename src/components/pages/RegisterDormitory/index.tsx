"use client";
import React from "react";
import FormRegister from "./components/FormRegister";
import { Layout } from "antd";
import HeaderLandingPage from "@/components/organisms/HeaderLandingPage";
import FooterLandingPage from "@/components/organisms/FooterLandingPage";
import BgMotion from "@/components/organisms/bgMotion";

const RegisterDormitory = () => {
  return (
   <Layout className="min-h-screen">
    <div className="flex flex-col min-h-screen">
      <HeaderLandingPage />
      <BgMotion />
      <div className="flex-1 mt-16">
        <FormRegister />
      </div>
      <FooterLandingPage />
    </div>
   </Layout>
  );
};

export default RegisterDormitory;
