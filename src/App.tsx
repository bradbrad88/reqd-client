import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { VenueProvider } from "./contexts/VenueContext";
import Areas from "./pages/Areas";
import Products from "./pages/Products";
import CreateProduct from "./features/products/CreateProduct";
import ProductList from "./features/products/ProductList";
import ProductDetails from "features/products/ProductDetails";
import Vendors from "./pages/Vendors";
import VendorList from "features/vendors/VendorList";
import VendorDetails from "features/vendors/VendorDetails";
import CreateVendor from "features/vendors/CreateVendor";
import CreateArea from "features/areas/CreateArea";
import AreaList from "features/areas/AreaList";
import AreaDetails from "features/areas/AreaDetails";
import AddProductToArea from "features/areas/AddProductToArea";
import AreaProducts from "features/areas/AreaProducts";
import Orders from "./pages/Orders";
import OrderList from "features/orderForm/OrderList";
import OrderDetail from "features/orderForm/OrderDetails";
import Shell from "common/Shell";
import Settings from "./pages/Settings";
import EditOrder from "features/orderForm/EditOrder";
import OrderVendorList from "features/orderForm/OrderVendorList";
import SubmitVendorOrder from "features/orderForm/SubmitVendorOrder";

import InventoryList from "features/inventory/InventoryList";
import { Inventory } from "./pages/Inventory";
import ManageInventory from "features/inventory/ManageInventory";

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
                  <Route path="create" element={<CreateVendor />} />
                </Route>
                <Route path="areas" element={<Areas />}>
                  <Route path="create" element={<CreateArea />} />
                  <Route path="" element={<AreaList />} />
                  <Route path=":areaId" element={<AreaDetails />}>
                    <Route path="" element={<AreaProducts />} />
                    <Route path="add-product" element={<AddProductToArea />} />
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
