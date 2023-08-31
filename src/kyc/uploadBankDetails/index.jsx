import React, { useState } from "react";
import Button from "@mui/material/Button";
function UploadBankDetails(props) {
  const [formData, setFormData] = useState({
    bankValidationProof: "",
  });
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
  return (
    <div className="flex flex-col justify-center items-center bg-slate-400 p-8">
      <h1 className="p-4 mb-4">Upload Bank Details</h1>
      <span className="text-rose-800">
        Your bank details are mismatched with your pan card. Please upload
        supporting documents (cancelled check or bank statement or bank
        passbook)
      </span>

      <div className="flex flex-col gap-1 mb-4">
        <div className="flex flex-col justify-center items-center">
          <span className="mb-4 font-bold">
            Upload bank passbook or cancel check or bank statement
          </span>
          <input type="file" name="bankValidationProof" onChange={onChange} />
          {formData.bankValidationProof && (
            <>
              <div className="w-1/4 h-50 p-4">
                <img
                  className="w-full"
                  src={formData.bankValidationProof}
                  alt="bank validation proof"
                />
              </div>
              <Button
                variant="outlined"
                color="error"
                onClick={() => cancelImage("bankValidationProof")}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
        <div className="self-end">
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              props.handlePostRequest(formData, "details/bank-details", true)
            }
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export { UploadBankDetails };
