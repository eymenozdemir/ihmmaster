import { React, useEffect, useState, useRef } from "react";
import CustomInput from "../components/CustomInput";
import { AiFillDelete } from "react-icons/ai";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { resetState, getAProduct, getProducts } from "../features/product/productSlice";
import { createAnOrder } from "../features/auth/authSlice";


let schema = yup.object().shape({
  code: yup.string().required("Container Code is Required"),
  description: yup.string(),
  location: yup.string().required("Location is Required"),
  destination: yup.string().required("Destination is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProdId = location.pathname.split("/")[3];
  const [formValues, setFormValues] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const inputRef = useRef();
  const selectRef = useRef();

  useEffect(() => {
    dispatch(getProducts());
    //dispatch(getAProduct(getProdId));
  }, []);

  const productState = useSelector((state) => state.product.products);
  //console.log(productState);
  const productMap = new Map();
  productState.forEach((obj) => {
    productMap[obj._id] = obj
  });
  //console.log(productMap,productMap["657c4a2e8c4effde9284d09b"]);

  const handleAddField = (e) => {
    e.preventDefault();
    if (selectRef.current.value) {
      const values = [...formValues];
      setTotalPrice(0);
      values.push({
        quantity: inputRef.current.value || 1,
        title: productMap[selectRef.current.value].title || "",
        price: productMap[selectRef.current.value].price || 0,
        _id: productMap[selectRef.current.value]._id || "",
        SKU: productMap[selectRef.current.value].SKU || "-",
      });
      values.forEach((value) => { setTotalPrice(parseFloat(totalPrice) + (parseFloat(value.quantity) * parseFloat(value.price))) });
      setFormValues(values);
      setToggle(false);
    }
  };
  
  const addBtnClick = (e) => {
    e.preventDefault();
    setToggle(true);
  };

  const userState = useSelector((state) => state.auth.user);
  const newProduct = useSelector((state) => state.product);
  const brandState = useSelector((state) => state.brand.brands);
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
      code: productName?.code || "",
      description: productName?.description || "",
      location: productName?.location || "",
      destination: productName?.destination || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { data: values, prods: formValues, totalPrice: totalPrice, vendor: userState };
      dispatch(createAnOrder(data));
      formik.resetForm();
      setFormValues([]);

      setTimeout(() => {
        dispatch(resetState());
        window.location.reload();
      }, 1000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Create Order</h3>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Vendor:</h6>
          <p className="mb-0">{userState?.name}</p>
        </div>
      </div>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Container Code"
            name="code"
            onChng={formik.handleChange("code")}
            onBlr={formik.handleBlur("code")}
            val={formik.values.code}
          />
          <div className="">
            <ReactQuill
              placeholder='Description'
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <CustomInput
            type="text"
            label="Enter initial Location"
            name="location"
            onChng={formik.handleChange("location")}
            onBlr={formik.handleBlur("location")}
            val={formik.values.location}
          />
          <select
            name="destination"
            onChange={formik.handleChange("destination")}
            onBlur={formik.handleBlur("destination")}
            value={formik.values.destination}
            className="form-control py-3 mt-3"
            id=""
          >
            <option value="">
              Select Destination Branch
            </option>
            <option value="Nashville">Nashville</option>
            <option value="Savannah">Savannah</option>
            <option value="Atlanta">Atlanta</option>
          </select>
          <div className="mt-3 bg-white p-4 d-flex gap-3 flex-column rounded-3">
            {formValues.map((obj, index) => (
              <div key={index} className="d-flex align-items-center gap-3">
                <button
                  className="fs-3 text-danger bg-transparent border-0"
                  onClick={() => { setTotalPrice(parseFloat(totalPrice) - parseFloat(formValues[index].quantity) * parseFloat(formValues[index].price)); formValues.splice(index, 1); }}
                >
                  <AiFillDelete />
                </button>
                <h6 className="mb-0">{index + 1}</h6>
                <h6 className="mb-0 col-9">{obj.title}</h6>
                <h6 className="mb-0 col-1">${obj.price} x {obj.quantity}</h6>
                <h6 className="mb-0 col-2">= ${parseFloat(obj.quantity) * parseFloat(obj.price)}</h6>
              </div>
            ))}
            <div className="d-flex align-items-center gap-3">
              <h4 className="mb-0 col-12 text-end">= ${totalPrice}</h4>
            </div>
          </div>
          {!toggle ? (
            <div className="d-flex justify-content-center align-items-center">
              <button className="btn btn-success border-0 rounded-3 " onClick={addBtnClick}>
                Add New Item
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-center ">
              <select
                ref={selectRef}
                className="form-control py-3 mt-3 me-3"
              >
                <option value="">Select Item</option>
                {productState.map((i, j) => {
                  return (
                    <option key={j} value={i._id}>
                      {i?.title}
                    </option>
                  );
                })}
              </select>
              <div className="col-2 form-floating mt-3">
                <input className="form-control" type="number" placeholder="Enter Item Quantity" ref={inputRef} />
                <label htmlFor="Enter Item Quantity">Enter Item Quantity</label>
              </div>
              <button className="col-3 btn btn-success border-0 rounded-3 ms-3 mt-3" onClick={handleAddField}>
                Add
              </button>
            </div>
          )}
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Create Order
          </button>
          {formik.touched.code && formik.errors.code ? <div className="error" style={{ color: 'red' }}>{formik.touched.code && formik.errors.code} !</div> : ""}
          {formik.touched.location && formik.errors.location ? <div className="error" style={{ color: 'red' }}>{formik.touched.location && formik.errors.location} !</div> : ""}
        </form>
      </div>
    </div>

  );
};

export default Addproduct;
