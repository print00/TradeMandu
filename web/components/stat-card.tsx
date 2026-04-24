import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  tone = "default"
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "gain" | "loss";
}) {
  return (
    <div className="surface p-5">
      <p className="metric-label">{label}</p>
      <p
        className={cn(
          "mt-3 text-3xl font-semibold tracking-tight",
          tone === "gain" && "text-gain",
          tone === "loss" && "text-loss"
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-2 text-sm text-textMuted">{hint}</p> : null}
    </div>
  );
}
