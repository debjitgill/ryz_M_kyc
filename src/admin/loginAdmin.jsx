import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Loader from "../components/loader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useApi from "../hooks/useApi";
import { ADMIN_BASE_URL } from "../constants/constants";

function LoginAdmin(props) {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [password, setOtp] = useState("");
  const { loading, error, postData } = useApi();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setOtp(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (password.trim().length > 1 && email.trim().length > 1) {
      try {
        const response = await postData(
          `login`,
          { email: email, password: password },
          false,
          {},
          ADMIN_BASE_URL
        );
        (await response) &&
          (await sessionStorage.setItem(
            "adminKey",
            "hgjsu587564hundghhysplitg458s142"
          ));
        await setErrorPassword("");
        await setErrorMsg("");
        await response && props.handlePostRequest()
      
      } catch (e) {
        console.log("error login", e);
      }
    } else {
      if (email.trim().length > 1) {
        setErrorMsg("Email must not be empty");
      }
      if (password.trim().length > 1) {
        setErrorPassword("Password must not be empty");
      }
    }
  };
  return (
    <div className="flex">
      <Loader open={loading} />
      <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="https://images.unsplash.com/photo-1515847049296-a281d6401047?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          alt="Sample image"
        />
      </div>
      <Container component="main" maxWidth="xs">
        <h1 className="font-bold text-2xl text-center">Admin Login</h1>
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
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <>
              <div>
                <TextField
                  error={Boolean(errorMsg)}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Enter Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
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
                  name="password"
                  label="Enter Password"
                  type="password"
                  id="password"
                  error={Boolean(errorPassword)}
                  value={password}
                  helperText={errorPassword}
                  onChange={handlePassword}
                />
              </div>
              {error && <span className="text-rose-800">Password or Email is incorrect</span>}
              <div className="flex justify-between">
                <Button onClick={handleLogin} variant="contained">
                  Login
                </Button>
              </div>
            </>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export { LoginAdmin };
