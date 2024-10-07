import React, { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineDownload } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";
import CustomTable from "components/CustomTable";
import { getDocuments, deleteADocument } from "features/document/documentSlice";
import { getDocumentsByCompany, getDocumentsByVessel } from "features/document/documentSlice";
const columns = [
  {
    Header: "SNo",
    accessor: "key",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Company",
    accessor: "company",
  },
  {
    Header: "Vessel",
    accessor: "vessel",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Edit Date",
    accessor: "statusDate",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Documents = () => {
  const [open, setOpen] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setDocumentId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const roleState = useSelector((state) => state?.auth?.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if(roleState.role=="Admin")
  {
    dispatch(getDocuments());
  } else if(roleState.role=="CompanyPersonal")
  {
    dispatch(getDocumentsByCompany(roleState?.company));
  } else if(roleState.role=="VesselStaff")
  {
    dispatch(getDocumentsByVessel(roleState?.vessel));
  }
  }, []);

  const documentState = useSelector((state) => state?.document?.documents);

  let tempIdx = 0;
  const data1 = [];
  for (let i = 0; i < documentState?.length; i++) {
    tempIdx = tempIdx + 1;
    data1.push({
    key: tempIdx,
    id: documentState[i]?._id,
    title: documentState[i]?.title,
    type: documentState[i]?.type.title,
    company: documentState[i]?.company.title,
    vessel: documentState[i]?.vessel.title,
    status: documentState[i]?.status,
    statusDate: documentState[i]?.statusDate,
    action: (
        <>
        <Link
            to={`/admin/add-document/${documentState[i]._id}`}
            className="ms-3 fs-4 text-info"
        >
            <BiEdit />
        </Link>
        <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(documentState[i]._id)}
        >
            <AiFillDelete />
        </button>
        <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(documentState[i]._id)}
        >
            <AiOutlineDownload />
        </button>
        </>
    ),
    });
    
  }
  const deleteDocument = (e) => {
    dispatch(deleteADocument(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getDocuments());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Documents</h3>
      <div>
        <CustomTable columns={columns} data={data1} />
        {/* <Table columns={columns} dataSource={data1} /> */}
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteDocument(documentId);
        }}
        title="Are you sure you want to delete this Document?"
      />
    </div>
  );
};

export default Documents;
