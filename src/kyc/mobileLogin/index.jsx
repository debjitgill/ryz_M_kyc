import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Loader from "../../components/loader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useApi from "../../hooks/useApi";

function MobileLogin(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [valid, setValid] = useState(false);
  const [otp, setOtp] = useState("");
  const { loading, error, postData } = useApi();

  const handleChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation
    const regex =
      /^\+?([0-9]{1,3})?\s?\(?([0-9]{3})?\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const isValid = regex.test(phoneNumber);
    if (isValid) {
      postData(`otp/send?type=SMS`, { value: phoneNumber });
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid Phone Number");
    }
    setValid(isValid);
  };

  const handleOtpSubmit = (event) => {
    event.preventDefault();
    if (otp.trim().length === 4) {
      props.handlePostRequest(
        { phone: phoneNumber, otp: otp },
        `otp/verify-mobile`
      );
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid OTP");
    }
  };
  const handleCancelOTP = () => {
    setValid(false);
    setOtp("");
  };
  return (
    <div className="flex">
      <Loader open={loading} />
      <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
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
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {!valid && (
              <>
                <div>
                  <TextField
                    error={Boolean(errorMsg)}
                    margin="normal"
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Enter Phone Numer"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    autoFocus
                    value={phoneNumber}
                    onChange={handleChange}
                    helperText={errorMsg}
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Send OTP
                </Button>
              </>
            )}
            {valid ? (
              <>
                <div>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="OTP"
                    label="Enter OTP"
                    type="text"
                    id="otp"
                    error={Boolean(errorMsg)}
                    value={otp}
                    helperText={errorMsg}
                    onChange={handleOtpChange}
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    color="error"
                    onClick={handleCancelOTP}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleOtpSubmit} variant="contained">
                    Submit OTP
                  </Button>
                </div>
              </>
            ) : null}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export { MobileLogin };
