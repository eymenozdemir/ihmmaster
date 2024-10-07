import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import countryList from 'react-select-country-list';
import { getCompanies } from "../features/company/companySlice";
import { getVessels } from "features/vessel/vesselSlice";
import { getFileCategories } from "features/fileCategory/fileCategorySlice";
import {
  createDocument,
  getADocument,
  resetState,
  updateADocument,
} from "../features/document/documentSlice";

let schema = yup.object().shape({
  title: yup.string().required("Document Title is Required"),
  type: yup.string().required("Document Type is Required"),
  company: yup.string().required("Company is Required"),
  vessel: yup.string().required("Vessel is Required"),
  file: yup.string().required("File is Required"),
  documentStatus: yup.string(),
});

const AddDocument = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getDocumentId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getCompanies());
    dispatch(getVessels());
    dispatch(getFileCategories());
  }, []);

  const newDocument = useSelector((state) => state.document);
  const vesselState = useSelector((state) => state.vessel.vessels);
  const companyState = useSelector((state) => state.company.companies);
  const typeState = useSelector((state) => state.fileCategory.fileCategories);
  const {
    isSuccess,
    isError,
    isLoading,
    createdDocument,
    documentName,
    updatedDocument,
  } = newDocument;

  useEffect(() => {
    if (getDocumentId !== undefined) {
      dispatch(getADocument(getDocumentId));
    } else {
      dispatch(resetState());
    }
  }, [getDocumentId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdDocument) {
      toast.success("Document Added Successfullly!");
    }
    if (isSuccess && updatedDocument) {
      toast.success("Document Updated Successfullly!");
      navigate("/admin/list-document");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }

  }, [isSuccess, isError, isLoading, createdDocument, navigate, updatedDocument]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: documentName?.getADocument?.title || "",
      type: documentName?.getADocument?.type || "",
      company: documentName?.getADocument?.company || "",
      vessel: documentName?.getADocument?.vessel || "",
      file: documentName?.getADocument?.file || "",
      documentStatus: documentName?.getADocument?.documentStatus || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getDocumentId !== undefined) {
        const data = { id: getDocumentId, documentData: values };
        dispatch(updateADocument(data));
        dispatch(resetState());
      } else {
        dispatch(createDocument(values));
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
        {getDocumentId !== undefined ? "Edit" : "Add"} Document
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Document Title"
            id="title"
          />
          <select
            name="type"
            onChange={formik.handleChange("type")}
            onBlur={formik.handleBlur("type")}
            value={formik.values.type}
            className="form-control py-3 mt-3"
            id=""
          >
            <option value="">Select File Category</option>
            {typeState.map((i, j) => {
              return (
                <option key={j} value={i._id}>
                  {i.title}
                </option>
              );
            })}
          </select>
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
              return (
                <option key={j} value={i._id}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <select
            name="vessel"
            onChange={formik.handleChange("vessel")}
            onBlur={formik.handleBlur("vessel")}
            value={formik.values.vessel}
            className="form-control py-3 mt-3"
            id=""
          >
            <option value="">Select Vessel</option>
            {vesselState.map((i, j) => {
              return (
                <option key={j} value={i._id}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <CustomInput
            type="text"
            label="Upload a File"
            name="file"
            onChng={formik.handleChange("file")}
            onBlr={formik.handleBlur("file")}
            val={formik.values.file}
          />
          <select
            name="documentStatus"
            onChange={formik.handleChange("documentStatus")}
            onBlur={formik.handleBlur("documentStatus")}
            value={formik.values.documentStatus}
            className="form-control py-3 mt-3"
            id=""
          >
            <option value="" disabled>
            Select Current Document Status
            </option>
            <option value="New Uploaded">New Uploaded</option>
            <option value="Reviewed by Admin">Reviewed by Admin</option>
            <option value="Reviewed by Vessel Staff">Reviewed by Vessel Staff</option>
            <option value="Updated">Updated</option>
          </select>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getDocumentId !== undefined ? "Edit" : "Add"} Document
          </button>
          {formik.touched.title && formik.errors.title ? <div className="error" style={{color: 'red'}}>{formik.touched.title && formik.errors.title} !</div> : ""}
          {formik.touched.type && formik.errors.type ? <div className="error" style={{color: 'red'}}>{formik.touched.type && formik.errors.type} !</div> : ""}
          {formik.touched.company && formik.errors.company ? <div className="error" style={{color: 'red'}}>{formik.touched.company && formik.errors.company} !</div> : ""}
          {formik.touched.vessel && formik.errors.vessel ? <div className="error" style={{color: 'red'}}>{formik.touched.vessel && formik.errors.vessel} !</div> : ""}
        </form>
      </div>
    </div>
  );
};

export default AddDocument;