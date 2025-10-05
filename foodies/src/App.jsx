import React from "react";
import { Menubar } from "./components/Menubar/Menubar";
import { Route, Routes } from "react-router-dom"; // react-router-dom olmalı
import { Home } from "./pages/Home/Home";
import { Contact } from "./pages/Contact/Contact";
import { ExploreFood } from "./pages/ExploreFood/ExploreFood";
import { FoodDetails } from "./pages/FoodDetails/FoodDetails.jsx";
import { Cart } from "./pages/Cart/Cart.jsx";

const App = () => {
  return (
    <div>
      <Menubar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<ExploreFood />} />
        <Route path="/food/:id" element ={<FoodDetails/>}/>
        <Route path="/cart/" element ={<Cart/>}/>
      </Routes>
    </div>
  );
};

export default App;
