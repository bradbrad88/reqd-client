import { createContext } from "react";

const Context = createContext<ContextType | null>(null);

type Props = {
  children: React.ReactNode;
  venueId: string;
  venueName: string;
};

type ContextType = {
  venueId: string;
  venueName: string;
};

export const VenueProvider = ({ venueId, venueName, children }: Props) => {
  return <Context.Provider value={{ venueId, venueName }}>{children}</Context.Provider>;
};

export default Context;
