import { StudentStatusEnum } from "@/constants/enums";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface StudentRegistration {
  [key: string]: any;
  email: string;
  studentCode: string;
  fullName: string;
  birthDate: string;
  gender: "male" | "female";
  phone: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  faculty: string;
  major: string;
  className: string;
  avatarPath?: any;
}

export interface StudentRegistrationResponse
  extends ApiResponse<{ id: number }> {}

export interface StudentListResponse extends ApiResponse<Student[]> {
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface StudentDetailResponse extends ApiResponse<Student> {}
export interface StudentDetailDataResponse
  extends ApiResponse<StudentDetailData> {}
export interface UpdateStatusResponse extends ApiResponse<void> {}
export interface MaintenanceRequestsResponse
  extends ApiResponse<MaintenanceRequest[]> {}

export interface GetStudentsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface AdminProfile {
  id: number;
  email: string;
  userType: string;
  status: string;
  lastLogin: string;
  profile: {
    id: number;
    staffCode: string;
    fullName: string;
    studentCode: string | null;
    phone: string | null;
    role: string;
    department: string | null;
    avatarPath: string | null;
    createdAt: string;
    province: string | null;
    district: string | null;
    ward: string | null;
    address: string | null;
    birthDate: string | null;
    faculty: string | null;
    major: string | null;
    className: string | null;
    gender: string | null;
  };
}

export interface Student {
  id?: number;
  userId?: number;
  studentCode?: string;
  fullName?: string;
  gender?: string;
  birthDate?: string;
  role?: string;
  email?: string;
  password?: string;
  userType?: string;
  refreshToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;

  // Thông tin liên lạc
  phone?: string;
  email?: string;

  // Thông tin địa chỉ
  province?: string;
  district?: string;
  ward?: string;
  address?: string;

  // Thông tin học vụ
  faculty?: string;
  major?: string;
  className?: string;

  // Ảnh chân dung
  avatarPath?: string;
  status?: StudentStatusEnum;

  studentId?: string;
  dateOfBirth?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Dormitory {
  id?: number;
  buildingId?: number;
  buildingName?: string;
  roomId?: number;
  roomNumber?: string;
  bedNumber?: string;
  semester?: string;
  schoolYear?: string;
  checkInDate?: string;
  checkOutDate?: string;
  contractId?: number;
  monthlyFee?: number;
  depositAmount?: number;
  status?: string;
}

export interface Contract {
  id?: number;
  contractNumber?: string;
  studentId?: number;
  roomId?: number;
  roomNumber?: string;
  buildingName?: string;
  startDate?: string;
  endDate?: string;
  depositAmount?: number;
  monthlyFee?: number;
  status?: "active" | "expired" | "terminated";
  createdAt?: string;
  updatedAt?: string;
}

export interface MaintenanceRequest {
  id?: number;
  requestNumber?: string;
  studentId?: number;
  roomId?: number;
  requestType?: string;
  description?: string;
  imagePaths?: string[];
  priority?: "low" | "normal" | "high" | "urgent";
  status?: "pending" | "processing" | "completed" | "rejected" | "canceled";
  createdAt?: string;
  resolvedAt?: string;
  resolutionNote?: string;
}

export interface Invoice {
  id?: number;
  invoiceNumber?: string;
  contractId?: number;
  studentId?: number;
  roomId?: number;
  invoiceMonth?: string;
  dueDate?: string;
  roomFee?: number;
  electricFee?: number;
  waterFee?: number;
  serviceFee?: number;
  totalAmount?: number;
  paymentStatus?: "pending" | "paid" | "overdue" | "waiting_for_approval";
  paymentDate?: string;
  paymentMethod?: string;
  createdAt?: string;
}

export interface Roommate {
  id?: number;
  studentCode?: string;
  fullName?: string;
  gender?: string;
  status?: string;
  avatarPath?: string;
}

export interface HistoryItem {
  id?: number;
  date?: string;
  action?: string;
  description?: string;
  user?: string;
}

export interface StudentDetailData {
  student?: Student;
  dormitory?: Dormitory;
  history?: HistoryItem[];
  roommates?: Roommate[];
}
export interface InvoicePayment {
  id: number;
  invoiceNumber: string;
  invoiceMonth: string;
  totalAmount: number;
  roomNumber: string;
  floorNumber: number;
  buildingName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
