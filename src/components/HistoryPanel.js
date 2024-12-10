import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const HistoryPanel = ({ history, clearHistory }) => {
  return (
    <div>
      {/* <Typography variant="h6">History</Typography> */}
      <IconButton onClick={clearHistory}>
        <DeleteIcon />
      </IconButton>
      <List>
        {history.map((entry, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${entry.query} = ${entry.result}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default HistoryPanel;
