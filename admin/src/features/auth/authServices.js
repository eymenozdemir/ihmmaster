import axios from "axios";
import { config, configForQuickbooks } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  //console.log("serviceeddddd 1", user);
  const response = await axios.post(`${base_url}user/admin-login`, user);
  //console.log("serviceeddddd 2", response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  //console.log("serviceeddddd 1", user);
  const response = await axios.get(`${base_url}user/logout`);
  //console.log("serviceeddddd 2", response);
  if (response) {
    localStorage.removeItem("user");
  }
  return response.data;
};

const loginQuickbooks = async () => {
  //console.log("serviceeddddd 1", user);
  const authUri = await axios.post(`${base_url}user/quickbooks-login`);
  //console.log("serviceeddddd 2", response);
  if (authUri.data) {
    localStorage.setItem("qbUser", JSON.stringify(authUri.data));
  }
  //return response.data;

  var win = window.open(authUri.data, 'connectPopup');
  // var pollOAuth = window.setInterval(function () {
  //   try {
  //     if (win.document.URL.indexOf("code") != -1) {
  //       window.clearInterval(pollOAuth);
  //       win.close();
  //       window.location.reload();
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }, 100);
  return authUri.data;
};

const loginQuickbooksTn = async () => {
  //console.log("serviceeddddd 1", user);
  const authUri = await axios.post(`${base_url}user/quickbooks-login-tn`);
  //console.log("serviceeddddd 2", response);
  if (authUri.data) {
    localStorage.setItem("qbUserTn", JSON.stringify(authUri.data));
  }
  //return response.data;

  var win = window.open(authUri.data, 'connectPopup');
  // var pollOAuth = window.setInterval(function () {
  //   try {
  //     if (win.document.URL.indexOf("code") != -1) {
  //       window.clearInterval(pollOAuth);
  //       win.close();
  //       window.location.reload();
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }, 100);
  return authUri.data;
};


const getCompanyInfo = async () => {
  const response = await axios.get(`${base_url}user/get-company-info`);
  return response.data;
};

const getCompanyInfoTn = async () => {
  const response = await axios.get(`${base_url}user/get-company-info-tn`);
  return response.data;
};

const getCompanyInfoGetto = async () => {
  const response = await axios.get(`${base_url}user/get-invoice`);
  // let isFirst = true;
  // console.log('response.data.QueryResponse.Invoice: ', response.data.QueryResponse.Invoice);
  // response.data.QueryResponse.Invoice.forEach(async (invoice) => {
  //   // console.log("in foreach", invoice);
  //   let values = {};
  //   let items = [];
  //   let temp_price = 0;
  //   let temp_job = "-";
  //   let temp_rep = "-";

  //   console.log("stop", invoice.Line);
  //   invoice.Line.forEach((item) => {
  //     if (item?.Id != undefined) {
  //       console.log("stop", item?.Id);
  //       items.push({
  //         //title: item.Description,
  //         title: item?.Description,
  //         items: item?.SalesItemLineDetail?.ItemRef?.name,
  //         quantity: item?.SalesItemLineDetail?.Qty,
  //         price: item?.SalesItemLineDetail?.UnitPrice,
  //       });
  //       console.log("stopqqq", items);
  //     }
  //     else {
  //       temp_price = temp_price + item?.Amount;
  //     }
  //   });
  //   console.log("stop", temp_price);

  //   invoice.CustomField.forEach((item) => {
  //     console.log("item namesi", item.Name);
  //     if (item?.Name == "REP") {
  //       temp_rep = item?.StringValue || "";
  //       console.log("stop", item.StringValue);
  //     }
  //     else {
  //       temp_job = item?.StringValue || "";
  //       console.log("stop2", item.StringValue);
  //     }
  //     console.log("stop", temp_job, temp_rep);
  //   });

  //   values = {
  //     invoiceId: invoice?.Id || "",
  //     soldItems: items,
  //     date: invoice?.MetaData?.CreateTime || "2999",
  //     subtotalPrice: temp_price,
  //     taxPrice: invoice?.TxnTaxDetail?.TotalTax || "",
  //     totalPrice: invoice?.TotalAmt || "",
  //     billTo: ((invoice?.BillAddr?.Line1 || "") + " " + (invoice?.BillAddr?.Line2 || "") + " " + (invoice?.BillAddr?.Line3 || "") + " " + (invoice?.BillAddr?.Line4 || "") + " " + (invoice?.BillAddr?.City || "") + " " + (invoice?.BillAddr?.CountrySubDivisionCode || "") + " " + (invoice?.BillAddr?.Country || "") + " " + (invoice?.BillAddr?.PostalCode || "")).replace(/\s+/g, " "),
  //     shipTo: ((invoice?.ShipAddr?.Line1 || "") + " " + (invoice?.ShipAddr?.Line2 || "") + " " + (invoice?.ShipAddr?.Line3 || "") + " " + (invoice?.ShipAddr?.Line4 || "") + " " + (invoice?.ShipAddr?.City || "") + " " + (invoice?.ShipAddr?.CountrySubDivisionCode || "") + " " + (invoice?.ShipAddr?.Country || "") + " " + (invoice?.ShipAddr?.PostalCode || "")).replace(/\s+/g, " "),
  //     shipvia: invoice?.ShipMethodRef?.name || "",
  //     rep: temp_rep,
  //     job: temp_job,
  //     branch: "Atlanta",
  //   };
  //   console.log("tekli", values);
  //   // if (isFirst == true) {
  //     console.log(isFirst);
  //     isFirst = false;
  //     const response2 = await axios.post(`${base_url}user/set-invoice`, values);
  //   // }
  // });
  //const response = await axios.get(`https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365372786930/query?query=select * from CompanyInfo&minorversion=70`);
  return response.data;
};

const getCompanyInfoGettoTn = async () => {
  const response = await axios.get(`${base_url}user/get-invoice-tn`);
  // console.log("invoice 1231312", response);
  // console.log("invoice 33442", response.data.QueryResponse.Invoice);
  // let isFirst = true;
  // response.data.QueryResponse.Invoice.forEach(async (invoice) => {
  //   console.log("in foreach", invoice);
  //   let values = {};
  //   let items = [];
  //   let temp_price = 0;
  //   let temp_job = "-";
  //   let temp_rep = "-";

  //   console.log("stop", invoice.Line);
  //   invoice.Line.forEach((item) => {
  //     if (item?.Id != undefined) {
  //       console.log("stop", item?.Id);
  //       items.push({
  //         //title: item.Description,
  //         title: item?.Description,
  //         items: item?.SalesItemLineDetail?.ItemRef?.name,
  //         quantity: item?.SalesItemLineDetail?.Qty,
  //         price: item?.SalesItemLineDetail?.UnitPrice,
  //       });
  //       console.log("stopqqq", items);
  //     }
  //     else {
  //       temp_price = temp_price + item?.Amount;
  //     }
  //   });
  //   console.log("stop", temp_price);

  //   invoice.CustomField.forEach((item) => {
  //     console.log("item namesi", item.Name);
  //     if (item?.Name == "Sales Rep") {
  //       temp_rep = item?.StringValue || "";
  //       console.log("stop", item.StringValue);
  //     }
  //     else {
  //       temp_job = item?.StringValue || "";
  //       console.log("stop2", item.StringValue);
  //     }
  //     console.log("stop", temp_job, temp_rep);
  //   });

  //   values = {
  //     invoiceId: invoice?.Id || "",
  //     soldItems: items,
  //     date: invoice?.MetaData?.CreateTime || "2999",
  //     subtotalPrice: temp_price,
  //     taxPrice: invoice?.TxnTaxDetail?.TotalTax || "",
  //     totalPrice: invoice?.TotalAmt || "",
  //     billTo: ((invoice?.BillAddr?.Line1 || "") + " " + (invoice?.BillAddr?.Line2 || "") + " " + (invoice?.BillAddr?.Line3 || "") + " " + (invoice?.BillAddr?.Line4 || "") + " " + (invoice?.BillAddr?.City || "") + " " + (invoice?.BillAddr?.CountrySubDivisionCode || "") + " " + (invoice?.BillAddr?.Country || "") + " " + (invoice?.BillAddr?.PostalCode || "")).replace(/\s+/g, " "),
  //     shipTo: ((invoice?.ShipAddr?.Line1 || "") + " " + (invoice?.ShipAddr?.Line2 || "") + " " + (invoice?.ShipAddr?.Line3 || "") + " " + (invoice?.ShipAddr?.Line4 || "") + " " + (invoice?.ShipAddr?.City || "") + " " + (invoice?.ShipAddr?.CountrySubDivisionCode || "") + " " + (invoice?.ShipAddr?.Country || "") + " " + (invoice?.ShipAddr?.PostalCode || "")).replace(/\s+/g, " "),
  //     shipvia: invoice?.ShipMethodRef?.name || "",
  //     rep: temp_rep,
  //     job: temp_job,
  //     branch: "Nashville",
  //   };
  //   console.log("tekli", values);
  //   // if(isFirst == true){
  //   console.log("isFirst:" ,isFirst);
  //   isFirst = false;
  //   const response2 = await axios.post(`${base_url}user/set-invoice`, values);
  //   // }
  // });
  //const response = await axios.get(`https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365372786930/query?query=select * from CompanyInfo&minorversion=70`);
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/get-all-orders`, config);

  return response.data;
};

const getSalesFromDb = async () => {
  const response = await axios.get(`${base_url}user/get-all-sales`, config);

  return response.data;
};


const isLoggedIn = async () => {
  const response = await axios.get(`${base_url}user/is-logged-in`, config);

  return response.data;
};

const isLoggedInTn = async () => {
  const response = await axios.get(`${base_url}user/is-logged-in-tn`, config);

  return response.data;
};


const updateOrder = async (order) => {
  const response = await axios.put(
    `${base_url}user/order/${order.id}`,
    { ...order.order, orderStatus: order.orderData, statusDate: Date.now() },
    config
  );
  return response.data;
};

const getSales = async () => {
  const response = await axios.get(`https://quickbooks.api.intuit.com/v3/company/123145712922244/companyinfo/123145712922244?minorversion=12`, configForQuickbooks);

  return response.data;
};

const deleteOrder = async (id) => {
  const response = await axios.delete(`${base_url}user/order/${id}`, config);
  return response.data;
};


const deleteSale = async (id) => {
  const response = await axios.delete(`${base_url}user/sales/${id}`, config);
  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};

const createOrder = async (orderDetail) => {
  //console.log("createdddddd Service", orderDetail, orderDetail.config);
  const response = await axios.post(`${base_url}user/create-order`, orderDetail, config);
  if (response.data) {
    return response.data;
  }
};

const createUser = async (user) => {
  console.log(user);
  const response = await axios.post(`${base_url}user/`, user, config);

  return response.data;
};

const getUser = async (id) => {
  //console.log("serviced", id);
  const response = await axios.get(`${base_url}user/${id}`, config);

  return response.data;
};

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`);

  return response.data;
};

const getUsersByCompany = async (id) => {
  const response = await axios.get(`${base_url}user/by-company/${id}`,config);

  return response.data;
};

const getUsersByVessel = async (id) => {
  const response = await axios.get(`${base_url}user/by-vessel/${id}`,config);

  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`${base_url}user/${id}`, config);
  return response.data;
};

const getSale = async (id) => {

  const response = await axios.get(`${base_url}user/sales/${id}`, config);

  return response.data;
};

const getSingleOrder = async (id) => {

  const response = await axios.get(`${base_url}user/orders/${id}`, config);

  return response.data;
};

const updateUser = async (user) => {
  const response = await axios.put(
    `${base_url}user/${user.id}`,
    {
      name: user.userData.name, role: user.userData.role, email: user.userData.email
      , mobile: user.userData.mobile, company: user.userData.company, vessel: user.userData.vessel
      , address: user.userData.address, city: user.userData.city, state: user.userData.state
      , country: user.userData.country, zip: user.userData.zip
    },
    config
  );
  return response.data;
};

const authService = {
  login,
  logout,
  loginQuickbooks,
  getCompanyInfo,
  getCompanyInfoGetto,
  loginQuickbooksTn,
  getCompanyInfoTn,
  getCompanyInfoGettoTn,
  getOrders,
  getSalesFromDb,
  getSales,
  isLoggedIn,
  isLoggedInTn,
  getSingleOrder,
  getOrder,
  updateOrder,
  createOrder,
  deleteOrder,
  deleteSale,
  createUser,
  getUser,
  getUsers,
  getUsersByCompany,
  getUsersByVessel,
  deleteUser,
  getSale,
  updateUser,
};

export default authService;
