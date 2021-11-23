import { lazy } from "react";

// Admin
const DemoHome = lazy(() => import("../pages/DemoHome.js"));

// Landing Page
const LandingPage = lazy(() => import("../pages/LandingPage"));

// Login Page
const Login = lazy(() => import("../pages/Login"));

// Add Business Page
const AddBusiness = lazy(() => import("../pages/AddBusiness"));

// All Clients Page
const ClientList = lazy(() => import("../pages/ClientList"));

export { DemoHome, LandingPage, Login, AddBusiness, ClientList };
