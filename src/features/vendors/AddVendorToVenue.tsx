import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlobalVendorList } from "api/vendors";
import { useVenueContext } from "src/hooks/useContexts";
import { useAddVendorToVenue, useGlobalVendorList } from "src/hooks/useVendors";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "common/Form";
import HorizontalSplitFitBottomFillTop from "common/layouts/HorizontalSplitFitBottomFillTop";
import AvatarList, { AvatarItem } from "common/AvatarList";
import Card from "common/Card";
import Button from "common/Button";
import Input from "common/Input";
import SearchBar from "common/SearchBar";

type Vendor = GlobalVendorList[number];

const AddVendorToVenue = () => {
  const { venueId } = useVenueContext();
  const [query, setQuery] = useState("");
  const { globalVendorList, status } = useGlobalVendorList(venueId, query);
  const [params, setParams] = useSearchParams();

  const avatarList: AvatarItem[] = globalVendorList.map(vendor => ({
    id: vendor.id,
    description: vendor.vendorName,
    displayName: vendor.vendorName,
    imageUrl: vendor.logo,
    selected: vendor.isPreferred,
  }));

  const onSelect = (vendorId: string) => {
    const vendor = globalVendorList.find(vendor => vendor.id === vendorId);
    if (!vendor) return;
    if (vendor.isPreferred) return;
    setParams(prev => {
      prev.set("vendorId", vendorId);
      return prev;
    });
  };

  const onSearch = (query: string) => {
    setQuery(query);
  };

  const onCancelForm = () => {
    setParams(params => {
      params.delete("vendorId");
      return params;
    });
  };

  const selectedVendor = globalVendorList.find(vendor => vendor.id === params.get("vendorId"));

  return !selectedVendor ? (
    <HorizontalSplitFitBottomFillTop
      top={
        status === "loading" ? (
          <div>Loading</div>
        ) : (
          <div className="p-3">
            <h1 className="text-2xl"></h1>
            <div className="rounded-xl overflow-hidden border-[1px] border-zinc-600">
              <AvatarList items={avatarList} onSelect={onSelect} />
            </div>
          </div>
        )
      }
      bottom={
        <div className="p-3">
          <SearchBar autoFocus onSearch={onSearch} placeholder="Search vendors..." />
        </div>
      }
    />
  ) : (
    <AddVendorForm vendor={selectedVendor} cancel={onCancelForm} />
  );
};

const formSchema = z.object({
  repName: z.string(),

  email: z.union([
    z.string().email("This email address is invalid, please check it for mistakes"),
    z.string().length(0),
  ]),
  contactNumber: z.string(),
});
type Schema = z.infer<typeof formSchema>;

const AddVendorForm = ({ vendor, cancel }: { vendor: Vendor; cancel: () => void }) => {
  const { venueId, venueName } = useVenueContext();
  const { addVendor } = useAddVendorToVenue();
  const nav = useNavigate();
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: { repName: "", contactNumber: "", email: "" },
  });

  const onSubmit = async (values: Schema) => {
    const res = await addVendor({ venueId, vendorId: vendor.id, ...values });
    console.log(res);
    nav("../", { relative: "path" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-3 flex flex-col gap-4">
        <h1 className="text-3xl leading-tight">
          Setup {vendor.vendorName} as a vendor for {venueName}
        </h1>
        <Card className="flex flex-col">
          <h2 className="text-xl font-bold">Vendor Contact</h2>
          <p>
            The following details are optional but will help your team get in touch with the
            right person if they have issues with ordering
          </p>
          <fieldset className="flex flex-col gap-5 mt-5">
            <FormField
              name="repName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rep Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" inputMode="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="contactNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" inputMode="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" inputMode="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
        </Card>
        <Card>
          <h2 className="text-xl font-bold">Confirm</h2>
          <p></p>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <Button type="button" variant={"outline"} className="w-full" onClick={cancel}>
              Cancel
            </Button>
            <Button type="submit" className="" disabled={!form.formState.isValid}>
              Add Vendor
            </Button>
          </div>
        </Card>
      </form>
    </Form>
  );
};

export default AddVendorToVenue;
