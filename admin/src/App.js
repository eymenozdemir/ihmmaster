import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import ViewOrder from "./pages/ViewOrder";
import ViewSale from "./pages/ViewSale";
import Addorder from "./pages/Addorder";
import Addsale from "./pages/Addsale";
import AdduserOld from "./pages/Adduser_old";
import Containeroptimization from "./pages/Containeroptimization";
import Employees from "./pages/Employees";
import Inventory from "./pages/Inventory";
import Savannah from "./pages/Savannah";
import Nashville from "./pages/Nashville";
import Atlanta from "./pages/Atlanta";
import Sales from "./pages/Sales";
import Stockalert from "./pages/Stockalert";
import Vendors from "./pages/Vendors";
import userAgreement from "./pages/userAgreement";
import privacyPolicy from "./pages/privacyPolicy";
import { PrivateRoutes } from "./components/PrivateRoutes";
import Adduser from "./pages/Adduser";
import Addcompany from "./pages/AddCompany";
import Addvessel from "./pages/AddVessel";
import Adddocument from "./pages/AddDocument";
import Addfilecat from "./pages/AddFileCategory";
import Users from "./pages/Users";
import Companies from "./pages/Companies";
import Vessels from "./pages/Vessels";
import Documents from "./pages/Documents";
import FileCategories from "./pages/FileCategories";
import ViewCompany from "./pages/ViewCompany";
import ViewVessel from "./pages/ViewVessel";
import ViewDocument from "./pages/ViewDocument";


import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
// import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import { useState, useEffect, useMemo } from "react";
import Adduser_Old from "./pages/Adduser_old";

// react-router components
// import {   useLocation } from "react-router-dom";

function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  return (

    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="add-order" element={<Addorder />} />
            <Route path="orders/:id" element={<ViewOrder />} />
            <Route path="sales/:id" element={<ViewSale />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="sales" element={<Sales />} />
            <Route path="privacy-policy" element={<privacyPolicy />} />
            <Route path="user-agreement" element={<userAgreement />} />
            <Route path="add-sale" element={<Addsale />} />
            <Route path="list-customer" element={<Customers />} />
            <Route path="add-user-old" element={<AdduserOld />} />
            <Route path="add-user-old/:id" element={<AdduserOld />} />
            <Route path="list-employee" element={<Employees />} />
            <Route path="list-category" element={<Categorylist />} />
            <Route path="category" element={<Addcat />} />
            <Route path="category/:id" element={<Addcat />} />
            <Route path="stock-alert" element={<Stockalert />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="savannah" element={<Savannah />} />
            <Route path="nashville" element={<Nashville />} />
            <Route path="atlanta" element={<Atlanta />} />
            <Route path="list-product" element={<Productlist />} />
            <Route path="product" element={<Addproduct />} />
            <Route path="product/:id" element={<Addproduct />} />
            <Route path="add-user" element={<Adduser />} />
            <Route path="add-company" element={<Addcompany />} />
            <Route path="add-vessel" element={<Addvessel />} />
            <Route path="add-document" element={<Adddocument />} />
            <Route path="add-file-category" element={<Addfilecat />} />
            <Route path="add-user/:id" element={<Adduser />} />
            <Route path="add-company/:id" element={<Addcompany />} />
            <Route path="add-vessel/:id" element={<Addvessel />} />
            <Route path="add-document/:id" element={<Adddocument />} />
            <Route path="add-file-category/:id" element={<Addfilecat />} />
            <Route path="users" element={<Users />} />
            <Route path="companies" element={<Companies />} />
            <Route path="vessels" element={<Vessels />} />
            <Route path="documents" element={<Documents />} />
            <Route path="file-categories" element={<FileCategories />} />
            <Route path="companies/:id" element={<ViewCompany />} />
            <Route path="vessels/:id" element={<ViewVessel />} />
            <Route path="documents/:id" element={<ViewDocument />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}


export default App;
