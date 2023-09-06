type Props = {
  children: React.ReactNode;
};

const FlexList = ({ children }: Props) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

export default FlexList;
