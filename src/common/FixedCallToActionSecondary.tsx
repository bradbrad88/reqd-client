import { Link } from "react-router-dom";

import Button from "./Button";
import { cn } from "utils/cn";

type Props = {
  children: React.ReactNode;
  to?: string;
  action?: () => void;
};

const FixedCallToActionSecondary = ({ to, action = () => {}, children }: Props) => {
  const className = cn("text-white bg-zinc-800 border-orange-500 h-12 w-24");
  return (
    <div onClick={action} className="fixed bottom-16 left-2">
      {to ? (
        <Link style={{ color: "white" }} to={to}>
          <Button className={className} onClick={action}>
            {children}
          </Button>
        </Link>
      ) : (
        <Button className={className} onClick={action}>
          {children}
        </Button>
      )}
    </div>
  );
};

export default FixedCallToActionSecondary;
