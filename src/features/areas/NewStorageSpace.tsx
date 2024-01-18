import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVenueContext } from "src/hooks/useContexts";
import { useAddStorageSpace } from "src/hooks/useAreas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "common/Form";
import Input from "common/Input";
import RadioGroupCards from "common/RadioGroupCards";
import Button from "common/Button";
import Spinner from "common/Spinner";

const formSchema = z.object({
  storageSpace: z.string().min(3),
  layoutType: z.union([z.literal("list"), z.literal("layout")]),
});

const NewStorageSpace = () => {
  const { venueId } = useVenueContext();
  const { areaId } = useParams<{ areaId: string }>();
  const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });
  const { addStorageSpace, isLoading } = useAddStorageSpace();
  const nav = useNavigate();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await addStorageSpace({
      venueId,
      areaId: areaId!,
      ...values,
    });
    nav(`../spaces/${values.storageSpace}`);
  };

  const options = [
    {
      id: "list",
      title: "List",
      description: "A simple list. Reorder items easily",
    },
    {
      id: "layout",
      title: "Layout",
      description:
        "Use this when products belong in a specific spot, such as a display fridge",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full p-3 flex flex-col gap-5">
        <h1 className="text-2xl">Create a new storage space</h1>
        <FormField
          name="storageSpace"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="layoutType"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroupCards
                  options={options}
                  onSelectionChange={field.onChange}
                ></RadioGroupCards>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <Button variant={"default"} disabled={isLoading}>
            {isLoading ? <Spinner /> : "Create Space"}
          </Button>
          <Link to={"../"} relative="path" className="text-white">
            <Button variant={"outline"} type="button" className="w-full">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default NewStorageSpace;
