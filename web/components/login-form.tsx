"use client";

import { useState } from "react";
import { ArrowRight, CandlestickChart, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { requestOtp, verifyOtp } from "@/lib/auth";
import { useAuthStore } from "@/store/auth-store";

const tape = [
  { symbol: "NABIL", change: "+2.4%" },
  { symbol: "HIDCL", change: "+1.1%" },
  { symbol: "NTC", change: "-0.4%" },
  { symbol: "NICA", change: "+0.8%" },
  { symbol: "UPPER", change: "+1.9%" }
];

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
    <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.05fr,0.95fr]">
      <section className="cinematic-surface hero-grid relative hidden min-h-[720px] overflow-hidden p-8 lg:flex lg:flex-col">
        <div className="hero-band" />
        <div className="relative z-10">
          <p className="eyebrow">TradeMandu Web</p>
          <h1 className="mt-4 max-w-xl text-5xl font-semibold leading-[1.02] tracking-tight text-text">
            Nepal market intelligence with a sharper edge.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-textMuted">
            Track movers, watch sectors rotate, and manage your portfolio from a workspace designed
            to feel fast, cinematic, and clear.
          </p>
        </div>

        <div className="relative z-10 mt-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: CandlestickChart, label: "Live signals", value: "204 listed names" },
            { icon: ShieldCheck, label: "Unified auth", value: "OTP + JWT backend" },
            { icon: LockKeyhole, label: "Testing mode", value: "Fast OTP verification" }
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="surface-muted p-4">
              <div className="flex items-center gap-2 text-accent">
                <Icon size={16} />
                <span className="metric-label">{label}</span>
              </div>
              <p className="mt-4 text-lg font-semibold text-text">{value}</p>
            </div>
          ))}
        </div>

        <div className="relative z-10 mt-8 grid flex-1 gap-4 xl:grid-cols-[1.2fr,0.8fr]">
          <div className="surface p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="metric-label">Market pulse</p>
                <h2 className="mt-2 text-2xl font-semibold text-text">Session overview</h2>
              </div>
              <div className="rounded-panel bg-gain/10 px-3 py-1 text-xs font-semibold text-gain">Live</div>
            </div>
            <div className="mt-6 grid h-56 grid-cols-8 items-end gap-2">
              {[38, 52, 44, 67, 58, 82, 76, 90].map((value, index) => (
                <div
                  key={index}
                  className="rounded-t-[6px] bg-gradient-to-t from-accent to-sky-300"
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
            <div className="mt-5 ticker-wrap rounded-panel">
              <div className="ticker-track">
                {[...tape, ...tape].map((item, index) => (
                  <span key={`${item.symbol}-${index}`} className="ticker-item">
                    <span className="ticker-symbol">{item.symbol}</span>
                    <span className={item.change.startsWith("-") ? "text-loss" : "text-gain"}>{item.change}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="surface p-5 animate-float">
              <p className="metric-label">Cinematic board</p>
              <p className="mt-3 text-xl font-semibold text-text">Capital flow map</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  ["Banking", "41%"],
                  ["Hydro", "27%"],
                  ["Finance", "18%"],
                  ["Others", "14%"]
                ].map(([label, value]) => (
                  <div key={label} className="surface-muted p-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-textMuted">{label}</p>
                    <p className="mt-2 text-xl font-semibold text-text">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="surface p-5">
              <div className="flex items-center gap-2 text-accent">
                <Sparkles size={16} />
                <p className="metric-label">Momentum note</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-textMuted">
                Use the dashboard to scan movers, then jump into watchlists, portfolio attribution,
                IPO windows, and paper trades without context switching.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cinematic-surface p-6 sm:p-8 lg:p-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">TradeMandu Access</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text">Sign in to your market desk</h2>
            <p className="mt-3 text-sm leading-6 text-textMuted">
              Use the existing OTP flow to unlock live dashboards, portfolio views, alerts, and IPO tracking.
            </p>
          </div>
          <div className="hidden h-12 w-12 items-center justify-center rounded-panel bg-text text-bg lg:flex">
            <ArrowRight size={18} />
          </div>
        </div>

        <div className="metric-strip">
          <div className="metric-card">
            <p className="metric-label">Desk type</p>
            <p className="metric-value">Retail + research</p>
            <p className="metric-hint">Built for quick scanning and deliberate decisions.</p>
          </div>
          <div className="metric-card">
            <p className="metric-label">Auth mode</p>
            <p className="metric-value">{step === "request" ? "Request code" : "Verify code"}</p>
            <p className="metric-hint">The same backend contract powers both web and mobile.</p>
          </div>
          <div className="metric-card">
            <p className="metric-label">Environment</p>
            <p className="metric-value">Hosted testing</p>
            <p className="metric-hint">Fast OTP testing, then real email later.</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <input
            className="w-full rounded-panel border border-line bg-bg/75 px-4 py-3.5 text-sm outline-none placeholder:text-textMuted"
            placeholder="Full name (optional)"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            className="w-full rounded-panel border border-line bg-bg/75 px-4 py-3.5 text-sm outline-none placeholder:text-textMuted"
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          {step === "verify" ? (
            <input
              className="w-full rounded-panel border border-line bg-bg/75 px-4 py-3.5 text-sm outline-none placeholder:text-textMuted"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
            />
          ) : null}

          <button
            className="primary-button w-full"
            disabled={loading || !email}
            onClick={step === "request" ? handleRequestOtp : handleVerifyOtp}
            type="button"
          >
            {loading ? "Please wait..." : step === "request" ? "Request OTP" : "Verify OTP"}
          </button>
        </div>

        {status ? (
          <div className="surface-muted mt-4 p-4 text-sm text-textMuted">
            {status}
          </div>
        ) : null}
      </section>
    </div>
  );
}
