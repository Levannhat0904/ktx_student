import React from "react";
import { Avatar } from "antd";

interface ResidentAvatarProps {
  src?: string;
  size?: number;
  className?: string;
}

const ResidentAvatar: React.FC<ResidentAvatarProps> = ({
  src,
  size = 64,
  className,
}) => {
  return <Avatar src={src} size={size} className={className} />;
};

export default ResidentAvatar; 