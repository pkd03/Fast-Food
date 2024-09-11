import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Thankyou from "./pages/Thankyou/Thankyou";
import MyOrders from "./pages/MyOrders/MyOrders";
import FoodDisplay from "./components/FoodDisplay/FoodDisplay";
import FoodDetail from "./components/FoodDetail/FoodDetail";
import Foods from "./pages/Foods/Foods";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/" element={<FoodDisplay category="All" />} />
          <Route path="/food/:id" element={<FoodDetail />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
