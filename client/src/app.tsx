import React from "react";
import { Route, Routes } from "react-router-dom";
import OrderBoard from "./components/ui/orderBoard";
import Footer from "./components/ui/footer";
import Navigation from "./components/ui/navBar";
import LoginPage from "./layots/login";
import AboutPage from "./pages/AboutPage";
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order" element={<OrderBoard />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
