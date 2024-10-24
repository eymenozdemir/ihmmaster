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

import { useEffect } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp, } from "react-icons/md";
import logo from "assets/images/IHMMaster_logo.png";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";
import { logout } from "features/auth/authSlice";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const collapseName = location.pathname.split("/")[2] ? location.pathname.split("/")[2] : "";
  // const collapseName = location.pathname.replace("/", "");

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes().map(({ type, name, icon, title, noCollapse, key, href, route, collapse }) => {
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      );
    }
    if (type === "dropdown") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          {/* <SidenavCollapse name={name} icon={icon} active={key === collapseName} /> */}
          <div class="accordion bg-transparent border-0 p-0" id="accordionExample" >
            <div class="accordion-item bg-transparent border-0  p-0">
              <button class=" bg-transparent w-100  border-0 p-0" style={{ outline: "0!important", boxShadow: "none", background: "blue" }} type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne" + key} aria-expanded="true" aria-controls={"collapseOne" + key}>
                <div className="d-flex  align-items-center justify-content-between">
                  <SidenavCollapse name={name} icon={icon} active={key === collapseName} trailing={key === collapseName ? <MdOutlineKeyboardArrowUp size={20} /> : <MdOutlineKeyboardArrowDown size={20} />} />


                </div>
              </button>

              <div id={"collapseOne" + key} class="accordion-collapse  border-0 collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body py-0 border-0">
                  {collapse.map((element) => {
                    return <NavLink key={element.key} to={element.route}>
                      <SidenavCollapse name={element.name} icon={element.icon} active={element.key === collapseName} />
                    </NavLink>


                  })}
                </div>
              </div>
            </div>
          </div>




        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        <MDTypography
          key={key}
          color={textColor}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </MDTypography>
      );
    } else if (type === "divider") {
      returnValue = (
        <Divider
          key={key}
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) ||
            (darkMode && !transparentSidenav && whiteSidenav)
          }
        />
      );
    }

    return returnValue;
  });

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} alignSelf="center" textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/admin" display="flex" justifyContent="between" alignItems="center">
          {brand && <MDBox component="img" src={brand} alt="Brand" width="2rem" />}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <img src={logo} style={{ margin: "-10px" }} alt="Logo" width="200px" />
            {/* <MDTypography component="h6" variant="button" fontSize="20px" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography> */}
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>

      <MDBox p={2} mt="auto">
        {/* Harmoni Technology */}
        <div>
          <MDButton
            //onClick={logout}
            component="a"
            href="/"
            rel="noreferrer"
            variant="gradient"
            color={sidenavColor}
            fullWidth
          >
            Logout
          </MDButton>
        </div>
        <div>
          <MDBox width="100%" bottom={0} pt={1}>

            <MDBox
              width="100%"
              display="flex"
              flexDirection={{ xs: "column", lg: "row" }}
              justifyContent="space-between"
              alignItems="center"
              px={1.5}
            >
              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
                color="white"
                fontSize={13}
              >
                &copy; {new Date().getFullYear()},
                <Link href="https://harmonitechnology.com/" target="_blank">
                  <MDTypography variant="button" fontSize="13px" fontWeight="medium" color="white">
                    &nbsp;Harmoni Technology&nbsp;
                  </MDTypography>
                </Link>
              </MDBox>
              <MDBox
                component="ul"
                sx={({ breakpoints }) => ({
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  listStyle: "none",
                  mt: 3,
                  mb: 0,
                  p: 0,

                  [breakpoints.up("lg")]: {
                    mt: 0,
                  },
                })}
              >

              </MDBox>
            </MDBox>

          </MDBox>
        </div>
      </MDBox>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
