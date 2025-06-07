import React from "react";
import { Tag, Image } from "antd";
import dayjs from "dayjs";
import DetailModal from "@/components/molecules/shared/DetailModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MaintenanceRequest } from "@/types/student";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface MaintenanceDetailModalProps {
  request: MaintenanceRequest | null;
  isOpen: boolean;
  onClose: () => void;
}

const swiperStyles = `
  .maintenance-swiper {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .maintenance-swiper .swiper-button-next,
  .maintenance-swiper .swiper-button-prev {
    color: #fa8c16;
  }
  .maintenance-swiper .swiper-pagination-bullet-active {
    background: #fa8c16;
  }
`;

const MaintenanceDetailModal: React.FC<MaintenanceDetailModalProps> = ({
  request,
  isOpen,
  onClose,
}) => {
  if (!request) return null;

  const detailItems = [
    {
      label: "Mã yêu cầu",
      value: request.requestNumber,
    },
    {
      label: "Loại yêu cầu",
      value: request.requestType,
    },
    {
      label: "Mô tả",
      value: request.description,
    },
    {
      label: "Mức độ ưu tiên",
      value: (
        <Tag
          color={
            request.priority === "high"
              ? "red"
              : request.priority === "normal"
              ? "blue"
              : request.priority === "urgent"
              ? "red"
              : "green"
          }
        >
          {request.priority === "high"
            ? "Cao"
            : request.priority === "normal"
            ? "Trung bình"
            : request.priority === "urgent"
            ? "Khẩn cấp"
            : "Thấp"}
        </Tag>
      ),
    },
    {
      label: "Trạng thái",
      value: (
        <Tag
          color={
            request.status === "pending"
              ? "gold"
              : request.status === "processing"
              ? "blue"
              : request.status === "completed"
              ? "green"
              : request.status === "canceled"
              ? "red"
              : request.status === "rejected"
              ? "red"
              : "green"
          }
        >
          {request.status === "pending"
            ? "Đang chờ"
            : request.status === "processing"
            ? "Đang xử lý"
            : request.status === "completed"
            ? "Hoàn thành"
            : request.status === "canceled"
            ? "Đã hủy"
            : "Từ chối"}
        </Tag>
      ),
    },
    {
      label: "Ngày tạo",
      value: dayjs(request.createdAt).format("DD/MM/YYYY HH:mm"),
    },
    ...(request.resolvedAt
      ? [
          {
            label: "Ngày hoàn thành",
            value: dayjs(request.resolvedAt).format("DD/MM/YYYY HH:mm"),
          },
        ]
      : []),
    ...(request.resolutionNote
      ? [
          {
            label: "Ghi chú xử lý",
            value: request.resolutionNote,
          },
        ]
      : []),
  ];

  const imageGallery =
    request.imagePaths &&
    Array.isArray(request.imagePaths) &&
    request.imagePaths.length > 0 ? (
      <>
        <style>{swiperStyles}</style>
        <div style={{ width: "100%", maxWidth: "100%", marginTop: "20px" }}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="maintenance-swiper"
            spaceBetween={0}
            slidesPerView={1}
            loop={false}
            style={{
              width: "100%",
              margin: "0 auto",
            }}
          >
            {request.imagePaths.map((path, index) => (
              <SwiperSlide key={index} style={{ width: "100%" }}>
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#f0f2f5",
                    borderRadius: "8px",
                    overflow: "hidden",
                    padding: "10px",
                  }}
                >
                  <Image
                    src={path}
                    alt={`Ảnh ${index + 1}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "280px",
                      objectFit: "contain",
                    }}
                    preview={{
                      mask: (
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            padding: "8px",
                            background: "rgba(0,0,0,0.45)",
                            color: "#fff",
                            textAlign: "center",
                          }}
                        >
                          Nhấn để xem ảnh đầy đủ ({index + 1}/
                          {request.imagePaths?.length})
                        </div>
                      ),
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
    ) : null;

  return (
    <DetailModal
      title="Chi tiết yêu cầu bảo trì"
      isOpen={isOpen}
      onClose={onClose}
      items={detailItems}
    >
      {imageGallery}
    </DetailModal>
  );
};

export default MaintenanceDetailModal;
