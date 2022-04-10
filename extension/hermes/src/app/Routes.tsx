import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { Users } from "./pages/users";
import { Explore } from "./pages/explore";
import { Search } from "./pages/search";
import { Map } from "./pages/map";

const RoutesComp: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<Search />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComp;
