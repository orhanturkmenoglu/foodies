import React from "react";
import { Menubar } from "./components/Menubar/Menubar";
import { Route, Routes } from "react-router";
import { Home } from "./pages/Home/Home";
import ContactUs from "./pages/Contact Us/ContactUs";
import { Explore } from "./pages/ExploreFood/ExploreFood";

const App = () => {
  return (
    <div>
      <Menubar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </div>
  );
};

export default App;
