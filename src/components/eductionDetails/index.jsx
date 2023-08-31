import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const QUALIFICATION_DETAILS_CONSTANTS = [
  { key: "underHighSchool", value: "Under High School" },
  { key: "10", value: "10" },
  { key: "10+2", value: "10+2" },
  { key: "graduation", value: "Graduation" },
  { key: "postGraduation", value: "Post Graduation" },
  { key: "docterate", value: "Docterate" },
  { key: "profDegree", value: "Prof. Degree" },
  { key: "illiterateOther", value: "Illiterate-Other" },
];

export default function QualificationDetails(props) {
  const handleChange = (event) => {
    props.handleChange(event.target.name, event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <p className="font-bold">Qualification Details</p>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          className="w-56"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props?.formData?.qualificationDetails}
          name="education"
          onChange={handleChange}
        >
          {QUALIFICATION_DETAILS_CONSTANTS.map((item) => (
            <MenuItem key={item.key} value={item.key}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
