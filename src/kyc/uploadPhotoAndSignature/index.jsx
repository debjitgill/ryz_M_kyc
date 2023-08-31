import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CameraCapture from "../../components/captureImage";
import Modal from "@mui/material/Modal";

function UploadPhotoAndSignature(props) {
  const [imageCapture, setImageCapture] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    signature: "",
    geolocation: { latitude: "", longitude: "" },
  });
  const [errorLocation, setErrorLocation] = useState("");
  const onChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file, e.target.name);
  };
  const getLocation = () => {
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            geolocation: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          }));
        },
        (error) => {
          setErrorLocation(
            "Please provide location permission as its necessary for KYC"
          );
        }
      );
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

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

  const handleCaptureImage = (val) => {
    setFormData((prev) => ({ ...prev, image: val }));
  };

  console.log("====0000=====", formData);

  return (
    <div className="flex flex-col justify-center items-center bg-slate-400 p-8">
      <h1 className="p-4 mb-4">Upload image & Signature</h1>
      {errorLocation && <span className="text-rose-800">{errorLocation}</span>}
      <div className="flex gap-1 mb-4">
        <div className="flex flex-col justify-center items-center">
          <span className="mb-4 font-bold">Click Image</span>
          {!formData.image && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setImageCapture(true)}
            >
              Open Camera
            </Button>
          )}
          {formData.image && (
            <>
              <div className="w-1/4 p-4">
                <img className="w-full" src={formData.image} alt="image" />
              </div>
              <Button
                variant="outlined"
                color="error"
                onClick={() => cancelImage("image")}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
        <div className="flex flex-col justify-start items-center">
          <span className=" font-bold">Upload Signature</span>
          <input type="file" name="signature" onChange={onChange} />
          {formData.signature && (
            <>
              <div className="w-1/4 p-4">
                <img
                  className="w-full"
                  src={formData.signature}
                  alt="signature"
                />
              </div>
              <Button
                variant="outlined"
                color="error"
                onClick={() => cancelImage("signature")}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
      <div>
        <Modal open={imageCapture} onClose={() => setImageCapture(false)}>
          <CameraCapture
            handleCaptureImage={handleCaptureImage}
            imageValue={formData?.image}
            onSave={() => setImageCapture(false)}
          />
        </Modal>
      </div>
      {formData.image && formData.signature && (
        <Button
          disabled={Boolean(errorLocation)}
          variant="contained"
          color="success"
          onClick={() =>
            props.handlePostRequest(formData, "details/photo-signature")
          }
        >
          Submit
        </Button>
      )}
    </div>
  );
}

export { UploadPhotoAndSignature };
