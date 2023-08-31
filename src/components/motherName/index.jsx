import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export default function MotherName(props) {
  const handleChange = (event) => {
    props.handleChange(event.target.name, event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <p className="font-bold mb-3">Mother Name</p>
        <TextField
          id="outlined-basic"
          onChange={handleChange}
          label=""
          name="motherName"
          variant="outlined"
        />
      </FormControl>
    </Box>
  );
}
