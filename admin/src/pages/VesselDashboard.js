import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersByVessel } from "../features/auth/authSlice";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import DataTable from "examples/Tables/DataTable";


import { FaClipboardList } from "react-icons/fa";
import { RiShip2Fill } from "react-icons/ri";
import { IoIosBusiness } from "react-icons/io";
import { FaUser } from "react-icons/fa";

import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { MdOutlineKeyboardArrowDown, MdFilterAltOff } from "react-icons/md";
import { getAVessel } from "features/vessel/vesselSlice";
import { getDocumentsByVessel } from "features/document/documentSlice";

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

const formatYYYYMM = (date) => {
  if (monthMap[date.substr(5, 2)] != null) {
    return monthMap[date.substr(5, 2)] + " " + date.substr(0, 4);
  }
  return "Other";
}

const VesselDashboard = () => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  let uiEndDate = new Date(endDate);
  uiEndDate.setDate(uiEndDate.getDate() - 1);

  const dispatch = useDispatch();
  let isVessel = false;
  const roleState = useSelector((state) => state?.auth?.user);


  useEffect(() => {
    dispatch(getAVessel(roleState?.vessel));
    dispatch(getDocumentsByVessel(roleState?.vessel));
    dispatch(getUsersByVessel(roleState?.vessel));
  }, []);

  const vesselState = useSelector((state) => state?.vessel?.getAVessel);

  const documentState = useSelector((state) => state?.document?.documents);
  const documentsData = [];

  for (let i = 0; i < documentState?.length; i++) {
    if ((startDate == null && endDate == null) || (new Date(documentState[i]?.createdAt.split('T')[0] + "T06:00:00+00:00") >= startDate && new Date(documentState[i]?.createdAt.split('T')[0] + "T06:00:00+00:00") <= endDate)) {

      documentsData.push({
        key: i + 1,
        title: documentState[i]?.title,
        type: documentState[i]?.type,
        company: documentState[i]?.company,
        vessel: documentState[i]?.vessel,
        documentStatus: documentState[i]?.documentStatus,
        createDate: documentState[i]?.createdAt.slice(0, 10),
        documentCount: 1,
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


  let vesselQuantityText = {
    color: "success",
    amount: vesselState?.title,
    label: " is sailing in the system!",
  };

  let companyQuantityText = {
    color: "success",
    amount: vesselState?.company?.title,
    label: " is working with IHM Master!",
  };

  let userCount = userState?.length;

  let userQuantityText = {
    color: "success",
    amount: userCount,
    label: "people are saving time with IHM Master!",
  };

  if (roleState?.role === "Vessel Staff") {
    isVessel = true;
  }


  return (
    <>
      {isVessel ? <>

        <div>
          <div className="d-flex justify-content-between">
            <h3 className="mb-4 title">Ship Dashboard</h3>
            <div className="mt-0">
              <DateRangePicker
                initialSettings={{ startDate: "1/1/2024", endDate: "1/1/2034" }}
                onApply={(event, picker) => {
                  let tempEndDate = picker.endDate._d;
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
                    title={vesselState?.company?.IMO}
                    count={vesselState?.company?.title}
                    percentage={companyQuantityText}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    icon={<RiShip2Fill className="fs-4" />}
                    title={vesselState?.IMO}
                    count={vesselState?.title}
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
          </MDBox>

          <DocumentTable documentsData={documentsData} />
          <UserTable usersData={usersData} />

        </div>
      </> : <div>
        <h3 className="mb-4 title">Ship Dashboard</h3>
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
  
  
    const allDimensions = { "type": "Type", "documentStatus": "Current Status" };
  
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


const UserTable = ({ usersData }) => {

  const measureColumns = [
    {
      Header: "Number of Users",
      accessor: "userCount",
      align: "right"
    },
  ];


  const allDimensions = { "role": "Role" };

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

export default VesselDashboard;
