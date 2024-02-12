import { useEffect, useState } from "react";
import jumps from "./jumps.json";
// material imports:
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import JumpRow from "./components/JumpRow.jsx";
import MyAccordianSummary from "./components/MyAccordianSummary.jsx";
const LOG_SUMMARY_FIELDS = ["#", "Date", "Type", "Aircraft", "Dropzone"];

export default function App() {
  const [expandAll, setExpandAll] = useState(false);
  const [jumpInfo, setJumpInfo] = useState(null);

  useEffect(() => {
    setJumpInfo(jumps);
  }, [jumps]);

  function onHandleJumpInfoEdit(newVal, index) {
    let oldJumpInfo = [...jumpInfo];
    oldJumpInfo[index ] = { ...oldJumpInfo[index ], ...newVal  };
    console.log(`index: ${index}, newval: ${JSON.stringify(newVal)}`)

    setJumpInfo(oldJumpInfo);
  }

  // const handleExpandAll = () => setExpandAll(!expandAll);
  function handleExpandAll() {
    console.log("expand all pressed");
    setExpandAll(!expandAll);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "flex-end",
        alignItems: "center",
        // background settings
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundImage: "url(/map_contour_lines.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <h1>~~log book~~</h1>
      <div style={{ width: "90vw" }} className="log_book">
        <Accordion
          onChange={handleExpandAll}
          expanded={false} // this gives us control of the state of the component
        >
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <MyAccordianSummary
              rowInfo={LOG_SUMMARY_FIELDS}
              additionStyle={{ fontWeight: "bold" }}
              handleExpandPressed={() => console.log("hello world")}
            />
          </AccordionSummary>
        </Accordion>
        {jumpInfo &&
          jumpInfo.map((jump, index) => (
            <JumpRow
              expandAll={expandAll}
              key={jump.jumpNumber}
              index={index}
              rowInfo={jump}
              onHandleJumpInfoEdit={onHandleJumpInfoEdit}
            />
          ))}
      </div>
      <Button style={{ marginTop: "20px" }} variant="outlined">
        Log Next Jump
      </Button>
    </div>
  );
}
