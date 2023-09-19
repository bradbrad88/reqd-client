import { createContext } from "react";

const Context = createContext<ContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  venueId: string;
  venueName: string;
};

export const VenueProvider = ({ children }: Props) => {
  const venueId = import.meta.env.VITE_VENUE_ID;
  const venueName = import.meta.env.VITE_VENUE_NAME;
  return <Context.Provider value={{ venueId, venueName }}>{children}</Context.Provider>;
};

export default Context;
