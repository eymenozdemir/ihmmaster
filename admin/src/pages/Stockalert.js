import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteAProduct} from "../features/product/productSlice";
import CustomModal from "../components/CustomModal";
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
    Header: "Vendor",
    accessor: "vendor",
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
    Header: "Savannah (On Way)",
    accessor: "savannah",
  },
  {
    Header: "Nashville (On Way)",
    accessor: "nashville",
  },
  {
    Header: "Atlanta (On Way)",
    accessor: "atlanta",
  },
  {
    Header: "Turkiye",
    accessor: "stockTr",
  },
  {
    Header: "Treshold",
    accessor: "stockTreshold",
  },
];

const Stockalert = () => {
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
  const productState = useSelector((state) => state.product.products.filter((p) =>  p?.stockTreshold >= (p?.stockAtlanta + p?.toAtlanta) || p?.stockTreshold >= (p?.stockNashville + p?.toNashville) || p?.stockTreshold >= (p?.stockSavannah + p?.toSavannah)));
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    
    let tempPrice = (productState[i].price===0 || productState[i].price==="") ? "Request a Quote" : productState[i].currency + " " + productState[i].price;
    data1.push({
      key: i + 1,
      SKU: productState[i].SKU,
      vendor: productState[i].vendor,
      title: productState[i].title,
      category: productState[i].category,
      subCategory: productState[i].subCategory,
      size: productState[i].size,
      price: productState[i].price,
      savannah: productState[i].stockSavannah + " (" + productState[i].toSavannah + ")",
      nashville: productState[i].stockNashville + " (" + productState[i].toNashville + ")",
      atlanta: productState[i].stockAtlanta + " (" + productState[i].toAtlanta + ")",
      stockTr: productState[i].stockTr,
      stockTreshold: productState[i].stockTreshold,

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
      <h3 className="mb-4 title">Stock Alert</h3>
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

export default Stockalert;
