/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
// import Dashboard from "./pages/Dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import { RiCouponLine, RiDashboard2Line } from "react-icons/ri";
import { PrivateRoutes } from "./components/PrivateRoutes";

import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { FaClipboardList, FaShieldAlt, FaBox, FaBoxes, FaAlgolia } from "react-icons/fa";
import { MdAssignmentAdd, MdPersonAddAlt1 } from "react-icons/md";

// @mui icons
import Icon from "@mui/material/Icon";


const routes = (documentState) => {

  return [
    {
      type: "collapse",
      key: "",
      route: "",
      icon: <RiDashboard2Line className="fs-4" />,
      name: "Dashboard",
    },
    {
      type: "collapse",
      key: "",
      route: "",
      icon: <RiDashboard2Line className="fs-4" />,
      name: "Admin Dashboard",
    },
    {
      type: "collapse",
      key: "",
      route: "",
      icon: <RiDashboard2Line className="fs-4" />,
      name: "Company Dashboard",
    },
    {
      type: "collapse",
      key: "",
      route: "",
      icon: <RiDashboard2Line className="fs-4" />,
      name: "Vessel Dashboard",
    },
    {
      type: "collapse",
      key: "add-user",
      route: "add-user",
      icon: <AiOutlineShoppingCart className="fs-4" />,
      name: "Add User",
    },
    {
      type: "collapse",
      key: "add-company",
      route: "add-company",
      icon: <AiOutlineShoppingCart className="fs-4" />,
      name: "Add Company",
    },
    {
      type: "collapse",
      key: "add-vessel",
      route: "add-vessel",
      icon: <AiOutlineShoppingCart className="fs-4" />,
      name: "Add Vessel",
    },
    {
      type: "collapse",
      key: "add-document",
      route: "add-document",
      icon: <AiOutlineShoppingCart className="fs-4" />,
      name: "Add Document",
    },
    {
      type: "collapse",
      key: "add-file-category",
      route: "add-file-category",
      icon: <AiOutlineShoppingCart className="fs-4" />,
      name: "Add File Category",
    },
    {
      type: "collapse",
      key: "users",
      route: "users",
      icon: <AiOutlineShoppingCart className="fs-4" />,
      name: "User List",
    },
    {
      type: "collapse",
      key: "companies",
      route: "companies",
      icon: <AiOutlineShoppingCart className="fs-4" />,
      name: "Company List",
    },
    {
      type: "collapse",
      key: "vessels",
      route: "vessels",
      icon: <AiOutlineShoppingCart className="fs-4" />,
      name: "Vessel List",
    },
    {
      type: "collapse",
      key: "documents",
      route: "documents",
      icon: <AiOutlineShoppingCart className="fs-4" />,
      name: "Document List",
    },
    {
      type: "collapse",
      key: "file-categories",
      route: "file-categories",
      icon: <AiOutlineShoppingCart className="fs-4" />,
      name: "File Categories",
    },
    {
      type: "collapse",
      key: "orders",
      route: "orders",
      icon: <FaClipboardList className="fs-4" />,
      name: "Status of P.Orders",
    },
    {
      type: "collapse",
      key: "add-order",
      route: "add-order",
      icon: <AiOutlineShoppingCart className="fs-4" />,
      name: "Purchase Order",
    },
    {
      type: "collapse",
      key: "vendors",
      route: "vendors",
      icon: <AiOutlineUser className="fs-4" />,
      name: "Vendors",
    },
    {
      type: "collapse",
      key: "sales",
      route: "sales",
      icon: <FaClipboardList className="fs-4" />,
      name: "Sales",
    },
    {
      type: "collapse",
      key: "list-customer",
      route: "list-customer",
      icon: <AiOutlineUser className="fs-4" />,
      name: "Customers",
    },
    {
      type: "dropdown",
      key: "admin-actions",
      icon: <FaShieldAlt className="fs-4" />,
      name: "Admin Actions",
      collapse: [
        {
          type: "collapse",
          key: "list-product",
          route: "list-product",
          icon: <FaClipboardList className="fs-4" />,
          name: "Product List",
        },
        {
          type: "collapse",
          key: "product",
          route: "product",
          icon: <MdAssignmentAdd className="fs-4" />,
          name: "Add Product",
        },
        {
          type: "collapse",
          key: "list-employee",
          route: "list-employee",
          icon: <AiOutlineUser className="fs-4" />,
          name: "Employee List",
        },
        {
          type: "collapse",
          key: "add-user-old",
          route: "add-user-old",
          icon: <MdPersonAddAlt1 className="fs-4" />,
          name: "Add User ",
        },
        
      ],
    },
    {
      type: "dropdown",
      key: "inventory",
      icon: <FaBox className="fs-4" />,
      name: "Inventory",
      collapse: [
        {
          type: "collapse",
          key: "savannah",
          route: "savannah",
          icon: <FaBox className="fs-4" />,
          name: "Savannah",
        },
        {
          type: "collapse",
          key: "nashville",
          route: "nashville",
          icon: <FaBox className="fs-4" />,
          name: "Nashville",
        },
        {
          type: "collapse",
          key: "atlanta",
          route: "atlanta",
          icon: <FaBox className="fs-4" />,
          name: "Atlanta",
        },
      ],
    },
    {
      type: "collapse",
      key: "stock-alert",
      route: "stock-alert",
      icon: <FaAlgolia className="fs-4" />,
      // name: <div className="justify-content-between align-items-center d-flex"> Stock Alert  <span className="bg-danger badge rounded-circle p-2 mb-2" style={{ fontSize: "14px" }}>{2}</span> </div>,
      name: <div className="justify-content-between align-items-center d-flex"> Stock Alert
        {documentState.length > 0 && <div className="bg-danger p-2 d-flex justify-content-center align-items-center" style={{
          fontSize: "14px", borderRadius: "25%",
          width: "28px",
          height: "28px"
        }}>{documentState.length}</div>} </div>,
    },
  ];
}

// const routes = [
//   {
//     type: "collapse",
//     name: "Dashboard",
//     key: "dashboard",
//     icon: <RiDashboard2Line className="fs-4" />,
//     route: "/admin",
//     component: <PrivateRoutes><Dashboard /></PrivateRoutes>
//   },
//   {
//     type: "collapse",
//     name: "Dashboard2",
//     key: "dashboard2",
//     icon: <Icon fontSize="small">dashboard</Icon>,
//     route: "/dashboard",
//     component: <Dashboard />,
//   },
//   {
//     type: "collapse",
//     name: "Tables",
//     key: "tables",
//     icon: <Icon fontSize="small">table_view</Icon>,
//     route: "/tables",
//     component: <Tables />,
//   },
//   {
//     type: "collapse",
//     name: "Billing",
//     key: "billing",
//     icon: <Icon fontSize="small">receipt_long</Icon>,
//     route: "/billing",
//     component: <Billing />,
//   },
//   {
//     type: "collapse",
//     name: "RTL",
//     key: "rtl",
//     icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
//     route: "/rtl",
//     component: <RTL />,
//   },
//   {
//     type: "collapse",
//     name: "Notifications",
//     key: "notifications",
//     icon: <Icon fontSize="small">notifications</Icon>,
//     route: "/notifications",
//     component: <Notifications />,
//   },
//   {
//     type: "collapse",
//     name: "Profile",
//     key: "profile",
//     icon: <Icon fontSize="small">person</Icon>,
//     route: "/profile",
//     component: <Profile />,
//   },
//   {
//     type: "collapse",
//     name: "Sign In",
//     key: "sign-in",
//     icon: <Icon fontSize="small">login</Icon>,
//     route: "/authentication/sign-in",
//     component: <SignIn />,
//   },
//   {
//     type: "collapse",
//     name: "Sign Up",
//     key: "sign-up",
//     icon: <Icon fontSize="small">assignment</Icon>,
//     route: "/authentication/sign-up",
//     component: <SignUp />,
//   },
// ];

export default routes;
