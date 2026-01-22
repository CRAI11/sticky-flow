import { useState } from "react";

export default function useLoader() {
  const [currentStatus, setCurrentStatus] = useState("idle");

  const updateStatus = (status) => {
    if (status === currentStatus) return;
    setCurrentStatus(status);
  };

  return {
    currentStatus,
    updateStatus,
  };
}
