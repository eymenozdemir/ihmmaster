import { RiDashboard2Line } from "react-icons/ri";

import { FaClipboardList } from "react-icons/fa";
import { MdAssignmentAdd, MdPersonAddAlt1 } from "react-icons/md";



const routesForVessel = (documentState) => {

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
      key: "add-document",
      route: "add-document",
      icon: <MdAssignmentAdd className="fs-4" />,
      name: "Add Document",
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
  ];
}

export default routesForVessel;

