import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteAUser } from "../features/customers/customerSlice";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";

import DataTable from "examples/Tables/DataTable";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";

const Vendors = () => {
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
    if(customerstate[i].role === "Vendor"){  
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
      <h3 className="mb-4 title">Vendors</h3>
      <div>
        {/* <Table columns={columns} dataSource={data1} /> */}
        {VendorTable({vendorData: data1})}
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


const VendorTable = ({ vendorData }) => {

  const measureColumns = [
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

  return (
    <div className="">
      <Grid item xs={12}>
        <Card>
          <MDBox pt={0}>
            <DataTable
              table={{ columns: measureColumns, rows: vendorData }}
              isSorted={true}
              entriesPerPage={true}
              showTotalEntries={true}
              noEndBorder
              canSearch
            />
          </MDBox>
        </Card>
      </Grid>
    </div>
  );
};

export default Vendors;
