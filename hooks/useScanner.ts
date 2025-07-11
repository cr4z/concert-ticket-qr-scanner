import { useCallback, useRef, useState } from "react";
import { ScannerStatus } from "../types/ScannerIndicatorStatus";
import { VerificationService } from "./useVerificationService";

interface ScannerProps {
  verificationService: VerificationService;
}

interface Scanner {
  status: ScannerStatus;
  verify: (verifyingId: string) => Promise<void>;
}

function useScanner(props: ScannerProps): Scanner {
  const { verificationService } = props;

  const [status, setStatus] = useState<ScannerStatus>(ScannerStatus.Searching);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const verify = useCallback(async (verifyingId: string) => {
    const isValid = await verificationService.verify(verifyingId);
    setStatus(isValid ? ScannerStatus.Valid : ScannerStatus.Invalid);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(
      () => setStatus(ScannerStatus.Searching),
      3000
    );
  }, []);

  return { status, verify };
}

export default useScanner;
