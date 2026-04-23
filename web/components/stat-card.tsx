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
    <div className="rounded-panel border border-line bg-panel p-5 shadow-panel">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-textMuted">{label}</p>
      <p
        className={cn(
          "mt-3 text-3xl font-semibold",
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

