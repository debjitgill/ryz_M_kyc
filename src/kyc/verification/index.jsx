import React from "react";
import Button from "@mui/material/Button";

function Verification(props) {
  const { aadharResponseData, panCardDataDto } = props.data;

  return (
    <>
      <aside className="bg-slate-800 p-4 flex justify-evenly">
        <figure className="card bg-white shadow-lg w-fit p-4 rounded mb-4 ">
          <img
            className="w-4 h-8 mb-2"
            src="http://drishtiias.com/images/uploads/1658231921_national_Emblem_Drishti_IAS_English.png"
            alt={"national emblem"}
         />
          <figure className="flex gap-2">
            <img
              className="w-24 h-32"
              src={`data:img/jpeg;base64, ${
                aadharResponseData?.aadharProfilePhotoBase64 ?? ""
              }`}
              alt="Aadhar card of user"
            />
            <figcaption className="ml-4 gap-1 flex flex-col justify-center items-start">
              <figcaption>{aadharResponseData?.name ?? ""}</figcaption>
              <figcaption>{aadharResponseData?.careOf ?? ""}</figcaption>
              <figcaption>{aadharResponseData?.dob ?? ""}</figcaption>
              <figcaption className="text-lg font-bold tracking-widest">
                {aadharResponseData?.maskAadharNumber ?? ""}
              </figcaption>
            </figcaption>
          </figure>
          <div className="h-1 bg-rose-600 mt-2"></div>
          <p className="mt-2 text-center">
            <span className="text-rose-600"> आधार</span> - आम आदमी का अधिकार
          </p>
        </figure>
        <div className="flex flex-col justify-center items-center bg-white shadow-lg w-fit p-4 rounded">
          <div className="card mb-4 flex">
            <p className="flex flex-col justify-stretch mr-2">
              <span className="flex items-stretch">आयकर विभाग</span>
              <span className="tracking-[-0.1em]">Income Tax Department</span>
            </p>
            <img
              className="w-4 h-8 mb-2"
              src="http://drishtiias.com/images/uploads/1658231921_national_Emblem_Drishti_IAS_English.png"
              alt="national emblem"
           />
            <p className="flex flex-col ml-2">
              <span>भारत सरकार</span>
              <span className="tracking-[-0.1em]">Govt. Of India</span>
            </p>
          </div>
          <p>{panCardDataDto?.name ?? ""}</p>
          <p>{panCardDataDto?.gender ?? ""}</p>
          <p>{panCardDataDto?.dob ?? ""}</p>
          <p className="text-lg font-bold tracking-widest">
            {panCardDataDto?.panNumber ?? ""}
          </p>
        </div>
      </aside>
      <div className="text-end bg-slate-800 p-2">
        <Button
          onClick={() => props.handleKycStatus("PERSONAL_INFO")}
          variant="contained"
        >
          Proceed
        </Button>
      </div>
    </>
  );
}

export { Verification };
