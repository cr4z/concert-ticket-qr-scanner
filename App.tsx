import { StyleSheet, Text, View } from "react-native";
import useVerificationService from "./hooks/useVerificationService";
import { CameraView } from "expo-camera";
import ScannerIndicator from "./components/ScannerIndicator";
import useCameraPermission from "./hooks/useCameraPermission";
import useScanner from "./hooks/useScanner";

export default function App() {
  const verificationService = useVerificationService();
  const scanner = useScanner({ verificationService });
  const cameraPermission = useCameraPermission();

  if (cameraPermission.hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (cameraPermission.hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => scanner.verify(data)}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScannerIndicator status={scanner.status} />
      </View>
    </View>
  );
}
