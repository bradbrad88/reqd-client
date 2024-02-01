import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { VenueProvider } from "./contexts/VenueContext";

import Settings from "./pages/Settings";

import Products from "./pages/Products";
import ProductList from "./features/products/ProductList";
import CreateProduct from "./features/products/CreateProduct";
import ProductDetails from "features/products/ProductDetails";

import Vendors from "./pages/Vendors";
import VendorList from "features/vendors/VendorList";
import VendorDetails from "features/vendors/VendorDetails";

import Orders from "./pages/Orders";
import OrderList from "features/orderForm/OrderList";
import OrderDetail from "features/orderForm/OrderDetails";
import EditOrder from "features/orderForm/EditOrder";
import OrderVendorList from "features/orderForm/OrderVendorList";
import SubmitVendorOrder from "features/orderForm/SubmitVendorOrder";

import Areas from "./pages/Areas";
import AreaList from "features/areas/AreaList";
import AreaDetailOutlet from "features/areas/AreaDetailOutlet";
import AreaDetail from "features/areas/AreaDetail";
import NewStorageSpace from "features/areas/NewStorageSpace";
import StorageSpaceOutlet from "features/areas/StorageSpaceOutlet";
import StorageSpaceFinder from "features/areas/StorageSpaceFinder";

import { Inventory } from "./pages/Inventory";
import InventoryList from "features/inventory/InventoryList";
import ManageInventory from "features/inventory/ManageInventory";

import Shell from "common/Shell";
import CreateArea from "features/areas/CreateArea";
import AddVendorToVenue from "features/vendors/AddVendorToVenue";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <VenueProvider>
        <Router>
          <Shell>
            <Routes>
              <Route path="" element={<Orders />}>
                <Route path="" element={<OrderList />} />
                <Route path=":orderId" element={<OrderDetail />}>
                  <Route path="" element={<OrderVendorList />} />
                  <Route path="edit" element={<EditOrder />} />
                  <Route path=":vendorId" element={<SubmitVendorOrder />} />
                </Route>
              </Route>
              <Route path="settings" element={<Settings />}>
                <Route path="products" element={<Products />}>
                  <Route path="" element={<ProductList />} />
                  <Route path="create" element={<CreateProduct />} />
                  <Route path=":productId" element={<ProductDetails />} />
                </Route>
                <Route path="vendors" element={<Vendors />}>
                  <Route path="" element={<VendorList />} />
                  <Route path=":vendorId" element={<VendorDetails />} />
                  <Route path="add" element={<AddVendorToVenue />} />
                </Route>
                <Route path="areas" element={<Areas />}>
                  <Route path="" element={<AreaList />} />
                  <Route path="create" element={<CreateArea />} />
                  <Route path=":areaId" element={<AreaDetailOutlet />}>
                    <Route path="" element={<AreaDetail />} />
                    <Route path="new-space" element={<NewStorageSpace />} />
                    <Route path="spaces" element={<StorageSpaceOutlet />}>
                      <Route path=":storageSpace" element={<StorageSpaceFinder />} />
                    </Route>
                  </Route>
                </Route>
                <Route path="inventory" element={<Inventory />}>
                  <Route path="" element={<InventoryList />} />
                  <Route path="add" element={<ManageInventory />} />
                </Route>
              </Route>
            </Routes>
          </Shell>
        </Router>
      </VenueProvider>
    </QueryClientProvider>
  );
}

export default App;
