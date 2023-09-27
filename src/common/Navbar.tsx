import React, { useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import useClickOutside from "src/hooks/useClickOutside";
import HomeIcon from "./icons/Home";
import MenuIcon from "./icons/Menu";

type Props = {
  left?: React.ReactNode;
  middle?: React.ReactNode;
  right?: React.ReactNode;
};

// Nav bar with 3 spaces that can each be defined. Left and middle space default to Settings and Home respectively
const NavBar = ({ left = <Settings />, middle = <Home />, right }: Props) => {
  return (
    <nav className="grid grid-cols-3 w-full items-center">
      <NavSection>{left}</NavSection>
      <NavSection>{middle}</NavSection>
      <NavSection>{right}</NavSection>
    </nav>
  );
};

// Style the 3 sections of the nav bar
const NavSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 grid-rows-1 items-center border-r-[1px] border-t-[1px] last-of-type:border-r-0 border-zinc-600 h-full text-center">
      {children}
    </div>
  );
};

// Home button
const Home = () => {
  return (
    <Link to="/">
      <div className="w-full h-full flex items-center justify-center">
        <HomeIcon />
      </div>
    </Link>
  );
};

// Popup settings menu
const Settings = () => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setActive(false));

  const onClick = () => {
    setActive(!active);
  };

  return (
    <div ref={ref} onClick={onClick} className="relative h-full">
      <div className="h-full flex justify-center items-center">
        <MenuIcon />
      </div>
      {active && (
        <div className="absolute bottom-full border-zinc-500 border-[1px] rounded-md">
          <div className="flex flex-col">
            <SettingsItem to="products" display="Products" />
            <SettingsItem to="areas" display="Areas" />
            <SettingsItem to="vendors" display="Vendors" />
            <SettingsItem to="" display="General" />
            <SettingsItem to="" display={<div>Profile</div>} />
          </div>
        </div>
      )}
    </div>
  );
};

type SettingsItemProps = {
  to: string;
  display: React.ReactNode;
};

const SettingsItem = ({ to, display }: SettingsItemProps) => {
  return (
    <Link to={`/settings/${to}`}>
      <div className="p-3 text-left text-lg min-w-[14rem] hover:bg-zinc-700 bg-zinc-800 border-b-[1px] border-zinc-700 text-indigo-300">
        {display}
      </div>
    </Link>
  );
};

// Render out a different NavBar depending on where we are in the application
const NavBarShell = () => {
  return (
    <Routes>
      <Route path="*" element={<NavBarInstance to="/" display="Orders" />} />
      <Route
        path=":orderId/:editOrvendorId"
        element={<NavBarInstance to="../" display="Order" />}
      />
      <Route
        path="settings/products/*"
        element={<NavBarInstance to="/settings/products" display="Products" />}
      />
      <Route
        path="settings/vendors/*"
        element={<NavBarInstance to="/settings/vendors" display="Vendors" />}
      />
      <Route
        path="settings/areas/*"
        element={<NavBarInstance to="/settings/areas" display="Areas" />}
      />
    </Routes>
  );
};

export default NavBarShell;

// Convenience function for rendering NavBar with default Left and Middle elements and formatting text of Right element
function NavBarInstance({ display, to }: { display: string; to: string }) {
  return (
    <NavBar
      right={
        <Link to={to}>
          <div className="text-white">{display}</div>
        </Link>
      }
    />
  );
}
