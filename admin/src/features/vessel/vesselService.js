import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getVessels = async () => {
  const response = await axios.get(`${base_url}vessel/`);

  return response.data;
};

const getVesselsByCompany = async (id) => {
  const response = await axios.get(`${base_url}vessel/by-company/${id}`,config);

  return response.data;
};

const getVesselsByVessel = async (id) => {
  const response = await axios.get(`${base_url}vessel/by-vessel/${id}`,config);

  return response.data;
};

const createVessel = async (vessel) => {
  const response = await axios.post(`${base_url}vessel/`, vessel, config);
  //console.log(vessel);
  return response.data;
};
const updateVessel = async (vessel) => {
  const response = await axios.put(
    `${base_url}vessel/${vessel.id}`,
    { title: vessel.vesselData.title,
      IMO: vessel.vesselData.IMO,
      company: vessel.vesselData.company,
      type: vessel.vesselData.type,
      year: vessel.vesselData.year,
      flag: vessel.vesselData.flag,
      tonnage: vessel.vesselData.tonnage,
     },
    config
  );

  return response.data;
};
const getVessel = async (id) => {
  const response = await axios.get(`${base_url}vessel/${id}`, config);

  return response.data;
};

const deleteVessel = async (id) => {
  const response = await axios.delete(`${base_url}vessel/${id}`, config);

  return response.data;
};

const vesselService = {
  getVessels,
  getVesselsByCompany,
  getVesselsByVessel,
  createVessel,
  getVessel,
  updateVessel,
  deleteVessel,
};

export default vesselService;
