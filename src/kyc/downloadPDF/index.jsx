import Button from "@mui/material/Button";
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";

function DownloadPDF(props) {
  const [pdfData, setPdfData] = useState("");
  const { fetchData, loading } = useApi();
  function downloadPDF() {
    const linkSource = `data:application/pdf;base64,${pdfData}`;
    const downloadLink = document.createElement("a");
    const fileName = "vct_illustration.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  const fetchPdf = async () => {
    // TODO: add endpoint & set key for data
    try {
      const data = await fetchData("convert/pdf");
      await setPdfData(data?.pdf);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPdf();
  }, []);
  return (
    <div className="flex justify-center items-center">
      <Loader open={loading} />
      <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <p className="flex flex-col">
        Your DEMATE account created successfully please download the pdf from
        link send by our legality partner and start trading from the app
      </p>
    </div>
  );
}

export { DownloadPDF };
