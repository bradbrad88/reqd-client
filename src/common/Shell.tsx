import { useEffect, useState } from "react";
import NavBarShell from "./Navbar";

type Props = {
  children?: React.ReactNode;
};

const Shell = ({ children }: Props) => {
  const [viewHeight, setViewHeight] = useState(window.innerHeight);

  useEffect(() => {
    const onResize = () => {
      const height = window.innerHeight;

      setViewHeight(height);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      className="grid grid-cols-1 grid-rows-[minmax(0,_1fr),_3rem]"
      style={{ height: viewHeight + "px" }}
    >
      <div className="overflow-y-auto overflow-x-auto p-3">{children}</div>
      <NavBarShell />
    </div>
  );
};

export default Shell;
