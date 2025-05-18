"use client";

import React, { createContext, useContext, useEffect } from "react";
import { Student } from "@/types/student";
import { useGetCurrentStudentDetail } from "@/api/student";
import { useAuth } from "./AuthContext";

interface StudentContextType {
  studentData: Student | null;
  isLoading: boolean;
  error: Error | null;
  refetchStudent: () => void;
}

const StudentContext = createContext<StudentContextType>({
  studentData: null,
  isLoading: false,
  error: null,
  refetchStudent: () => {},
});

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
  const { adminProfile } = useAuth();
  
  const {
    data: studentResponse,
    isLoading,
    error,
    refetch: refetchStudent
  } = useGetCurrentStudentDetail();

  // Chỉ fetch lại data khi studentData hoặc adminProfile là null
  useEffect(() => {
    if (!studentResponse?.data && !adminProfile?.profile) {
      refetchStudent();
    }
  }, [studentResponse?.data, adminProfile?.profile, refetchStudent]);

  const value = {
    studentData: studentResponse?.data?.student || null,
    isLoading,
    error: error as Error | null,
    refetchStudent
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};
