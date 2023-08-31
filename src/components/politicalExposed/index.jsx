import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function PoliticallyExposed(props) {
  const handleGenderChange = (e) => {
    props.handleChange(e.target.name, e.target.value);
  };
  return (
    <FormControl>
      <p className="font-bold">Are you Politically Exposed ?</p>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="politicallyExposed"
        onChange={handleGenderChange}
      >
        <FormControlLabel value="YES" control={<Radio />} label="Yes" />
        <FormControlLabel value="NO" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
  );
}
