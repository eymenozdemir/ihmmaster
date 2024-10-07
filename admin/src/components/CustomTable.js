import React from "react";
import DataTable from "examples/Tables/DataTable";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";



const CustomTable = ({ columns, data }) => {
    return (
      <div className="">
        <Grid item xs={12}>
          <Card>
            <MDBox pt={0}>
              <DataTable
                table={{ columns: columns, rows: data }}
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


  export default CustomTable;