import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../features/auth/authSlice";

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


import { FaClipboardList } from "react-icons/fa";
import { RiShip2Fill } from "react-icons/ri";
import { IoIosBusiness } from "react-icons/io";
import { FaUser } from "react-icons/fa";

import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { MdOutlineKeyboardArrowDown, MdFilterAltOff } from "react-icons/md";
import { getCompanies } from "features/company/companySlice";
import { getVessels } from "features/vessel/vesselSlice";
import { getDocuments } from "features/document/documentSlice";

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

const AdminDashboard = () => {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  let uiEndDate = new Date(endDate);
  uiEndDate.setDate(uiEndDate.getDate() - 1);

  const dispatch = useDispatch();
  let isAdmin = false;
  const roleState = useSelector((state) => state?.auth?.user);


  useEffect(() => {
    dispatch(getCompanies());
    dispatch(getVessels());
    dispatch(getDocuments());
    dispatch(getAllUsers());
  }, []);

  const documentState = useSelector((state) => state?.document?.documents);
  const documentsData = [];

  for (let i = 0; i < documentState?.length; i++) {
    if ((startDate == null && endDate == null) || (new Date(documentState[i]?.createdAt.split('T')[0] + "T06:00:00+00:00") >= startDate && new Date(documentState[i]?.createdAt.split('T')[0] + "T06:00:00+00:00") <= endDate)) {

      documentsData.push({
        key: i + 1,
        title: documentState[i]?.title,
        type: documentState[i]?.type?.title,
        company: documentState[i]?.company?.title,
        vessel: documentState[i]?.vessel?.title,
        documentStatus: documentState[i]?.documentStatus,
        createDate: documentState[i]?.createdAt.slice(0, 10),
        documentCount: 1,
      });
    }
  }

  const companyState = useSelector((state) => state?.company?.companies);
  const companiesData = [];

  for (let i = 0; i < companyState?.length; i++) {
    if ((startDate == null && endDate == null) || (new Date(companyState[i]?.createdAt.split('T')[0] + "T06:00:00+00:00") >= startDate && new Date(companyState[i]?.createdAt.split('T')[0] + "T06:00:00+00:00") <= endDate)) {

      companiesData.push({
        key: i + 1,
        title: companyState[i]?.title,
        IMO: companyState[i]?.IMO,
        email: companyState[i]?.email,
        number: companyState[i]?.number,
        address: companyState[i]?.address,
        city: companyState[i]?.city,
        country: companyState[i]?.country,
        createDate: companyState[i]?.createdAt.slice(0, 10),
        companyCount: 1,
      });
    }
  }

  const vesselState = useSelector((state) => state?.vessel?.vessels);
  const vesselsData = [];

  for (let i = 0; i < vesselState?.length; i++) {
    if ((startDate == null && endDate == null) || (new Date(vesselState[i]?.createdAt.split('T')[0] + "T06:00:00+00:00") >= startDate && new Date(vesselState[i]?.createdAt.split('T')[0] + "T06:00:00+00:00") <= endDate)) {
      vesselsData.push({
        key: i + 1,
        title: vesselState[i]?.title,
        IMO: vesselState[i]?.IMO,
        company: vesselState[i]?.company?.title,
        type: vesselState[i]?.type,
        flag: vesselState[i]?.flag,
        tonnage: vesselState[i]?.tonnage,
        year: vesselState[i]?.year,
        createDate: vesselState[i]?.createdAt.slice(0, 10),
        vesselCount: 1,
      });
    }
  }

  const userState = useSelector((state) => state?.auth?.users);
  const usersData = [];

  for (let i = 0; i < userState?.length; i++) {
    if ((startDate == null && endDate == null) || (new Date(userState[i]?.createdAt.split('T')[0] + "T06:00:00+00:00") >= startDate && new Date(userState[i]?.createdAt.split('T')[0] + "T06:00:00+00:00") <= endDate)) {
        usersData.push({
        key: i + 1,
        role: userState[i]?.role,
        name: userState[i]?.name,
        email: userState[i]?.email,
        mobile: userState[i]?.mobile,
        company: userState[i]?.company?.title,
        vessel: userState[i]?.vessel?.title,
        createDate: userState[i]?.createdAt.slice(0, 10),
        userCount: 1,
      });
    }
  }

  const usersChartMap = {};

  usersData.forEach((user) => {
    if (usersChartMap[user?.createDate?.substr(0, 7)] == null) {

      usersChartMap[user?.createDate?.substr(0, 7)] = 0;
    }
    usersChartMap[user?.createDate?.substr(0, 7)] += 1;
  });
  const finalUsersChartMap = Object.keys(usersChartMap).sort().reduce(
    (obj, key) => {
      obj[key] = usersChartMap[key];
      return obj;
    },
    {}
  );
  const usersChartData = {
    labels: Object.keys(finalUsersChartMap).map((element) => formatYYYYMM(element)), datasets: { label: "Total Amount", data: Object.values(finalUsersChartMap) }
  };
  const usersChartArray = Object.values(finalUsersChartMap);

  const vesselsChartMap = {};

  vesselsData.forEach((vessel) => {
    if (vesselsChartMap[vessel?.createDate?.substr(0, 7)] == null) {

      vesselsChartMap[vessel?.createDate?.substr(0, 7)] = 0;
    }
    vesselsChartMap[vessel?.createDate?.substr(0, 7)] += 1;
  });
  const finalVesselsChartMap = Object.keys(vesselsChartMap).sort().reduce(
    (obj, key) => {
      obj[key] = vesselsChartMap[key];
      return obj;
    },
    {}
  );
  const vesselsChartData = {
    labels: Object.keys(finalVesselsChartMap).map((element) => formatYYYYMM(element)), datasets: { label: "Total Amount", data: Object.values(finalVesselsChartMap) }
  };
  const vesselsChartArray = Object.values(finalVesselsChartMap);


  const companiesChartMap = {};

  companiesData.forEach((company) => {
    if (companiesChartMap[company?.createDate?.substr(0, 7)] == null) {

      companiesChartMap[company?.createDate?.substr(0, 7)] = 0;
    }
    companiesChartMap[company?.createDate?.substr(0, 7)] += 1;
  });
  const finalCompaniesChartMap = Object.keys(companiesChartMap).sort().reduce(
    (obj, key) => {
      obj[key] = companiesChartMap[key];
      return obj;
    },
    {}
  );
  const companiesChartData = {
    labels: Object.keys(finalCompaniesChartMap).map((element) => formatYYYYMM(element)), datasets: { label: "Total Amount", data: Object.values(finalCompaniesChartMap) }
  };
  const companiesChartArray = Object.values(finalCompaniesChartMap);

  let fileAlertCount = documentState.filter((p) => p?.documentStatus == "New Uploaded")?.length;
  //console.log('fileAlertCount: ', fileAlertCount);
  let fileText = {
    color: "success",
    amount: "All documents",
    label: "are in up to date!",
  }
  if (fileAlertCount > 0) {
    fileText = {
      color: "danger",
      amount: fileAlertCount,
      label: fileAlertCount > 1 ? "documents need to be updated!" : "document needs to be updated!",
    }
  }


  let vesselCount = vesselState?.length;

  let vesselQuantityText = {
    color: "success",
    amount: vesselCount-1,
    label: "ships are sailing in the system!",
  };
  

  let companyCount = companyState?.length;
  let companyQuantityText = {
    color: "success",
    amount: companyCount,
    label: "companies are working with IHM Master!",
  };

  let userCount = userState?.length;

  let userQuantityText = {
    color: "success",
    amount: userCount,
    label: "people are saving time with IHM Master!",
  };

  if (roleState?.role === "Admin") {
    isAdmin = true;
  }


  return (
    <>
      {isAdmin ? <>

        <div>
          <div className="d-flex justify-content-between">
            <h3 className="mb-4 title">Admin Dashboard</h3>
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
                    color="success"
                    icon={<IoIosBusiness className="fs-4" />}
                    title="Companies"
                    count={companyCount}
                    percentage={companyQuantityText}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    icon={<RiShip2Fill className="fs-4" />}
                    title="Ships"
                    count={vesselCount}
                    percentage={vesselQuantityText}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="dark"
                    icon={<FaUser className="fs-4" />}
                    title="Users"
                    count={userCount}
                    percentage={userQuantityText}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    color="primary"
                    icon={<FaClipboardList className="fs-4" />}
                    title="Documents"
                    count={fileAlertCount}
                    percentage={fileText}
                  />
                </MDBox>
              </Grid>
            </Grid>
            <MDBox mt={4.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsBarChart
                      color="success"
                      title="Monthly Companies Added"
                      description={"Average " + (companiesChartArray.length > 0 ? (companiesChartArray.reduce((total, element) => { return total + element }, 0) / companiesChartArray.length).toFixed(0) : "0") + " new companies discover IHMMaster!"}
                      // date="campaign sent 2 days ago"
                      chart={companiesChartData}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="info"
                      title="Monthly Ships Added"
                      description={
                        "Average " + (vesselsChartArray.length > 0 ? (vesselsChartArray.reduce((total, element) => { return total + element }, 0) / vesselsChartArray.length).toFixed(0) : "0") + " new ships sail on IHMMaster!"
                      }
                      // date="updated 4 min ago"
                      chart={vesselsChartData}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="dark"
                      title="Number of Users"
                      description={"Average " + (usersChartArray.length > 0 ? (usersChartArray.reduce((total, element) => { return total + element }, 0) / usersChartArray.length).toFixed(0) : "0") + " new users join!"}
                      // date="just updated"
                      chart={usersChartData}
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>

          <DocumentTable documentsData={documentsData} />
          <UserTable usersData={usersData} />
          <VesselTable vesselsData={vesselsData} />
          <CompanyTable companiesData={companiesData} />

        </div>
      </> : <div>
        <h3 className="mb-4 title">Admin Dashboard</h3>
        <h5 className="mb-4 ">You do not have permission to view this page!</h5>
      </div>}

      
    </>
  );
};


const DocumentTable = ({ documentsData }) => {

    const measureColumns = [
      {
        Header: "Number of Files",
        accessor: "documentCount",
        align: "right"
      },
    ];
  
  
    const allDimensions = { "company": "Company", "vessel": "Ship", "type": "Type", "documentStatus": "Current Status" };
  
    const [selectedDimensions, setSelectedDimensions] = useState([]);
  
    let groupedData = {};
  
    for (let i = 0; i < documentsData?.length; i++) {
      const document = documentsData[i];
      let dimensionKey = "";
      selectedDimensions.forEach((dimension) => { dimensionKey += document[dimension] + " ^-^ " });
      if (groupedData[dimensionKey] == null) {
        groupedData[dimensionKey] = {};
        groupedData[dimensionKey].documentCount = 0;
        selectedDimensions.forEach((dimension) => { groupedData[dimensionKey][dimension] = document[dimension]; });
      }
      groupedData[dimensionKey].documentCount += document.documentCount;
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
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Company",
        accessor: "company",
      },
      {
        Header: "Vessel",
        accessor: "vessel",
      },
      {
        Header: "Current Status",
        accessor: "documentStatus",
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
                <div className="d-flex justify-content-between"><h3 className="mb-3 pt-2">Documents</h3>
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
                table={{ columns: columns, rows: (selectedDimensions.length == 0 ? documentsData : Object.values(groupedData)) }}
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


const VesselTable = ({ vesselsData }) => {

    const measureColumns = [
      {
        Header: "Number of Ships",
        accessor: "vesselCount",
        align: "right"
      },
    ];
  
  
    const allDimensions = { "company": "Company", "type": "Type", "flag": "Flag", "year": "Year" };
  
    const [selectedDimensions, setSelectedDimensions] = useState([]);
  
    let groupedData = {};
  
    for (let i = 0; i < vesselsData?.length; i++) {
      const vessel = vesselsData[i];
      let dimensionKey = "";
      selectedDimensions.forEach((dimension) => { dimensionKey += vessel[dimension] + " ^-^ " });
      if (groupedData[dimensionKey] == null) {
        groupedData[dimensionKey] = {};
        groupedData[dimensionKey].vesselCount = 0;
        selectedDimensions.forEach((dimension) => { groupedData[dimensionKey][dimension] = vessel[dimension]; });
      }
      groupedData[dimensionKey].vesselCount += vessel.vesselCount;
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
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "IMO",
        accessor: "IMO",
      },
      {
        Header: "Company",
        accessor: "company",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Flag",
        accessor: "flag",
      },
      {
        Header: "Tonnage",
        accessor: "tonnage",
      },
      {
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
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                <div className="d-flex justify-content-between"><h3 className="mb-3 pt-2">Vessels</h3>
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
                table={{ columns: columns, rows: (selectedDimensions.length == 0 ? vesselsData : Object.values(groupedData)) }}
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

const CompanyTable = ({ companiesData }) => {

    const measureColumns = [
      {
        Header: "Number of Companies",
        accessor: "companyCount",
        align: "right"
      },
    ];
  
  
    const allDimensions = { "country": "Country", "city": "City" };
  
    const [selectedDimensions, setSelectedDimensions] = useState([]);
  
    let groupedData = {};
  
    for (let i = 0; i < companiesData?.length; i++) {
      const company = companiesData[i];
      let dimensionKey = "";
      selectedDimensions.forEach((dimension) => { dimensionKey += company[dimension] + " ^-^ " });
      if (groupedData[dimensionKey] == null) {
        groupedData[dimensionKey] = {};
        groupedData[dimensionKey].companyCount = 0;
        selectedDimensions.forEach((dimension) => { groupedData[dimensionKey][dimension] = company[dimension]; });
      }
      groupedData[dimensionKey].companyCount += company.companyCount;
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
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "IMO",
        accessor: "IMO",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Number",
        accessor: "number",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Country",
        accessor: "country",
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
              bgColor="success"
              borderRadius="lg"
              coloredShadow="success"
            >
              <MDTypography variant="h6" color="white">
                <div className="d-flex justify-content-between"><h3 className="mb-3 pt-2">Companies</h3>
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
                table={{ columns: columns, rows: (selectedDimensions.length == 0 ? companiesData : Object.values(groupedData)) }}
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

const UserTable = ({ usersData }) => {

  const measureColumns = [
    {
      Header: "Number of Users",
      accessor: "userCount",
      align: "right"
    },
  ];


  const allDimensions = { "company": "Company", "vessel": "Ship", "role": "Role" };

  const [selectedDimensions, setSelectedDimensions] = useState([]);

  let groupedData = {};

  for (let i = 0; i < usersData?.length; i++) {
    const user = usersData[i];
    let dimensionKey = "";
    selectedDimensions.forEach((dimension) => { dimensionKey += user[dimension] + " ^-^ " });
    if (groupedData[dimensionKey] == null) {
      groupedData[dimensionKey] = {};
      groupedData[dimensionKey].userCount = 0;
      selectedDimensions.forEach((dimension) => { groupedData[dimensionKey][dimension] = user[dimension]; });
    }
    groupedData[dimensionKey].userCount += user.userCount;
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
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Number",
      accessor: "mobile",
    },
    {
      Header: "Company",
      accessor: "company",
    },
    {
      Header: "Vessel",
      accessor: "vessel",
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
            bgColor="dark"
            borderRadius="lg"
            coloredShadow="dark"
          >
            <MDTypography variant="h6" color="white">
              <div className="d-flex justify-content-between"><h3 className="mb-3 pt-2">Users</h3>
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
              table={{ columns: columns, rows: (selectedDimensions.length == 0 ? usersData : Object.values(groupedData)) }}
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

export default AdminDashboard;
