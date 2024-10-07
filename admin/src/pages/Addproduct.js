import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createProducts, resetState, getAProduct, updateAProduct } from "../features/product/productSlice";


let schema = yup.object().shape({
  SKU: yup.string(),
  title: yup.string().required("Title is Required"),
  vendor: yup.string(),
  price: yup.number(),
  category: yup.string(),
  subCategory: yup.string(),
  size: yup.string(),
  caseQuantity: yup.number(),
  caseUnit: yup.string(),
  casePallet: yup.number(),
  stockNashville: yup.number(),
  stockSavannah: yup.number(),
  stockAtlanta: yup.number(),
  toNashville: yup.number(),
  toSavannah: yup.number(),
  toAtlanta: yup.number(),
  stockTr: yup.number(),
  stockTreshold: yup.number(),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProdId = location.pathname.split("/")[3];
  const [images, setImages] = useState([]);
  useEffect(() => {
    //dispatch(getBrands());
    //dispatch(getCategories());
    //dispatch(getAProduct(getProdId));
  }, []);
  
  const newProduct = useSelector((state) => state.product);
  //const productState = useSelector(state => state?.product?.productName);
  const { isSuccess, isError, isLoading, createdProduct, updatedProduct, productName } = newProduct;
  //console.log("getProdId",newProduct,productName);

  useEffect(() => {
    if (getProdId !== undefined) {
      dispatch(getAProduct(getProdId));
    } else {
      dispatch(resetState());
    }
  }, [getProdId]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product Updated Successfullly!");
      dispatch(resetState());
      navigate("/admin/list-product");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);


/*
  let img = [];
  productName?.images.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
*/
  /*
  useEffect(() => {
    formik.values.images = img;
  }, [img]);
  */

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      SKU: productName?.SKU?.trim() || "",
      title: productName?.title?.trim() || "",
      category: productName?.category?.trim() || "",
      subCategory: productName?.subCategory?.trim() || "",
      size: productName?.size?.trim() || "",
      vendor: productName?.vendor?.trim() || "",
      price: productName?.price || 0,
      caseQuantity: productName?.caseQuantity || 0,
      caseUnit: productName?.caseUnit || "N/A",
      casePallet: productName?.casePallet || 0,
      stockNashville: productName?.stockNashville || 0,
      stockSavannah: productName?.stockSavannah || 0,
      stockAtlanta: productName?.stockAtlanta || 0,
      toNashville: productName?.toNashville || 0,
      toSavannah: productName?.toSavannah || 0,
      toAtlanta: productName?.toAtlanta || 0,
      stockTr: productName?.stockTr || 0,
      stockTreshold: productName?.stockTreshold || 1,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      
      if (getProdId !== undefined) {
        const data = { id: getProdId, prodData: values};
        //console.log("submitted", data);
        dispatch(updateAProduct(data));
        formik.resetForm();
        dispatch(resetState());
      } else {
        //const data2 = {prodData: values, prodImg: imgState};
        //console.log("submitted", values);
        dispatch(createProducts(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter SKU Item Number"
            name="SKU"
            onChng={formik.handleChange("SKU")}
            onBlr={formik.handleBlur("SKU")}
            val={formik.values.SKU}
          />
          <CustomInput
            type="text"
            label="Enter Item Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <CustomInput
            type="text"
            label="Enter Category"
            name="category"
            onChng={formik.handleChange("category")}
            onBlr={formik.handleBlur("category")}
            val={formik.values.category}
          />
          <CustomInput
            type="text"
            label="Enter Subcategory"
            name="subCategory"
            onChng={formik.handleChange("subCategory")}
            onBlr={formik.handleBlur("subCategory")}
            val={formik.values.subCategory}
          />
          <CustomInput
            type="text"
            label="Enter Size"
            name="size"
            onChng={formik.handleChange("size")}
            onBlr={formik.handleBlur("size")}
            val={formik.values.size}
          />
          <CustomInput
            type="text"
            label="Enter Vendor if Specific"
            name="vendor"
            onChng={formik.handleChange("vendor")}
            onBlr={formik.handleBlur("vendor")}
            val={formik.values.vendor}
          />
          <CustomInput
            type="number"
            label="Enter Cost Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="row">
            <div className="col-6">
            <CustomInput
              type="number"
              label="Enter Quantity"
              name="caseQuantity"
              onChng={formik.handleChange("caseQuantity")}
              onBlr={formik.handleBlur("caseQuantity")}
              val={formik.values.caseQuantity}
            />
            </div>
            <div className="col-6">
            <select
              name="caseUnit"
              onChange={formik.handleChange("caseUnit")}
              onBlur={formik.handleBlur("caseUnit")}
              value={formik.values.caseUnit}
              className="form-control py-3 mt-3"
              id=""
            >
              <option value="-" disabled>
              {productName?.caseUnit ? productName?.caseUnit : "Select Case Unit"}
              </option>
              <option value="sq/ft">sq/ft</option>
              <option value="sq/lnft">sq/lnft</option>
              <option value="N/A">N/A</option>
            </select>
            </div>
          </div>
          <CustomInput
            type="number"
            label="Enter Case per Pallet"
            name="casePallet"
            onChng={formik.handleChange("casePallet")}
            onBlr={formik.handleBlur("casePallet")}
            val={formik.values.casePallet}
          />
          <div className="row">
            <div className="col-4">
            <CustomInput
              type="number"
              label="Enter Stock at Savannah"
              name="stockSavannah"
              onChng={formik.handleChange("stockSavannah")}
              onBlr={formik.handleBlur("stockSavannah")}
              val={formik.values.stockSavannah}
            />
            </div>
            <div className="col-4">
            <CustomInput
              type="number"
              label="Enter Stock at Nashville"
              name="stockNashville"
              onChng={formik.handleChange("stockNashville")}
              onBlr={formik.handleBlur("stockNashville")}
              val={formik.values.stockNashville}
            />
            </div>
            <div className="col-4">
            <CustomInput
              type="number"
              label="Enter Stock at Atlanta"
              name="stockAtlanta"
              onChng={formik.handleChange("stockAtlanta")}
              onBlr={formik.handleBlur("stockAtlanta")}
              val={formik.values.stockAtlanta}
            />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
            <CustomInput
              type="number"
              label="Enter Number of Items going to Savannah"
              name="toSavannah"
              onChng={formik.handleChange("toSavannah")}
              onBlr={formik.handleBlur("toSavannah")}
              val={formik.values.toSavannah}
            />
            </div>
            <div className="col-4">
            <CustomInput
              type="number"
              label="Enter Number of Items going to Nashville"
              name="toNashville"
              onChng={formik.handleChange("toNashville")}
              onBlr={formik.handleBlur("toNashville")}
              val={formik.values.toNashville}
            />
            </div>
            <div className="col-4">
            <CustomInput
              type="number"
              label="Enter Number of Items going to Atlanta"
              name="toAtlanta"
              onChng={formik.handleChange("toAtlanta")}
              onBlr={formik.handleBlur("toAtlanta")}
              val={formik.values.toAtlanta}
            />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
            <CustomInput
              type="number"
              label="Enter Stock at Turkiye"
              name="stockTr"
              onChng={formik.handleChange("stockTr")}
              onBlr={formik.handleBlur("stockTr")}
              val={formik.values.stockTr}
            />
            </div>
            <div className="col-6">
            <CustomInput
              type="number"
              label="Enter Stock Treshold"
              name="stockTreshold"
              onChng={formik.handleChange("stockTreshold")}
              onBlr={formik.handleBlur("stockTreshold")}
              val={formik.values.stockTreshold}
            />
            </div>
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getProdId !== undefined ? "Edit" : "Add"} Product
          </button>
          {formik.touched.title && formik.errors.title ? <div className="error" style={{color: 'red'}}>{formik.touched.title && formik.errors.title} !</div> : ""}
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
