import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProductSaleView = async () => {
  const response = await axios.get(`${base_url}product/product-sale-view`);

  return response.data;
};
const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);

  return response.data;
};

const updateProduct = async (product) => {
  //console.log("serviced", config);
  const response = await axios.put(
    `${base_url}product/${product.id}`,
    { title: product.prodData.title,SKU: product.prodData.SKU, category: product.prodData.category, subCategory: product.prodData.subCategory, size: product.prodData.size, vendor: product.prodData.vendor
      , price: product.prodData.price, caseQuantity: product.prodData.caseQuantity,
       caseUnit: product.prodData.caseUnit, casePallet: product.prodData.casePallet, stockSavannah: product.prodData.stockSavannah, stockTr: product.prodData.stockTr, stockTreshold: product.prodData.stockTreshold
       , stockNashville: product.prodData.stockNashville, stockAtlanta: product.prodData.stockAtlanta, toNashville: product.prodData.toNashville, toAtlanta: product.prodData.toAtlanta, toSavannah: product.prodData.toSavannah},
    config
  );
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  getProduct,
  getProductSaleView,
  updateProduct,
};

export default productService;
