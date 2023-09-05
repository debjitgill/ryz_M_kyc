import React, { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Loader from "../../components/loader"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import useApi from "../../hooks/useApi"
import RImg from "../../components/rImg"
import RButton from "../../components/rButton"
import Star from "../../assets/kyc/star.svg"
import "./styles.scss"

function Login(props) {
  const [email, setEmail] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [valid, setValid] = useState(false)
  const [otp, setOtp] = useState("")
  const { loading, error, postData } = useApi()

  const handleChange = event => {
    setEmail(event.target.value)
  }

  const handleOtpChange = event => {
    setOtp(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Perform validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = regex.test(email)
    if (isValid) {
      postData(`otp/send?type=EMAIL`, { value: email })
      setErrorMsg("")
    } else {
      setErrorMsg("Invalid Email")
    }
    setValid(isValid)
  }

  const handleOtpSubmit = event => {
    event.preventDefault()
    if (otp.trim().length === 4) {
      props.handlePostRequest({ email: email, otp: otp }, `otp/verify-email`)
      setErrorMsg("")
    } else {
      setErrorMsg("Invalid OTP")
    }
  }
  const handleCancelOTP = () => {
    setValid(false)
    setOtp("")
  }
  return (
    <div className="login-container flex bg-skyBlue rounded-lg border border-primary ">
      <Loader open={loading} />
      <div className="emailMain-box shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <div className="p-5 text-container">
          <p className="text-2xl text-white font-medium p-8">
            Open your GillBroking <br /> in just 5 minutes
          </p>
          <div className="flex gap-5">
            <div>
              <input type="checkbox" />
            </div>
            <div>
              <p className=" text-white text-sm">
                I agree to receive communication from Gill Broking Pvt. Ltd.
                through SMS, Whatsapp, Email, and Calls.
              </p>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <div>
              <RImg
                src={Star}
                alt={""}
                width="18px"
                height="18px"
                innerImgWidth="18px"
              />
            </div>
            <div>
              <p className="text-white text-sm ">
                NOTE: GILL BROKING PRIVATE LIMITED IS DOING CLIENT BASED TRADING
                AND PRO ACCOUNT TRADING.
              </p>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
      <div className="email-container bg-white w-1/2 ">
        <Container component="main" maxWidth="xs" className="email-box">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Email
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
                      className="bg-white rounded-lg"
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
                  <div className="flex justify-center p-3">
                    <RButton
                      handleButtonClick={handleSubmit}
                      buttonName="Send OTP"
                    />
                  </div>
                </>
              )}
              {valid ? (
                <>
                  <div>
                    <TextField
                      className="bg-white rounded-lg"
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
                  <div className="flex justify-between gap-5">
                    {/* <Button
                    className="ml-6 "
                    color="error"
                    onClick={handleCancelOTP}
                    // variant="outlined"
                  >
                    Cancel
                  </Button> */}
                    <RButton
                      buttonName="Cancel"
                      bgColor="bg-red"
                      externalClassName="text-white rounded-lg"
                      onClick={handleCancelOTP}
                    />

                    <div className="">
                      <RButton
                        onClick={handleOtpSubmit}
                        buttonName="Submit OTP"
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </Box>
          </Box>
        </Container>
      </div>
        </div>
        
  )
}

export { Login }
