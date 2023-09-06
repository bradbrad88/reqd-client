import { CSSProperties } from "react";
import { RingLoader } from "react-spinners";

const Spinner = () => {
  const override: CSSProperties = {
    margin: "0 auto",
  };
  return <RingLoader color="white" size={28} cssOverride={override} />;
};

export default Spinner;
