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

function formatDateString(inputString) {
  // Create a new Date object from the input string
  const date = new Date(inputString);

  // Extract individual components of the date
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = date.getDate().toString().padStart(2, "0");

  // Format the date as "MM/DD/YY"
  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
}

const JUMP_TYPES = ["Tandem", "Solo", "Wingsuit", "Surf", "Freefall"];
const LOG_SUMMARY_KEYS = [
  "jumpNumber",
  "date",
  "jumpType",
  "aircraft",
  "dropzone",
];
const LOG_SUMMARY_FIELDS = ["#", "Date", "Type", "Aircraft", "Dropzone"];

function MyAccordianSummary({ rowInfo, additionStyle }) {
  return (
    <div
      style={{
        display: "grid",
        width: "100%",
        gridTemplateColumns: `2rem repeat(${rowInfo.length - 1}, 1fr)`,
      }}
    >
      {rowInfo.map((field, index) => (
        <div key={index} style={additionStyle}>
          {field}
        </div>
      ))}
    </div>
  );
}

function MyAccordianDetailFields(props) {
  const rowStyle = {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    // border: "1px solid blue",
  };

  return (
    <div style={rowStyle}>
      <div style={{ flex: 1 }}>
        <Typography variant="h6">{props.leftHeader}</Typography>
        <Typography paragraph={true}>{props.leftDescription}</Typography>
      </div>
      <div style={{ flex: 1 }}>
        <Typography variant="h6">{props.rightHeader}</Typography>
        <Typography paragraph={true}>{props.rightDescription}</Typography>
      </div>
    </div>
  );
}

function MyAccordianDetails({ props }) {
  const rowStyle = {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    border: "1px solid blue",
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          // border: "1px solid red",
        }}
      >
        <MyAccordianDetailFields
          leftHeader={"Description"}
          rightHeader={"Signed By"}
          leftDescription={props.description}
          rightDescription={props.signedBy}
        />
        <MyAccordianDetailFields
          leftHeader={"Altitude"}
          rightHeader={"Pull Altitude"}
          leftDescription={props.altitude}
          rightDescription={props.pullAltitude}
        />
        <MyAccordianDetailFields
          leftHeader={"Wind Speed"}
          rightHeader={"Parachute"}
          leftDescription={props.windSpeed}
          rightDescription={props.parachute}
        />

        <MyAccordianDetailFields
          leftHeader={"USPA #"}
          rightHeader={""}
          leftDescription={props.signedUSPANumber}
          rightDescription={""}
        />
      </div>
      <Button variant="contained">Edit</Button>
    </div>
  );
}

function JumpRow({ rowInfo }) {
  const summaryFields = LOG_SUMMARY_KEYS.map(function (field) {
    let rval = rowInfo[field];
    switch (field) {
      case "date":
        rval = formatDateString(rval);
        break;
      case "jumpType":
        rval = JUMP_TYPES[rval];
        break;
      default:
        rval = rowInfo[field];
        break;
    }
    return rval;
  });

  return (
    <div>
      <Accordion>
        {/* can we inherit from AccordianSummary instead of padding a component prop to it? */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <MyAccordianSummary rowInfo={summaryFields} />
        </AccordionSummary>
        <AccordionDetails>
          <MyAccordianDetails props={rowInfo} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default function App() {
  // const [] = useState(Array());
  const [expandAll, setExpandAll] = useState(false);
  // useEffect(() => {

  // }, [jumps]);

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
        {jumps &&
          jumps.map((jump) => (
            <JumpRow
              expandAll={expandAll}
              key={jump.jumpNumber}
              rowInfo={jump}
            />
          ))}
      </div>
      <Button style={{ marginTop: "20px" }} variant="outlined">
        Log Next Jump
      </Button>
    </div>
  );
}
