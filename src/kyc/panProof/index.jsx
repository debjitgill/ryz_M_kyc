import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function UploadPanProof(props) {
  const [formData, setFormData] = useState({
    panCardImage: "",
    panNumber: "",
    dob: "",
    name: "",
  });
  const [error, setError] = useState("");
  const onChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file, e.target.name);
  };

  const getBase64 = (file, name) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, [name]: reader.result }));
    };
  };

  const cancelImage = (name) => {
    setFormData((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDate = (obj) => {
    return `${obj.$D}/${obj.$M + 1}/${obj.$y}`;
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Write code for null check
    const isFormValid =
      formData.name &&
      formData.dob &&
      formData.panNumber &&
      formData.panCardImage;
    if (isFormValid) {
      setError("");
      props.handlePostRequest(formData, "upload/pancard", true);
    } else {
      setError("Please fill all field as required");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-slate-400 p-8">
      <h1 className="p-4 mb-4">Upload Bank Details</h1>
      <span className="text-rose-800">
        Pan card is not linked with DIGI LOCKER so please upload pancard related
        information manually
      </span>
      <div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-slate-700">Full Name*</span>
          <TextField
            id={"name"}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder={"Enter full name as per Pan Card"}
            name={"name"}
            variant="outlined"
            value={formData.name ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-slate-700">
            {"Date of Birth"}
          </span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name={"dob"}
              onChange={(newValue) => handleChange("dob", handleDate(newValue))}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-slate-700">Pan Number</span>
          <TextField
            id={"panNumber"}
            onChange={(e) => handleChange("panNumber", e.target.value)}
            placeholder={"Enter Pan Number as per Pan Card"}
            name={"panNumber"}
            variant="outlined"
            value={formData.panNumber ?? ""}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <div className="flex flex-col justify-center items-center">
          <span className="mb-4 font-bold">
            Upload bank passbook or cancel check or bank statement
          </span>
          <input type="file" name="panCardImage" onChange={onChange} />
          {formData.panCardImage && (
            <>
              <div className="w-1/4 h-50 p-4">
                <img
                  className="w-full"
                  src={formData.panCardImage}
                  alt="bank validation proof"
                />
              </div>
              <Button
                variant="outlined"
                color="error"
                onClick={() => cancelImage("panCardImage")}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
        <div className="self-end">
          {error && <span className="text-rose-800">{error}</span>}
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export { UploadPanProof };
