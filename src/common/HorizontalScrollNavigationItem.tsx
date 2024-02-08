import { Link, LinkProps } from "react-router-dom";
import { cn } from "utils/cn";

type Props = {
  to: LinkProps["to"];
  children: React.ReactNode;
  active: boolean;
};

const HorizontalScrollNavigationItem = ({ to, children, active }: Props) => {
  return (
    <Link
      to={to}
      relative="route"
      className="snap-start snap-always px-2 text-white visited:text-white hover:text-white"
    >
      <div className="relative w-min">
        {children}

        <div className={cn("absolute bg-white h-[2px]", active ? "w-full" : "hidden")}></div>
      </div>
    </Link>
  );
};

export default HorizontalScrollNavigationItem;
