import "./App.css";
import React from "react";
import Home from "./components/Home";
import Signup from "./components/signup";
import Login from "./components/login";
import ForgotPassword from "./components/ForgotPassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactForm from "./components/contactus";
import AboutUs from "./components/aboutus";
import Menu from "./components/menu";
import RestaurantList from "./components/restlist";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProfile from "./components/userprofile";
import MyOrder from "./components/MyOrder";
import Logout from "./components/logout";
import PaypalPayment from "./components/PaypalPayment";
import MenuItemDetails from "./components/menuItemDetails";
import ViewCart from "./components/viewCart";
import ViewOrder from "./components/viewOrder";
import ThankYou from "./components/thankyou";
import ManageRestaurant from "./Admin/ManageRestaurant";
import EditRestaurant from "./Admin/EditRestaurant";
import ManageUsers from "./Admin/ManageUsers";
import EditUser from "./Admin/EditUser";
import Changepswd from "./components/changepdwd";
import DeliveryAddress from "./components/deliveryaddress"
import AdminAddRestaurant from "./Admin/AdminAddRestaurant"
import AdminAddMenuItem from "./Admin/AdminAddMenuItem"
import AddUser from "./Admin/AdminAddUsers"
import ManageCoupons from "./Admin/ManageCoupon";
import AddCoupon from "./Admin/AdminAddCoupons";
import EditCoupon from "./Admin/EditCoupon";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/restlist" element={<RestaurantList />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/restaurant/:restaurantId/*" element={<Menu />} />
            <Route
              path="/menu/:restaurantId/:index"
              element={<MenuItemDetails />}
            />
            <Route path="/cart" element={<ViewCart />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/paypalpayment" element={<PaypalPayment />} />
            <Route path="/myorder" element={<MyOrder />} />
            <Route path="/vieworder" element={<ViewOrder />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            <Route path="/change-pswd" element={<Changepswd />} />
            <Route path="/add-address" element={<DeliveryAddress/>} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route
              path="/admin/managerestaurant"
              element={<ManageRestaurant />}
            />
            <Route
              path="/editrestaurant/:restaurantId/*"
              element={<EditRestaurant />}
            />

            <Route path="/edituser/:userId/*" element={<EditUser />} />
            <Route path="/editcoupon/:couponId/*" element={<EditCoupon />} />

            <Route path="/admin/manageusers" element={<ManageUsers />} />
            <Route path="/admin/add-restaurant" element={<AdminAddRestaurant />} />
            <Route path="/admin/add-menu-item" element={<AdminAddMenuItem />} />
            <Route path="/admin/add-user" element={<AddUser />} />
            <Route path="/admin/add-coupon" element={<AddCoupon />} />
            <Route path="/admin/managecoupons" element={<ManageCoupons />} />

          </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
