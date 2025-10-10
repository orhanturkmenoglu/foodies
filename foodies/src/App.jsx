import React, { useContext } from "react";
import { Menubar } from "./components/Menubar/Menubar";
import { Route, Routes } from "react-router-dom"; // react-router-dom olmalı
import { Home } from "./pages/Home/Home";
import { Contact } from "./pages/Contact/Contact";
import { ExploreFood } from "./pages/ExploreFood/ExploreFood";
import { FoodDetails } from "./pages/FoodDetails/FoodDetails.jsx";
import { Cart } from "./pages/Cart/Cart.jsx";
import { PlaceOrder } from "./pages/PlaceOrder/PlaceOrder.jsx";
import { Login } from "./components/Login/Login.jsx";
import { Register } from "./components/Register/Register.jsx";
  import { ToastContainer } from 'react-toastify';
import MyOrders from "./pages/MyOrders/MyOrders.jsx";
import { StoreContext } from "./context/StoreContext.jsx";

const App = () => {
  const {token} = useContext(StoreContext);
  return (
    <div>
      <Menubar />
      <ToastContainer/>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<ExploreFood />} />
        <Route path="/food/:id" element ={<FoodDetails/>}/>
        <Route path="/cart" element ={<Cart/>}/>
        <Route path="/order" element ={token ? <PlaceOrder/> : <Login/>}/>
        <Route path="/login" element ={token ? <Home/> : <Login/>}/>
        <Route path="/register" element ={token ? <Home/> : <Register/>}/>
        <Route path="/myorders" element ={token ? <MyOrders/>: <Login/>}/>
      </Routes>
    </div>
  );
};

export default App;
