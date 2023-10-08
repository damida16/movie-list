import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../pages/App";
import { Details } from "../pages/Details";
import DetailsMovie from "../pages/DetailsMovie";

export const RouterList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/1" element={<Details />} />
        <Route path="/2/:id" element={<DetailsMovie />} />
      </Routes>
    </BrowserRouter>
  );
};
