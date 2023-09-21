import { Link } from "react-router-dom";
import CallToAction from "./CallToAction";

type Props = {
  children: React.ReactNode;
  to?: string;
  action?: () => void;
};

const FixedCallToAction = ({ to, action = () => {}, children }: Props) => {
  return (
    <div onClick={action} className="fixed bottom-16 right-2">
      {to ? (
        <Link style={{ color: "white" }} to={to}>
          <CallToAction action={() => {}}>{children}</CallToAction>
        </Link>
      ) : (
        <CallToAction action={() => {}}>{children}</CallToAction>
      )}
    </div>
  );
};

export default FixedCallToAction;
