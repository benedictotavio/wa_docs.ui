import React from "react";
import styles from "./Skeleton.module.css";

interface SkeletonProps {
  isLoading: boolean;
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
  quantity?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  isLoading,
  width = "100%",
  height = "1em",
  borderRadius = "4px",
  style = {},
  quantity = 1,
}) => {

  const skeletonStyle: React.CSSProperties = {
    width,
    height,
    borderRadius,
    ...style,
  };

  return (
    isLoading && (
      <>
        {Array.from({ length: quantity }).map((_, index) => (
          <div key={index} className={styles.skeleton} style={skeletonStyle} />
        ))}
      </>
    )
  );
};

export default Skeleton;
