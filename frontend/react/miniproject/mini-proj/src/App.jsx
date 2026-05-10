import React from "react";
import ApiData from "./assets/components/ApiData";
import Details from "./assets/components/Details";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./assets/components/Navbar";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ApiData />} />
        <Route path="anime/:id" element={<Details />} />
      </Routes>
    </>
  );
};

export default App;
