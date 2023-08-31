import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const OCCUPATION_DETAILS_CONSTANTS = [
  { key: "privateSector", value: "Private Sector" },
  { key: "publicSector", value: "Public Sector" },
  { key: "governmentSector", value: "Government Sector" },
  { key: "business", value: "Business" },
  { key: "professional", value: "Professional" },
  { key: "agriculturist", value: "Agriculturist" },
  { key: "retired", value: "Retired" },
  { key: "houseWife", value: "House Wife" },
  { key: "student", value: "Student" },
  { key: "forexDealer", value: "Forex Dealer" },
];

export default function Occupation(props) {
  const handleChange = (event) => {
    props.handleChange(event.target.name, event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <p className="font-bold">Occupation</p>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          className="w-56"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props?.formData?.occupation}
          name="occupation"
          onChange={handleChange}
        >
          {OCCUPATION_DETAILS_CONSTANTS.map((item) => (
            <MenuItem key={item.key} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
