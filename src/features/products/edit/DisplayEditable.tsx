import Edit from "common/icons/Edit";
import { useRef } from "react";
import useShortcuts from "src/hooks/useShortcuts";

type Props = {
  text?: string | number;
  onClick: () => void;
};

const DisplayEditable = ({ text, onClick }: Props) => {
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
      className="flex gap-2 text-indigo-100 bg-zinc-700 rounded-lg p-2 px-3"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <span>
        <Edit />
      </span>
      <div>{text}</div>
    </div>
  );
};

export default DisplayEditable;
