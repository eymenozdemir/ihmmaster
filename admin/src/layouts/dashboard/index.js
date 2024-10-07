/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
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
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;





// /**
// =========================================================
// * Material Dashboard 2 React - v2.2.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // @mui material components
// import Grid from "@mui/material/Grid";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";

// // Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// // Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// // Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";


// import React, { useEffect, useState } from "react";
// import { Table } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { getProductSaleView, deleteAProduct } from "features/product/productSlice";
// import { getAUser, getOrders, getSalesDb } from "features/auth/authSlice";

// const stringSorter = (name) => { return (a, b) => (a[name] == undefined ? "" : a[name]).localeCompare((b[name] == undefined ? "" : b[name])) };


// function Dashboard() {
//   const { sales, tasks } = reportsLineChartData;

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox py={3}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6} lg={3}>
//             <MDBox mb={1.5}>
//               <ComplexStatisticsCard
//                 color="dark"
//                 icon="weekend"
//                 title="Bookings"
//                 count={281}
//                 percentage={{
//                   color: "success",
//                   amount: "+55%",
//                   label: "than lask week",
//                 }}
//               />
//             </MDBox>
//           </Grid>
//           <Grid item xs={12} md={6} lg={3}>
//             <MDBox mb={1.5}>
//               <ComplexStatisticsCard
//                 icon="leaderboard"
//                 title="Today's Users"
//                 count="2,300"
//                 percentage={{
//                   color: "success",
//                   amount: "+3%",
//                   label: "than last month",
//                 }}
//               />
//             </MDBox>
//           </Grid>
//           <Grid item xs={12} md={6} lg={3}>
//             <MDBox mb={1.5}>
//               <ComplexStatisticsCard
//                 color="success"
//                 icon="store"
//                 title="Revenue"
//                 count="34k"
//                 percentage={{
//                   color: "success",
//                   amount: "+1%",
//                   label: "than yesterday",
//                 }}
//               />
//             </MDBox>
//           </Grid>
//           <Grid item xs={12} md={6} lg={3}>
//             <MDBox mb={1.5}>
//               <ComplexStatisticsCard
//                 color="primary"
//                 icon="person_add"
//                 title="Followers"
//                 count="+91"
//                 percentage={{
//                   color: "success",
//                   amount: "",
//                   label: "Just updated",
//                 }}
//               />
//             </MDBox>
//           </Grid>
//         </Grid>
//         <MDBox mt={4.5}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mb={3}>
//                 <ReportsBarChart
//                   color="info"
//                   title="website views"
//                   description="Last Campaign Performance"
//                   date="campaign sent 2 days ago"
//                   chart={reportsBarChartData}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mb={3}>
//                 <ReportsLineChart
//                   color="success"
//                   title="daily sales"
//                   description={
//                     <>
//                       (<strong>+15%</strong>) increase in today sales.
//                     </>
//                   }
//                   date="updated 4 min ago"
//                   chart={sales}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mb={3}>
//                 <ReportsLineChart
//                   color="dark"
//                   title="completed tasks"
//                   description="Last Campaign Performance"
//                   date="just updated"
//                   chart={tasks}
//                 />
//               </MDBox>
//             </Grid>
//           </Grid>
//         </MDBox>
//         <MDBox>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6} lg={8}>
//               <Projects />
//             </Grid>
//             <Grid item xs={12} md={6} lg={4}>
//               <OrdersOverview />
//             </Grid>
//           </Grid>
//         </MDBox>
//       </MDBox>
//       {ProductTable()}
//       {/* {OrderTable()}
//       {SaleTable()} */}
//       <Footer />
//     </DashboardLayout>
//   );
// }



// const ProductTable = () => {

//   const measureColumns = [
//     {
//       title: "Cost",
//       dataIndex: "price",
//       sorter: (a, b) => a.price - b.price,
//     },
//     // {
//     //   title: "Sold Quantity",
//     //   dataIndex: "quantity",
//     // },
//     // {
//     //   title: "Earning",
//     //   dataIndex: "earning",
//     // },
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

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getProductSaleView());
//   }, []);
//   // const productState = useSelector((state) => state.product.productSaleView);
//   const productState = useSelector((state) => Object.keys(state.product.productSaleView).map((key) => state.product.productSaleView[key]));
//   const data1 = [];

//   const [selectedDimensions, setSelectedDimensions] = useState([]);

//   for (let i = 0; i < productState.length; i++) {

//     data1.push({
//       key: i + 1,
//       SKU: productState[i].SKU,
//       vendor: productState[i].vendor || "",
//       title: productState[i].title || "",
//       category: productState[i].category || "",
//       subCategory: productState[i].subCategory || "",
//       size: productState[i].size || "",
//       price: productState[i].price || 0,
//       caseQuantity: productState[i].caseQuantity || 0, //+ " " + productState[i].caseUnit,
//       casePallet: productState[i].casePallet || 0,
//       savannah: productState[i].stockSavannah || 0, //+ " (" + productState[i].toSavannah + ")",
//       nashville: productState[i].stockNashville || 0, //+ " (" + productState[i].toNashville + ")",
//       atlanta: productState[i].stockAtlanta || 0, //+ " (" + productState[i].toAtlanta + ")",
//       stockTr: productState[i].stockTr || 0,
//     });
//   }

//   let groupedData = {};

//   for (let i = 0; i < data1.length; i++) {
//     const product = data1[i];
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
//       selectedDimensions.forEach((dimension) => { groupedData[dimensionKey][dimension] = product[dimension]; });
//     }
//     groupedData[dimensionKey].price += product.price;
//     groupedData[dimensionKey].caseQuantity += product.caseQuantity;
//     groupedData[dimensionKey].casePallet += product.casePallet;
//     groupedData[dimensionKey].savannah += product.savannah;
//     groupedData[dimensionKey].nashville += product.nashville;
//     groupedData[dimensionKey].atlanta += product.atlanta;
//     groupedData[dimensionKey].stockTr += product.stockTr;
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


//         {selectedDimensions.length == 0 ? <Table columns={columns} dataSource={data1} /> : <Table columns={columns} dataSource={Object.values(groupedData)} />}

//       </div>

//     </div >
//   );
// };


// const OrderTable = () => {

//   const measureColumns = [
//     {
//       title: "Total Price",
//       dataIndex: "totalPrice",
//       sorter: (a, b) => a.totalPrice - b.totalPrice,
//     },
//   ];

//   const allDimensions = { "vendor": "Vendor", "destination": "Destination", "status": "Status", "createDate": "Date Created", "createYear": "Year" };

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getOrders());
//   }, []);
//   const dataState = useSelector((state) => state?.auth?.orders);
//   const data1 = [];

//   const [selectedDimensions, setSelectedDimensions] = useState([]);

//   for (let i = 0; i < dataState.length; i++) {

//     data1.push({
//       key: i + 1,
//       vendor: dataState[i].user,
//       code: dataState[i].containerCode,
//       totalPrice: dataState[i].totalPrice,
//       destination: dataState[i].destination,
//       status: dataState[i].orderStatus,
//       createDate: dataState[i].createdAt.slice(0, 10),
//       createYear: dataState[i].createdAt.slice(0, 4),
//       // createdAt: dataState[i].createDate.slice(0, 4),
//     });
//   }

//   let groupedData = {};

//   for (let i = 0; i < data1.length; i++) {
//     const product = data1[i];
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

//         {selectedDimensions.length == 0 ? <Table columns={columns} dataSource={data1} /> : <Table columns={columns} dataSource={Object.values(groupedData)} />}

//       </div>

//     </div>
//   );
// };


// const SaleTable = () => {

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

//   const allDimensions = { "job": "Job Name", "rep": "Representative", "shipTo": "Ship To", "branch": "Branch", "date": "Date" };

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getSalesDb());
//   }, []);
//   const dataState = useSelector((state) => state?.auth?.salesDB);
//   const data1 = [];

//   const [selectedDimensions, setSelectedDimensions] = useState([]);

//   for (let i = 0; i < dataState?.length; i++) {
//     data1.push({
//       key: i + 1,
//       id: dataState[i].invoiceId || "",
//       job: dataState[i].job || "",
//       rep: dataState[i].rep || "",
//       shipTo: dataState[i].shipTo || "",
//       taxPrice: dataState[i].taxPrice || 0,
//       totalPrice: dataState[i].totalPrice || 0,
//       branch: dataState[i].branch || "",
//       date: dataState[i].date || "",
//     });
//   }

//   let groupedData = {};

//   for (let i = 0; i < data1?.length; i++) {
//     const product = data1[i];
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
//         {selectedDimensions?.length == 0 ? <Table columns={columns} dataSource={data1} /> : <Table columns={columns} dataSource={Object.values(groupedData)} />}
//       </div>

//     </div>
//   );
// };



// export default Dashboard;
