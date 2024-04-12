import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Store } from "./ContextApi/context";
import PrivatePages from "./pages/PrivatePages";
import Single from "./pages/SingleProduct";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<PrivatePages />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/single/:productId" element={<Single />} />
          <Route path="/cart" element={<Cart />} />
        </Route> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
