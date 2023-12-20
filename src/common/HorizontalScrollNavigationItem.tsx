import { MouseEvent, MouseEventHandler } from "react";

type Props = {
  href?: string;
  onClick: (e: MouseEvent) => void;
  children: React.ReactNode;
  active: boolean;
};

const HorizontalScrollNavigationItem = ({ href, onClick, children, active }: Props) => {
  const onClickHandler: MouseEventHandler = e => {
    e.preventDefault();
    onClick(e);
  };

  const style = active ? "text-indigo-300 hover:text-indigo-300" : "text-white";

  return (
    <a
      className={"snap-start snap-always px-2 visited:text-white " + style}
      href={href}
      onClick={onClickHandler}
    >
      {children}
    </a>
  );
};

export default HorizontalScrollNavigationItem;
