import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVenueContext } from "../../hooks/useContexts";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "common/Form";
import Input from "common/Input";
import Card from "common/Card";
import Button from "common/Button";
import { useCreateArea } from "src/hooks/useAreas";
import Spinner from "common/Spinner";

const formSchema = z.object({
  areaName: z.string().min(3),
});

const CreateArea = () => {
  const { venueId } = useVenueContext();
  const { createArea, isLoading } = useCreateArea();
  const nav = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { areaName: "" },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createArea({ venueId, areaName: values.areaName });
    nav("../", { relative: "path" });
  };

  return (
    <div className="p-6 flex flex-col gap-3">
      <h2 className="text-xl">Create a new area in your venue</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Card>
            <FormField
              name="areaName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="areaName" className="text-lg">
                    Area Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} id="areaName" placeholder="Area name..." />
                  </FormControl>
                  <div className="text-amber-400">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </Card>
          <div className="flex flex-col gap-3">
            <Button disabled={isLoading} type="submit" className="bg-lime-600 text-white">
              {isLoading ? <Spinner /> : "Create"}
            </Button>
            <Link to="../" relative="path">
              <Button variant={"outline"} type="button" className="w-full text-white">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateArea;
