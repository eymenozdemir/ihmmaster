import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createFileCategory,
  getAFileCategory,
  resetState,
  updateAFileCategory,
} from "../features/fileCategory/fileCategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("File Category Title is Required"),
});

const AddFileCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getFileCategoryId = location.pathname.split("/")[3];
  const newFileCategory = useSelector((state) => state.fileCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdFileCategory,
    fileCategoryName,
    updatedFileCategory,
  } = newFileCategory;
  useEffect(() => {
    if (getFileCategoryId !== undefined) {
      dispatch(getAFileCategory(getFileCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getFileCategoryId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdFileCategory) {
      toast.success("File Category Added Successfullly!");
    }
    if (isSuccess && updatedFileCategory) {
      toast.success("FileCategory Updated Successfullly!");
      navigate("/admin/list-file-category");
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdFileCategory, navigate, updatedFileCategory]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: fileCategoryName?.getAFileCategory?.title || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getFileCategoryId !== undefined) {
        const data = { id: getFileCategoryId, fileCategoryData: values };
        dispatch(updateAFileCategory(data));
        dispatch(resetState());
      } else {
        console.log("butona basildi", values);
        dispatch(createFileCategory(values));
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
        {getFileCategoryId !== undefined ? "Edit" : "Add"} File Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter File Category Title"
            id="title"
          />
          
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getFileCategoryId !== undefined ? "Edit" : "Add"} File Category
          </button>
          {formik.touched.title && formik.errors.title ? <div className="error" style={{color: 'red'}}>{formik.touched.title && formik.errors.title} !</div> : ""}
        </form>
      </div>
    </div>
  );
};

export default AddFileCategory;
