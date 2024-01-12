import { useEffect, useState } from "react";
import NavBarShell from "./Navbar";
import HorizontalSplitFitBottomFillTop from "./layouts/HorizontalSplitFitBottomFillTop";

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
    <div style={{ height: viewHeight + "px" }}>
      <HorizontalSplitFitBottomFillTop top={children} bottom={<NavBarShell />} />
    </div>
  );
};

export default Shell;
