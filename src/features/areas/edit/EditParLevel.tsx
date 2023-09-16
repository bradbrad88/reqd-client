import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ProductLocation } from "api/areas";
import { useVenueContext } from "src/hooks/useContexts";
import { useSetProductLocationParLevel } from "src/hooks/useAreas";
import DisplayEditable from "features/products/edit/DisplayEditable";
import { Input } from "common/Inputs";
import type { AreaOutletContext } from "../AreaProducts";

const EditParLevel = ({ productLocation }: { productLocation: ProductLocation }) => {
  const { venueId } = useVenueContext();
  const { areaDetail } = useOutletContext<AreaOutletContext>();
  const { setParLevel } = useSetProductLocationParLevel(venueId, areaDetail.id);
  const [editMode, setEditMode] = useState(false);
  const [parLevel, setParLevelState] = useState<number | null>(null);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const num = Number(event.target.value);
    if (isNaN(num)) return setParLevelState(null);
    setParLevelState(num);
  };

  const onSave = () => {
    console.log(parLevel);
    setParLevel({ ...areaDetail, venueId, productLocationId: productLocation.id, parLevel });
  };

  const close = () => {
    setTimeout(() => {
      setEditMode(false);
    }, 0);
  };

  return (
    <div className="-my-2">
      {editMode ? (
        <div className="relative">
          <Input
            onSave={onSave}
            close={close}
            className="bg-transparent appearance-none"
            autoFocus
            onChange={onChange}
            value={parLevel || ""}
            type="number"
            onBlur={close}
          />
        </div>
      ) : (
        <DisplayEditable
          onClick={() => setEditMode(true)}
          text={productLocation.parLevel || ""}
        />
      )}
    </div>
  );
};

export default EditParLevel;
