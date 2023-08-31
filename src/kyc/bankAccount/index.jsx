import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useApi from "../../hooks/useApi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Loader from "../../components/loader";
function BankAccount(props) {
  const { loading, error } = useApi();
  const [bankAcNo, setbankAcNo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorIfscCode, setErrorIfscCode] = useState("");
  const [ifsc, setIfsc] = useState("");
  const handleIFSC = async () => {
    try {
      setErrorIfscCode("");
      const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
      if (response.ok) {
        const data = await response.json();
        // Assuming bankAcNo is defined somewhere in your code.
        // Replace "bankAcNo" with the actual variable containing the account number.
        (await data) &&
          props.handlePostRequest(
            { ifsc: ifsc, account_number: bankAcNo },
            "details/bank-details"
          );
      } else {
        setErrorIfscCode("Invalid IFSC code");
        // Handle the case when the API response is not successful (e.g., show an error message).
      }
    } catch (error) {
      // Handle any errors that occur during the API call (e.g., show an error message).
    }
  };

  const handleChange = (event) => {
    setbankAcNo(event.target.value);
  };

  const handleIfscChange = (event) => {
    setIfsc(event.target.value.trim().toUpperCase());
  };

  const handleFinalSubmit = (event) => {
    event.preventDefault();
    if (bankAcNo.trim().length <= 14 && bankAcNo.trim().length >= 4) {
      setErrorMsg("");
      if (ifsc.trim().length < 4) {
        setErrorIfscCode("Invalid IFSC");
      } else {
        handleIFSC();
      }
    } else {
      setErrorMsg("Invalid Bank account");
    }
  };

  return (
    <>
      <Loader open={loading} />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Bank Account No
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <>
              <div>
                <TextField
                  error={Boolean(errorMsg)}
                  margin="normal"
                  required
                  fullWidth
                  id="bankAcNo"
                  type="number"
                  label="Enter Bank Account No"
                  name="bankAcNo"
                  autoComplete="bankAcNo"
                  autoFocus
                  value={bankAcNo}
                  onChange={handleChange}
                  helperText={errorMsg}
                />
              </div>
            </>

            <>
              <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="IFSC"
                  label="Enter IFSC Code"
                  type="text"
                  id="ifsc"
                  error={Boolean(error || errorIfscCode)}
                  value={ifsc}
                  helperText={error || errorIfscCode}
                  onChange={handleIfscChange}
                />
              </div>

              <Button onClick={handleFinalSubmit} variant="contained">
                Validate
              </Button>
            </>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export { BankAccount };
