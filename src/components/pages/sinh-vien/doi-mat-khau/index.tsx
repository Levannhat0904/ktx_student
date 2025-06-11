"use client"

import { ICON_SIZE_SMALL, ICON_WEIGHT_DEFAULT, InputType, Routers } from '@/constants';
import { getDefaultRules } from '@/utils';
import React, { useState } from 'react';
import { Lock, CheckCircle } from "@phosphor-icons/react";
import { AuthForm } from '@/components/organisms';
import { KButton, KText } from '@/components/atoms';
import Link from 'next/link';
import { changePassword } from '@/api/auth';
import { message } from 'antd';

const ChangePasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState(false);

  const onFinish = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Mật khẩu nhập lại không khớp!");
      return;
    }

    try {
      setLoading(true);
      await changePassword(values.currentPassword, values.newPassword);
      setChangeSuccess(true);
      message.success("Mật khẩu đã được đổi thành công.");
    } catch (error) {
      console.error("Error changing password:", error);
      message.error("Đã xảy ra lỗi khi đổi mật khẩu. Vui lòng kiểm tra lại mật khẩu hiện tại.");
    } finally {
      setLoading(false);
    }
  };

  const changePasswordFields = [
    {
      label: "Mật khẩu hiện tại",
      name: "currentPassword",
      type: InputType.password,
      placeholder: "Nhập mật khẩu hiện tại",
      rules: [getDefaultRules("Vui lòng nhập mật khẩu hiện tại!", false)],
      icon: <Lock size={ICON_SIZE_SMALL} weight={ICON_WEIGHT_DEFAULT} />,
    },
    {
      label: "Mật khẩu mới",
      name: "newPassword",
      type: InputType.password,
      placeholder: "Nhập mật khẩu mới",
      rules: [
        getDefaultRules("Vui lòng nhập mật khẩu mới!", false),
        {
          min: 6,
          message: "Mật khẩu phải có ít nhất 6 ký tự!",
        },
      ],
      icon: <Lock size={ICON_SIZE_SMALL} weight={ICON_WEIGHT_DEFAULT} />,
    },
    {
      label: "Nhập lại mật khẩu",
      name: "confirmPassword",
      type: InputType.password,
      placeholder: "Nhập lại mật khẩu mới",
      rules: [getDefaultRules("Vui lòng nhập lại mật khẩu!", false)],
      icon: <Lock size={ICON_SIZE_SMALL} weight={ICON_WEIGHT_DEFAULT} />,
    },
  ];

  if (changeSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
        <CheckCircle size={64} weight="duotone" className="text-green-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Đổi mật khẩu thành công</h2>
        <p className="text-gray-600 mb-6 text-center">
          Mật khẩu của bạn đã được đổi thành công. Vui lòng sử dụng mật khẩu mới cho lần đăng nhập tiếp theo.
        </p>
        <Link href={Routers.home} className="w-full">
          <KButton type="primary" block>
            Quay lại trang chủ
          </KButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-centerrounded-lg shadow-md !m-0 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Đổi mật khẩu</h2>
      <p className="text-gray-600 mb-6 text-center">
        Vui lòng nhập mật khẩu hiện tại và mật khẩu mới cho tài khoản của bạn
      </p>
      <AuthForm
        fields={changePasswordFields}
        onFinish={onFinish}
        submitLabel="Đổi mật khẩu"
        formClassName="w-full"
        submitLoading={loading}
      />
    </div>
  );
}

export default ChangePasswordPage;