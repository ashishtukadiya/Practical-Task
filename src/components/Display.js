import React from "react";
import { TextField } from "@mui/material";

const Display = ({ value }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      value={value}
      inputProps={{
        readOnly: true,
        style: { textAlign: "right", fontSize: "24px" },
      }}
      style={{ marginBottom: "20px" }}
    />
  );
};

export default Display;
