import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";
import CustomTable from "components/CustomTable";
import { getAllUsers, deleteAUser } from "features/auth/authSlice";
import { getUsersByCompany } from "features/auth/authSlice";
import { getUsersByVessel } from "features/auth/authSlice";
const columns = [
  {
    Header: "SNo",
    accessor: "key",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Mobile",
    accessor: "mobile",
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
    Header: "Action",
    accessor: "action",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setUserId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  
  const roleState = useSelector((state) => state?.auth?.user);

  const dispatch = useDispatch();
  useEffect(() => {
  if(roleState.role=="Admin")
  {
    dispatch(getAllUsers());
  } else if(roleState.role=="CompanyPersonal")
  {
    dispatch(getUsersByCompany(roleState?.company));
  } else if(roleState.role=="VesselStaff")
  {
    dispatch(getUsersByVessel(roleState?.vessel));
  }
  }, []);

  const userstate = useSelector((state) => state?.auth?.users);

  let tempIdx = 0;
  const data1 = [];
  for (let i = 0; i < userstate?.length; i++) {
    tempIdx = tempIdx + 1;
    data1.push({
    key: tempIdx,
    id: userstate[i]._id,
    role: userstate[i].role,
    name: userstate[i].name,
    email: userstate[i].email,
    mobile: userstate[i].mobile,
    company: userstate[i].company.title,
    vessel: userstate[i].vessel.title,
    action: (
        <>
        <Link
            to={`/admin/add-user/${userstate[i]._id}`}
            className="ms-3 fs-4 text-info"
        >
            <BiEdit />
        </Link>
        <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(userstate[i]._id)}
        >
            <AiFillDelete />
        </button>
        </>
    ),
    });
    
  }
  const deleteUser = (e) => {
    dispatch(deleteAUser(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllUsers());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Users</h3>
      <div>
        <CustomTable columns={columns} data={data1} />
        {/* <Table columns={columns} dataSource={data1} /> */}
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteUser(userId);
        }}
        title="Are you sure you want to delete this User?"
      />
    </div>
  );
};

export default Users;
