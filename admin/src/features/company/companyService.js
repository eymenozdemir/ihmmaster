import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getCompanies = async () => {
  const response = await axios.get(`${base_url}company/`);

  return response.data;
};

const createCompany = async (company) => {
  const response = await axios.post(`${base_url}company/`, company, config);
  //console.log(company);
  return response.data;
};
const updateCompany = async (company) => {
  const response = await axios.put(
    `${base_url}company/${company.id}`,
    { title: company.companyData.title },
    config
  );

  return response.data;
};
const getCompany = async (id) => {
  const response = await axios.get(`${base_url}company/${id}`, config);

  return response.data;
};

const deleteCompany = async (id) => {
  const response = await axios.delete(`${base_url}company/${id}`, config);

  return response.data;
};

const companyService = {
  getCompanies,
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
};

export default companyService;
