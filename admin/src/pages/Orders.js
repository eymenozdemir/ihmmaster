import React, { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";
import { deleteAnOrder, getOrders, updateAnOrder } from "../features/auth/authSlice";

import DataTable from "examples/Tables/DataTable";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Vendor",
    dataIndex: "vendor",
  },
  {
    title: "Code",
    dataIndex: "code",
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
  },
  {
    title: "Destination",
    dataIndex: "destination",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Status Date",
    dataIndex: "statusDate",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState({});
  const showModal = (e) => {
    setOpen(true);
    setOrderId(e);
  };

  const showModalComplete = (e, order) => {
    setOpenComplete(true);
    setOrderId(e);
    setSelectedOrder(order);
  };

  const showModalCancel = (e, order) => {
    setOpenCancel(true);
    setOrderId(e);
    setSelectedOrder(order);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const hideModalComplete = () => {
    setOpenComplete(false);
  };
  const hideModalCancel = () => {
    setOpenCancel(false);
  };

  const updatedOrderState = useSelector((state) => state?.auth?.updatedOrder);
  const orderState = useSelector((state) => state?.auth?.orders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [updatedOrderState]);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {

    data1.push({
      key: i + 1,
      vendor: orderState[i].user.name,
      code: orderState[i].containerCode,
      totalPrice: orderState[i].totalPrice,
      destination: orderState[i].destination,
      status: (
        orderState[i].orderStatus != "Products at Warehouse" && orderState[i].orderStatus != "Canceled" ?
          <>
            <select
              name=""
              defaultValue={orderState[i].orderStatus ? orderState[i].orderStatus : "Products Ordered"}
              className="form-control form-select"
              id=""
              onChange={(e) => {
                if (e.target.value == "Products at Warehouse") {
                  showModalComplete(orderState[i]._id, orderState[i]);
                }else if (e.target.value == "Canceled") {
                  showModalCancel(orderState[i]._id, orderState[i]);
                } else {
                  setOrderStatus(e.target.value, orderState[i]._id, orderState[i]);
                }
              }
              }
            >
              <option value="Products Ordered">Products Ordered</option>
              <option value="Products Getting Ready">Products Getting Ready</option>
              <option value="Products In Stock">Products In Stock</option>
              <option value="Products In Custom">Products In Custom</option>
              <option value="Products On Way (Sea)">Products On Way (Sea)</option>
              <option value="Products at Warehouse">Products at Warehouse</option>
              <option value="Canceled">Canceled</option>
            </select>
          </> : orderState[i].orderStatus

      ),
      statusDate: orderState[i].statusDate.slice(0, 10),
      action: (
        <div>
          <Link
            className="ms-3 fs-4 text-info"
            to={`/admin/orders/${orderState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(orderState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  const setOrderStatus = (newStatus, orderId, order) => {
    const data = { id: orderId, orderData: newStatus, order: order };
    dispatch(updateAnOrder(data));
  };
  const deleteOrder = (e) => {
    dispatch(deleteAnOrder(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getOrders());
    }, 100);
  };

  data1.sort((a, b) => {
    return b.statusDate.localeCompare(a.statusDate);
  });
  return (
    <div>
      <h3 className="mb-4 title">Orders Status</h3>
      <div>
        {/* <Table columns={columns} dataSource={data1} /> */}
        {OrderTable({ ordersData: data1 })}
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteOrder(orderId);
        }}
        title="Are you sure you want to delete this order?"
      />
      <CustomModal
        hideModal={hideModalComplete}
        open={openComplete}
        performAction={() => {
          // completeOrder(orderId);
          setOrderStatus("Products at Warehouse", selectedOrder._id, selectedOrder);
          setOpenComplete(false);
          setTimeout(() => {
            dispatch(getOrders());
          }, 100);
        }}
        title="Are you sure you want to complete this order?"
      />
      <CustomModal
        hideModal={hideModalCancel}
        open={openCancel}
        performAction={() => {
          // completeOrder(orderId);
          setOrderStatus("Canceled", selectedOrder._id, selectedOrder);
          setOpenCancel(false);
          setTimeout(() => {
            dispatch(getOrders());
          }, 100);
        }}
        title="Are you sure you want to cancel this order?"
      />
    </div>
  );
};



const OrderTable = ({ ordersData }) => {

  const measureColumns = [
    {
      Header: "SNo",
      accessor: "key",
      width: "5%",
    },
    {
      Header: "Vendor",
      accessor: "vendor",
    },
    {
      Header: "Code",
      accessor: "code",
    },
    {
      Header: "Total Price",
      accessor: "totalPrice",
    },
    {
      Header: "Destination",
      accessor: "destination",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Status Date",
      accessor: "statusDate",
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
              table={{ columns: measureColumns, rows: ordersData }}
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


export default Orders;
