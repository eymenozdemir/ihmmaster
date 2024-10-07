import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";
import CustomTable from "components/CustomTable";
import { getFileCategories, deleteAFileCategory } from "features/fileCategory/fileCategorySlice";
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
    Header: "Action",
    accessor: "action",
  },
];

const FileCategories = () => {
  const [open, setOpen] = useState(false);
  const [fileCategoryId, setFileCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setFileCategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFileCategories());
  }, []);

  const fileCategoryState = useSelector((state) => state.fileCategory.fileCategories);

  let tempIdx = 0;
  const data1 = [];
  for (let i = 0; i < fileCategoryState?.length; i++) {
    tempIdx = tempIdx + 1;
    data1.push({
    key: tempIdx,
    id: fileCategoryState[i]._id,
    title: fileCategoryState[i].title,
    action: (
        <>
        <Link
            to={`/admin/add-file-category/${fileCategoryState[i]._id}`}
            className="ms-3 fs-4 text-info"
        >
            <BiEdit />
        </Link>
        <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(fileCategoryState[i]._id)}
        >
            <AiFillDelete />
        </button>
        </>
    ),
    });
    
  }
  const deleteFileCategory = (e) => {
    dispatch(deleteAFileCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getFileCategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">File Categories</h3>
      <div>
        <CustomTable columns={columns} data={data1}/>
        {/* <Table columns={columns} dataSource={data1} /> */}
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteFileCategory(fileCategoryId);
        }}
        title="Are you sure you want to delete this File Category?"
      />
    </div>
  );
};

export default FileCategories;
