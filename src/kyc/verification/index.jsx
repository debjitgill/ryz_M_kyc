import React from "react";
import Button from "@mui/material/Button";
import Lion from "../../assets/verification/lion.svg"
import Flag from "../../assets/verification/flagText.svg"
import QR from "../../assets/verification/qr.png"
import  Bharat from "../../assets/verification/bharatText.svg"
import Dummy from "../../assets/verification/dummy.png"
import "./styles.scss"
function Verification(props) {
  const { aadharResponseData, panCardDataDto } = props.data;

  return (
    <>
      {/* <aside className="bg-slate-800 p-4 flex justify-evenly">
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
      </aside> */}
      <div className='aadharPan-wrapper flex justify-around m-12'>
      <div className="aadhar-card w-[40%] border rounded-lg">
        <div className='flex justify-around mb-2 '>
            <img src={Lion} alt='' width="8%" />
            <img src={Flag} alt='' width="70%" />
        </div>
        <div className='flex'>
          <div className='aadhar-image m-2'>
          <img src={Dummy}
              alt="Aadhar card of user"
            className='border' width="100px" height="100px"/>
            </div>
            {/* src={`data:img/jpeg;base64, ${
                aadharResponseData?.aadharProfilePhotoBase64 ?? ""
              }`} */}
          <div className='aadhar-info w-[60%] font-bold p-2'>
            <p>Name: {aadharResponseData?.name ?? ""}</p>
            <p>DOB: {panCardDataDto?.dob ?? ""}</p>
            <p>Gender: {panCardDataDto?.gender ?? ""} </p>
            </div>
            <div className='fff m-2'>
            <img src={QR} alt='' width="100px" className='blur-[1px]' />
          </div>
        </div>
        <div className='aadhar-no text-center my-3 font-bold text-2xl'>
          XXXX XXXX XXXX
          <hr className='text-red' />
        </div>
        <div className='text-center font-bold text-xl'>
        आधार - आम आदमी का अधिकार
        </div>
      </div>
      <div className="pan-card w-[40%] border rounded-lg">
        <div className='flex justify-around'>
          <div className='font-bold'>
            <p className=' pan-heading1 text-sm text-center'>आयकर विभाग</p>
            <p className=' pan-heading text-sm'>INCOME TAX DEPARTMENT</p>
          </div>
          <img src={Lion} alt='lion' width="8%" />
          <img src={Bharat} alt="" width="40%"/>
        </div>
        <div className=' flex flex-row justify-around'>
          <img src={Dummy} alt='img' width="100px" height="100px" className='pan-image border'/>
          <div className='text-center'>
            <p className="pan-no">
              PAN CARD NUMBER
            </p>
            <p className="font-bold "> {panCardDataDto?.panNumber ?? ""}</p>
          </div>
          <img src={QR} alt='QR' width="100px" className="pan-qr"/>
        </div>
        <div className='pan-footer flex'>

        <div className='pan-info ml-4 w-[50%]'>
            <label>NAME:</label><br />
            <p className='font-bold'>{panCardDataDto?.name ?? ""}</p>
            <label>FATHER NAME:</label><br />
            <p className='font-bold'>{aadharResponseData?.careOf ?? ""}</p>
        </div>
          <div className='ml-4 w-[50%]'>
            <label>Date Of Birth</label>
            <p className='font-bold'>{panCardDataDto?.dob ?? ""}</p>
        </div>
        </div>
      </div>
    </div>
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
