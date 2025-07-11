import { useCallback } from "react";

export interface VerificationService {
  verify: (id: string) => Promise<boolean>;
}

function useVerificationService(): VerificationService {
  const verify = useCallback(async (verifyingId: string) => {
    const response = await fetch(
      "https://flexiserver-561525660706.us-central1.run.app/verify/" +
        verifyingId
    );
    const verificationRes = (await response.json()) as VerificationResponse;

    return verificationRes.valid;
  }, []);

  return { verify };
}

interface VerificationResponse {
  valid: boolean;
}

export default useVerificationService;
