import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getContracts = async () => {
    const response = await axios.get(`${base_url}contract/`);
    return response.data;
  };

  const deleteContract = async (id) => {
    const response = await axios.delete(`${base_url}contract/${id}`, config);
    return response.data;
  };

  const getContract = async (id) => {
    const response = await axios.get(`${base_url}contract/${id}`);
    return response.data;
  };

  const udpateContract = async (cont) => {
    const response = await axios.put(
      `${base_url}contract/${cont.id}`,
      { content: cont.contData },
      config
    );
    return response.data;
  };

  const contractService = {
    getContracts,
    deleteContract,
    getContract,
    udpateContract,
  };

export default contractService;