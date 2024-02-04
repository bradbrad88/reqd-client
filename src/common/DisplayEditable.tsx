import { useRef } from "react";
import useShortcuts from "src/hooks/useShortcuts";
import Spinner from "./Spinner";

type Props = {
  text?: string | number;
  isWorking?: boolean;
  onClick: () => void;
};

const DisplayEditable = ({ text, isWorking, onClick }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useShortcuts("Enter", onClick, ref);

  // Start typing to open edit mode but ignore keys like tab (combo list flickers when tabbing over it)
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = event => {
    const regex = /^[a-z0-9]$/i;
    if (regex.test(event.key)) {
      onClick();
    }
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="relative flex gap-2 bg-zinc-700 rounded-full items-center px-4 cursor-pointer h-12 text-base"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="font-bold">{text}</div>
      {isWorking && (
        <span className="absolute right-4">
          <Spinner />
        </span>
      )}
    </div>
  );
};

export default DisplayEditable;
