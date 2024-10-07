import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { getACompany } from "features/company/companySlice";

const ViewCompany = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getCompanyId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getACompany(getCompanyId));

  }, [getCompanyId]);
  const goBack = () => {
    navigate(-1);
  };

  const companyState = useSelector((state) => state?.company?.getACompany);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Company</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-3 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Company Name:</h6>
          <p className="mb-0">{companyState?.title}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Company IMO Code:</h6>
          <p className="mb-0">{companyState?.IMO}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Company Email:</h6>
          <p className="mb-0">
          <p className="mb-0">{companyState?.email}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Company Mobile Number:</h6>
          <p className="mb-0">
          <p className="mb-0">{companyState?.number}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Company Address:</h6>
          <p className="mb-0">
          <p className="mb-0">{companyState?.address}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Company City:</h6>
          <p className="mb-0">
          <p className="mb-0">{companyState?.city}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Company Country:</h6>
          <p className="mb-0">{companyState?.country} </p>
        </div>
      </div>
    </div>
  );
};

export default ViewCompany;
