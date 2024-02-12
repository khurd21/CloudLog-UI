import { useEffect, useState, ChangeEvent } from "react";
// material imports:
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import MyAccordianSummary from "./MyAccordianSummary.jsx";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";

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

const LOG_DETAIL_KEYS = [
  "altitude",
  "pullAltitude",
  "windSpeed",
  "parachute",
  "parachuteSize",
  "dropzone",
  "description",
  "signedBy",
  "signedUSPANumber",
];

const KEYS_TO_CLIENT_STR = {
  jumpNumber: "#",
  date: "Date",
  jumpType: "Type",
  aircraft: "Aircraft",
  altitude: "Altitude",
  pullAltitude: "Pull Altitude",
  windSpeed: "Wind Speed",
  parachute: "Parachute",
  parachuteSize: "Parachute Size",
  dropzone: "Dropzone",
  description: "Description",
  signedBy: "Signed BY",
  signedUSPANumber: "USPA #",
};

const LOG_SUMMARY_FIELDS = ["#", "Date", "Type", "Aircraft", "Dropzone"];

function HeaderEditableValue({
  header,
  valueKey,
  value,
  index,
  style,
  onHandleJumpInfoEdit,
}) {
  return (
    <div style={style}>
      <Typography variant="h6">{header}</Typography>
      <TextField
        id="standard-basic"
        value={value}
        onChange={(event) => {
          onHandleJumpInfoEdit({ [ valueKey ]: event.target.value }, index);
        }}
      ></TextField>
    </div>
  );
}

function MyAccordianDetails({ rowInfo, index, onHandleJumpInfoEdit }) {
  const rowStyle = {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    border: "1px solid blue",
  };

  const rowInfoKeys = Object.keys(rowInfo);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          // border: "1px solid red", // for debugging
        }}
      >
        {rowInfoKeys &&
          rowInfoKeys.map((infoKey, i) => (
            <HeaderEditableValue
              header={KEYS_TO_CLIENT_STR[infoKey]}
              valueKey={infoKey}
              value={rowInfo[infoKey]}
              key={i}
              onHandleJumpInfoEdit={onHandleJumpInfoEdit}
              index={index}
            />
          ))}
      </div>
      <Button variant="contained" onClick={() => console.log("hello world")}>
        Edit
      </Button>
    </div>
  );
}

export default function JumpRow({ rowInfo, index, onHandleJumpInfoEdit }) {
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
          <MyAccordianDetails
            rowInfo={rowInfo}
            index={index}
            onHandleJumpInfoEdit={onHandleJumpInfoEdit}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
