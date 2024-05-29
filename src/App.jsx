import React from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
