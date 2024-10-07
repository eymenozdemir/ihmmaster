import React, { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteASale, loginQuickbooks, getCompanyInfo, getCompanyInfoGetter, loginQuickbooksTn, getCompanyInfoTn, getCompanyInfoGetterTn, getSalesDb, isLoggedIn, isLoggedInTn } from "../features/auth/authSlice";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";
import { BiWifiOff, BiWifi } from "react-icons/bi";
import { TbRefresh } from "react-icons/tb";


import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import MuiLink from "@mui/material/Link";
import MDButton from "components/MDButton";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DataTable from "examples/Tables/DataTable";


// const columns = [
//   {
//     title: "SNo",
//     dataIndex: "key",
//   },
//   {
//     title: "ID",
//     dataIndex: "id",
//   },
//   {
//     title: "Job Name",
//     dataIndex: "job",
//     sorter: (a, b) => a.job.length - b.job.length,
//   },
//   {
//     title: "Representative",
//     dataIndex: "rep",
//     sorter: (a, b) => a.rep.length - b.rep.length,
//   },
//   {
//     title: "Ship To",
//     dataIndex: "shipTo",
//     sorter: (a, b) => a.shipTo.length - b.shipTo.length,
//   },
//   {
//     title: "Tax",
//     dataIndex: "taxPrice",
//     sorter: (a, b) => a.taxPrice - b.taxPrice,
//   },
//   {
//     title: "Total Price",
//     dataIndex: "totalPrice",
//     sorter: (a, b) => a.totalPrice - b.totalPrice,
//   },
//   {
//     title: "Branch",
//     dataIndex: "branch",
//     sorter: (a, b) => a.branch.length - b.branch.length,
//   },
//   {
//     title: "Date",
//     dataIndex: "date",
//     sorter: (a, b) => a.date.length - b.date.length,
//   },
//   {
//     title: "Action",
//     dataIndex: "action",
//   },
// ];

const Sales = () => {
  const [open, setOpen] = useState(false);
  const [saleId, setSaleId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setSaleId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const saleState = useSelector((state) => state?.auth?.salesDB);
  const companyState = useSelector((state) => state?.auth?.companyInfo);
  const companyTnState = useSelector((state) => state?.auth?.companyInfoTn);
  const companyGotState = useSelector((state) => state?.auth?.companyInfoGot);
  const companyGotTnState = useSelector((state) => state?.auth?.companyInfoGotTn);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSalesDb());
  }, [companyGotState, companyGotTnState]);
  
  useEffect(() => {
    dispatch(getCompanyInfo());
    dispatch(getCompanyInfoTn());
  }, []);
  
  console.log('companyTnState: ', companyTnState);
  console.log('companyState: ', companyState);
  // useEffect(() => {
    //   dispatch(isLoggedIn());
    //   dispatch(isLoggedInTn());
    // }, []);
    const data1 = [];
    for (let i = 0; i < saleState?.length; i++) {
      data1.push({
        key: i + 1,
        id: saleState[i].invoiceId || "",
        job: saleState[i].job || "",
        rep: saleState[i].rep || "",
        shipTo: saleState[i].shipTo || "",
        taxPrice: Number((saleState[i]?.taxPrice).toFixed(2)) || 0,
        totalPrice: Number((saleState[i]?.totalPrice).toFixed(2)) || 0,
        branch: saleState[i].branch || "",
        date: saleState[i]?.date.split('T')[0] || "",
        year: saleState[i]?.date.split('-')[0] || "",
        action: (
          <div>
          <Link
            className="ms-3 fs-4 text-info"
            to={`/admin/sales/${saleState[i]._id}`}
            >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(saleState[i]._id)}
            >
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }
  const deleteSale = (e) => {
    dispatch(deleteASale(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getSalesDb());
    }, 100);
  };

  let lastSaleAtlanta = data1.filter((sale) => sale.branch == "Atlanta").sort((a, b) => {
    return b.date.localeCompare(a.date);
  });
  if (lastSaleAtlanta.length > 0) {
    lastSaleAtlanta = lastSaleAtlanta[0];
  }

  let lastSaleNashville = data1.filter((sale) => sale.branch == "Nashville").sort((a, b) => {
    return b.date.localeCompare(a.date);
  });
  if (lastSaleNashville.length > 0) {
    lastSaleNashville = lastSaleNashville[0];
  }
  return (
    <div>
      <div className="d-flex justify-content-between"><h3 className="mb-4 title">Sales</h3>
        <div className="mt-0">

          <MuiLink href="https://accounts.intuit.com/app/sign-in" target="_blank" rel="noreferrer">
            <MDButton >Switch Account</MDButton>
          </MuiLink>
        </div>

      </div>
      <div>
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color={companyState?.CompanyInfo?.CompanyName == "STONE NATURE LLC" ? "success" : "dark"}
                  icon={companyState?.CompanyInfo?.CompanyName == "STONE NATURE LLC" ? <BiWifi className="fs-3" /> : <BiWifiOff className="fs-3" />}
                  title={companyState?.CompanyInfo?.CompanyName == "STONE NATURE LLC" ? <font color="success"> Connected </font> : <font color="dark"> Not Connected </font>}
                  count="Atlanta"
                  percentage={{
                    color: "success",
                    amount: "",
                    label:
                      <div>
                        {companyState?.CompanyInfo?.CompanyName == "STONE NATURE LLC" ?
                          <MDButton color="success" onClick={() => {
                            dispatch(getCompanyInfoGetter());
                          }}>Sync Sales in Atlanta <TbRefresh className="ms-1" size={20} /> </MDButton> : <MDButton color="dark" onClick={() => {
                            dispatch(loginQuickbooks());
                          }}>Connect to Quickbooks Atlanta</MDButton>}
                        <div className="ms-2 mt-2">Last synced sale: {lastSaleAtlanta?.date?.split('T')[0]} </div>
                      </div>
                    ,
                  }}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color={companyTnState?.CompanyInfo?.CompanyName == "Stone Nature TN LLC" ? "success" : "dark"}
                  icon={companyTnState?.CompanyInfo?.CompanyName == "Stone Nature TN LLC" ? <BiWifi className="fs-3" /> : <BiWifiOff className="fs-3" />}
                  title={companyTnState?.CompanyInfo?.CompanyName == "Stone Nature TN LLC" ? <font color="success"> Connected </font> : <font color="dark"> Not Connected </font>}
                  count="Nashville"
                  percentage={{
                    color: "success",
                    amount: "",
                    label:
                      <div>
                        {companyTnState?.CompanyInfo?.CompanyName == "Stone Nature TN LLC" ?
                          <MDButton color="success" onClick={() => {
                            dispatch(getCompanyInfoGetterTn());
                          }}>Sync Sales in Nashville <TbRefresh className="ms-1" size={20} /> </MDButton> : <MDButton color="dark" onClick={() => {
                            dispatch(loginQuickbooksTn());
                          }}>Connect to Quickbooks Nashville</MDButton>}
                        <div className="ms-2 mt-2">Last synced sale: {lastSaleNashville?.date?.split('T')[0]} </div>
                      </div>
                    ,
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </div>

      {/* <div>
        <Table columns={columns} dataSource={data1} />
      </div> */}
      <div>
        {SaleTable( {salesData: data1} )}
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteSale(saleId);
        }}
        title="Are you sure you want to delete this Sale ?"
      />

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
    {
      Header: "Action",
      accessor: "action",
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
      width:"5%", 
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
    <div className="">
      <Grid item xs={12}>
        <Card>
          {/* <MDBox
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
          </MDBox> */}
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

export default Sales;
