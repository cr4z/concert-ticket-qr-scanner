import { Camera, PermissionStatus } from "expo-camera";
import { useEffect, useState } from "react";

function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    })();
  }, []);

  return { hasPermission };
}

export default useCameraPermission;
