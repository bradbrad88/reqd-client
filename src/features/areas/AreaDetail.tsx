import { Link, useOutletContext } from "react-router-dom";
import FlexList from "common/FlexList";
import ListItem from "common/ListItem";
import Card from "common/Card";
import Button from "common/Button";
import EditAreaName from "./edit/EditAreaName";

import type { AreaDetail as AreaDetailType } from "api/areas";

const AreaDetail = () => {
  const { area } = useOutletContext<{ area: AreaDetailType }>();

  const renderStorageSpaces = () =>
    area.storageSpaces.map(space => (
      <Link key={space.storageName} to={`spaces/${space.storageName}`} className="text-white">
        <ListItem>{space.storageName}</ListItem>
      </Link>
    ));

  const onDelete = () => {
    // Delete
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">{area.areaName}</h1>
      <section>
        <h2 className="text-xl">Edit Area</h2>
        <Card>
          <EditAreaName area={area} />
        </Card>
      </section>
      <section>
        <h2 className="text-xl">Edit Storage Spaces</h2>
        <Card>
          <FlexList>
            {renderStorageSpaces()}
            <Link to={"new-space"}>
              <div className="bg-zinc-900 p-3 rounded-md border-[1px] border-lime-500 text-white shadow-md shadow-black">
                + Storage Space
              </div>
            </Link>
          </FlexList>
        </Card>
      </section>
      <section>
        <h2 className="text-xl">Warning! (permanent actions)</h2>
        <Card>
          <Button className="bg-zinc-900 border-orange-500 h-12 w-full" onClick={onDelete}>
            Remove Area
          </Button>
        </Card>
      </section>
    </div>
  );
};

export default AreaDetail;
