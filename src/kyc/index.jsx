import { useState } from "react";
import Stepper from "../components/stepper";
import { UploadPhotoAndSignature } from "./uploadPhotoAndSignature";
import { Segment } from "./segment";
import { PersonalDetails } from "./personalDetails";
import { Login } from "./login";
import { DigiLocker } from "./digiLocker";
import { BankAccount } from "./bankAccount";
import { MobileLogin } from "./mobileLogin";
import { Verification } from "./verification";
import { DownloadPDF } from "./downloadPDF";
import { UploadBankDetails } from "./uploadBankDetails";
import { UploadPanProof } from "./panProof";
import { Legality } from "./legality";
import useApi from "../hooks/useApi";
import Loader from "../components/loader";
import useSessionStorage from "../hooks/useSession";

function KYC() {
  const [response, setResponse] = useState("");
  const { loading, postData } = useApi();
  const [kycStatus, setKycStatus] = useSessionStorage("kycStatus", "");
  const handlePostRequest = async (data, url, isPatch = false) => {
    const response = await postData(url, data, isPatch);
    const resKycStatus = await response?.kycStatus;
    (await resKycStatus) && setKycStatus(resKycStatus);
    await setResponse(response);
  };

  const handleKycStatus = (val) => {
    setKycStatus(val);
  };

  const renderKycComponent = () => {
    switch (kycStatus) {
      case "DOWNLOAD_PDF":
        return <DownloadPDF />;
      case "UPLOAD_PHOTO":
        return (
          <UploadPhotoAndSignature handlePostRequest={handlePostRequest} />
        );
      case "SEGMENT":
        return <Segment handlePostRequest={handlePostRequest} />;
      case "PERSONAL_INFO":
        return <PersonalDetails handlePostRequest={handlePostRequest} />;
      case "LOGIN":
        return <Login handlePostRequest={handlePostRequest} />;
      case "DIGILOCKER":
        return <DigiLocker handlePostRequest={handlePostRequest} />;
      case "VERIFICATION":
        return (
          <Verification handleKycStatus={handleKycStatus} data={response} />
        );
      case "BANK_PROOF_UPLOAD":
        return <UploadBankDetails handlePostRequest={handlePostRequest} />;
      case "BANK_DETAILS":
        return <BankAccount handlePostRequest={handlePostRequest} />;
      case "PAN_PROOF_REQUIRED":
        return <UploadPanProof handlePostRequest={handlePostRequest} />;
      case "E_SIGN":
        return <Legality data={response} />;
      default:
        return <MobileLogin handlePostRequest={handlePostRequest} />;
    }
  };
  const getKycStatus = () => {
    if (kycStatus === "VERIFICATION") return "DIGILOCKER";
    if (kycStatus === "BANK_PROOF_UPLOAD") return "BANK_DETAILS";
    if (kycStatus === "DOWNLOAD_PDF") return "UPLOAD_PHOTO";
    return kycStatus;
  };
  return (
    <main className="container mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <Loader open={loading} />
      <Stepper activeStepKey={getKycStatus()} />
      <section className="mt-4 bg-white px-6 py-8 rounded shadow-lg text-black w-full">
        {renderKycComponent()}
      </section>
    </main>
  );
}

export default KYC;
