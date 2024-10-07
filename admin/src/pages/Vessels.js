import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";
import CustomTable from "components/CustomTable";
import { getVessels, deleteAVessel } from "features/vessel/vesselSlice";
import { getVesselsByCompany } from "features/vessel/vesselSlice";
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
    Header: "Company",
    accessor: "company",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Flag",
    accessor: "flag",
  },
  {
    Header: "Tonnage",
    accessor: "tonnage",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Vessels = () => {
  const [open, setOpen] = useState(false);
  const [vesselId, setVesselId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setVesselId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const roleState = useSelector((state) => state?.auth?.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if(roleState.role=="Admin")
  {
    dispatch(getVessels());
  } else if(roleState.role=="CompanyPersonal")
  {
    dispatch(getVesselsByCompany(roleState?.company));
  }
  }, []);

  const vesselState = useSelector((state) => state?.vessel?.vessels);

  let tempIdx = 0;
  const data1 = [];
  for (let i = 0; i < vesselState?.length; i++) {
    tempIdx = tempIdx + 1;
    data1.push({
    key: tempIdx,
    id: vesselState[i]._id,
    title: vesselState[i].title,
    IMO: vesselState[i].IMO,
    company: vesselState[i].company.title,
    type: vesselState[i].type,
    flag: vesselState[i].flag,
    tonnage: vesselState[i].tonnage,
    action: (
        <>
        <Link
            to={`/admin/add-vessel/${vesselState[i]._id}`}
            className="ms-3 fs-4 text-info"
        >
            <BiEdit />
        </Link>
        <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(vesselState[i]._id)}
        >
            <AiFillDelete />
        </button>
        </>
    ),
    });
    
  }
  const deleteVessel = (e) => {
    dispatch(deleteAVessel(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getVessels());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Vessels</h3>
      <div>
        <CustomTable columns={columns} data={data1} />
        {/* <Table columns={columns} dataSource={data1} /> */}
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteVessel(vesselId);
        }}
        title="Are you sure you want to delete this Vessel?"
      />
    </div>
  );
};

export default Vessels;
