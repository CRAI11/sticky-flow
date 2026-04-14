import { useState } from "react";
import { LOADING_ENUMS } from "../constants";

export default function useLoader() {
  const [loadingStatus, setLoadingStatus] = useState(LOADING_ENUMS.IDLE);

  const setLoader = (status) => {
    if (status === loadingStatus) return;
    setLoadingStatus(status);
  };

  return {
    loadingStatus,
    setLoader,
  };
}
