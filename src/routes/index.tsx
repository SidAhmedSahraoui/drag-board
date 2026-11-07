import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/home"));
const Board = lazy(() => import("../pages/board"));
const NotFound = lazy(() => import("../pages/error"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<Board />} />
      <Route path="/portfolio" element={<Navigate to="/board" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
