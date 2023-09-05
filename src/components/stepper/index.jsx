import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const KYC_STEPS = [
  { key: "LOGIN", value: "Login" },
  { key: "DIGILOCKER ", value: "Kyc with Digi Locker" },
  { key: "PERSONAL_INFO", value: "Personal Information" },
  { key: "BANK_DETAILS", value: "Bank Details" },
  { key: "SEGMENT", value: "Segment " },
  { key: "UPLOAD_PHOTO", value: "Upload Photo and Signature" },
];

export default function HorizontalLinearAlternativeLabelStepper(props) {
  const { activeStepKey  } = props;
  const getActiveStep = () => {
    return KYC_STEPS.findIndex(item => activeStepKey===item.key)
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={getActiveStep()} alternativeLabel>
        {KYC_STEPS.map((label) => (
          <Step  key={label.key}>
            <StepLabel>{label.value}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
