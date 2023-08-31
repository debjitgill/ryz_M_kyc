import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ANNUAL_SALARY_DETAILS_CONSTANTS = [
  { key: "below1_Lac", value: "Below 1 Lac" },
  { key: "1-5_Lac", value: "1-5 Lac" },
  { key: "5-10_Lac", value: "5-10 Lac" },
  { key: "25-1_Cr", value: "25-11 Cr" },
  { key: ">1_Cr", value: ">1 Cr" },
];

export default function AnnualSalary(props) {
  const handleChange = (event) => {
    props.handleChange(event.target.name, event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <p className="font-bold mb-3">{props.label ?? "Annual Salary"}</p>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          className="w-56"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props?.formData?.[props.name]}
          name={props.name ?? "annualSalary"}
          onChange={handleChange}
        >
          {ANNUAL_SALARY_DETAILS_CONSTANTS.map((item) => (
            <MenuItem key={item.key} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
