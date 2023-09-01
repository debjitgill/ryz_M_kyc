import React, { useState, useRef } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
import Star from "../../assets/segment/star.svg"
import Upload from "../../assets/upload/upload.svg"

function Segment(props) {
  const [showIncomeProof, setShowIncomeProof] = useState(false);
  const [incomeproof, setIncomeproof] = useState(false);
  const [brokerage, setBrokerage] = useState(false);
  const [data, setData] = useState({
    incomePassword: "",
  });
  const [checkboxValues, setCheckboxValues] = useState({
    nseCash: false,
    nseFutureAndOption: false,
    nseCds: false,
    nseMcx: false,
  });
  const [error, setError] = useState("");
  const incomeproofInputField = useRef(null);

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
    setShowIncomeProof(!showIncomeProof); 
    setCheckboxValues({
      ...checkboxValues,
      [event.target.name]: event.target.checked,
    });
  };
  const handleIncomeChange = (e) => {
    setIncomeproof(e.target.files[0].name);
  };
  // const handleIncomeCheckbox = () => {
  //   setShowIncomeProof(!showIncomeProof); 
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
    <div className="">
      <p className="text-2xl font-bold mb-3">
        Segment{error && <span className="text-rose-600 ml-4">{error}</span>}
      </p>

      <FormGroup classes={"flex justify-start items-baseline"} row>
        <p className="font-bold p-0 mr-8 self-center text-xs opacity-80">NSE:</p>
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
      <div className="bg-grey h-0.5 w-100 my-3"></div>
      <div className="flex">
      <FormGroup classes={"flex justify-start items-baseline"} row>
        <p className="font-bold p-0 mr-8 self-center text-xs opacity-80">MCX:</p>
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
        `<button 
            className="bg-skyBlue ms-12 font-bold text-white rounded-lg px-2"
            onClick={() => setBrokerage(!brokerage)}
            >
              View Brokerage
            </button>`
            </div>
      {/* <div className="flex">
        <Stack spacing={2} direction="col">
          {brokerage && (
            <div>
              <p>Cash Intraday 0.01%</p>
              <p>Equity Delivery</p>
              <p>Minimum Brokerage Rs20</p>
            </div>
          )}
        </Stack>
      </div> */}
      <div className="bg-grey h-0.5 my-3 w-100"></div>
      <div className="">
      <div className="flex">
          <sup>
            <img src={Star} alt={"star"} className="w-[15px]" />
          </sup>
          <p className="font-bold text-blue text-2xl">Trading Flat at Rs.</p>
        </div>
        <div className="text-xs mt-6 font-bold opacity-80">Monthly Charges</div>
        {showIncomeProof && (<div >
          <div className="bg-grey h-0.5 my-3 w-100"></div>
        <div className="flex justify-between flex-wrap">
          <p className="font-bold opacity-80">Your Income Proof</p>
          <div className="flex bg-blueNeutral rounded-full p-1 px-2">
            <button
              name="incomeproof"
              onClick={() => incomeproofInputField.current.click()}
              className="font-bold text-sm opacity-50"
            >
              Upload Income Proof
            </button>
            <img className="h-5" src={Upload} alt="" />
            <input
              type="file"
              onChange={handleIncomeChange}
              ref={incomeproofInputField}
              className="hidden"
            />
          </div>
          </div>
        <div className="text-right">{incomeproof}</div>
        <div className="mt-6">
          Only required if you want F&O and MCX trading.Not requires if you just
          <br />
          want to buy and sell equity stocks.(file size should be less than 4MB)
        </div>
        <div className="flex justify-between flex-wrap">
          <p className="mt-4">
            Please provide password if you are uploading a password protected
            file.
          </p>
          <input 
            type="text"
            placeholder="Enter Password"
            name="incomePassword"
            value={data.incomePassword}
            onChange={handleChange}
            className="rounded-lg px-2 bg-blueNeutral"
          />
        </div>
        </div>
        )}
        <div className="bg-grey h-0.5 my-3 w-100"></div>
        <div className="w-[40%]">
          <div className="flex justify-between">
            <p className="font-bold mb-4 text-sm opacity-80">Amount Payable</p>
            <p className="font-bold text-sm opacity-80">0.00</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold mb-4 text-sm opacity-80">GST + PG</p>
            <p className="font-bold text-sm opacity-80">0.00</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold  mb-4 text-sm opacity-80">Total</p>
            <p className="font-bold text-sm opacity-80">0.00</p>
          </div>
          </div>
          <div className="w-40%">
          <div className="bg-grey h-0.5 my-3"></div>
          <div className="flex justify-center">
            <div className="bg-secondary px-4 py-1 rounded-lg font-bold text-center">
              <button className="opacity-80" onClick={handleProceed}>
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export { Segment };
