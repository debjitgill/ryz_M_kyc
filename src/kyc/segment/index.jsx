import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Segment(props) {
  const [brokerage, setBrokerage] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({
    nseCash: false,
    nseFutureAndOption: false,
    nseCds: false,
    nseMcx: false,
  });
  const [error, setError] = useState("");

  const handleProceed = (event) => {
    event.preventDefault();
    if (Object.values(checkboxValues).find((value) => value)) {
      props.handlePostRequest({ ...checkboxValues }, "details/segment-details", true);
    } else {
      setError("Select at least one option");
    }
  };

  const handleCheckboxChange = (event) => {
    setError("");
    setCheckboxValues({
      ...checkboxValues,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <p className="text-xl font-bold">
        Segment{error && <span className="text-rose-600 ml-4">{error}</span>}
      </p>

      <FormGroup classes={"flex justify-start items-baseline"} row>
        <p className="font-bold p-0 mr-8 self-center">NSE:</p>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxValues.nseCash}
              onChange={handleCheckboxChange}
              name="nseCash"
            />
          }
          label="Cash"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxValues.nseFutureAndOption}
              onChange={handleCheckboxChange}
              name="nseFutureAndOption"
            />
          }
          label="F&O"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxValues.nseCds}
              onChange={handleCheckboxChange}
              name="nseCds"
            />
          }
          label="CDS"
        />
      </FormGroup>
      <div className="bg-slate-500 h-1 w-100"></div>
      <div className="flex flex-row">
        <FormGroup className="p-5">
          <p className="font-bold">MCX:</p>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkboxValues.nseMcx}
                onChange={handleCheckboxChange}
                name="nseMcx"
              />
            }
            label="MCX"
          />
        </FormGroup>
        <div className="p-6 ml-48">
          <Button variant="contained" onClick={() => setBrokerage(!brokerage)}>
            View Brokrage
          </Button>
        </div>
        <Stack spacing={2} direction="col">
          {brokerage && (
            <div>
              <p>Cash Intraday 0.01%</p>
              <p>Equity Delivery</p>
              <p>Minimum Brokerage Rs20</p>
            </div>
          )}
        </Stack>
      </div>
      <div className="bg-slate-500 h-1 w-100"></div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-cyan-500">
          Trading Flat At Rs. 20
        </p>
        <p className="text-xl font-bold ">Monthly Charges</p>
        <p className="font-semibold">
          Amount Payble <span>Rs 0.00</span>
        </p>
        <p className="font-semibold">
          GST + PG <span>Rs 0.00</span>
        </p>
        <p className="font-semibold mb-4">
          Total<span>Rs 0.00</span>
        </p>

        <Button variant="contained" onClick={handleProceed}>
          Proceed
        </Button>
      </div>
    </>
  );
}

export { Segment };
