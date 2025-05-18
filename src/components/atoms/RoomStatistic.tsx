import React from "react";
import { Statistic } from "antd";
import { valueType } from "antd/es/statistic/utils";

interface RoomStatisticProps {
  title: string;
  value: valueType;
  prefix?: React.ReactNode;
  suffix?: string;
  className?: string;
  formatter?: (value: valueType) => string;
  valueStyle?: React.CSSProperties;
}

const RoomStatistic: React.FC<RoomStatisticProps> = ({
  title,
  value,
  prefix,
  suffix,
  className,
  formatter,
  valueStyle,
}) => {
  return (
    <Statistic
      title={title}
      value={value}
      prefix={prefix}
      suffix={suffix}
      className={className}
      formatter={formatter}
      valueStyle={valueStyle}
    />
  );
};

export default RoomStatistic; 