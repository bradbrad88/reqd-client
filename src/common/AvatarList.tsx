import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { KeyboardEventHandler, useRef } from "react";

type OnSelect = (value: string) => void;

type Props = {
  items: AvatarItem[];
  onSelect: OnSelect;
};

export type AvatarItem = {
  id: string;
  displayName: string;
  description: string;
  imageUrl?: string;
};

type ItemProps = {
  item: AvatarItem;
  onSelect: OnSelect;
};

function ListItem({ item, onSelect }: ItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  const onClick = () => {
    onSelect(item.id);
  };

  const onKeyUp: KeyboardEventHandler = e => {
    switch (e.key) {
      case "Enter":
        e.stopPropagation();
        onSelect(item.id);
        break;
      case "ArrowDown":
        e.preventDefault();
        e.stopPropagation();
        onFocusDown();
        break;
      case "ArrowUp":
        e.preventDefault();
        e.stopPropagation();
        onFocusUp();
        break;
      default:
        break;
    }
  };

  const onFocusDown = () => {
    if (!ref.current) return;
    const siblings = ref.current.parentElement!.childNodes;
    for (let i = 0; i < siblings.length; i++) {
      if (ref.current === siblings[i] && siblings[i + 1])
        return (siblings[i + 1] as HTMLLIElement).focus();
    }
  };

  const onFocusUp = () => {
    if (!ref.current) return;
    const siblings = ref.current.parentElement!.childNodes;
    for (let i = 0; i < siblings.length; i++) {
      if (ref.current === siblings[i] && siblings[i - 1])
        (siblings[i - 1] as HTMLLIElement).focus();
    }
  };

  return (
    <li
      ref={ref}
      key={item.id}
      className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-zinc-700 sm:px-6 focus:bg-zinc-500 focus:outline-none text-white"
      onClick={onClick}
      onKeyUp={onKeyUp}
      tabIndex={0}
    >
      <div className="flex min-w-0 gap-x-4">
        <img
          className="h-12 w-12 flex-none rounded-full bg-zinc-700 text-white text-xs"
          src={item.imageUrl}
          alt={item.displayName.slice(0, 5)}
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6">
            <span className="absolute inset-x-0 -top-px bottom-0" />
            {item.displayName}
          </p>
          <p className="mt-1 flex text-sm leading-5 text-zinc-400 italic">
            {item.description}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-4">
        <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
      </div>
    </li>
  );
}

export default function AvatarList({ items, onSelect }: Props) {
  return (
    <ul
      role="list"
      className="h-ful divide-y divide-zinc-600 overflow-hidden bg-background shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {items.map(item => (
        <ListItem key={item.id} item={item} onSelect={onSelect} />
      ))}
    </ul>
  );
}
