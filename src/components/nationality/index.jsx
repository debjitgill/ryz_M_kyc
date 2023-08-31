import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function Nationality(props) {
  const handleGenderChange = (e) => {
    props.handleChange(e.target.name, e.target.value);
  };
  return (
    <FormControl>
      <p className="font-bold">Nationality</p>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="nationality"
        onChange={handleGenderChange}
      >
        <FormControlLabel value="INDIAN" control={<Radio />} label="Indian" />
        <FormControlLabel value="FOREIGN" control={<Radio />} label="Foreign" />
      </RadioGroup>
    </FormControl>
  );
}
