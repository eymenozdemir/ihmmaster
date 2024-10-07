import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { getAVessel } from "features/vessel/vesselSlice";

const ViewVessel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getVesselId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAVessel(getVesselId));

  }, [getVesselId]);
  const goBack = () => {
    navigate(-1);
  };

  const vesselState = useSelector((state) => state?.vessel?.getAVessel);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Vessel</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-3 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{vesselState?.title}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">IMO Code:</h6>
          <p className="mb-0">{vesselState?.IMO}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Related Company:</h6>
          <p className="mb-0">
          <p className="mb-0">{vesselState?.company?.title} ( {vesselState?.company?.IMO} )</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Ship Type:</h6>
          <p className="mb-0">
          <p className="mb-0">{vesselState?.type}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Build Year:</h6>
          <p className="mb-0">
          <p className="mb-0">{vesselState?.year}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Flag:</h6>
          <p className="mb-0">
          <p className="mb-0">{vesselState?.flag}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Gross Tonnage:</h6>
          <p className="mb-0">{vesselState?.tonnage} </p>
        </div>
      </div>
    </div>
  );
};

export default ViewVessel;
