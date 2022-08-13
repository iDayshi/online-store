import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/ui/footer";
import Navigation from "./components/ui/navBar";
import AboutPage from "./pages/AboutPage";
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
