const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-lg border-zinc-600 border-[1px] p-6 shadow-black shadow-md bg-zinc-900">
      {children}
    </div>
  );
};

export default Card;
