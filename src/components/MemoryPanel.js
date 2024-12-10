import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const MemoryPanel = ({ memory }) => {
  return (
    <List>
      {memory.map((value, index) => (
        <ListItem key={index}>
          <ListItemText primary={`Memory: ${value}`} />
        </ListItem>
      ))}
      <IconButton
        onClick={() => localStorage.setItem("memory", JSON.stringify([]))}
      >
        <DeleteIcon />
      </IconButton>
    </List>
  );
};

export default MemoryPanel;
