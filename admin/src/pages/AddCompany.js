import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import countryList from 'react-select-country-list';
import {
  createCompany,
  getACompany,
  resetState,
  updateACompany,
} from "../features/company/companySlice";

let schema = yup.object().shape({
  title: yup.string().required("Company Name is Required"),
  IMO: yup.string().required("IMO Number is Required"),
  email: yup.string().email("Email should be valid"),
  number: yup.string(),
  address: yup.string(),
  city: yup.string(),
  country: yup.string(),
});

const AddCompany = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCompanyId = location.pathname.split("/")[3];
  const newCompany = useSelector((state) => state.company);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCompany,
    companyName,
    updatedCompany,
  } = newCompany;
  useEffect(() => {
    if (getCompanyId !== undefined) {
      dispatch(getACompany(getCompanyId));
    } else {
      dispatch(resetState());
    }
  }, [getCompanyId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdCompany) {
      toast.success("Company Added Successfullly!");
      dispatch(resetState());
      navigate("/admin/companies");
    }
    if (isSuccess && updatedCompany) {
      toast.success("Company Updated Successfullly!");
      dispatch(resetState());
      navigate("/admin/companies");
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCompany, navigate, updatedCompany]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: companyName?.title || "",
      IMO: companyName?.IMO || "",
      email: companyName?.email || "",
      number: companyName?.number || "",
      address: companyName?.address || "",
      city: companyName?.city || "",
      country: companyName?.country || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCompanyId !== undefined) {
        const data = { id: getCompanyId, companyData: values };
        dispatch(updateACompany(data));
        dispatch(resetState());
      } else {
        dispatch(createCompany(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getCompanyId !== undefined ? "Edit" : "Add"} Company
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Company Title"
            id="title"
          />
          <CustomInput
            type="text"
            name="IMO"
            onChng={formik.handleChange("IMO")}
            onBlr={formik.handleBlur("IMO")}
            val={formik.values.IMO}
            label="Enter Company IMO Number"
            id="IMO"
          />
          <CustomInput
          type="text"
          label="Enter Email"
          name="email"
          onChng={formik.handleChange("email")}
          onBlr={formik.handleBlur("email")}
          val={formik.values.email}
        />
          <CustomInput
            type="text"
            label="Enter Mobile Number"
            name="number"
            onChng={formik.handleChange("number")}
            onBlr={formik.handleBlur("number")}
            val={formik.values.number}
          />
          <CustomInput
                type="text"
                label="Enter Street Address"
                name="address"
                onChng={formik.handleChange("address")}
                onBlr={formik.handleBlur("address")}
                val={formik.values.address}
              />
          <div className="row">
            <div className="col-6">
            <CustomInput
                type="text"
                label="Enter City"
                name="city"
                onChng={formik.handleChange("city")}
                onBlr={formik.handleBlur("city")}
                val={formik.values.city}
              />
            </div>
            <div className="col-6">
            <select
            name="country"
            onChange={formik.handleChange("country")}
            onBlur={formik.handleBlur("country")}
            value={formik.values.country}
            className="form-control py-3 mt-3"
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
            {getCompanyId !== undefined ? "Edit" : "Add"} Company
          </button>
          {formik.touched.title && formik.errors.title ? <div className="error" style={{color: 'red'}}>{formik.touched.title && formik.errors.title} !</div> : ""}
          {formik.touched.IMO && formik.errors.IMO ? <div className="error" style={{color: 'red'}}>{formik.touched.IMO && formik.errors.IMO} !</div> : ""}
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
