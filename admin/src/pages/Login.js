import logo from "assets/images/IHMMaster_logo.png";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createUsers, login, logout } from "../features/auth/authSlice";



import { useState } from "react";

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
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

  let firstValues = {
    role: "Admin",
    name: "Eymen Ozdemir",
    email: "eymenozdemir55@gmail.com",
    mobile: "+905395665900",
    company: "6714fed6305ddf9e05d78b75",
    vessel: "6714fed6305ddf9e05d78b75",
    address: "aydinevler, maltepe",
    city: "Istanbul",
    state: "Istanbul",
    country: "Turkey",
    zip: "34854",
    password: "qwerty123",
  }

  useEffect(() => {
    dispatch(logout());
  }, []);

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
            
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={() => { formik.handleSubmit() }}>
                sign in
              </MDButton>
            </MDBox>
            
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
