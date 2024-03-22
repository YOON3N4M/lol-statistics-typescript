import { DebounceEvent } from "@/utils/DebounceEvent";
import { useEffect, useState } from "react";

export interface DeviceDetect {
  [key: string]: boolean | undefined;
  isPc: boolean | undefined;
  isMobile: boolean | undefined;
}

interface UseDeviceDetect extends DeviceDetect {}

function useDeviceDetect(): UseDeviceDetect {
  const [deviceDetect, setDeviceDetect] = useState<DeviceDetect>({
    isPc: undefined,
    isMobile: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setDeviceDetect((prev) => {
        const newState: DeviceDetect = {
          isPc: width >= 768,
          isMobile: width < 768,
        };
        const isDeviceChanged = Object.keys(prev).find(
          (key) => prev[key] !== newState[key]
        );
        return isDeviceChanged ? newState : prev;
      });
    };

    handleResize();
    const ResizeDebounced = new DebounceEvent("resize", handleResize);

    return () => {
      ResizeDebounced.removeEventListeners();
    };
  }, []);

  return deviceDetect;
}

export default useDeviceDetect;
