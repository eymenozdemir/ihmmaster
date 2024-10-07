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
    Header: "City",
    accessor: "city",
  },
  {
    Header: "State",
    accessor: "state",
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
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
    if(customerstate[i].role === "Customer"){  
      tempIdx = tempIdx + 1;
    data1.push({
        key: tempIdx,
        id: customerstate[i]._id,
        name: customerstate[i].name,
        email: customerstate[i].email + " " + customerstate[i].email2 + " " + customerstate[i].email3,
        mobile: customerstate[i].mobile,
        address: customerstate[i].address,
        city: customerstate[i].city,
        state: customerstate[i].state,
        country: customerstate[i].country,
        action: (
          <>
            <Link
              to={`/admin/add-user-old/${customerstate[i]._id}`}
              className="me-3 fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
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
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <CustomTable columns={columns} data={data1}/>
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

export default Customers;
