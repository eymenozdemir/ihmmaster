import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteAProduct} from "../features/product/productSlice";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";
import CustomTable from "components/CustomTable";
const columns = [
  {
    Header: "SNo",
    accessor: "key",
  },
  {
    Header: "SKU",
    accessor: "SKU",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Subcategory",
    accessor: "subCategory",
  },
  {
    Header: "Size",
    accessor: "size",
  },
  {
    Header: "Cost",
    accessor: "price",
  },
  {
    Header: "Case Quantity",
    accessor: "caseQuantity",
  },
  {
    Header: "Case per Pallet",
    accessor: "casePallet",
  },
  {
    Header: "Amount (On Way)",
    accessor: "amount",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Savannah = () => {
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
    if(productState[i].stockSavannah !== 0 && productState[i].stockSavannah !== "0" && productState[i].stockSavannah !== null){
      data1.push({
        key: i + 1,
        SKU: productState[i].SKU,
        title: productState[i].title,
        category: productState[i].category,
        subCategory: productState[i].subCategory,
        size: productState[i].size,
        price: productState[i].price,
        caseQuantity: productState[i].caseQuantity + " " + productState[i].caseUnit,
        casePallet: productState[i].casePallet,
        amount: productState[i].stockSavannah + " (" + productState[i].toSavannah + ")",
        action: (
          <>
            <Link
              to={`/admin/product/${productState[i]._id}`}
              className="me-3 fs-4 text-info"
            >
              <BiEdit />
            </Link>
          </>
        ),
      });
    }
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
      <h3 className="mb-4 title">Savannah</h3>
      <div>
        
        <CustomTable columns={columns} data={data1} />
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

export default Savannah;