import React from "react";
import { Modal, Descriptions } from "antd";

interface DetailItem {
  label: string | React.ReactNode;
  value: string | number | React.ReactNode;
}

interface DetailModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  items: DetailItem[];
  width?: number;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

const DetailModal: React.FC<DetailModalProps> = ({
  title,
  isOpen,
  onClose,
  items,
  width = 700,
  footer = null,
  children,
}) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onClose}
      footer={footer}
      width={width}
    >
      <Descriptions bordered column={1} className="mt-4">
        {items.map((item, index) => (
          <Descriptions.Item key={index} label={item.label}>
            {item.value}
          </Descriptions.Item>
        ))}
      </Descriptions>
      {children}
    </Modal>
  );
};

export default DetailModal;
