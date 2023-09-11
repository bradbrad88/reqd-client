import Areas from "./pages/Areas";
import { QueryClient, QueryClientProvider } from "react-query";
import { VenueProvider } from "./contexts/VenueContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <VenueProvider venueId="fab75a74-a16b-46db-b8c7-b32cd6a641fa" venueName="Bradstead">
        <Router>
          <Link to={"/"}>
            <div className="w-full">
              <div className="ml-auto w-fit">Home</div>
            </div>
          </Link>
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="orders" element={<Orders />}>
              <Route path="" element={<OrderList />} />
              <Route path=":orderId" element={<OrderDetail />} />
            </Route>
          </Routes>
        </Router>
      </VenueProvider>
    </QueryClientProvider>
  );
}

export default App;
