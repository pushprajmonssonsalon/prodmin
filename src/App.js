import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import PrivateRoute from "./components/PrivateRoute";
import Selection from "./pages/Selection";
import ProDashboard from "./pages/ProDashboard";
import Reports from "./pages/Reports";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import EditOrder from "./pages/EditOrder";
import Settelment from "./pages/Settlement";
import Json from "./pages/Json";
import Salons from "./pages/Salons";
import SingleSalon from "./pages/SingleSalon";
import AddProduct from "./pages/AddProduct";
import AddSalon from "./pages/AddSalon";
import AddBulkProduct from "./pages/AddBulkProduct";
import AddVedio from "./pages/AddVedio";
import UpdateProducts from "./pages/UpdateBulkProducts";
import UpdateProduct from "./pages/UpdateProduct";
import EditVedio from "./pages/EditVedio";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Selection />} />
      <Route path="/login" element={<Login />} />
      {/* crm routes */}
      <Route
        path="/dash-board"
        element={<PrivateRoute isCrm={true} component={ProDashboard} />}
      />
      <Route
        path="/settelment"
        element={<PrivateRoute isCrm={true} component={Json} />}
      />
      <Route
        path="/poorders"
        element={<PrivateRoute isCrm={true} component={Settelment} />}
      />
      <Route
        path="/salondet"
        element={<PrivateRoute isCrm={true} component={Salons} />}
      />
      <Route
        path="/salonadd"
        element={<PrivateRoute isCrm={true} component={AddSalon} />}
      />
      <Route
        path="/vedioadd"
        element={<PrivateRoute isCrm={true} component={AddVedio} />}
      />
      <Route
        path="/vedioedit"
        element={<PrivateRoute isCrm={true} component={EditVedio} />}
      />
      <Route
        path="/prodbedit"
        element={<PrivateRoute isCrm={true} component={UpdateProducts} />}
      />
      <Route
        path="/prodedit"
        element={<PrivateRoute isCrm={true} component={UpdateProduct} />}
      />
      <Route
        path="/prodadd"
        element={<PrivateRoute isCrm={true} component={AddBulkProduct} />}
      />
      <Route
        path="/salon/:shortUrl"
        element={<PrivateRoute isCrm={true} component={SingleSalon} />}
      />

      {/* prokart routes */}
      <Route
        path="/Dashboard"
        element={<PrivateRoute isCrm={false} component={Dashboard} />}
      />

      <Route
        path="/reports"
        element={<PrivateRoute isCrm={false} component={Reports} />}
      />
      <Route
        path="/orders"
        element={<PrivateRoute isCrm={false} component={Orders} />}
      />
      <Route
        path="/products"
        element={<PrivateRoute isCrm={false} component={Products} />}
      />
      <Route
        path="/edit"
        element={<PrivateRoute isCrm={false} component={EditOrder} />}
      />
      <Route
        path="/add"
        element={<PrivateRoute isCrm={false} component={AddProduct} />}
      />
      <Route
        path="/product/:shortUrl"
        element={<PrivateRoute isCrm={false} component={SingleProduct} />}
      />
    </Routes>
  );
};

export default App;
