import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getDocuments = async () => {
  const response = await axios.get(`${base_url}document/`);
  return response.data;
};

const getDocumentsByCompany = async (id) => {
  const response = await axios.get(`${base_url}document/by-company/${id}`,config);
  return response.data;
};

const getDocumentsByVessel = async (id) => {
  const response = await axios.get(`${base_url}document/by-vessel/${id}`,config);
  return response.data;
};

const createDocument = async (document) => {
  const response = await axios.post(`${base_url}document/`, document, config);
  //console.log(document);
  return response.data;
};
const updateDocument = async (document) => {
  const response = await axios.put(
    `${base_url}document/${document.id}`,
    { title: document.documentData.title },
    config
  );

  return response.data;
};
const getDocument = async (id) => {
  const response = await axios.get(`${base_url}document/${id}`, config);

  return response.data;
};

const deleteDocument = async (id) => {
  const response = await axios.delete(`${base_url}document/${id}`, config);

  return response.data;
};

const documentService = {
  getDocuments,
  getDocumentsByCompany,
  getDocumentsByVessel,
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
};

export default documentService;
