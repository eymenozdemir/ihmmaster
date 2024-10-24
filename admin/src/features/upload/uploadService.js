import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}upload/`, data, config);
  return response.data;
};

const uploadFile = async (data) => {
  const response = await axios.post(`${base_url}upload/file`, data, config);
  //console.log(response);
  return response.data;
};

const downloadFile = async (data) => {
  console.log(data);
  const response = await axios.post(`${base_url}upload/download`, {fileId: data}, config);
  console.log(response);
  return response.data;
};

const deleteImg = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,
    config
  );
  return response.data;
};

const deleteFile = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-file/${id}`,
    config
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  uploadFile,
  downloadFile,
  deleteImg,
  deleteFile,
};

export default uploadService;
