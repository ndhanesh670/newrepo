import React from "react";
import ApiData from "./assets/components/ApiData";
import Details from "./assets/components/Details";
import Favourites from "./assets/components/Favourites";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import AuthModal from "./assets/components/AuthModal";
import { useAuth } from "./assets/components/Auth";

const App = () => {
  const { isAuthModalOpen, closeAuth } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ApiData />} />
        <Route path="anime/:id" element={<Details />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuth} />
    </>
  );
};

export default App;
