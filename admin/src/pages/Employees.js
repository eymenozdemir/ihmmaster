import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteAUser } from "../features/customers/customerSlice";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";
import CustomTable from "components/CustomTable";
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
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "Branch",
    accessor: "city",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Employees = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setUserId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const customerstate = useSelector((state) => state.customer.customers);

  let tempIdx = 0;
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role === "Admin" || customerstate[i].role === "Employee") {
      tempIdx = tempIdx + 1;
      data1.push({
        key: tempIdx,
        id: customerstate[i]._id,
        role: customerstate[i].role,
        name: customerstate[i].name,
        email: customerstate[i].email + " " + customerstate[i].email2 + " " + customerstate[i].email3,
        mobile: customerstate[i].mobile,
        address: customerstate[i].address,
        city: customerstate[i].city,
        action: (
          <>
            <Link
              to={`/admin/add-user-old/${customerstate[i]._id}`}
              className="ms-3 fs-4 text-info"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-4 text-danger bg-transparent border-0"
              onClick={() => showModal(customerstate[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    };
  }
  const deleteUser = (e) => {
    dispatch(deleteAUser(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getUsers());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Employees</h3>
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
        title="Are you sure you want to delete this Customer?"
      />
    </div>
  );
};

export default Employees;
