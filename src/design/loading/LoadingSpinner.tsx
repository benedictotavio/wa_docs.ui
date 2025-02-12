import React from "react";
import styles from "./LoadingSpinner.module.css";

type LoadingSpinnerProps = {
  overlay?: boolean;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ overlay = false }) => {
  return (
    <div className={overlay ? styles.loading_overlay : ""}>
      <div role="status" className={styles.loading_container}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};
export default LoadingSpinner;
