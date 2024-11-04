import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getFileCategories = async () => {
  const response = await axios.get(`${base_url}file-category/`,config);

  return response.data;
};

const createFileCategory = async (fileCategory) => {
  console.log("slice girdi", fileCategory);
  const response = await axios.post(`${base_url}file-category/`, fileCategory, config);
  console.log(fileCategory);
  return response.data;
};
const updateFileCategory = async (fileCategory) => {
  const response = await axios.put(
    `${base_url}file-category/${fileCategory.id}`,
    { title: fileCategory.fileCategoryData.title },
    config
  );

  return response.data;
};
const getFileCategory = async (id) => {
  const response = await axios.get(`${base_url}file-category/${id}`, config);

  return response.data;
};

const deleteFileCategory = async (id) => {
  const response = await axios.delete(`${base_url}file-category/${id}`, config);

  return response.data;
};

const fileCategoryService = {
  getFileCategories,
  createFileCategory,
  getFileCategory,
  updateFileCategory,
  deleteFileCategory,
};

export default fileCategoryService;
