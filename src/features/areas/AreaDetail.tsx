import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAreaContext, useVenueContext } from "src/hooks/useContexts";
import { useDeleteArea } from "src/hooks/useAreas";
import Card from "common/Card";
import Button from "common/Button";
import DestructiveDialog from "common/DestructiveDialog";
import EditAreaName from "./edit/EditAreaName";
import StorageSpaceList from "./StorageSpaceList";

const AreaDetail = () => {
  const { venueId } = useVenueContext();
  const { area } = useAreaContext();
  const { deleteArea } = useDeleteArea();
  const nav = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const onDelete = () => {
    deleteArea({ venueId, areaId: area.id });
    nav("../", { relative: "path" });
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
          <StorageSpaceList storageSpaceLayout={area.storageSpaceLayout} />
          <Link to={"new-space"}>
            <div className="bg-zinc-900 p-3 rounded-md border-[1px] border-lime-500 border-dashed text-white shadow-md shadow-black mt-5">
              + Storage Space
            </div>
          </Link>
        </Card>
      </section>
      <section>
        <h2 className="text-xl">Warning! (permanent actions)</h2>
        <Card>
          <Button
            className="bg-zinc-900 border-orange-500 h-12 w-full"
            onClick={() => setConfirmDelete(true)}
          >
            Remove Area
          </Button>
        </Card>
        <DestructiveDialog
          open={confirmDelete}
          setOpen={setConfirmDelete}
          title="Remove Area"
          actionButtonText="Remove Area"
          onAction={onDelete}
        >
          Are you sure you wish to delete this area? You cannot undo this action and may need
          to setup this area again from scratch
        </DestructiveDialog>
      </section>
    </div>
  );
};

export default AreaDetail;
