import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductSaleView } from "../features/product/productSlice";
import { getAUser, getOrders, getSalesDb } from "../features/auth/authSlice";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import DataTable from "examples/Tables/DataTable";

import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";


import { FaClipboardList, FaMoneyBillWave, FaMoneyCheckAlt } from "react-icons/fa";
import { RiShip2Fill } from "react-icons/ri";

import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { MdOutlineKeyboardArrowDown, MdFilterAltOff } from "react-icons/md";

const monthMap = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
}


const stringSorter = (name) => { return (a, b) => (a[name] == undefined ? "" : a[name]).localeCompare((b[name] == undefined ? "" : b[name])) };

const capitalizeEachWord = (sentence) => { return sentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()); };

const formatYYYYMM = (date) => {
  if (monthMap[date.substr(5, 2)] != null) {
    return monthMap[date.substr(5, 2)] + " " + date.substr(0, 4);
  }
  return "Other";
}

const Dashboard = () => {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  let uiEndDate = new Date(endDate);
  uiEndDate.setDate(uiEndDate.getDate() - 1);

  const dispatch = useDispatch();
  let isAdmin = false;
  const userState = useSelector((state) => state?.auth?.user);
  const adminState = useSelector((state) => state?.auth?.userName?.getaUser);
  useEffect(() => {
    dispatch(getAUser(userState?._id));

  }, []);



  useEffect(() => {
    dispatch(getProductSaleView());
    dispatch(getOrders());
    dispatch(getSalesDb());
  }, []);
  // const productState = useSelector((state) => state.product.productSaleView);
  const productsDataState = useSelector((state) => Object.keys(state.product.productSaleView).map((key) => state.product.productSaleView[key]));
  const productsMap = {};


  for (let i = 0; i < productsDataState.length; i++) {

    productsMap[productsDataState[i].title] = {
      key: i + 1,
      SKU: productsDataState[i].SKU,
      vendor: productsDataState[i].vendor || "",
      title: productsDataState[i].title || "",
      category: productsDataState[i].category || "",
      subCategory: productsDataState[i].subCategory || "",
      size: productsDataState[i].size || "",
      price: productsDataState[i].price || 0,
      caseQuantity: (productsDataState[i].caseQuantity || 0) + " " + productsDataState[i].caseUnit,
      casePallet: productsDataState[i].casePallet || 0,
      savannah: productsDataState[i].stockSavannah || 0, //+ " (" + productState[i].toSavannah + ")",
      nashville: productsDataState[i].stockNashville || 0, //+ " (" + productState[i].toNashville + ")",
      atlanta: productsDataState[i].stockAtlanta || 0, //+ " (" + productState[i].toAtlanta + ")",
      stockTr: productsDataState[i].stockTr || 0,
      stockTreshold: productsDataState[i].stockTreshold || 0,
      soldQuantity: 0,
      revenue: 0
    };
  }

  const salesDataState = useSelector((state) => state?.auth?.salesDB);
  const salesData = [];

  for (let i = 0; i < salesDataState?.length; i++) {
    if ((startDate == null && endDate == null) || (new Date(salesDataState[i].date.split('T')[0] + "T06:00:00+00:00") >= startDate && new Date(salesDataState[i].date.split('T')[0] + "T06:00:00+00:00") <= endDate)) {
      salesData.push({
        key: i + 1,
        id: salesDataState[i].invoiceId || "",
        job: salesDataState[i].job || "",
        rep: salesDataState[i].rep || "",
        shipTo: salesDataState[i].shipTo || "",
        taxPrice: Number((salesDataState[i].taxPrice).toFixed(2)) || 0,
        totalPrice: Number((salesDataState[i].totalPrice).toFixed(2)) || 0,
        branch: salesDataState[i].branch || "",
        date: salesDataState[i].date.split('T')[0] || "",
        year: salesDataState[i].date.split('-')[0] || ""
      });
    }
  }



  useEffect(() => {
    if (salesDataState) {
      salesDataState.forEach((sale) => {
        sale.soldItems.forEach((item) => {

          if (productsMap[item.title] != undefined && productsMap[item.title] != null) {

            productsMap[item.title].soldQuantity += item.quantity;
            productsMap[item.title].revenue += item.quantity * item.price;
          }
        });
      });
    }
  }, [salesDataState]);

  const productsData = Object.values(productsMap);

  const ordersDataState = useSelector((state) => state?.auth?.orders);
  const ordersData = [];

  for (let i = 0; i < ordersDataState.length; i++) {
    if ((startDate == null && endDate == null) || (new Date(ordersDataState[i].createdAt.split('T')[0] + "T06:00:00+00:00") >= startDate && new Date(ordersDataState[i].createdAt.split('T')[0] + "T06:00:00+00:00") <= endDate)) {

      ordersData.push({
        key: i + 1,
        vendor: ordersDataState[i].user.name,
        code: ordersDataState[i].containerCode,
        totalPrice: Number((ordersDataState[i].totalPrice).toFixed(2)),
        destination: ordersDataState[i].destination,
        status: ordersDataState[i].orderStatus,
        createDate: ordersDataState[i].createdAt.slice(0, 10),
        createYear: ordersDataState[i].createdAt.slice(0, 4),
        // createdAt: dataState[i].createDate.slice(0, 4),
      });
    }
  }



  const chartData = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: { label: "Sales", data: [150, 20, 10, 22, 50, 10, 40] }

  };

  // const lineChartData = {
  //   sales: {
  //     labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //     datasets: { label: "Mobile apps", data: [50, 40, 300, 320, 500, 350, 200, 230, 500] },
  //   },
  //   tasks: {
  //     labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //     datasets: { label: "Desktop apps", data: [50, 40, 300, 220, 500, 250, 400, 230, 500] },
  //   },
  // };

  const salesPriceChartMap = {};

  salesData.forEach((sale) => {
    if (salesPriceChartMap[sale.date.substr(0, 7)] == null) {

      salesPriceChartMap[sale.date.substr(0, 7)] = 0;
    }
    salesPriceChartMap[sale.date.substr(0, 7)] += sale.totalPrice;
  });
  const orderedSalesPriceChartMap = Object.keys(salesPriceChartMap).sort().reduce(
    (obj, key) => {
      obj[key] = salesPriceChartMap[key];
      return obj;
    },
    {}
  );
  const salesPriceChartData = {
    labels: Object.keys(orderedSalesPriceChartMap).map((element) => formatYYYYMM(element)), datasets: { label: "Total Price", data: Object.values(orderedSalesPriceChartMap) }
  };


  const salesQuantityChartMap = {};

  salesData.forEach((sale) => {
    if (salesQuantityChartMap[sale.date.substr(0, 7)] == null) {

      salesQuantityChartMap[sale.date.substr(0, 7)] = 0;
    }
    salesQuantityChartMap[sale.date.substr(0, 7)] += 1;
  });
  const orderedSalesQuantityChartMap = Object.keys(salesQuantityChartMap).sort().reduce(
    (obj, key) => {
      obj[key] = salesQuantityChartMap[key];
      return obj;
    },
    {}
  );
  const salesQuantityChartData = {
    labels: Object.keys(orderedSalesQuantityChartMap).map((element) => formatYYYYMM(element)), datasets: { label: "Total Quantity", data: Object.values(orderedSalesQuantityChartMap) }
  };


  const salesRepChartMap = {};

  salesData.forEach((sale) => {
    const key = capitalizeEachWord(sale.rep.replaceAll("/", " - ").replaceAll("-", " - ").toLowerCase()).replaceAll(" - ", "-").replaceAll(" - ", "-").replaceAll(" / ", "-").trim();
    if (salesRepChartMap[key] == null) {

      salesRepChartMap[key] = 0;
    }
    salesRepChartMap[key] += sale.totalPrice;
  });
  const orderedSalesRepChartMap = Object.keys(salesRepChartMap).sort().reduce(
    (obj, key) => {
      obj[key] = salesRepChartMap[key];
      return obj;
    },
    {}
  );
  const salesRepChartData = {
    labels: Object.keys(orderedSalesRepChartMap), datasets: { label: "Total Price", data: Object.values(orderedSalesRepChartMap) }
  };


  let stockAlertCount = productsDataState.filter((p) => p?.stockTreshold >= (p?.stockAtlanta + p?.toAtlanta) || p?.stockTreshold >= (p?.stockNashville + p?.toNashville) || p?.stockTreshold >= (p?.stockSavannah + p?.toSavannah)).length;
  console.log('stockAlertCount: ', stockAlertCount);
  let stockText = {
    color: "success",
    amount: "All products",
    label: "are in stock!",
  }
  if (stockAlertCount > 0) {
    stockText = {
      color: "danger",
      amount: stockAlertCount,
      label: stockAlertCount > 1 ? "products are low in stock!" : "product is low in stock!",
    }
  }


  const orderedSalesQuantityChartArray = Object.values(orderedSalesQuantityChartMap);

  let saleQuantityText = {
    color: "success",
    amount: "",
    label: "No comparison data",
  };
  if (orderedSalesQuantityChartArray.length >= 2 && orderedSalesQuantityChartArray[orderedSalesQuantityChartArray.length - 2] > 0 && orderedSalesQuantityChartArray[orderedSalesQuantityChartArray.length - 1] > 0) {
    if (orderedSalesQuantityChartArray[orderedSalesQuantityChartArray.length - 1] > orderedSalesQuantityChartArray[orderedSalesQuantityChartArray.length - 2]) {
      saleQuantityText = {
        color: "success",
        amount: "+" + (orderedSalesQuantityChartArray[orderedSalesQuantityChartArray.length - 1] - orderedSalesQuantityChartArray[orderedSalesQuantityChartArray.length - 2]),
        label: "than last month",
      };
    } else {
      saleQuantityText = {
        color: "danger",
        amount: "-" + (orderedSalesQuantityChartArray[orderedSalesQuantityChartArray.length - 2] - orderedSalesQuantityChartArray[orderedSalesQuantityChartArray.length - 1]),
        label: "than last month",
      };
    }
  }
  const orderedSalesRepChartArray = Object.values(orderedSalesRepChartMap);
  const orderedSalesPriceChartArray = Object.values(orderedSalesPriceChartMap);

  let saleText = {
    color: "success",
    amount: "",
    label: "No comparison data",
  };
  if (orderedSalesPriceChartArray.length >= 2 && orderedSalesPriceChartArray[orderedSalesPriceChartArray.length - 2] > 0 && orderedSalesPriceChartArray[orderedSalesPriceChartArray.length - 1] > 0) {
    if (orderedSalesPriceChartArray[orderedSalesPriceChartArray.length - 1] > orderedSalesPriceChartArray[orderedSalesPriceChartArray.length - 2]) {
      saleText = {
        color: "success",
        amount: "+" + ((orderedSalesPriceChartArray[orderedSalesPriceChartArray.length - 1] - orderedSalesPriceChartArray[orderedSalesPriceChartArray.length - 2]) / orderedSalesPriceChartArray[orderedSalesPriceChartArray.length - 2] * 100).toFixed(1) + "%",
        label: "than last month",
      };
    } else {
      saleText = {
        color: "danger",
        amount: "-" + ((orderedSalesPriceChartArray[orderedSalesPriceChartArray.length - 2] - orderedSalesPriceChartArray[orderedSalesPriceChartArray.length - 1]) / orderedSalesPriceChartArray[orderedSalesPriceChartArray.length - 2] * 100).toFixed(1) + "%",
        label: "than last month",
      };
    }
  }

  const income = salesData.reduce((total, sale) => { return total + sale.totalPrice }, 0);
  const outcome = ordersData.filter((order) => order.status != "Canceled").reduce((total, order) => { return total + order.totalPrice }, 0);


  let profitText = {
    color: "success",
    amount: "$" + "-",
    label: "Profit",
  };

  if (income > outcome) {
    profitText = {
      color: "success",
      amount: "+$" + (income - outcome).toFixed(1),
      label: "Profit",
    };
  } else {
    profitText = {
      color: "danger",
      amount: "$" + (income - outcome).toFixed(1),
      label: "Loss",
    };
  }


  if (adminState?.role === "Admin") {
    isAdmin = true;
  }


  return (
    <>
      {isAdmin ? <>

        <div>
          <div className="d-flex justify-content-between">
            <h3 className="mb-4 title">Dashboard</h3>
            <div className="mt-0">
              <DateRangePicker
                initialSettings={{ startDate: "1/1/2024", endDate: "1/1/2034" }}
                onApply={(event, picker) => {
                  let tempEndDate = picker.endDate._d;
                  // tempEndDate.setDate(tempEndDate.getDate() - 1);
                  setStartDate(picker.startDate._d);
                  setEndDate(tempEndDate);
                }}
              >
                <button
                  key="selectDate"
                  className="btn btn-light border-0 rounded-3 m-1"
                >
                  {startDate == null ? "Select Date" : (startDate.toISOString().split('T')[0].replaceAll("-", "/") + " - " + uiEndDate.toISOString().split('T')[0].replaceAll("-", "/"))} <MdOutlineKeyboardArrowDown />
                </button>
              </DateRangePicker>
              <button
                key="clear"
                className="btn btn-light border-0 rounded-3 m-1"
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                }}
              > <MdFilterAltOff />
              </button>
            </div>

          </div>




          <MDBox py={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="dark"
                    icon={<FaClipboardList className="fs-4" />}
                    title="Sales"
                    count={salesData.length}
                    percentage={saleQuantityText}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    icon={<RiShip2Fill className="fs-4" />}
                    title="Orders On Way"
                    count={ordersData.filter((order) => order.status != "Products at Warehouse" && order.status != "Canceled").length}
                    percentage={stockText}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="success"
                    icon={<FaMoneyBillWave className="fs-4" />}
                    title="Revenue"
                    count={"$" + income.toFixed(2)}
                    percentage={saleText}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon={<FaMoneyCheckAlt className="fs-4" />}
                    title="Total Order Cost"
                    count={"-$" + outcome.toFixed(2)}
                    percentage={profitText}
                  />
                </MDBox>
              </Grid>
            </Grid>
            <MDBox mt={4.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsBarChart
                      color="info"
                      title="Sales by Representatives"
                      description={"Average $" + (orderedSalesRepChartArray.length > 0 ? (orderedSalesRepChartArray.reduce((total, element) => { return total + element }, 0) / orderedSalesRepChartArray.length).toFixed(0) : "-") + " revenue per representative"}
                      // date="campaign sent 2 days ago"
                      chart={salesRepChartData}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="success"
                      title="Monthly Sales"
                      description={
                        "Average $" + (orderedSalesPriceChartArray.length > 0 ? (orderedSalesPriceChartArray.reduce((total, element) => { return total + element }, 0) / orderedSalesPriceChartArray.length).toFixed(0) : "-") + " revenue per month"
                      }
                      // date="updated 4 min ago"
                      chart={salesPriceChartData}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="dark"
                      title="Number of Sales"
                      description={"Average " + (orderedSalesQuantityChartArray.length > 0 ? (orderedSalesQuantityChartArray.reduce((total, element) => { return total + element }, 0) / orderedSalesQuantityChartArray.length).toFixed(0) : "-") + " sales per month"}
                      // date="just updated"
                      chart={salesQuantityChartData}
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>

          <ProductTable productsData={productsData} />
          <OrderTable ordersData={ordersData} />
          <SaleTable salesData={salesData} />

        </div>
      </> : <div>
        <h3 className="mb-4 title">Dashboard</h3>
        <h5 className="mb-4 ">You do not have permission to view this page!</h5>
      </div>}

      {/* {isAdmin && <>
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      {ProductTable()}
      {OrderTable()}
      {SaleTable()}
    </div>
    </>}
    {!isAdmin && <>
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <h5 className="mb-4 ">You do not have permission to view this page!</h5>
    </div>
    </>} */}
    </>
  );
};


// const ProductTable2 = ({ productsData }) => {

//   const measureColumns = [
//     {
//       title: "Cost",
//       dataIndex: "price",
//       sorter: (a, b) => a.price - b.price,
//     },
//     {
//       title: "Sold Quantity",
//       dataIndex: "soldQuantity",
//     },
//     {
//       title: "Revenue",
//       dataIndex: "revenue",
//     },
//     {
//       title: "Case Quantity",
//       dataIndex: "caseQuantity",
//       sorter: (a, b) => a.caseQuantity - b.caseQuantity,
//     },
//     {
//       title: "Case per Pallet",
//       dataIndex: "casePallet",
//       sorter: (a, b) => a.casePallet - b.casePallet,
//     },
//     {
//       title: "Savannah (On Way)",
//       dataIndex: "savannah",
//       sorter: (a, b) => a.savannah - b.savannah,
//     },
//     {
//       title: "Nashville (On Way)",
//       dataIndex: "nashville",
//       sorter: (a, b) => a.nashville - b.nashville,
//     },
//     {
//       title: "Atlanta (On Way)",
//       dataIndex: "atlanta",
//       sorter: (a, b) => a.atlanta - b.atlanta,
//     },
//     {
//       title: "Turkiye",
//       dataIndex: "stockTr",
//       sorter: (a, b) => a.stockTr - b.stockTr,
//     },
//   ];

//   const allDimensions = { "vendor": "Vendor", "category": "Category", "subCategory": "Sub Category", "size": "Size", };

//   const [selectedDimensions, setSelectedDimensions] = useState([]);

//   let groupedData = {};

//   for (let i = 0; i < productsData.length; i++) {
//     const product = productsData[i];
//     let dimensionKey = "";
//     selectedDimensions.forEach((dimension) => { dimensionKey += product[dimension] + " ^-^ " });
//     if (groupedData[dimensionKey] == null) {
//       groupedData[dimensionKey] = {};
//       groupedData[dimensionKey].price = 0;
//       groupedData[dimensionKey].caseQuantity = 0;
//       groupedData[dimensionKey].casePallet = 0;
//       groupedData[dimensionKey].savannah = 0;
//       groupedData[dimensionKey].nashville = 0;
//       groupedData[dimensionKey].atlanta = 0;
//       groupedData[dimensionKey].stockTr = 0;
//       groupedData[dimensionKey].soldQuantity = 0;
//       groupedData[dimensionKey].revenue = 0;
//       selectedDimensions.forEach((dimension) => { groupedData[dimensionKey][dimension] = product[dimension]; });
//     }
//     groupedData[dimensionKey].price += product.price;
//     groupedData[dimensionKey].caseQuantity += product.caseQuantity;
//     groupedData[dimensionKey].casePallet += product.casePallet;
//     groupedData[dimensionKey].savannah += product.savannah;
//     groupedData[dimensionKey].nashville += product.nashville;
//     groupedData[dimensionKey].atlanta += product.atlanta;
//     groupedData[dimensionKey].stockTr += product.stockTr;
//     groupedData[dimensionKey].soldQuantity += product.soldQuantity;
//     groupedData[dimensionKey].revenue += product.revenue;
//   }
//   let columns = [];
//   let dimensionColumns = [];
//   selectedDimensions.forEach((dimension) => {
//     dimensionColumns.push({
//       title: allDimensions[dimension],
//       dataIndex: dimension,
//       sorter: stringSorter(dimension),
//     },);
//   });

//   if (selectedDimensions.length == 0) {
//     columns = [{
//       title: "SNo",
//       dataIndex: "key",
//     },
//     {
//       title: "SKU",
//       dataIndex: "SKU",
//     },
//     {
//       title: "Vendor",
//       dataIndex: "vendor",
//       sorter: stringSorter("vendor"),
//     },
//     {
//       title: "Title",
//       dataIndex: "title",
//       sorter: stringSorter("title"),
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//       sorter: stringSorter("category"),
//     },
//     {
//       title: "Subcategory",
//       dataIndex: "subCategory",
//       sorter: stringSorter("subCategory"),
//     },
//     {
//       title: "Size",
//       dataIndex: "size",
//       sorter: stringSorter("size"),
//     }, ...measureColumns];
//   }
//   else {
//     columns = [...dimensionColumns, ...measureColumns];
//   }

//   return (
//     <div>
//       <h5 className="mb-4 title">Products</h5>
//       <div>
//         Group by:
//         <button key="clear" className={"btn " + (selectedDimensions.length == 0 ? "btn-primary" : "btn-light") + " border-0 rounded-3 m-1"}
//           onClick={() => {
//             setSelectedDimensions([]);
//           }}>
//           {"All"}
//         </button>
//         {Object.keys(allDimensions).map((dimension) =>
//           <button key={dimension} className={"btn " + (selectedDimensions.includes(dimension) ? "btn-success" : "btn-light") + " border-0 rounded-3 m-1"}
//             onClick={() => {
//               let array = selectedDimensions;
//               var index = array.indexOf(dimension);
//               if (index !== -1) {
//                 array.splice(index, 1);
//               } else {
//                 array.push(dimension);
//               }
//               setSelectedDimensions([...array]);
//             }}>

//             {allDimensions[dimension]}
//           </button>

//         )}


//         {selectedDimensions.length == 0 ? <Table columns={columns} dataSource={productsData} /> : <Table columns={columns} dataSource={Object.values(groupedData)} />}

//       </div>

//     </div >
//   );
// };


// const OrderTable2 = ({ ordersData }) => {

//   const measureColumns = [
//     {
//       title: "Total Price",
//       dataIndex: "totalPrice",
//       sorter: (a, b) => a.totalPrice - b.totalPrice,
//     },
//   ];

//   const allDimensions = { "vendor": "Vendor", "destination": "Destination", "status": "Status", "createDate": "Date Created", "createYear": "Year" };

//   const [selectedDimensions, setSelectedDimensions] = useState([]);

//   let groupedData = {};

//   for (let i = 0; i < ordersData.length; i++) {
//     const product = ordersData[i];
//     let dimensionKey = "";
//     selectedDimensions.forEach((dimension) => { dimensionKey += product[dimension] + " ^-^ " });
//     if (groupedData[dimensionKey] == null) {
//       groupedData[dimensionKey] = {};
//       groupedData[dimensionKey].totalPrice = 0;
//       selectedDimensions.forEach((dimension) => { groupedData[dimensionKey][dimension] = product[dimension]; });
//     }
//     groupedData[dimensionKey].totalPrice += product.totalPrice;
//   }
//   let columns = [];
//   let dimensionColumns = [];
//   selectedDimensions.forEach((dimension) => {
//     dimensionColumns.push({
//       title: allDimensions[dimension],
//       dataIndex: dimension,
//       sorter: stringSorter(dimension),
//     },);

//   });

//   if (selectedDimensions.length == 0) {
//     columns = [{
//       title: "SNo",
//       dataIndex: "key",
//     },
//     {
//       title: "Vendor",
//       dataIndex: "vendor",
//       sorter: stringSorter("vendor"),
//     },
//     {
//       title: "Code",
//       dataIndex: "code",
//       sorter: stringSorter("code"),
//     },
//     {
//       title: "Destination",
//       dataIndex: "destination",
//       sorter: stringSorter("destination"),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       sorter: stringSorter("status"),
//     },
//     {
//       title: "Date Created",
//       dataIndex: "createDate",
//       sorter: stringSorter("createDate"),
//     }, {
//       title: "Year",
//       dataIndex: "createYear",
//       sorter: stringSorter("createYear"),
//     }, ...measureColumns];
//   }
//   else {
//     columns = [...dimensionColumns, ...measureColumns];
//   }

//   return (
//     <div>
//       <h5 className="mb-4 title">Orders</h5>
//       <div>
//         Group by:
//         <button key="clear" className={"btn " + (selectedDimensions.length == 0 ? "btn-primary" : "btn-light") + " border-0 rounded-3 m-1"}
//           onClick={() => {
//             setSelectedDimensions([]);
//           }}>
//           {"All"}
//         </button>
//         {Object.keys(allDimensions).map((dimension) =>
//           <button key={dimension} className={"btn " + (selectedDimensions.includes(dimension) ? "btn-success" : "btn-light") + " border-0 rounded-3 m-1"}
//             onClick={() => {
//               let array = selectedDimensions;
//               var index = array.indexOf(dimension);
//               if (index !== -1) {
//                 array.splice(index, 1);
//               } else {
//                 array.push(dimension);
//               }
//               setSelectedDimensions([...array]);
//             }}>
//             {allDimensions[dimension]}
//           </button>

//         )}

//         {selectedDimensions.length == 0 ? <Table columns={columns} dataSource={ordersData} /> : <Table columns={columns} dataSource={Object.values(groupedData)} />}

//       </div>

//     </div>
//   );
// };


// const SaleTable2 = ({ salesData }) => {

//   const measureColumns = [
//     {
//       title: "Tax",
//       dataIndex: "taxPrice",
//       sorter: (a, b) => a.taxPrice - b.taxPrice,
//     },
//     {
//       title: "Total Price",
//       dataIndex: "totalPrice",
//       sorter: (a, b) => a.totalPrice - b.totalPrice,
//     },
//   ];

//   const allDimensions = { "job": "Job Name", "rep": "Representative", "shipTo": "Ship To", "branch": "Branch", "date": "Date", "year": "Year" };

//   const [selectedDimensions, setSelectedDimensions] = useState([]);

//   let groupedData = {};

//   for (let i = 0; i < salesData?.length; i++) {
//     const product = salesData[i];
//     let dimensionKey = "";
//     selectedDimensions.forEach((dimension) => { dimensionKey += product[dimension] + " ^-^ " });
//     if (groupedData[dimensionKey] == null) {
//       groupedData[dimensionKey] = {};
//       groupedData[dimensionKey].totalPrice = 0;
//       groupedData[dimensionKey].taxPrice = 0;
//       selectedDimensions.forEach((dimension) => { groupedData[dimensionKey][dimension] = product[dimension]; });
//     }
//     groupedData[dimensionKey].totalPrice += product.totalPrice;
//     groupedData[dimensionKey].taxPrice += product.taxPrice;
//   }
//   // Object.keys(groupedData).forEach((dimensionKey) => {
//   //   groupedData[dimensionKey].totalPrice += groupedData[dimensionKey].totalPrice.toFixed(2);
//   //   groupedData[dimensionKey].taxPrice +=groupedData[dimensionKey].taxPrice.toFixed(2);
//   // });

//   let columns = [];
//   let dimensionColumns = [];
//   selectedDimensions.forEach((dimension) => {
//     dimensionColumns.push({
//       title: allDimensions[dimension],
//       dataIndex: dimension,
//       sorter: stringSorter(dimension),
//     },);

//   });

//   if (selectedDimensions?.length == 0) {
//     columns = [{
//       title: "SNo",
//       dataIndex: "key",
//     },
//     {
//       title: "ID",
//       dataIndex: "id",
//     },
//     {
//       title: "Job Name",
//       dataIndex: "job",
//       sorter: stringSorter("job"),
//     },
//     {
//       title: "Representative",
//       dataIndex: "rep",
//       sorter: stringSorter("rep"),
//     },
//     {
//       title: "Ship To",
//       dataIndex: "shipTo",
//       sorter: stringSorter("shipTo"),
//     },
//     {
//       title: "Branch",
//       dataIndex: "branch",
//       sorter: stringSorter("branch"),
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       sorter: stringSorter("date"),
//     }, {
//       title: "Year",
//       dataIndex: "year",
//       sorter: stringSorter("year"),
//     }, ...measureColumns];
//   }
//   else {
//     columns = [...dimensionColumns, ...measureColumns];
//   }

//   return (
//     <div>
//       <h5 className="mb-4 title">Sales</h5>
//       <div>
//         Group by:
//         <button key="clear" className={"btn " + (selectedDimensions?.length == 0 ? "btn-primary" : "btn-light") + " border-0 rounded-3 m-1"}
//           onClick={() => {
//             setSelectedDimensions([]);
//           }}>
//           {"All"}
//         </button>
//         {Object.keys(allDimensions).map((dimension) =>
//           <button key={dimension} className={"btn " + (selectedDimensions.includes(dimension) ? "btn-success" : "btn-light") + " border-0 rounded-3 m-1"}
//             onClick={() => {
//               let array = selectedDimensions;
//               var index = array.indexOf(dimension);
//               if (index !== -1) {
//                 array.splice(index, 1);
//               } else {
//                 array.push(dimension);
//               }
//               setSelectedDimensions([...array]);
//             }}>
//             {allDimensions[dimension]}
//           </button>
//         )}
//         {selectedDimensions?.length == 0 ? <Table columns={columns} dataSource={salesData} /> : <Table columns={columns} dataSource={Object.values(groupedData)} />}
//       </div>

//     </div>
//   );
// };



const ProductTable = ({ productsData }) => {

  const measureColumns = [
    {
      Header: "Cost",
      accessor: "price",
      align: "right"
    },
    {
      Header: "Sold Quantity",
      accessor: "soldQuantity",
      align: "right"
    },
    {
      Header: "Revenue",
      accessor: "revenue",
      align: "right"
    },
    {
      Header: "Case Quantity",
      accessor: "caseQuantity",
      align: "right"
    },
    {
      Header: "Case per Pallet",
      accessor: "casePallet",
      align: "right"
    },
    {
      Header: "Savannah (On Way)",
      accessor: "savannah",
      align: "right"
    },
    {
      Header: "Nashville (On Way)",
      accessor: "nashville",
      align: "right"
    },
    {
      Header: "Atlanta (On Way)",
      accessor: "atlanta",
      align: "right"
    },
    {
      Header: "Turkiye",
      accessor: "stockTr",
      align: "right"
    },
  ];

  const allDimensions = { "vendor": "Vendor", "category": "Category", "subCategory": "Sub Category", "size": "Size" };

  const [selectedDimensions, setSelectedDimensions] = useState([]);

  let groupedData = {};

  for (let i = 0; i < productsData.length; i++) {
    const product = productsData[i];
    let dimensionKey = "";
    selectedDimensions.forEach((dimension) => { dimensionKey += product[dimension] + " ^-^ " });
    if (groupedData[dimensionKey] == null) {
      groupedData[dimensionKey] = {};
      groupedData[dimensionKey].price = 0;
      groupedData[dimensionKey].caseQuantity = 0;
      groupedData[dimensionKey].casePallet = 0;
      groupedData[dimensionKey].savannah = 0;
      groupedData[dimensionKey].nashville = 0;
      groupedData[dimensionKey].atlanta = 0;
      groupedData[dimensionKey].stockTr = 0;
      groupedData[dimensionKey].soldQuantity = 0;
      groupedData[dimensionKey].revenue = 0;
      selectedDimensions.forEach((dimension) => { groupedData[dimensionKey][dimension] = product[dimension]; });
    }
    groupedData[dimensionKey].price += product.price;
    groupedData[dimensionKey].caseQuantity += product.caseQuantity;
    groupedData[dimensionKey].casePallet += product.casePallet;
    groupedData[dimensionKey].savannah += product.savannah;
    groupedData[dimensionKey].nashville += product.nashville;
    groupedData[dimensionKey].atlanta += product.atlanta;
    groupedData[dimensionKey].stockTr += product.stockTr;
    groupedData[dimensionKey].soldQuantity += product.soldQuantity;
    groupedData[dimensionKey].revenue += product.revenue;
  }
  let columns = [];
  let dimensionColumns = [];
  selectedDimensions.forEach((dimension) => {
    dimensionColumns.push({
      Header: allDimensions[dimension],
      accessor: dimension,
    },);
  });

  if (selectedDimensions.length == 0) {
    columns = [{
      Header: "SNo",
      accessor: "key",
    },
    {
      Header: "SKU",
      accessor: "SKU",
    },
    {
      Header: "Vendor",
      accessor: "vendor",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Subcategory",
      accessor: "subCategory",
    },
    {
      Header: "Size",
      accessor: "size",
    }, ...measureColumns];
  }
  else {
    columns = [...dimensionColumns, ...measureColumns];
  }

  return (
    <div className="mt-2">
      <Grid item xs={12}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            pt={2}

            px={2}
            variant="gradient"
            bgColor="success"
            borderRadius="lg"
            coloredShadow="success"
          >
            <MDTypography variant="h6" color="white">
              <div className="d-flex justify-content-between"><h3 className="mb-3 pt-2">Products</h3>
                <div className="mt-0">


                  Group by:
                  <button key="clear" className={"btn " + (selectedDimensions.length == 0 ? "btn-primary" : "btn-light") + " border-0 rounded-3 m-1"}
                    onClick={() => {
                      setSelectedDimensions([]);
                    }}>
                    {"All"}
                  </button>
                  {Object.keys(allDimensions).map((dimension) =>

                    <button key={dimension} className={"btn " + (selectedDimensions.includes(dimension) ? "btn-success" : "btn-light") + " border-0 rounded-3 m-1"}
                      onClick={() => {
                        let array = selectedDimensions;
                        var index = array.indexOf(dimension);
                        if (index !== -1) {
                          array.splice(index, 1);
                        } else {
                          array.push(dimension);
                        }
                        setSelectedDimensions([...array]);
                      }}>
                      {allDimensions[dimension]}
                    </button>

                    // <MDButton className="mr-2" color= {(selectedDimensions.includes(dimension) ? "success" : "light")} onClick={() => {
                    //   let array = selectedDimensions;
                    //   var index = array.indexOf(dimension);
                    //   if (index !== -1) {
                    //     array.splice(index, 1);
                    //   } else {
                    //     array.push(dimension);
                    //   }
                    //   setSelectedDimensions([...array]);
                    // }}>{allDimensions[dimension]} </MDButton>

                  )}

                </div>
              </div>
            </MDTypography>
          </MDBox>
          <MDBox pt={0}>
            <DataTable
              table={{ columns: columns, rows: (selectedDimensions.length == 0 ? productsData : Object.values(groupedData)) }}
              isSorted={true}
              entriesPerPage={true}
              showTotalEntries={true}
              noEndBorder
              canSearch
            />
          </MDBox>
        </Card>
      </Grid>
    </div>
  );
};



const OrderTable = ({ ordersData }) => {

  const measureColumns = [
    { Header: "Total Price", accessor: "totalPrice", align: "right" }
  ];

  const allDimensions = { "vendor": "Vendor", "destination": "Destination", "status": "Status", "createDate": "Date Created", "createYear": "Year" };

  const [selectedDimensions, setSelectedDimensions] = useState([]);

  let groupedData = {};

  for (let i = 0; i < ordersData.length; i++) {
    const product = ordersData[i];
    let dimensionKey = "";
    selectedDimensions.forEach((dimension) => { dimensionKey += product[dimension] + " ^-^ " });
    if (groupedData[dimensionKey] == null) {
      groupedData[dimensionKey] = {};
      groupedData[dimensionKey].totalPrice = 0;
      selectedDimensions.forEach((dimension) => { groupedData[dimensionKey][dimension] = product[dimension]; });
    }
    groupedData[dimensionKey].totalPrice += product.totalPrice;
  }
  let columns = [];
  let dimensionColumns = [];
  selectedDimensions.forEach((dimension) => {
    dimensionColumns.push({
      Header: allDimensions[dimension],
      accessor: dimension,
    },);

  });

  if (selectedDimensions.length == 0) {
    columns = [{
      Header: "SNo",
      accessor: "key",
    },
    {
      Header: "Vendor",
      accessor: "vendor",

    },
    {
      Header: "Code",
      accessor: "code",

    },
    {
      Header: "Destination",
      accessor: "destination",

    },
    {
      Header: "Status",
      accessor: "status",

    },
    {
      Header: "Date Created",
      accessor: "createDate",

    }, {
      Header: "Year",
      accessor: "createYear",
    }, ...measureColumns];
  }
  else {
    columns = [...dimensionColumns, ...measureColumns];
  }

  return (
    <div className="mt-5">
      <Grid item xs={12}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            pt={2}

            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              <div className="d-flex justify-content-between"><h3 className="mb-3 pt-2">Orders</h3>
                <div className="mt-0">


                  Group by:
                  <button key="clear" className={"btn " + (selectedDimensions.length == 0 ? "btn-primary" : "btn-light") + " border-0 rounded-3 m-1"}
                    onClick={() => {
                      setSelectedDimensions([]);
                    }}>
                    {"All"}
                  </button>
                  {Object.keys(allDimensions).map((dimension) =>
                    <button key={dimension} className={"btn " + (selectedDimensions.includes(dimension) ? "btn-success" : "btn-light") + " border-0 rounded-3 m-1"}
                      onClick={() => {
                        let array = selectedDimensions;
                        var index = array.indexOf(dimension);
                        if (index !== -1) {
                          array.splice(index, 1);
                        } else {
                          array.push(dimension);
                        }
                        setSelectedDimensions([...array]);
                      }}>
                      {allDimensions[dimension]}
                    </button>

                  )}

                </div>
              </div>
            </MDTypography>
          </MDBox>
          <MDBox pt={0}>
            <DataTable
              table={{ columns: columns, rows: (selectedDimensions.length == 0 ? ordersData : Object.values(groupedData)) }}
              isSorted={true}
              entriesPerPage={true}
              showTotalEntries={true}
              noEndBorder
              canSearch
            />
          </MDBox>
        </Card>
      </Grid>
    </div>
  );
};




const SaleTable = ({ salesData }) => {

  const measureColumns = [
    {
      Header: "Tax",
      accessor: "taxPrice",
      align: "right"
    },
    {
      Header: "Total Price",
      accessor: "totalPrice",
      align: "right"
    },
  ];


  const allDimensions = { "job": "Job Name", "rep": "Representative", "shipTo": "Ship To", "branch": "Branch", "date": "Date", "year": "Year" };

  const [selectedDimensions, setSelectedDimensions] = useState([]);

  let groupedData = {};

  for (let i = 0; i < salesData?.length; i++) {
    const product = salesData[i];
    let dimensionKey = "";
    selectedDimensions.forEach((dimension) => { dimensionKey += product[dimension] + " ^-^ " });
    if (groupedData[dimensionKey] == null) {
      groupedData[dimensionKey] = {};
      groupedData[dimensionKey].totalPrice = 0;
      groupedData[dimensionKey].taxPrice = 0;
      selectedDimensions.forEach((dimension) => { groupedData[dimensionKey][dimension] = product[dimension]; });
    }
    groupedData[dimensionKey].totalPrice += product.totalPrice;
    groupedData[dimensionKey].taxPrice += product.taxPrice;
  }
  let columns = [];
  let dimensionColumns = [];
  selectedDimensions.forEach((dimension) => {
    dimensionColumns.push({
      Header: allDimensions[dimension],
      accessor: dimension,
    },);

  });

  if (selectedDimensions.length == 0) {
    columns = [{
      Header: "SNo",
      accessor: "key",
    },
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Job Name",
      accessor: "job",
    },
    {
      Header: "Representative",
      accessor: "rep",
    },
    {
      Header: "Ship To",
      accessor: "shipTo",
    },
    {
      Header: "Branch",
      accessor: "branch",
    },
    {
      Header: "Date",
      accessor: "date",
    }, {
      Header: "Year",
      accessor: "year",
    }, ...measureColumns];
  }
  else {
    columns = [...dimensionColumns, ...measureColumns];
  }

  return (
    <div className="mt-5">
      <Grid item xs={12}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            pt={2}

            px={2}
            variant="gradient"
            bgColor="primary"
            borderRadius="lg"
            coloredShadow="primary"
          >
            <MDTypography variant="h6" color="white">
              <div className="d-flex justify-content-between"><h3 className="mb-3 pt-2">Sales</h3>
                <div className="mt-0">


                  Group by:
                  <button key="clear" className={"btn " + (selectedDimensions.length == 0 ? "btn-primary" : "btn-light") + " border-0 rounded-3 m-1"}
                    onClick={() => {
                      setSelectedDimensions([]);
                    }}>
                    {"All"}
                  </button>
                  {Object.keys(allDimensions).map((dimension) =>
                    <button key={dimension} className={"btn " + (selectedDimensions.includes(dimension) ? "btn-success" : "btn-light") + " border-0 rounded-3 m-1"}
                      onClick={() => {
                        let array = selectedDimensions;
                        var index = array.indexOf(dimension);
                        if (index !== -1) {
                          array.splice(index, 1);
                        } else {
                          array.push(dimension);
                        }
                        setSelectedDimensions([...array]);
                      }}>
                      {allDimensions[dimension]}
                    </button>

                  )}

                </div>
              </div>
            </MDTypography>
          </MDBox>
          <MDBox pt={0}>
            <DataTable
              table={{ columns: columns, rows: (selectedDimensions.length == 0 ? salesData : Object.values(groupedData)) }}
              isSorted={true}
              entriesPerPage={true}
              showTotalEntries={true}
              noEndBorder
              canSearch
            />
          </MDBox>
        </Card>
      </Grid>
    </div>
  );
};

export default Dashboard;
