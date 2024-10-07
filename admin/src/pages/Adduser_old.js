import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import countryList from 'react-select-country-list';
import { createUsers, getAUser, updateAUser, resetState } from "../features/auth/authSlice";

let schema = yup.object().shape({
  role: yup.string().required("Role is required"),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email should be valid"),
  email2: yup.string().email("Email should be valid"),
  email3: yup.string().email("Email should be valid"),
  mobile: yup.string(),
  address: yup.string(),
  city: yup.string(),
  state: yup.string(),
  country: yup.string(),
  zip: yup.number(),
  password: yup.string(),
});

const Adduser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getUserId = location.pathname.split("/")[3];
  useEffect(() => {
    //dispatch(getBrands());
    //dispatch(getCategories());
  }, []);

  const newUser = useSelector((state) => state.auth);
  const { isSuccess, isError, isLoading, createdUser, updatedUser, userName } = newUser;
  /*
  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  */
  

  
  useEffect(() => {
    if (getUserId !== undefined) {
      dispatch(getAUser(getUserId));
    } else {
      dispatch(resetState());
    }
  }, [getUserId]);
  

  useEffect(() => {
    if (isSuccess && createdUser) {
      toast.success("User Added Successfullly!");
    }
    if (isSuccess && updatedUser) {
      toast.success("User Updated Successfullly!");
      dispatch(resetState());
      navigate("/admin/list-customer");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  //console.log("dfssdfsd", getUserId, userName, newUser);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      role: userName?.getaUser?.role || "",
      name: userName?.getaUser?.name || "",
      email: userName?.getaUser?.email || "",
      email2: userName?.getaUser?.email2 || "",
      email3: userName?.getaUser?.email3 || "",
      mobile: userName?.getaUser?.mobile || "",
      address: userName?.getaUser?.address || "",
      city: userName?.getaUser?.city || "",
      state: userName?.getaUser?.state || "",
      country: userName?.getaUser?.country || "",
      zip: userName?.getaUser?.zip || "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      //console.log("asdasda");
      if (getUserId !== undefined) {
        const data = { id: getUserId, userData: values};
        //console.log("submitted", data);
        dispatch(updateAUser(data));
        formik.resetForm();
        dispatch(resetState());
      } else {
        //console.log("dfdshbksdjfhksdjh");
        dispatch(createUsers(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add User</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <select
            name="role"
            onChange={formik.handleChange("role")}
            onBlur={formik.handleBlur("role")}
            value={formik.values.role}
            className="form-control py-3"
            id=""
          >
            <option value="" disabled>
            Select User Role
            </option>
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
            <option value="Vendor">Vendor</option>
            <option value="Customer">Customer</option>
          </select>
          <CustomInput
            type="text"
            label="Enter User Name"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <CustomInput
            type="text"
            label="Enter Prior Email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          { !getUserId && <CustomInput
            type="text"
            label="Enter Password"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />}
          <CustomInput
            type="text"
            label="Enter Additional Email"
            name="email2"
            onChng={formik.handleChange("email2")}
            onBlr={formik.handleBlur("email2")}
            val={formik.values.email2}
          />
          <CustomInput
            type="text"
            label="Enter Additional Email"
            name="email3"
            onChng={formik.handleChange("email3")}
            onBlr={formik.handleBlur("email3")}
            val={formik.values.email3}
          />

          <CustomInput
            type="text"
            label="Enter Mobile Number"
            name="mobile"
            onChng={formik.handleChange("mobile")}
            onBlr={formik.handleBlur("mobile")}
            val={formik.values.mobile}
          />

          
          <div className="row">
            <div className="col-9">
            <CustomInput
                type="text"
                label="Enter Street Address"
                name="address"
                onChng={formik.handleChange("address")}
                onBlr={formik.handleBlur("address")}
                val={formik.values.address}
              />
            </div>
            <div className="col-3">
              <CustomInput
                type="number"
                label="Enter ZIP Code"
                name="zip"
                onChng={formik.handleChange("zip")}
                onBlr={formik.handleBlur("zip")}
                val={formik.values.zip}
              />
            </div>
          </div>
          <div className="row d-flex align items-center">
            <div className="col-4">
            <CustomInput
                type="text"
                label="Enter City (Branch)"
                name="city"
                onChng={formik.handleChange("city")}
                onBlr={formik.handleBlur("city")}
                val={formik.values.city}
              />
            </div>
            <div className="col-4">
            <CustomInput
                type="text"
                label="Enter State"
                name="state"
                onChng={formik.handleChange("state")}
                onBlr={formik.handleBlur("state")}
                val={formik.values.state}
              />
            </div>
            <div className="col-4 d-flex align-items-end justify-content-center">
            <select
            name="country"
            onChange={formik.handleChange("country")}
            onBlur={formik.handleBlur("country")}
            value={formik.values.country}
            className="form-control py-3"
            id=""
          >
            <option value="" disabled>Select Country</option>
              {countryList().getData().map((i, j) => {
                  return (
                      <option key={j} value={i.label}>
                      {i.label}
                      </option>
                  );
                  })}
          </select>
          </div>
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getUserId !== undefined ? "Edit" : "Add"} User
          </button>
          {formik.touched.role && formik.errors.role ? <div className="error" style={{color: 'red'}}>{formik.touched.role && formik.errors.role} !</div> : ""}
          {formik.touched.name && formik.errors.name ? <div className="error" style={{color: 'red'}}>{formik.touched.name && formik.errors.name} !</div> : ""}
        </form>
      </div>
    </div>
  );
};

export default Adduser;
