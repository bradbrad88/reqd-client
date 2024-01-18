import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { cn } from "utils/cn";

type Option = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  options: Option[];
  onSelectionChange: (selection: string) => void;
};

export default function RadioGroupCards({ options, onSelectionChange }: Props) {
  const [selected, onSelectedChange] = useState(0);
  const onChange = (index: number) => {
    const selection = options[index].id;
    onSelectedChange(index);
    onSelectionChange(selection);
  };

  return (
    <RadioGroup value={selected} onChange={onChange}>
      <RadioGroup.Label className="text-base font-semibold leading-6 text-white">
        Select a layout type
      </RadioGroup.Label>

      <div className="mt-4 grid grid-cols-2 gap-y-6 sm:grid-cols-3 gap-x-4">
        {options.map((option, idx) => (
          <RadioGroup.Option
            key={option.id}
            value={idx}
            className={({ active }) =>
              cn(
                active ? "border-indigo-600 ring-2 ring-indigo-600" : "border-gray-300",
                "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm font-medium text-gray-900"
                    >
                      {option.title}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="mt-1 flex items-center text-sm text-gray-500 leading-tight"
                    >
                      {option.description}
                    </RadioGroup.Description>
                    {/* <RadioGroup.Description
                      as="span"
                      className="mt-6 text-sm font-medium text-gray-900"
                    >
                      {option.users}
                    </RadioGroup.Description> */}
                  </span>
                </span>
                <CheckCircleIcon
                  className={cn(!checked ? "invisible" : "", "h-5 w-5 text-indigo-600")}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    active ? "border" : "border-2",
                    checked ? "border-indigo-600" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
