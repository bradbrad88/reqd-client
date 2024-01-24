import { AreaDetail } from "api/areas";
import { createContext, useEffect, useState } from "react";

type ContextType = {
  area: AreaDetail;
  setArea: React.Dispatch<React.SetStateAction<AreaDetail>>;
  resetAreaState: () => void;
};

const Context = createContext<ContextType | null>(null);

type Props = {
  initialAreaDetail: AreaDetail;
  children: React.ReactNode;
};

export const AreaContextProvider = ({ initialAreaDetail, children }: Props) => {
  const [area, setArea] = useState(initialAreaDetail);
  const resetAreaState = () => {
    setArea(initialAreaDetail);
  };
  useEffect(() => {
    setArea(initialAreaDetail);
  }, [initialAreaDetail]);
  return (
    <Context.Provider value={{ area, setArea, resetAreaState }}>{children}</Context.Provider>
  );
};

export default Context;
