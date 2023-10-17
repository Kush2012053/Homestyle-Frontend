import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/about/About";
import ConfirmOrder from "./components/confirmorder/ConfirmOrder";
import Contact from "./components/contact/Contact";
import EditProfile from "./components/editprofile/EditProfile";
import Home from "./components/home/Home";
import MyCart from "./components/mycart/MyCart";
import MyOrders from "./components/myorders/MyOrders";
import MyProfile from "./components/myprofile/MyProfile";
import OneProduct from "./components/oneproduct/OneProduct";
import Products from "./components/products/Products";
import ShippingDetails from "./components/shippingdetails/ShippingDetails";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import OneOrder from "./components/oneorder/OneOrder";
import PageNotFound from "./components/pagenotfound/PageNotFound";
//import WithNavbar from "./components/withnavbar/WithNavbar";
import WithNavbar from "./components/withnavbar/withnavbar";
import WithoutNavbar from "./components/withoutnavbar/WithoutNavbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<WithoutNavbar />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route element={<WithNavbar />}>
            <Route path="" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mycart" element={<MyCart />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/oneproduct" element={<OneProduct />} />
            <Route path="/shippingdetails" element={<ShippingDetails />} />
            <Route path="/confirmorder" element={<ConfirmOrder />} />
            <Route path="/oneorder" element={<OneOrder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
