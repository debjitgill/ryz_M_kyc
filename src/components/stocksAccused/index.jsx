import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";

export default function StockAccused(props) {
  const handleGenderChange = (e) => {
    if (e.target.value === "NO") {
      props.handleChange("actionTakenBySebiOrAnyOtherAuthorityDescription", "");
    }
    props.handleChange(e.target.name, e.target.value);
  };
  return (
    <FormControl>
      <p className="font-bold">
        Do you have any action/ proceeding initiated/ pending taken by SEBI/
        stock exchange any other authority ?
      </p>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="actionTakenBySebiOrAnyOtherAuthority"
        onChange={handleGenderChange}
      >
        <FormControlLabel value="YES" control={<Radio />} label="Yes" />
        <FormControlLabel value="NO" control={<Radio />} label="No" />
      </RadioGroup>
      {props?.formData?.actionTakenBySebiOrAnyOtherAuthority === "YES" && (
        <TextField
          className="w-56"
          placeholder="Reason "
          value={props?.formData?.actionTakenBySebiOrAnyOtherAuthorityDescription}
          name={"actionTakenBySebiOrAnyOtherAuthorityDescription"}
          onChange={(e) => props.handleChange(e.target.name, e.target.value)}
        />
      )}
    </FormControl>
  );
}
