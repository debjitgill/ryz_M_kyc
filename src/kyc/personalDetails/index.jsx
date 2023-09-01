  import { useState } from "react";
  import Gender from "../../components/genderRadio";
  import MaritalStatus from "../../components/maritialStatus";
  import QualificationDetails from "../../components/eductionDetails";
  import Occupation from "../../components/occupation";
  import TaxResidency from "../../components/taxResidency";
  import Nationality from "../../components/nationality";
  import PoliticallyExposed from "../../components/politicalExposed";
  import StockAccused from "../../components/stocksAccused";
  import FatherName from "../../components/fatherName";
  import MotherName from "../../components/motherName";
  import AnnualSalary from "../../components/annualSalary";
  import Button from "@mui/material/Button";
  import NomineeAdded from "../../components/nomineeAdded";
  import Nominee from "../../components/nominee";
import RButton from "../../components/rButton";
import "./styles.scss"
  const nomineeDataItem = {
    name: "",
    dateOfBirth: "",
    contactNumber: "",
    email: "",
    relation: "",
    proofOfAddress: "",
    addressDto: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
    sharePercentage: "",
  };

  function PersonalDetails(props) {
    const [formData, setFormData] = useState({
      gender: "",
      maritalStatus: "",
      spouseName: "",
      education: "",
      occupation: "",
      taxResidency: "",
      nationality: "",
      politicallyExposed: "",
      actionTakenBySebiOrAnyOtherAuthority: "",
      actionTakenBySebiOrAnyOtherAuthorityDescription: "",
      fatherName: "",
      motherName: "",
      annualSalary: "",
      netWorth: "",
    });
    const [nomineeData, setNomineeData] = useState({
      nomineeAdded: false,
      listOfNomineeMembersInfo: [],
    });
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();

      const errors = Object.entries(formData).map(([key, value]) => {
        if (
          (key === "spouseName" || key === "stockAccusedReason") &&
          value === "" &&
          ((key === "spouseName" && formData["maritalStatus"] === "MARRIED") ||
            (key === "stockAccusedReason" && formData["stockAccused"] === "YES"))
        ) {
          return true;
        }
        return false;
      });

      if (errors.some((error) => error)) {
        setError("Please fill in all the details properly");
      } else {
        props.handlePostRequest(
          {
            basicUserInfoDto: {
              ...formData,
              nomineeCheck: nomineeData.nomineeAdded,
            },
            listofNomineeMembersInfo: {
              listOfNomineeInfo: [...nomineeData.listOfNomineeMembersInfo],
            },
          },
          "details/basic-details"
        );
      }
    };

    const handleChange = (key, value) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
    const handleNomineeRadio = (key, value) => {
      if (value === "YES") {
        setNomineeData((prev) => ({
          listOfNomineeMembersInfo: [nomineeDataItem],
          nomineeAdded: true,
        }));
      } else {
        setNomineeData((prev) => ({
          nomineeAdded: false,
          listOfNomineeMembersInfo: [],
        }));
      }
    };
    const handleAddNominee = () => {
      if (nomineeData.listOfNomineeMembersInfo.length < 3) {
        setNomineeData((prev) => ({
          ...prev,
          listOfNomineeMembersInfo: [
            ...prev.listOfNomineeMembersInfo,
            nomineeData,
          ],
        }));
      }
    };

    const handleNomineeChange = (key, val, idx, extraKey) => {
      setNomineeData((prev) => {
        const updatedListOfNomineeMembersInfo = prev.listOfNomineeMembersInfo.map(
          (nominee, index) => {
            if (index === idx) {
              if (extraKey) {
                return {
                  ...nominee,
                  [extraKey]: {
                    ...nominee[extraKey],
                    [key]: val,
                  },
                };
              } else {
                return { ...nominee, [key]: val };
              }
            }
            return nominee;
          }
        );

        return {
          ...prev,
          listOfNomineeMembersInfo: updatedListOfNomineeMembersInfo,
        };
      });
    };

    const handleRemoveNominee = (idx) => {
      setNomineeData((prev) => {
        return {
          ...prev,
          listOfNomineeMembersInfo: prev.listOfNomineeMembersInfo.splice(idx, 1),
        };
      });
    };

    const renderNominee = () => {
      const { listOfNomineeMembersInfo } = nomineeData;
      return listOfNomineeMembersInfo.map((nominee, idx) => (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <span className="font-bold text-slate-700 underline underline-offset-4 mb-2">
              Nominee {idx + 1}
            </span>
            {/* <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveNominee(idx)}
              className="bg-primary"
            >
              X
            </Button> */}
            <RButton 
            externalClassName="bg-peimary"
            buttonName="X"
            handleButtonClick={() => handleRemoveNominee(idx)}
            />
          </div>
          <Nominee
            key={`nomineeItem_${idx}`}
            data={nominee}
            handleChange={(key, val, extraKey) =>
              handleNomineeChange(key, val, idx, extraKey)
            }
          />
        </div>
      ));
    };
    return (
      <>
        <div className="flex flex-col p-4 jjj">
          <Gender handleChange={handleChange} />
          <hr/>
          <br/>
          <MaritalStatus handleChange={handleChange} formData={formData} />
          <hr/><br/>
          <QualificationDetails handleChange={handleChange} formData={formData} />
          <hr/><br/>
          <Occupation handleChange={handleChange} />
          <hr/><br/>
          <TaxResidency handleChange={handleChange} />
          <hr/><br/>
          <Nationality handleChange={handleChange} />
          <hr/><br/>
          <PoliticallyExposed handleChange={handleChange} />
          <hr/><br/>
          <StockAccused handleChange={handleChange} formData={formData} />
          <hr/>
          <div className="parent-container flex justify-between mt-3 ">
            <FatherName handleChange={handleChange} />
            <MotherName handleChange={handleChange} />
         
          </div>
          <br/>
          <hr/><br/>
          <div className="mb-5">
            <AnnualSalary
              name={"netWorth"}
              label={"Net Worth"}
              handleChange={handleChange}
            />
          </div>
          <hr/><br/>
          <div className="mb-5">
            <AnnualSalary name={"annualSalary"} handleChange={handleChange} />
          </div>
          <hr/><br/>
     

          <NomineeAdded handleChange={handleNomineeRadio} />
          {renderNominee()}
          {nomineeData?.nomineeAdded && (
           <div className="flex flex-col items-center justify-center">
             <Button
              size={"smalls"}
              variant="outlined"
              onClick={handleAddNominee}
              disabled={nomineeData.listOfNomineeMembersInfo.length >= 3}
              className="add-more-button"
            >
              Add More
            </Button>
           </div>
          )}
          <br />
          {error && <span className="text-rose-600 mb-3">{error}</span>}
          {/* <Button className="mt-4" onClick={handleSubmit} variant="contained">
            Proceed
          </Button> */}
          <div className="flex flex-col items-center justify-center">
          <RButton
          handleButtonClick={handleSubmit}
          buttonName="Proceed"
          bgColor="bg-skyBlue"
          externalClassName="w-auto"
          />
          </div>
        </div>
        <hr />
      </>
    );
  }

  export { PersonalDetails };
