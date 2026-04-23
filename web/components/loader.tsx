export function Loader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-panel border border-dashed border-line bg-panel">
      <p className="text-sm text-textMuted">{label}</p>
    </div>
  );
}

