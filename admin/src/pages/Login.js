import logo from "assets/images/IHMMaster-2.png";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";



import { useState } from "react";

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/maritime_bg.jpg";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       localStorage.setItem("fromLogin", true);
//       dispatch(login(values));
//     },
//   });
//   const authState = useSelector((state) => state);

//   const { user, isError, isSuccess, isLoading, message } = authState.auth;

//   useEffect(() => {
//     if (isSuccess) {
//       navigate("admin");
//     } else {
//       navigate("");
//     }
//   }, [user, isError, isSuccess, isLoading]);
//   return (
//     <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
//         <h3 className="text-center title">Login</h3>
//         <p className="text-center">Login to your account to continue.</p>
//         <div className="error text-center">
//           {message.message === "Rejected" ? "You are not an Admin" : ""}
//         </div>
//         <form action="" onSubmit={formik.handleSubmit}>
//           <CustomInput
//             type="text"
//             label="Email Address"
//             id="email"
//             name="email"
//             onChng={formik.handleChange("email")}
//             onBlr={formik.handleBlur("email")}
//             val={formik.values.email}
//           />
//           <div className="error mt-2">
//             {formik.touched.email && formik.errors.email}
//           </div>
//           <CustomInput
//             type="password"
//             label="Password"
//             id="pass"
//             name="password"
//             onChng={formik.handleChange("password")}
//             onBlr={formik.handleBlur("password")}
//             val={formik.values.password}
//           />
//           <div className="error mt-2">
//             {formik.touched.password && formik.errors.password}
//           </div>
//           <div className="mb-3">
//           </div>
//           <button
//             className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
//             style={{ background: "#ffd333" }}
//             type="submit"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



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


function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      localStorage.setItem("fromLogin", true);
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <img src={logo} style={{ margin: "0px" }} alt="Logo" width="300px" />
          {/*<MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>*/}
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
          <div className="error text-center mt-1">
                  {message.message === "Rejected" ? "You are not an Admin" : ""}
                </div>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth value={formik.values.email} onChange={formik.handleChange("email")}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth value={formik.values.password} onChange={formik.handleChange("password")} />
            </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            {/* <MDBox mb={2}>
              <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                
                <form action="" onSubmit={formik.handleSubmit}>
                  <CustomInput
                    type="text"
                    label="Email Address"
                    id="email"
                    name="email"
                    onChng={formik.handleChange("email")}
                    onBlr={formik.handleBlur("email")}
                    val={formik.values.email}
                  />
                  <div className="error mt-2">
                    {formik.touched.email && formik.errors.email}
                  </div>
                  <CustomInput
                    type="password"
                    label="Password"
                    id="pass"
                    name="password"
                    onChng={formik.handleChange("password")}
                    onBlr={formik.handleBlur("password")}
                    val={formik.values.password}
                  />
                  <div className="error mt-2">
                    {formik.touched.password && formik.errors.password}
                  </div>
                  <div className="mb-3">
                  </div>
                
                </form> 

              </div>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={() => { formik.handleSubmit() }}>
                sign in
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
