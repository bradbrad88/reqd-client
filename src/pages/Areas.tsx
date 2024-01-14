import { Outlet } from "react-router-dom";

const Areas = () => {
  return (
    <div className="flex flex-col gap-3 h-full">
      <Outlet />
    </div>
  );
};

export default Areas;
