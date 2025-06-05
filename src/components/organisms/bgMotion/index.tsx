"use client";
import { LOGO_URL } from "@/constants/common";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const BgMotion = () => {
  const { scrollYProgress } = useScroll();
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3]);
  return (
    <motion.div
      className="fixed inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden"
      style={{
        scale: logoScale,
      }}
    >
      <div
        className="w-full h-full bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${LOGO_URL})` }}
      />
    </motion.div>
  );
};

export default BgMotion;
