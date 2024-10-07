import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { getAUser, getAnOrder } from "../features/auth/authSlice";

const ViewOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getOrderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnOrder(getOrderId));

  }, [getOrderId]);
  const goBack = () => {
    navigate(-1);
  };
  const orderState = useSelector((state) => state?.auth?.order?.getAnOrder);
  const vendorState = useSelector((state) => state?.auth?.userName?.getaUser);
  
  useEffect(() => {
    dispatch(getAUser(orderState?.user));
  }, [orderState]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Order</h3>
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
          <p className="mb-0">{orderState?.paidAt.slice(0,10)}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Container Code:</h6>
          <p className="mb-0">{orderState?.containerCode}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Vendor Name:</h6>
          <p className="mb-0">
          <p className="mb-0">{vendorState?.name}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Vendor Email:</h6>
          <p className="mb-0">
          <p className="mb-0">{vendorState?.email}</p>
          </p>
        </div>        
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Vendor Mobile Number:</h6>
          <p className="mb-0">
          <p className="mb-0">{vendorState?.mobile}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">From:</h6>
          <p className="mb-0">
          <p className="mb-0">{orderState?.location}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Destination:</h6>
          <p className="mb-0">
          <p className="mb-0">{orderState?.destination}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{orderState?.orderStatus} - {orderState?.statusDate.slice(0,10)} </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-4">Description:</h6>
          <p className="d-flex align-items-center mb-1 description" dangerouslySetInnerHTML={{ __html: orderState?.description}}></p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Ordered Items</h6>
        </div>
          {orderState?.orderedItems.map((obj, index) => (
                <div key={index} className="d-flex align-items-center gap-3">
                  <h6 className="mb-0">{index+1}</h6>
                  <h6 className="mb-0 col-5">{obj.title}</h6>
                  <h6 className="mb-0 col-4">${obj.price} x {obj.quantity}</h6>
                  <h6 className="mb-0 col-3">= ${parseFloat(obj.quantity)*parseFloat(obj.price)}</h6>
                </div>
            ))}    
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Total Price: ${orderState?.totalPrice}</h6>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
