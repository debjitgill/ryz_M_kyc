import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function Gender(props) {
  const handleGenderChange = (e) => {
    props.handleChange(e.target.name, e.target.value);
  };
  return (
    <FormControl>
      <p className="font-bold">Gender</p>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="gender"
        onChange={handleGenderChange}
      >
        <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
        <FormControlLabel value="MALE" control={<Radio />} label="Male" />
        <FormControlLabel value="OTHER" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
}
