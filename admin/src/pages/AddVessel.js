import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import countryList from 'react-select-country-list';
import { getCompanies, getCompaniesByCompany } from "../features/company/companySlice";
import {
  createVessel,
  getAVessel,
  resetState,
  updateAVessel,
} from "../features/vessel/vesselSlice";

let schema = yup.object().shape({
  title: yup.string().required("Vessel Name is Required"),
  IMO: yup.string().required("IMO Number is Required"),
  company: yup.string().required("Company is Required"),
  type: yup.string(),
  year: yup.string(),
  flag: yup.string(),
  tonnage: yup.string(),
});

const AddVessel = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getVesselId = location.pathname.split("/")[3];

  const roleState = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    if(roleState.role=="Admin")
    {
      dispatch(getCompanies());
    } else if(roleState.role=="Company Personal")
    {
      dispatch(getCompaniesByCompany(roleState?.company));
    }
  }, []);

  const newVessel = useSelector((state) => state.vessel);
  const companyState = useSelector((state) => state.company.companies);
  const {
    isSuccess,
    isError,
    isLoading,
    createdVessel,
    VesselName,
    updatedVessel,
  } = newVessel;

  useEffect(() => {
    if (getVesselId !== undefined) {
      dispatch(getAVessel(getVesselId));
    } else {
      dispatch(resetState());
    }
  }, [getVesselId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdVessel) {
      toast.success("Vessel Added Successfullly!");
      dispatch(resetState());
      navigate("/admin/vessels");
    }
    if (isSuccess && updatedVessel) {
      toast.success("Vessel Updated Successfullly!");
      dispatch(resetState());
      navigate("/admin/vessels");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }

  }, [isSuccess, isError, isLoading, createdVessel, navigate, updatedVessel]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: VesselName?.title || "",
      IMO: VesselName?.IMO || "",
      company: VesselName?.company || "",
      type: VesselName?.type || "",
      year: VesselName?.year || "",
      flag: VesselName?.flag || "",
      tonnage: VesselName?.tonnage || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getVesselId !== undefined) {
        const data = { id: getVesselId, vesselData: values };
        dispatch(updateAVessel(data));
        dispatch(resetState());
      } else {
        dispatch(createVessel(values));
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
        {getVesselId !== undefined ? "Edit" : "Add"} Vessel
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Vessel Title"
            id="title"
          />
          <CustomInput
            type="text"
            name="IMO"
            onChng={formik.handleChange("IMO")}
            onBlr={formik.handleBlur("IMO")}
            val={formik.values.IMO}
            label="Enter Vessel IMO Number"
            id="IMO"
          />
          <select
            name="company"
            onChange={formik.handleChange("company")}
            onBlur={formik.handleBlur("company")}
            value={formik.values.company}
            className="form-control py-3 mt-3"
            id=""
          >
            <option value="">Select Company</option>
            {companyState.map((i, j) => {
              console.log(i,j);
              return (
                <option key={j} value={i._id}>
                  {i?.title}
                </option>
              );
            })}
          </select>
          <CustomInput
            type="text"
            label="Enter Type of Ship"
            name="type"
            onChng={formik.handleChange("type")}
            onBlr={formik.handleBlur("type")}
            val={formik.values.type}
          />
          <CustomInput
                type="text"
                label="Enter Year of Build"
                name="year"
                onChng={formik.handleChange("year")}
                onBlr={formik.handleBlur("year")}
                val={formik.values.year}
              />
            <select
            name="flag"
            onChange={formik.handleChange("flag")}
            onBlur={formik.handleBlur("flag")}
            value={formik.values.flag}
            className="form-control py-3 mt-3"
            id=""
          >
            <option value="" disabled>Select Current Flag</option>
              {countryList().getData().map((i, j) => {
                  return (
                      <option key={j} value={i.label}>
                      {i.label}
                      </option>
                  );
                  })}
          </select>
            <CustomInput
                type="text"
                label="Enter Gross Tonnage"
                name="tonnage"
                onChng={formik.handleChange("tonnage")}
                onBlr={formik.handleBlur("tonnage")}
                val={formik.values.tonnage}
              />
          
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getVesselId !== undefined ? "Edit" : "Add"} Vessel
          </button>
          {formik.touched.title && formik.errors.title ? <div className="error" style={{color: 'red'}}>{formik.touched.title && formik.errors.title} !</div> : ""}
          {formik.touched.IMO && formik.errors.IMO ? <div className="error" style={{color: 'red'}}>{formik.touched.IMO && formik.errors.IMO} !</div> : ""}
          {formik.touched.company && formik.errors.company ? <div className="error" style={{color: 'red'}}>{formik.touched.company && formik.errors.company} !</div> : ""}
        </form>
      </div>
    </div>
  );
};

export default AddVessel;