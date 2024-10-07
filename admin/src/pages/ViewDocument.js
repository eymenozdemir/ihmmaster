import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { getADocument, updateADocument, resetState } from "features/document/documentSlice";

const ViewDocument = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getDocumentId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getADocument(getDocumentId));

  }, [getDocumentId]);
  const goBack = () => {
    navigate(-1);
  };

  const documentState = useSelector((state) => state?.document?.getADocument);

  const setDocumentStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, document: e };
    dispatch(updateADocument(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getADocument(getDocumentId));
    }, 100);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Document</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-3 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Document Name:</h6>
          <p className="mb-0">{documentState?.title}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Document Type:</h6>
          <p className="mb-0">{documentState?.type}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Related Company:</h6>
          <p className="mb-0">
          <p className="mb-0">{documentState?.company?.title} ( {documentState?.company?.IMO} )</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Related Vessel:</h6>
          <p className="mb-0">
          <p className="mb-0">{documentState?.vessel?.title} ( {documentState?.vessel?.IMO} )</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Upload Date:</h6>
          <p className="mb-0">
          <p className="mb-0">{documentState?.uploadDate.slice(0,10)}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Update Status:</h6>
          <div>
            <select
              name=""
              defaultValue={documentState?.documentStatus}
              className="form-control form-select"
              id=""
              onChange={(e) => setDocumentStatus(e.target.value, getDocumentId)}
            >
              <option value="New Uploaded">New Uploaded</option>
              <option value="Reviewed by Admin">Reviewed by Admin</option>
              <option value="Reviewed by Vessel Staff">Reviewed by Vessel Staff</option>
              <option value="Updated">Updated</option>
            </select>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status Change Date:</h6>
          <p className="mb-0">
          <p className="mb-0">{documentState?.statusDate.slice(0,10)}</p>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">File:</h6>
          <p className="mb-0">
          <p className="mb-0">{documentState?.file}</p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewDocument;
