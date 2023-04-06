import React from "react";
import { TableEl } from "./Table.styled";

const Table = ({ results, actualMatrix }) => {
  return (
    <TableEl>
      <tr>
        <th>Operator</th>
        <th>Operation</th>
        <th>Cost</th>
      </tr>
      {results.map((row, idx) => (
        <tr key={idx}>
          <td>{row[0]}</td>
          <td>{row[1]}</td>
          <td>{actualMatrix[row[0]][row[1]]}</td>
        </tr>
      ))}
    </TableEl>
  );
};

export default Table;
