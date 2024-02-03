import { cn } from "utils/cn";

const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "rounded-lg border-zinc-600 border-[1px] p-6 shadow-black shadow-md bg-zinc-900",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
