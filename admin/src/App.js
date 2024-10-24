import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
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

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

// Images
import AdminDashboard from "pages/AdminDashboard";
import CompanyDashboard from "pages/CompanyDashboard";
import VesselDashboard from "pages/VesselDashboard";

// react-router components
// import {   useLocation } from "react-router-dom";

function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
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
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="company-dashboard" element={<CompanyDashboard />} />
            <Route path="vessel-dashboard" element={<VesselDashboard />} />
            <Route path="privacy-policy" element={<privacyPolicy />} />
            <Route path="user-agreement" element={<userAgreement />} />
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
