import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import PrivateRoute from "./components/PrivateRoute";
import Selection from "./pages/Selection";
import ProDashboard from "./pages/ProDashboard";
import Reports from "./pages/Reports";
import SalonReport from "./pages/SalonReport";
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
import ProductsQrcodes from "./pages/ProductsQrcodes";
import Notification from "./pages/Notification";
import AllSalonData from "./pages/AllSalonData";
import SalonCredentials from "./pages/SalonCredentials";
import EditMembersip from "./pages/EditMembersip";
import FranchiseDashboard from "./pages/franchise/FranchiseDashboard";
import FranchiseLayout from "./components/commoncomponents/FranchiseLayout";
import CreateDistributer from "./pages/CreateDistributer";
import DistributerPo from "./pages/DistributerPo";
import AddReview from "./pages/AddReview";
const App = () => {
  const location = useLocation();

  // Define the routes for which the class should apply

  // Determine if the current route matches any CRM route
  const isCrmRoute = location.pathname.startsWith("/franchise")
  
  return (
    <div className={`${!isCrmRoute ? "main" : ""}`}>

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
          path="/dbpoorders"
          element={<PrivateRoute isCrm={true} component={DistributerPo} />}
        />
        <Route
          path="/create-distributer"
          element={<PrivateRoute isCrm={true} component={CreateDistributer} />}
        />
        <Route
          path="/salondetsmart"
          element={<PrivateRoute isCrm={true} component={Salons} />}
        />
        <Route
          path="/salondetcrm"
          element={<PrivateRoute isCrm={true} component={Salons} />}
        />
        <Route
          path="/saloncred"
          element={<PrivateRoute isCrm={true} component={SalonCredentials} />}
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
          path="/salonsmart/:shortUrl"
          element={<PrivateRoute isCrm={true} component={SingleSalon} />}
        />
        <Route
          path="/saloncrm/:shortUrl"
          element={<PrivateRoute isCrm={true} component={SingleSalon} />}
        />
        <Route
          path="/notification"
          element={<PrivateRoute isCrm={true} component={Notification} />}
        />
        <Route
          path="/salonreports"
          element={<PrivateRoute isCrm={true} component={SalonReport} />}
        />
        <Route
          path="/allsalons"
          element={<PrivateRoute isCrm={true} component={AllSalonData} />}
        />
        <Route
          path="/editmemb"
          element={<PrivateRoute isCrm={true} component={EditMembersip} />}
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
          path="/add-review"
          element={<PrivateRoute isCrm={false} component={AddReview} />}
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
        <Route
          path="/productqr"
          element={<PrivateRoute isCrm={false} component={ProductsQrcodes} />}
        />

        <Route path="/franchise/*" element={<FranchiseRoutes />} />

      </Routes>
    </div>

  );
};


const FranchiseRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FranchiseLayout><FranchiseDashboard /></FranchiseLayout>} /> {/* Default path */}

    </Routes>
  );
};
export default App;
