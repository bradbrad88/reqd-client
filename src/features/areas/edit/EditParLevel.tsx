import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "common/Form";
import Input from "common/Input";
import Button from "common/Button";
import Slideover from "common/Slideover";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onParLevelChange: (parLevel: number) => void;
  close: () => void;
  parLevel: number;
};

const formSchema = z.object({
  parLevel: z.number().int().gte(0),
});

const EditParLevel = ({ open, close, onParLevelChange, parLevel }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    form.resetField("parLevel", { defaultValue: parLevel });
    form.reset({ parLevel });
  }, [parLevel, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onParLevelChange(values.parLevel);
    onClose();
  };

  const onClose = () => {
    close();
  };

  return (
    <Slideover
      open={open}
      title="How many items would you usually stock here?"
      closeButton={false}
      setOpen={close}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex flex-col gap-5">
          <FormField
            control={form.control}
            name="parLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Par Level</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={String(field.value)}
                    onChange={e => {
                      const num = Number(e.target.value);
                      if (isNaN(num)) return field.onChange(e);
                      return field.onChange(num);
                    }}
                    placeholder="par level..."
                    type="number"
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button onClick={onClose} variant={"outline"} type="button">
              Cancel
            </Button>
            <Button type="submit" variant={"default"}>
              Update
            </Button>
          </div>
        </form>
      </Form>
    </Slideover>
  );
};

export default EditParLevel;
