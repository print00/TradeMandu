"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestOtp, verifyOtp } from "@/lib/auth";
import { useAuthStore } from "@/store/auth-store";

export function LoginForm() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleRequestOtp() {
    try {
      setLoading(true);
      const response = await requestOtp(email, name || undefined);
      setStatus(response.devOtp ? `Dev OTP: ${response.devOtp}` : "OTP sent to your email");
      setStep("verify");
    } catch {
      setStatus("Unable to request OTP. Check your backend URL and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    try {
      setLoading(true);
      const response = await verifyOtp(email, otp);
      setSession(response);
      router.replace("/dashboard");
    } catch {
      setStatus("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-panel border border-line bg-panel p-8 shadow-panel">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-textMuted">TradeMandu Web</p>
        <h1 className="mt-3 text-3xl font-semibold text-text">Invest in Nepal with clarity.</h1>
        <p className="mt-3 text-sm leading-6 text-textMuted">
          Sign in with the same OTP-based backend used by the mobile app. No new auth contract, no duplicate API.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <input
          className="w-full rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none placeholder:text-textMuted"
          placeholder="Full name (optional)"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="w-full rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none placeholder:text-textMuted"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        {step === "verify" ? (
          <input
            className="w-full rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none placeholder:text-textMuted"
            placeholder="6-digit OTP"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
          />
        ) : null}

        <button
          className="w-full rounded-2xl bg-text px-4 py-3 text-sm font-medium text-bg"
          disabled={loading || !email}
          onClick={step === "request" ? handleRequestOtp : handleVerifyOtp}
          type="button"
        >
          {loading ? "Please wait..." : step === "request" ? "Request OTP" : "Verify OTP"}
        </button>
      </div>

      {status ? <p className="mt-4 text-sm text-textMuted">{status}</p> : null}
    </div>
  );
}

