

export default function MyAccordianSummary({ rowInfo, additionStyle }) {
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
