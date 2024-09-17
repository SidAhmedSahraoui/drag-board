import { lazy } from "react";

export { Items } from "./item";
export { Container } from "./container";
export { Menu } from "./menu";
export const Modal = lazy(() => import("./modal"));
export const MobileNavbar = lazy(() => import("./navbar"));