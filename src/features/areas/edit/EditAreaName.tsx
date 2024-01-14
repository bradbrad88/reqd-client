import { useCallback, useId, useState } from "react";
import { AreaDetail } from "api/areas";
import DisplayEditable from "common/DisplayEditable";
import Label from "common/Label";
import { Input } from "common/Inputs";
import { useRenameArea } from "src/hooks/useAreas";
import { useVenueContext } from "src/hooks/useContexts";
import { useParams } from "react-router-dom";

type Props = {
  area: AreaDetail;
};

const EditAreaName = ({ area }: Props) => {
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const [editMode, setEditMode] = useState(false);
  const [areaName, setAreaName] = useState(area.areaName);
  const { renameArea } = useRenameArea();

  const id = useId();

  const onSave = useCallback(() => {
    renameArea({ venueId, areaId: areaId!, areaName });
  }, [areaId, areaName, venueId, renameArea]);

  const onBlur = () => {
    setTimeout(() => {
      close();
    }, 0);
  };

  const close = () => {
    setEditMode(false);
    setAreaName(area.areaName);
  };

  return (
    <div>
      <Label htmlFor={id}>Name</Label>
      {editMode ? (
        <div className="relative">
          <Input
            id={id}
            name="areaName"
            autoFocus
            value={areaName}
            onChange={e => setAreaName(e.target.value)}
            onBlur={onBlur}
            onSave={onSave}
            close={close}
          />
          <span onClick={onSave} className="absolute right-4 top-1/2 -translate-y-1/2">
            ✅
          </span>
        </div>
      ) : (
        <DisplayEditable onClick={() => setEditMode(true)} text={area.areaName} />
      )}
    </div>
  );
};

export default EditAreaName;
