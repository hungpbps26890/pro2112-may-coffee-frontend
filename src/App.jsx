import React from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import DrinkDetail from "./pages/DrinkDetail/DrinkDetail";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/category/:id" element={<Menu />} />
        <Route path="/drinks/:id" element={<DrinkDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
