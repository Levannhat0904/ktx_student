import {
  DEFAULT_EMPTY_STRING,
  DEFAULT_PATH,
  TOption,
  FORMAT_DATE_OPTION1,
  KTX_STUDENT_ACCESS_TOKEN,
  KTX_ADMIN_REFRESH_TOKEN,
  UserType,
} from "@/constants";
import { FormInstance, GetProp, UploadProps } from "antd";
import type { ClassValue } from "clsx";
import clsx from "clsx";
import { setCookie } from "cookies-next";
import { twMerge } from "tailwind-merge";
import { phoneRegex } from "@/constants";
import dayjs from "dayjs";
import { RcFile } from "antd/es/upload";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatData = (data?: string | number, message?: string) => {
  return data ?? (message || DEFAULT_EMPTY_STRING);
};

export function setAuthCookies(data: {
  accessToken: string;
  refreshToken: string;
  user?: {
    profile: {
      role: string;
    };
  };
}) {
  const path =
    data.user?.profile?.role !== UserType.student ? DEFAULT_PATH : "/sinh-vien";
  setCookie(KTX_STUDENT_ACCESS_TOKEN, data.accessToken, {
    path: DEFAULT_PATH,
  });
  setCookie(KTX_ADMIN_REFRESH_TOKEN, data.refreshToken, {
    path: DEFAULT_PATH,
  });
  setCookie("role", data.user?.profile?.role, {
    path: path,
  });
}

export const getDefaultRules = (message: string, whitespace = true) => {
  return {
    required: true,
    message,
    whitespace,
  };
};
export const formatAmount = (amount?: number): string => {
  return `${Number(amount)?.toLocaleString() || "0"} đ`;
};
export async function executeRequest<T>(
  requestFunc: () => Promise<T>,
  form?: FormInstance,
  name?: string
) {
  try {
    const response = await requestFunc();
    return response;
  } catch (error: any) {
    console.error("Error occurred:", error);
    return null;
  }
}

export const validateFileSize = (size = 0, maxSize = 0) => {
  const isLimitFileSize = size / 1024 / 1024 <= maxSize;

  return isLimitFileSize;
};

export function formatCurrencyVND(value?: number): string {
  if (!value && typeof value !== "number") {
    return DEFAULT_EMPTY_STRING;
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(value);
}

export const parseBoolean = (value: string | boolean) => {
  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }
  return Boolean(value);
};

export const transformToSelectOptions = (
  data: any[],
  labelKey: string,
  valueKey: string,
  extraProps?: (item: any) => Partial<any>
) => {
  return data?.map((item) => ({
    label: item[labelKey],
    value: item[valueKey],
    ...(extraProps ? extraProps(item) : {}),
  }));
};

export const findValueOptions = (
  options: any[],
  value: any,
  findKey: string,
  returnKey?: string
) => {
  if (!returnKey) {
    return options.find((item) => item[findKey] === value);
  }
  return options.find((item) => item[findKey] === value)?.[returnKey];
};

export const formatContentInformationData = (
  labels: Array<{ key: string; label: string; [key: string]: any }>,
  information: Record<string, any> | null,
  extraProps?: (item: any) => Partial<any>
) => {
  return labels
    .map(({ key, label, ...other }) => ({
      label,
      value: information?.[key] ?? null,
      ...other,
      ...(extraProps ? extraProps(information?.[key]) : {}),
    }))
    .filter((item) => item.value !== null);
};

export const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const fileToBase64 = (file: RcFile): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        resolve(null);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
export const getOptions = (
  data: any,
  value: string,
  name: string,
  imageUrl?: string
) => {
  const options = data?.map((record: any) => {
    return {
      value: record?.[value],
      label: record?.[name],
      imageUrl: imageUrl ? record?.[imageUrl] : undefined,
    };
  });

  return options;
};

export const formatDate = (
  date?: number | string,
  format = FORMAT_DATE_OPTION1
) => {
  if (!date) {
    return "--";
  }

  return dayjs(new Date(Number(date))).format(format);
};

export const formatDateMonthYear = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  return `${month}/${year}`;
};

export const findOptionLabel = (
  options: TOption[],
  value?: string | number
) => {
  if (!options || options.length === 0 || !value) {
    return DEFAULT_EMPTY_STRING;
  }

  return (
    options.find((option) => option.value === value)?.label ||
    DEFAULT_EMPTY_STRING
  );
};

export const formatCurrency = (amount = 0, shortSymbol = true) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: shortSymbol ? undefined : "code",
  })
    .format(amount)
    .replaceAll(shortSymbol ? "₫" : "", shortSymbol ? "" : "");
};

export const generateRandomSixDigits = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
export const getIsPhoneNumberValidated = (phoneNumber: string) => {
  return phoneRegex.test(phoneNumber || "");
};

export const generateQRCode = (
  paymentMethod: string,
  amount: number,
  description: string
) => {
  console.log("paymentMethod", paymentMethod, amount, description);
  switch (paymentMethod) {
    case "MBBANK":
      return `https://img.vietqr.io/image/MB-5409042003-print.png?amount=${amount}&addInfo=${description}&accountName="LE VAN NHAT"`;
    case "TECHCOMBANK":
      return `https://img.vietqr.io/image/TCB-5409042003-print.png?amount=${amount}-print&addInfo=${description}&accountName="LE VAN NHAT"`;
    case "CAKE":
      return `https://img.vietqr.io/image/CAKE-5409042003-print.png?amount=${amount}-print&addInfo=${description}&accountName="LE VAN NHAT"`;
    default:
      return "https://img.vietqr.io/image/CAKE-5409042003-print.png";
  }

  // https://img.vietqr.io/image/<BANK_ID>-<ACCOUNT_NO>-<TEMPLATE>.png?amount=<AMOUNT>&addInfo=<DESCRIPTION>&accountName=<ACCOUNT_NAME>
};
