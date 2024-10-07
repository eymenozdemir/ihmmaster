import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import Dropzone from "react-dropzone";
import { delImg, uploadImg, resetImg, loadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState, getAProduct, updateAProduct } from "../features/product/productSlice";


let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
  brand: yup.string().required("Brand is Required"),
  model: yup.string(),
  submodel: yup.string(),
  condition: yup.string().required("Condition is Required"),
  age: yup.number(),
  quantity: yup.number().required("Quantity is Required"),
  currency: yup.string(),
  price: yup.number(),
  setupPrice: yup.number(),
  servicePrice: yup.number(),
  status: yup.string(),
  location: yup.string().required("Location is Required"),
  tags: yup.string(),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProdId = location.pathname.split("/")[3];
  const [images, setImages] = useState([]);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    //dispatch(getAProduct(getProdId));
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);

  const imgState = useSelector((state) => state.upload.images);
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

  
  useEffect(() => {
    //console.log("productphotos", productName?.images);
    dispatch(loadImg(productName?.images));
  }, [productName]);

  useEffect(() => {
    formik.values.images = imgState;
  }, [imgState]);

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
      title: productName?.title || "",
      description: productName?.description || "",
      category: productName?.category || "",
      brand: productName?.brand || "",
      model: productName?.model || "",
      submodel: productName?.submodel || "",
      condition: productName?.condition || "",
      age: productName?.age || "",
      quantity: productName?.quantity || "",
      currency: productName?.currency || "",
      price: productName?.price || "",
      setupPrice: productName?.setupPrice || "",
      servicePrice: productName?.servicePrice || "",
      tags: "",
      status: productName?.status || "",
      location: productName?.location || "",
      images: productName?.images || [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      
      if (getProdId !== undefined) {
        const data = { id: getProdId, prodData: values, prodImg: imgState};
        //console.log("submitted", data);
        dispatch(updateAProduct(data));
        formik.resetForm();
        dispatch(resetImg());
        dispatch(resetState());
      } else { //FIXME img burdan batlıyo values değil data gibi özelleştirip at
        //const data2 = {prodData: values, prodImg: imgState};
        dispatch(createProducts(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          dispatch(resetImg());
        }, 1000);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Item</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Item Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="">
            <ReactQuill
              placeholder='Headline'
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">{productName?.category ? productName?.category : "Select Category"}</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">{productName?.brand ? productName?.brand : "Select Brand"}</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <CustomInput
            type="text"
            label="Enter Model"
            name="model"
            onChng={formik.handleChange("model")}
            onBlr={formik.handleBlur("model")}
            val={formik.values.model}
          />
          <CustomInput
            type="text"
            label="Enter Submodel"
            name="submodel"
            onChng={formik.handleChange("submodel")}
            onBlr={formik.handleBlur("submodel")}
            val={formik.values.submodel}
          />
          <CustomInput
            type="text"
            label="Enter Item Location"
            name="location"
            onChng={formik.handleChange("location")}
            onBlr={formik.handleBlur("location")}
            val={formik.values.location}
          />
          <select
            name="condition"
            onChange={formik.handleChange("condition")}
            onBlur={formik.handleBlur("condition")}
            value={formik.values.condition}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
            {productName?.condition ? productName?.condition : "Select Item Condition"}
            </option>
            <option value="New">New</option>
            <option value="New - Open Box">New - Open Box</option>
            <option value="Working/Good Condition">Working/Good Condition</option>
            <option value="Refurbished">Refurbished</option>
            <option value="Consumables and Spare Parts">Consumables and Spare Parts</option>
            <option value="Not Working/For Parts Only">Not Working/For Parts Only</option>
            <option value="Not Tested">Not Tested</option>
            <option value="Other">Other</option>
          </select>
          <CustomInput
            type="number"
            label="Enter Manufacturing Year"
            name="age"
            onChng={formik.handleChange("age")}
            onBlr={formik.handleBlur("age")}
            val={formik.values.age}
          />
          <CustomInput
            type="number"
            label="Enter Quantity"
            name="quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="row">
            <p>*You can leave the currency and price sections as blank (or "0") to publish it as "OFFER".</p>
            <div className="col-4">
              <select
                name="currency"
                onChange={formik.handleChange("currency")}
                onBlur={formik.handleBlur("currency")}
                value={formik.values.currency}
                className="form-control py-3 my-3"
                id=""
              >
                <option value="" disabled>
                Select Currency
                </option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="TRY">TRY</option>
              </select>
            </div>
            <div className="col-8">
              <CustomInput
                type="number"
                label="Enter Requested Price"
                name="price"
                onChng={formik.handleChange("price")}
                onBlr={formik.handleBlur("price")}
                val={formik.values.price}
              />
            </div>
          </div>
          <CustomInput
            type="number"
            label="Enter Setup Price"
            name="setupPrice"
            onChng={formik.handleChange("setupPrice")}
            onBlr={formik.handleBlur("setupPrice")}
            val={formik.values.setupPrice}
          />
          <CustomInput
            type="number"
            label="Enter Service Price"
            name="servicePrice"
            onChng={formik.handleChange("servicePrice")}
            onBlr={formik.handleBlur("servicePrice")}
            val={formik.values.servicePrice}
          />
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click <span style={{background:"#232f3e", color:"white"}}> &nbsp; here&nbsp; </span> &nbsp;to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg({id:i.public_id, images:imgState}))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          {
            getProdId !== undefined && <>
            <select
            name="status"
            onChange={formik.handleChange("status")}
            onBlur={formik.handleBlur("status")}
            value={formik.values.status}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">
            {productName?.status ? productName?.status : "Select Status"}
            </option>
            <option value="offered">Offered</option>
            <option value="listed">Listed</option>
          </select>
            </>
          }
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getProdId !== undefined ? "Edit" : "Add"} Product
          </button>
          {formik.touched.title && formik.errors.title ? <div className="error" style={{color: 'red'}}>{formik.touched.title && formik.errors.title} !</div> : ""}
          {formik.touched.description && formik.errors.description ? <div className="error" style={{color: 'red'}}>{formik.touched.description && formik.errors.description} !</div> : ""}
          {formik.touched.category && formik.errors.category ? <div className="error" style={{color: 'red'}}>{formik.touched.category && formik.errors.category} !</div> : ""}
          {formik.touched.brand && formik.errors.brand ? <div className="error" style={{color: 'red'}}>{formik.touched.brand && formik.errors.brand} !</div> : ""}
          {formik.touched.location && formik.errors.location ? <div className="error" style={{color: 'red'}}>{formik.touched.location && formik.errors.location} !</div> : ""}
          {formik.touched.condition && formik.errors.condition ? <div className="error" style={{color: 'red'}}>{formik.touched.condition && formik.errors.condition} !</div> : ""}
          {formik.touched.quantity && formik.errors.quantity ? <div className="error" style={{color: 'red'}}>{formik.touched.quantity && formik.errors.quantity} !</div> : ""}
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
