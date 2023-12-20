type Props = {
  children: React.ReactNode;
};

// For scroll snapping, use the following classes on the direct children
// Scroll Stop type: https://tailwindcss.com/docs/scroll-snap-stop
// Eg: scroll-normal || scroll-always
// Scroll Snap Align type: https://tailwindcss.com/docs/scroll-snap-align
// Eg: snap-start || snap-center

const HorizontalScrollNavigation = ({ children }: Props) => {
  return (
    <nav className="flex gap-4 overflow-x-auto text-xl h-full items-center px-3 whitespace-nowrap py-2 border-zinc-600 border-t-[1px] snap-x snap-mandatory">
      {children}
    </nav>
  );
};

export default HorizontalScrollNavigation;
