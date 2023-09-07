import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CameraCapture from "../../components/captureImage";
import Modal from "@mui/material/Modal";
import SignatureCanvas from "react-signature-canvas";
import CameraInstruction from "../../assets/camera/cameraInstruction-1.png";

function UploadPhotoAndSignature(props) {
  const [imageCapture, setImageCapture] = useState(false);
  const [digiSign, setDigiSign] = useState();
  const [url, setUrl] = useState();
  const [errorLocation, setErrorLocation] = useState("");
  const [formData, setFormData] = useState({
    image: "",
    signature: "",
    digiSign:"",
    geolocation: { latitude: "", longitude: "" },
  });
  // const [capturingImage, setCapturingImage] = useState(false);
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
    if (val && typeof val === 'string' && val.startsWith('data:image/')) {
      // Valid image, update the form data and reset capturingImage
      setFormData((prev) => ({ ...prev, image: val }));
      // setCapturingImage(false);
    } else {
      // Invalid image or camera issue, clear the image in the form data
      setFormData((prev) => ({ ...prev, image: '' }));
      // setCapturingImage(false);
      alert("Please capture a valid image or ensure your camera is working.");
    }
  };
  

  console.log("====0000=====", formData);
  const handleClear = () => {
    digiSign.clear();
    setUrl("");
  };
  const handleGenerate = () => {
    setUrl(digiSign.getTrimmedCanvas().toDataURL("image/png"));
    setFormData((prev) => ({
      ...prev,
      digiSign: digiSign.getTrimmedCanvas().toDataURL("image/png"), 
    }));
  };
  console.log(digiSign);
  console.log(url);
  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <p className="font-bold text-center text-2xl mb-3">
          Upload Image & Signature
        </p>
        {errorLocation && <span className="text-red">{errorLocation}</span>}
      </div>
      <div className="bg-grey h-0.5 w-100 my-3"></div>
      <div className="flex justify-between flex-wrap mt-4">
        <div>
          <p className="font-bold opacity-80 text-2xl mb-4">
            Important Image Instructions
          </p>
          <ul className=" list-disc">
            <li>Do not wear goggles,cap or anything covering the face</li>
            <li>Capture clear image with a sufficient light</li>
            <li>Not other person should appear in the image</li>
            <li>
              Distance between the camera should not be more than 0.5 meter
            </li>
            <li>Background of the image should be plan, preferable white</li>
            <li>Do not use the rotate image.Capture only an up-right image</li>
          </ul>
        </div>
        <img className="max-w-full h-[40vh]" src={CameraInstruction} alt="" />
        <div className="flex flex-col justify-center items-center">
          {!formData.image && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setImageCapture(true)}
            >
              Enable Camera
            </Button>
          )}
          {formData.image && (
            <>
              <div className="">
                <img className="border-2 w-[250px] h-[200]" src={formData.image} alt="" />
              </div>
              <div className="mt-2">
                {/* <button className="">Cancel</button> */}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => cancelImage("image")}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="bg-grey h-0.5 w-100 my-3"></div>
      <p className="font-bold text-center text-xl mb-3 opacity-80">
        Make sure your Signature is clearly visible
      </p>
      <div className="flex justify-around flex-wrap">
        <div>
          <SignatureCanvas
            canvasProps={{
              width: 300,
              height: 200,
              className: "sigCanvas border-2 border-grey rounded-lg",
            }}
            ref={(data) => setDigiSign(data)}
          />
        </div>
        <div>
          <img
            className="border-2 border-grey rounded-lg w-[250px] h-[200px]"
            src={url}
            alt=""
          />
          <Button
            variant="contained"
            color="error"
            onClick={handleClear}
            sx={{ m: 4 }}
          >
            Clear
          </Button>
          <Button variant="contained" color="primary" onClick={handleGenerate}>
            Save
          </Button>
        </div>
      </div>
      <div className="font-bold text-2xl text-center">OR</div>
      <div className="flex justify-around flex-wrap">

          <span className="font-bold me-4 opacity-80">
            Ensure that you upload a clear image of your Signature.
            <br />
            Make sure your signature is clearly visible.
            <br />
            (file sixe should be less than 50kb)
          </span>

          <input type="file" name="signature" onChange={onChange} />
          {formData.signature && (
            <>
              <div className="w-1/6 p-4">
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
      <div className="bg-grey h-0.5 w-100 my-3"></div>

      <div>
        <Modal open={imageCapture} onClose={() => setImageCapture(false)}>
          <CameraCapture
            handleCaptureImage={handleCaptureImage}
            imageValue={formData.image}
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
