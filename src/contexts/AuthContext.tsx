"use client";

import {
  Routers,
  RoutersStudent,
  TFormLoginParams,
  TLoginResponseData,
  TProfileResponseData,
  UserType,
} from "@/constants";
// import { LOGIN } from "@/graphql/mutations";
import React, { createContext, useContext } from "react";
import {
  DEFAULT_PATH,
  KTX_STUDENT_ACCESS_TOKEN,
  KTX_ADMIN_REFRESH_TOKEN,
} from "@/constants";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
// import { executeRequest, setAuthCookies } from "@/utils";
import useFetchProfile from "@/hooks/profile/useFetchProfile";
import { CurrentSessionResponse, useLogin, useLogout } from "@/api/auth";
import { setAuthCookies } from "@/utils";
import { AdminProfile } from "@/types/student";
const AuthContext = createContext<{
  adminProfile: AdminProfile | undefined;
  loginLoading: boolean;
  logoutLoading: boolean;
  onLogin: (params: TFormLoginParams) => void;
  onLogout: () => void;
  isPending: boolean;
}>({
  adminProfile: undefined,
  loginLoading: false,
  logoutLoading: false,
  onLogin: async () => {},
  onLogout: async () => {},
  isPending: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: profile, loading: isPendingFetchProfile } = useFetchProfile();
  const { mutate: login, isPending: loginLoading } = useLogin();
  const { mutate: logoutMutation, isPending: logoutLoading } = useLogout();

  async function onLogin(params: TFormLoginParams) {
    await login(
      {
        email: params.email,
        password: params.password,
      },
      {
        onSuccess: (data) => {
          console.log("data", data);
          if (data.success && data.data) {
            setAuthCookies(data.data);
            if (data.data?.user?.profile.role !== UserType.student) {
              router.push(Routers.home);
              window.location.reload();
            } else {
              router.push(RoutersStudent.home);
              window.location.reload();
            }
          }
        },
      }
    );
  }

  async function onLogout() {
    try {
      await logoutMutation(undefined, {
        onSuccess: () => {
          // Xóa cookies
          deleteCookie(KTX_STUDENT_ACCESS_TOKEN, { path: DEFAULT_PATH });
          deleteCookie(KTX_ADMIN_REFRESH_TOKEN, { path: DEFAULT_PATH });
          // Chuyển về trang login
          window.location.href = Routers.login;
        },
      });
    } catch (error) {
      // Vẫn xóa cookies và chuyển về login trong trường hợp lỗi
      deleteCookie(KTX_STUDENT_ACCESS_TOKEN, { path: DEFAULT_PATH });
      deleteCookie(KTX_ADMIN_REFRESH_TOKEN, { path: DEFAULT_PATH });
      window.location.href = Routers.login;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        adminProfile: profile,
        loginLoading,
        logoutLoading,
        onLogin,
        onLogout,
        isPending: isPendingFetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
