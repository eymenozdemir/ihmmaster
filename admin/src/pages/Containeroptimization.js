import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteAProduct} from "../features/product/productSlice";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "owner ID",
    dataIndex: "ownerId",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Model",
    dataIndex: "model",
    sorter: (a, b) => a.model.length - b.model.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Condition",
    dataIndex: "condition",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [prodId, setProdId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProdId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    
    let tempPrice = (productState[i].price===0 || productState[i].price==="") ? "Request a Quote" : productState[i].currency + " " + productState[i].price;
    data1.push({
      key: i + 1,
      id: productState[i]._id.substr(productState[i]._id.length - 6),
      ownerId: productState[i].ownerId,
      title: productState[i].title,
      model: productState[i].brand + " " + productState[i].model + " " + productState[i].submodel,
      category: productState[i].category,
      condition: productState[i].condition,
      price: tempPrice,
      status: productState[i].status,
      action: (
        <>
          <Link
            to={`/admin/product/${productState[i]._id}`}
            className="me-3 fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(prodId);
        }}
        title="Are you sure you want to delete this Product ?"
      />
    </div>
  );
};

export default Productlist;
