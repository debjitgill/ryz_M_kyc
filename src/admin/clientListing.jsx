import React from "react";
import useApi from "../hooks/useApi";
import Loader from "../components/loader";
import { ADMIN_BASE_URL } from "../constants/constants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const ClientListing = () => {
  const [data, setData] = React.useState([]);
  const { loading, error, postData, fetchData } = useApi();
  async function getClientList() {
    try {
      const data = await fetchData("admin-ekyc/status", {}, ADMIN_BASE_URL);
      await setData(data);
    } catch (e) {
      console.log("error while fetching data");
    }
  }

  React.useEffect(() => {
    getClientList();
  }, []);

  const getDataTime = (epoch) => {
    const date = new Date(+epoch);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Zero-padding
    const day = date.getDate().toString().padStart(2, "0"); // Zero-padding
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  };

  return (
    <div>
      <Loader open={loading} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell align="right">Reference Code</TableCell>
              <TableCell align="right">Branch</TableCell>
              <TableCell align="right">Client Code</TableCell>
              <TableCell align="right">PAN</TableCell>
              <TableCell align="right">STATUS</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Mo No.</TableCell>
              <TableCell align="right">Payment Status</TableCell>
              <TableCell align="right">Entry Time</TableCell>
              <TableCell align="right">CDSL</TableCell>
              <TableCell align="right">NSE</TableCell>
              <TableCell align="right">BACKOFFICE</TableCell>
              <TableCell align="right">BSE</TableCell>
              <TableCell align="right">KRA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length &&
              data.map((row) => (
                <TableRow
                  key={row.phoneNumber}
                  align="right"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right" component="th" scope="row">
                    <Button variant="contained"> {row.action}</Button>
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {row.referenceCode}
                  </TableCell>
                  <TableCell align="right">{row.branch}</TableCell>
                  <TableCell align="right">
                    {row?.clientCode ?? "N/A"}
                  </TableCell>
                  <TableCell align="right">{row?.panCard ?? "N/A"}</TableCell>
                  <TableCell align="right">{row.kycStatus}</TableCell>
                  <TableCell align="right">{row.customerName}</TableCell>
                  <TableCell align="right">{row.phoneNumber}</TableCell>
                  <TableCell align="right">
                    {row?.paymentStatus ?? "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {getDataTime(row?.dateEntryTime)}
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    <Button variant="contained" color="success">
                      {" "}
                      Complete CDSL
                    </Button>
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    <Button variant="contained" color="success">
                      {" "}
                      Complete NSE
                    </Button>
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    <Button variant="contained" color="success">
                      {" "}
                      Complete Backoffice
                    </Button>
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    <Button variant="contained" color="success">
                      {" "}
                      Complete BSE
                    </Button>
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    <Button variant="contained" color="success">
                      {" "}
                      Complete KRA
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClientListing;
