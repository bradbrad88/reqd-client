import ListItem from "common/ListItem";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  areaName: string;
};

const Area = ({ areaName, id }: Props) => {
  const nav = useNavigate();

  const onNavigate = () => {
    nav(id);
  };

  return (
    <ListItem>
      <div onClick={onNavigate}>{areaName}</div>
    </ListItem>
  );
};

export default Area;
