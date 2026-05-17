type StageBadgeProps = {
  stage: string;
};

export default function StageBadge({ stage }: StageBadgeProps) {
  const normalized = stage.toLowerCase();

  const styles =
    normalized.includes("submitted")
      ? "bg-purple-600/20 text-purple-300"
      : normalized.includes("interview")
      ? "bg-blue-600/20 text-blue-300"
      : normalized.includes("offer")
      ? "bg-cyan-600/20 text-cyan-300"
      : normalized.includes("placed") || normalized.includes("hired")
      ? "bg-green-700/30 text-green-300"
      : normalized.includes("rejected")
      ? "bg-red-600/20 text-red-300"
      : "bg-slate-700/40 text-slate-300";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${styles}`}>
      {stage}
    </span>
  );
}