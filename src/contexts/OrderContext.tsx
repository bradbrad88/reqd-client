import { createContext } from "react";
// import { useMutation, useQuery, useQueryClient } from "react-query";

export const OrderContext = createContext<Context>({
  // items: [],
  // setItemValue: () => {},
  // getItemValue: () => 0,
  // getItemAreaValue: () => 0,
});

type Props = {
  children: React.ReactNode;
};

type Context = {
  // items: ItemList;
  // setItemValue: (itemId: string, area: string, amount: number) => void;
  // getItemValue: (itemId: string) => number;
  // getItemAreaValue: (itemId: string, area: string) => number;
};

// type ItemList = {
//   itemId: string;
//   areas: {
//     area: string;
//     amount: number;
//   }[];
// }[];

export const Provider = ({ children }: Props) => {
  // const [items, setItems] = useState<ItemList>([
  //   {
  //     itemId: "123",
  //     areas: [
  //       { area: "some area", amount: 2 },
  //       { area: "another area", amount: 1 },
  //     ],
  //   },
  // ]);

  // const queryClient = useQueryClient();

  // const items = useQuery("order", async () => {
  //   const res = await fetch("http://localhost:5121/order");
  //   return await res.json();
  // });

  // const mutation = useMutation<
  //   number,
  //   number,
  //   { itemId: string; area: string; amount: number }
  // >(
  //   something => {
  //     console.log(something);
  //     return fetch("http://localhost:5121/set-order-item-value");
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("order");
  //     },
  //   }
  // );

  // const setItemValue = (itemId: string, area: string, amount: number) => {
  //   // mutation.mutate({ itemId, area, amount });
  // };

  // const getItemValue = (itemId: string) => {
  //   const item = items.find(item => item.itemId === itemId);
  //   if (!item) return 0;
  //   return item.areas.reduce((total, area) => total + area.amount, 0);
  // };

  // const getItemAreaValue = (itemId: string, area: string) => {
  //   const item = items.find(item => item.itemId === itemId);
  //   if (!item) return 0;
  //   return item.areas.reduce((total, itemArea) => {
  //     if (itemArea.area !== area) return total;
  //     return total + itemArea.amount;
  //   }, 0);
  // };

  return (
    <OrderContext.Provider
      value={
        {}
        //  items, setItemValue, getItemValue, getItemAreaValue
      }
    >
      {children}
    </OrderContext.Provider>
  );
};
