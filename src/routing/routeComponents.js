import { lazy } from "react";

// Admin
const Demo = lazy(() => import("../components/Demo.js"));

// Landing Page
const LandingPage = lazy(() => import("../components/LandingPage"));

// Login Page
const Login = lazy(() => import("../components/Login"));

// Add Business Page
const AddBusiness = lazy(() => import("../components/AddBusiness"));

// All Clients Page
const ClientList = lazy(() => import("../components/ClientList"));

export { Demo, LandingPage, Login, AddBusiness, ClientList };
