import { ChevronRightIcon } from "@heroicons/react/20/solid";

type Props = {
  items: Item[];
  onSelect: (value: string) => void;
};

type Item = {
  id: string;
  displayName: string;
  description: string;
  imageUrl?: string;
};

export default function AvatarList({ items, onSelect }: Props) {
  return (
    <ul
      role="list"
      className="h-ful divide-y divide-zinc-600 overflow-hidden bg-background shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {items.map(item => (
        <li
          key={item.id}
          className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-zinc-500 sm:px-6"
          onClick={() => onSelect(item.id)}
        >
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-zinc-700 text-white text-xs"
              src={item.imageUrl}
              alt={item.displayName.slice(0, 5)}
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-white">
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
      ))}
    </ul>
  );
}
