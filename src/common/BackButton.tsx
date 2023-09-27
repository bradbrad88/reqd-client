import { Link } from "react-router-dom";
import BackIcon from "./icons/Back";

const BackButton = () => {
  return (
    <Link to="../" relative="path">
      <button className="flex justify-center items-center rounded-full w-14 h-14 border-[1px] border-indigo-500 p-0">
        <BackIcon />
      </button>
    </Link>
  );
};

export default BackButton;
