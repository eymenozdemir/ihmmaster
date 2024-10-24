import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import { getCompanies, getCompaniesByCompany } from "../features/company/companySlice";
import { getVessels } from "features/vessel/vesselSlice";
import { getFileCategories } from "features/fileCategory/fileCategorySlice";
import {
  createDocument,
  getADocument,
  resetState,
  updateADocument,
} from "../features/document/documentSlice";
import { uploadFile } from "features/upload/uploadSlice";
import { getVesselsByCompany } from "features/vessel/vesselSlice";
import { getVesselsByVessel } from "features/vessel/vesselSlice";

let schema = yup.object().shape({
  title: yup.string().required("Document Title is Required"),
  type: yup.string().required("Document Type is Required"),
  company: yup.string().required("Company is Required"),
  vessel: yup.string().required("Vessel is Required"),
  fileName: yup.string(),
  fileId: yup.string(),
  fileLink: yup.string(),
  documentStatus: yup.string(),
});

const AddDocument = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getDocumentId = location.pathname.split("/")[3];

  const roleState = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    dispatch(getFileCategories());
    if(roleState.role=="Admin")
    {
      dispatch(getCompanies());
      dispatch(getVessels());
    } else if(roleState.role=="Company Personal")
    {
      dispatch(getCompaniesByCompany(roleState?.company));
      dispatch(getVesselsByCompany(roleState?.company));
    } else if(roleState.role=="Vessel Staff")
    {
      dispatch(getCompaniesByCompany(roleState?.company));
      dispatch(getVesselsByVessel(roleState?.vessel));
    }
  }, []);

  const newDocument = useSelector((state) => state.document);
  const vesselState = useSelector((state) => state.vessel.vessels);
  const companyState = useSelector((state) => state.company.companies);
  const typeState = useSelector((state) => state.fileCategory.fileCategories);
  const fileState = useSelector((state) => state.upload.files);
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
  }, [getDocumentId]);

  useEffect(() => {
    if (isSuccess && createdDocument) {
      toast.success("Document Added Successfullly!");
      dispatch(resetState());
      navigate("/admin/documents");
    }
    if (isSuccess && updatedDocument) {
      toast.success("Document Updated Successfullly!");
      dispatch(resetState());
      navigate("/admin/documents");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }

  }, [isSuccess, isError, isLoading, createdDocument, navigate, updatedDocument]);

  let fileName = "";
  let fileId = "";
  let fileLink = "";
  
  let values1 = {
    title: documentName?.title || "",
    type: documentName?.type || "",
    company: documentName?.company || "",
    vessel: documentName?.vessel || "",
    fileName: documentName?.fileName || "",
    fileId: documentName?.fileId || "",
    fileLink: documentName?.fileLink || "",
    documentStatus: documentName?.documentStatus || "",
  }

  let values2 = {
    title: documentName?.title || "",
    type: documentName?.type || "",
    company: documentName?.company || "",
    vessel: documentName?.vessel || "",
    fileName: fileState?.name,
    fileId: fileState?.id,
    fileLink: fileState?.webContentLink,
    documentStatus: documentName?.documentStatus || "",
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: fileState.length !== 0 ? values2 : values1,
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

  useEffect(() => {
    if(fileState.length!==0)
    {formik.values.fileName = fileState?.name;
    formik.values.fileId = fileState?.id;
    formik.values.fileLink = fileState?.webContentLink;}
  }, [fileState]);


  return (
    <div>
      <h3 className="mb-4 title">
        {getDocumentId !== undefined ? "Edit" : "Add"} Document
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
        <div>
          
          <div className="bg-white rounded-2 p-4 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadFile(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Click here to select your file.
                    </p>
                    {(getDocumentId == undefined && fileState.length == 0) && 
                      <h6 className="my-3 text-center">Select File to Upload</h6>
                    }
                    {(getDocumentId !== undefined || fileState.length !== 0) && 
                      <h6 className="my-3 text-center">{fileState.name ? fileState.name : documentName?.fileName} uploaded successfully.</h6>
                    }
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          
          </div>
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
                  {i?.title}
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
                  {i?.title}
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
                  {i?.title}
                </option>
              );
            })}
          </select>
          
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

          
          {(getDocumentId !== undefined && fileState.length == 0) && <Link className="ms-3 fs-4 text-info bg-transparent border-0" to={`${documentName?.fileLink}`} target="_blank">
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="button"
            >
              Download File
            </button>
          </Link>}

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