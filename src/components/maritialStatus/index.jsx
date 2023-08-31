import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { TextField } from "@mui/material";

export default function MaritalStatus(props) {
  const handleGenderChange = (e) => {
    if (e.target.value === "SINGLE") {
      props.handleChange("spouseName", "");
    }
    props.handleChange(e.target.name, e.target.value);
  };
  return (
    <FormControl>
      <p className="font-bold">MaritalStatus</p>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="maritalStatus"
        onChange={handleGenderChange}
      >
        <FormControlLabel value="SINGLE" control={<Radio />} label="Single" />
        <FormControlLabel value="MARRIED" control={<Radio />} label="Married" />
      </RadioGroup>
      {props?.formData?.maritalStatus === "MARRIED" && (
        <TextField
          className="w-56"
          name={"spouseName"}
          onChange={(e) => props.handleChange(e.target.name, e.target.value)}
          placeholder="Spouse Name"
        />
      )}
    </FormControl>
  );
}
