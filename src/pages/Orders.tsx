import { Outlet } from "react-router-dom";

const Orders = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1>Orders</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Orders;
