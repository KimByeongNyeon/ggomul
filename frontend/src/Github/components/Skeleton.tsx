import React from "react";

export const Skeleton = ({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`animate-pulse rounded-lg bg-gray-100 ${className}`}
    style={style}
  />
);
