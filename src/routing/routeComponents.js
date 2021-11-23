import { lazy } from "react";

// Admin
const DemoHome = lazy(() => import("../pages/DemoHome.js"));

// Landing Page
const LiveTextPage = lazy(() => import("../pages/LiveTextPage"));

// Login Page
const Login = lazy(() => import("../pages/Login"));

// Demo Text Page
const DemoText = lazy(() => import("../pages/DemoText"));
// Add Business Page

const AddBusiness = lazy(() => import("../pages/AddBusiness"));

// All Clients Page
const ClientList = lazy(() => import("../pages/ClientList"));

// Not Found Page
const NotFound = lazy(() => import("../components/NotFound"));

export {
    DemoHome,
    LiveTextPage,
    Login,
    DemoText,
    AddBusiness,
    ClientList,
    NotFound,
};
