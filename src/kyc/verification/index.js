import React from "react"
import Button from "@mui/material/Button"
import Lion from "../../assets/verification/lion.svg"
import Flag from "../../assets/verification/flagText.svg"
import QR from "../../assets/verification/qr.png"
import Bharat from "../../assets/verification/bharatText.svg"
import Dummy from "../../assets/verification/dummy.png"
import "./styles.scss"
import RButton from "../../components/rButton"
function Verification(props) {
    const { aadharResponseData, panCardDataDto } = props.data

    return (
        <div>

            <div className="aadharPan-wrapper flex justify-around m-12">
                <div className="aadhar-card w-[40%] border rounded-lg">
                    <div className="flex justify-around mb-2 ">
                        <img src={Lion} alt="" width="8%" />
                        <img src={Flag} alt="" width="70%" />
                    </div>
                    <div className="flex">
                        <div className="aadhar-image m-2">
                            <img
                                src={Dummy}
                                alt="Aadhar card of user"
                                className="border"
                                width="100px"
                                height="100px"
                            />
                        </div>
                        {/* src={`data:img/jpeg;base64, ${
                aadharResponseData?.aadharProfilePhotoBase64 ?? ""
              }`} */}
                        <div className="aadhar-info w-[60%] font-bold p-2">
                            <p>Name: {aadharResponseData?.name ?? ""}</p>
                            <p>DOB: {panCardDataDto?.dob ?? ""}</p>
                            <p>Gender: {panCardDataDto?.gender ?? ""} </p>
                        </div>
                        <div className="fff m-2">
                            <img src={QR} alt="" width="100px" className="blur-[1px]" />
                        </div>
                    </div>
                    <div className="aadhar-no text-center my-3 font-bold text-2xl">
                        XXXX XXXX XXXX
                        <hr className="text-red" />
                    </div>
                    <div className="text-center font-bold text-xl">
                        आधार - आम आदमी का अधिकार
                    </div>
                </div>
                <div className="pan-card w-[40%] border rounded-lg">
                    <div className="flex justify-around">
                        <div className="font-bold">
                            <p className=" pan-heading1 text-sm text-center">आयकर विभाग</p>
                            <p className=" pan-heading text-sm">INCOME TAX DEPARTMENT</p>
                        </div>
                        <img src={Lion} alt="lion" width="8%" />
                        <img src={Bharat} alt="" width="40%" />
                    </div>
                    <div className=" flex flex-row justify-around">
                        <img
                            src={Dummy}
                            alt="img"
                            width="100px"
                            height="100px"
                            className="pan-image border"
                        />
                        <div className="text-center">
                            <p className="pan-no">PAN CARD NUMBER</p>
                            <p className="font-bold "> {panCardDataDto?.panNumber ?? ""}</p>
                        </div>
                        <img src={QR} alt="QR" width="100px" className="pan-qr" />
                    </div>
                    <div className="pan-footer flex">
                        <div className="pan-info ml-4 w-[50%]">
                            <label>NAME:</label>
                            <br />
                            <p className="font-bold">{panCardDataDto?.name ?? ""}</p>
                            <label>FATHER NAME:</label>
                            <br />
                            <p className="font-bold">{aadharResponseData?.careOf ?? ""}</p>
                        </div>
                        <div className="ml-4 w-[50%]">
                            <label>Date Of Birth</label>
                            <p className="font-bold">{panCardDataDto?.dob ?? ""}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-end bg-slate-800 p-2">

                <div className="flex justify-center">
                    <RButton
                        buttonName="Proceed"
                        externalClassName="bg-skyBlue"
                        handleButtonClick={() => props.handleKycStatus("PERSONAL_INFO")}
                    />
                </div>
            </div>
        </div>
    )
}

export { Verification }