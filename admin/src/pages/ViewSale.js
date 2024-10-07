import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { getASale, getAUser } from "../features/auth/authSlice";

const ViewSale = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getSaleId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getASale(getSaleId));

  }, [getSaleId]);
  const goBack = () => {
    navigate(-1);
  };
  const saleState = useSelector((state) => state?.auth?.sale?.getASale);
  // const vendorState = useSelector((state) => state?.auth?.userName?.getaUser);
  
  useEffect(() => {
    dispatch(getAUser(saleState?.user));
  }, [saleState]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Sale</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-3 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Order Created At:</h6>
          <p className="mb-0">{saleState?.createdAt.slice(0,10)}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Invoice Id:</h6>
          <p className="mb-0">{saleState?.invoiceId}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Customer Job Name:</h6>
          <p className="mb-0">
          <p className="mb-0">{saleState?.job}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Representative:</h6>
          <p className="mb-0">
          <p className="mb-0">{saleState?.rep}</p>
          </p>
        </div>        
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Branch:</h6>
          <p className="mb-0">
          <p className="mb-0">{saleState?.rep}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Billing Address:</h6>
          <p className="mb-0">
          <p className="mb-0">{saleState?.billTo}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Shipping Address:</h6>
          <p className="mb-0">
          <p className="mb-0">{saleState?.shipTo}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Ship via:</h6>
          <p className="mb-0">{saleState?.shipVia}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Sold Items</h6>
        </div>
          {saleState?.soldItems.map((obj, index) => (
                <div key={index} className="d-flex align-items-center gap-3">
                  <h6 className="mb-0">{index+1}</h6>
                  <h6 className="mb-0 col-5">{obj.title}</h6>
                  <h6 className="mb-0 col-4">${obj.price} x {obj.quantity}</h6>
                  <h6 className="mb-0 col-3">= ${parseFloat(obj.quantity)*parseFloat(obj.price)}<br/></h6>
                </div>
            ))}    
            <div className="d-flex align-items-center gap-3">
              <h6 className="mb-0"></h6>
            </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Subtotal Price: ${saleState?.subtotalPrice}</h6>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Tax Price: ${saleState?.taxPrice}</h6>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Total Price: ${saleState?.totalPrice}</h6>
        </div>
      </div>
    </div>
  );
};

export default ViewSale;
