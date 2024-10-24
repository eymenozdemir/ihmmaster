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

import { RiDashboard2Line } from "react-icons/ri";

import { FaClipboardList } from "react-icons/fa";
import { MdAssignmentAdd, MdPersonAddAlt1 } from "react-icons/md";



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
      key: "add-user",
      route: "add-user",
      icon: <MdPersonAddAlt1 className="fs-4" />,
      name: "Add User",
    },
    {
      type: "collapse",
      key: "add-company",
      route: "add-company",
      icon: <MdPersonAddAlt1 className="fs-4" />,
      name: "Add Company",
    },
    {
      type: "collapse",
      key: "add-vessel",
      route: "add-vessel",
      icon: <MdPersonAddAlt1 className="fs-4" />,
      name: "Add Vessel",
    },
    {
      type: "collapse",
      key: "add-document",
      route: "add-document",
      icon: <MdAssignmentAdd className="fs-4" />,
      name: "Add Document",
    },
    {
      type: "collapse",
      key: "add-file-category",
      route: "add-file-category",
      icon: <MdAssignmentAdd className="fs-4" />,
      name: "Add File Category",
    },
    {
      type: "collapse",
      key: "users",
      route: "users",
      icon: <FaClipboardList className="fs-4" />,
      name: "User List",
    },
    {
      type: "collapse",
      key: "companies",
      route: "companies",
      icon: <FaClipboardList className="fs-4" />,
      name: "Company List",
    },
    {
      type: "collapse",
      key: "vessels",
      route: "vessels",
      icon: <FaClipboardList className="fs-4" />,
      name: "Vessel List",
    },
    {
      type: "collapse",
      key: "documents",
      route: "documents",
      icon: <FaClipboardList className="fs-4" />,
      // name: <div className="justify-content-between align-items-center d-flex"> Stock Alert  <span className="bg-danger badge rounded-circle p-2 mb-2" style={{ fontSize: "14px" }}>{2}</span> </div>,
      name: <div className="justify-content-between align-items-center d-flex"> Document List
        {documentState?.length > 0 && <div className="bg-danger p-2 d-flex justify-content-center align-items-center" style={{
          fontSize: "14px", borderRadius: "25%",
          width: "28px",
          height: "28px"
        }}>{documentState?.length}</div>} </div>,
    },
    {
      type: "collapse",
      key: "file-categories",
      route: "file-categories",
      icon: <FaClipboardList className="fs-4" />,
      name: "File Categories",
    },
  ];
}

export default routes;
