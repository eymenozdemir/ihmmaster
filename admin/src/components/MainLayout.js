import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import { useNavigate } from "react-router-dom";
import Sidenav from "examples/Sidenav";
import routes from "routes";
import { getDocuments } from "features/document/documentSlice";
import { getDocumentsByCompany } from "features/document/documentSlice";
import { getDocumentsByVessel } from "features/document/documentSlice";
import routesForCompany from "routesForCompany";
import routesForVessel from "routesForVessel";
const { Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const roleState = useSelector((state) => state?.auth?.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if(roleState.role=="Admin")
  {
    dispatch(getDocuments());
  } else if(roleState.role=="Company Personal")
  {
    dispatch(getDocumentsByCompany(roleState?.company));
  } else if(roleState.role=="Vessel Staff")
  {
    dispatch(getDocumentsByVessel(roleState?.vessel));
  }
  }, []);

  //const stockState = useSelector((state) => state?.product?.products?.filter((p) => p?.stockTreshold >= (p?.stockAtlanta + p?.toAtlanta) || p?.stockTreshold >= (p?.stockNashville + p?.toNashville) || p?.stockTreshold >= (p?.stockSavannah + p?.toSavannah)));
  const documentState = useSelector((state) => state?.document?.documents?.filter((d) => d?.documentStatus !== "Updated"));
  const location = useLocation();

  const currentTab = location.pathname.split("/")[2] ? location.pathname.split("/")[2] : "";
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} style={{ background: "transparent" }} collapsible collapsed={collapsed}>
           {roleState.role=="Admin" && <Sidenav
              // color={sidenavColor}
              // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="IHM Master"
              routes={() => routes(documentState)} 
      
            />}
            {roleState.role=="Company Personal" && <Sidenav
              // color={sidenavColor}
              // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="IHM Master"
              routes={() => routesForCompany(documentState)} 
      
            />}
            {roleState.role=="Vessel Staff" && <Sidenav
              // color={sidenavColor}
              // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="IHM Master"
              routes={() => routesForVessel(documentState)} 
      
            />}
      </Sider>

      {/* <Sidenav
              // color={sidenavColor}
              // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Stone Nature"
              routes={routes}
      
            /> */}
   
      <Layout className="site-layout ps-3">
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
