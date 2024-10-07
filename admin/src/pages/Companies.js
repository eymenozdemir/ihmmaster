import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";
import CustomTable from "components/CustomTable";
import { getCompanies, deleteACompany } from "features/company/companySlice";
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
    Header: "IMO",
    accessor: "IMO",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Number",
    accessor: "number",
  },
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Companies = () => {
  const [open, setOpen] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCompanyId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanies());
  }, []);

  const companyState = useSelector((state) => state.company.companies);

  let tempIdx = 0;
  const data1 = [];
  for (let i = 0; i < companyState?.length; i++) {
    tempIdx = tempIdx + 1;
    data1.push({
    key: tempIdx,
    id: companyState[i]._id,
    title: companyState[i].title,
    IMO: companyState[i].IMO,
    email: companyState[i].email,
    number: companyState[i].number,
    address: companyState[i].address + ", " + companyState[i].city + ", " + companyState[i].country,
    action: (
        <>
        <Link
            to={`/admin/add-company/${companyState[i]._id}`}
            className="ms-3 fs-4 text-info"
        >
            <BiEdit />
        </Link>
        <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(companyState[i]._id)}
        >
            <AiFillDelete />
        </button>
        </>
    ),
    });
    
  }
  const deleteCompany = (e) => {
    dispatch(deleteACompany(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCompanies());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Companies</h3>
      <div>
        <CustomTable columns={columns} data={data1} />
        {/* <Table columns={columns} dataSource={data1} /> */}
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCompany(companyId);
        }}
        title="Are you sure you want to delete this Company?"
      />
    </div>
  );
};

export default Companies;
