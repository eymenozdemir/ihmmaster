import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  
  const roleState = useSelector((state) => state?.auth?.user);

  const navigate = useNavigate();
  useEffect(() => {
    if(roleState.role=="Admin")
  {
    navigate("/admin/admin-dashboard");
  } else if(roleState.role=="Company Personal")
  {
    navigate("/admin/company-dashboard");
  } else if(roleState.role=="Vessel Staff")
  {
    navigate("/admin/vessel-dashboard");
  }
  }, []);


  return (
    <>
      <div>
        <h3 className="mb-4 title">Directing to Dashboard...</h3>
      </div>

    </>
  );
};


export default Dashboard;
