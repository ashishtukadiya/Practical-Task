import React, { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Drawer,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Display from "./Display";
import HistoryPanel from "./HistoryPanel";
import MemoryPanel from "./MemoryPanel";
import { evaluate } from "mathjs";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleNumber = (num) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperator = (op) => {
    setDisplay((prev) =>
      /\d$/.test(prev) ? prev + op : prev.slice(0, -1) + op
    );
  };

  const calculate = () => {
    try {
      const result = evaluate(display);

      setDisplay(result.toString());
      setHistory([...history, { query: display, result }]);
    } catch (error) {
      setDisplay("Error");
    }
  };

  const clearAll = () => setDisplay("0");
  const clearLast = () => setDisplay((prev) => prev.slice(0, -1) || "0");
  const memoryStore = () => setMemory([...memory, display]);
  const memoryClear = () => setMemory([]);
  const memoryRecall = () => setDisplay(memory[memory.length - 1] || "0");
  const memoryAdd = () =>
    setMemory((prev) =>
      prev.length
        ? [
            ...prev.slice(0, -1),
            (
              parseFloat(prev[prev.length - 1]) + parseFloat(display)
            ).toString(),
          ]
        : [display]
    );
  const memorySubtract = () =>
    setMemory((prev) =>
      prev.length
        ? [
            ...prev.slice(0, -1),
            (
              parseFloat(prev[prev.length - 1]) - parseFloat(display)
            ).toString(),
          ]
        : [display]
    );

  return (
    <Box
      sx={{
        width: 300,
        margin: "50px auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>

      <Display value={display} />

      <Grid container spacing={2}>
        {[7, 8, 9, "/", 4, 5, 6, "*", 1, 2, 3, "-", 0, ".", "=", "+"].map(
          (item, index) => (
            <Grid item xs={3} key={index}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() =>
                  item === "="
                    ? calculate()
                    : /[0-9.]/.test(item)
                    ? handleNumber(item.toString())
                    : handleOperator(item)
                }
              >
                {item}
              </Button>
            </Grid>
          )
        )}
        <Grid item xs={4}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={clearAll}
          >
            C
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={clearLast}
          >
            CE
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant="contained"
            color="warning"
            onClick={() => setDisplay("0")}
          >
            {"<-"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={memoryStore}>
            MS
          </Button>
          <Button fullWidth variant="contained" onClick={memoryRecall}>
            MR
          </Button>
          <Button fullWidth variant="contained" onClick={memoryAdd}>
            M+
          </Button>
          <Button fullWidth variant="contained" onClick={memorySubtract}>
            M-
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={memoryClear}
          >
            MC
          </Button>
        </Grid>
      </Grid>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Tabs value={tabIndex} onChange={(e, newVal) => setTabIndex(newVal)}>
          <Tab label="History" />
          <Tab label="Memory" />
        </Tabs>
        {tabIndex === 0 && <HistoryPanel history={history} />}
        {tabIndex === 1 && <MemoryPanel memory={memory} />}
      </Drawer>
    </Box>
  );
};

export default Calculator;
