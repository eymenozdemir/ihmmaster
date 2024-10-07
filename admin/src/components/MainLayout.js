import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { RiCouponLine, RiDashboard2Line } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FaClipboardList, FaShieldAlt, FaBox, FaBoxes, FaAlgolia } from "react-icons/fa";
import { MdAssignmentAdd, MdPersonAddAlt1 } from "react-icons/md";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import Sidenav from "examples/Sidenav";
import routes from "routes";
const { Header, Sider, Content } = Layout;


/*
<div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

          </div>
*/

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(getProducts());
  }, []);
  //const stockState = useSelector((state) => state?.product?.products?.filter((p) => p?.stockTreshold >= (p?.stockAtlanta + p?.toAtlanta) || p?.stockTreshold >= (p?.stockNashville + p?.toNashville) || p?.stockTreshold >= (p?.stockSavannah + p?.toSavannah)));
  const documentState = useSelector((state) => state?.product?.products);
  const location = useLocation();

  const currentTab = location.pathname.split("/")[2] ? location.pathname.split("/")[2] : "";
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout  /* onContextMenu={(e) => e.p?reventDefault()} */>
      <Sider trigger={null} style={{ background: "transparent" }} collapsible collapsed={collapsed}>
           <Sidenav
              // color={sidenavColor}
              // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Stone Nature"
              routes={() => routes(documentState)}
      
            />
      </Sider>

      {/* <Sidenav
              // color={sidenavColor}
              // brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Stone Nature"
              routes={routes}
      
            /> */}
   
      <Layout className="site-layout ps-3">
        {/* <Header
          className="d-flex justify-content-between ps-5 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
         {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )} 
        </Header> */}
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
