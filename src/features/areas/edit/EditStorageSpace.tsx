import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAreaContext, useVenueContext } from "src/hooks/useContexts";
import { useRemoveStorageSpace, useRenameStorageSpace } from "src/hooks/useAreas";
import { Form, FormControl, FormField, FormItem, FormLabel } from "common/Form";
import Button from "common/Button";
import Input from "common/Input";
import DestructiveDialog from "common/DestructiveDialog";
import { useState } from "react";

type Props = {
  space: string;
};

const formSchema = z.object({ newName: z.string().min(3) });

const EditStorageSpace = ({ space }: Props) => {
  const { venueId } = useVenueContext();
  const { area } = useAreaContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { newName: space || "" },
  });
  const { renameStorageSpace } = useRenameStorageSpace();
  const { removeStorageSpace } = useRemoveStorageSpace();
  const [confirmDelete, setConfirmDelete] = useState(false);
  if (!space) return null;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    renameStorageSpace({
      venueId,
      areaId: area.id,
      storageSpace: space,
      newName: values.newName,
    });
  };

  const onRemove = () => {
    removeStorageSpace({ venueId, areaId: area.id, storageSpace: space });
  };

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
          <FormField
            name="newName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Rename this storage space</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full" autoFocus />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-auto ml-auto">
            Save
          </Button>
        </form>
      </Form>
      <div className="mt-6">
        <h2 className="text-sm">Remove this area? (Permanent)</h2>
        <Button variant={"destructive"} onClick={() => setConfirmDelete(true)}>
          Delete
        </Button>
      </div>
      <DestructiveDialog
        open={confirmDelete}
        setOpen={setConfirmDelete}
        title="Remove Storage Space"
        actionButtonText="Remove Space"
        onAction={onRemove}
      >
        Are you sure you wish to delete this storage space? You cannot undo this action and may
        need to setup this space again from scratch
      </DestructiveDialog>
    </div>
  );
};

export default EditStorageSpace;
