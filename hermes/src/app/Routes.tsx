import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";

const RoutesComp: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dash" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComp;
