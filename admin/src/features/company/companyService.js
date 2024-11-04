import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getCompanies = async () => {
  const response = await axios.get(`${base_url}company/`,config);

  return response.data;
};

const getCompaniesByCompany = async (id) => {
  const response = await axios.get(`${base_url}company/by-company/${id}`,config);

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
    { title: company.companyData.title,
      IMO: company.companyData.IMO,
      email: company.companyData.email,
      number: company.companyData.number,
      address: company.companyData.address,
      city: company.companyData.city,
      country: company.companyData.country,
    },
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
  getCompaniesByCompany,
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
};

export default companyService;
