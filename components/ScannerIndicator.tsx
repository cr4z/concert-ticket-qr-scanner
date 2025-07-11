import { View } from "react-native";
import { ScannerStatus } from "../types/ScannerIndicatorStatus";
import { ActivityIndicator, Icon, Text } from "react-native-paper";

interface ScannerIndicatorProps {
  status: ScannerStatus;
}

function ScannerIndicator(props: ScannerIndicatorProps) {
  const { status } = props;

  const getStatusConfig = () => {
    switch (status) {
      case ScannerStatus.Searching:
        return {
          icon: <ActivityIndicator color="#2196F3" size="small" />,
          text: "Searching...",
          color: "#2196F3",
        };
      case ScannerStatus.Invalid:
        return {
          icon: <Icon source="alert-circle" size={24} color="#F44336" />,
          text: "Invalid code",
          color: "#F44336",
        };
      case ScannerStatus.Valid:
        return {
          icon: <Icon source="check-circle" size={24} color="#4CAF50" />,
          text: "Valid code",
          color: "#4CAF50",
        };
      default:
        return { icon: null, text: "", color: "#000" };
    }
  };

  const config = getStatusConfig();

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#0007",
        alignItems: "center",
        padding: 15,
        gap: 12,
      }}
    >
      {config.icon}
      <Text variant="bodyMedium" style={{ color: config.color }}>
        {config.text}
      </Text>
    </View>
  );
}

export default ScannerIndicator;
