import { useState } from "react";
import "./App.css";
import { Tile, TileDeck } from "./components";

function App() {
  const [numRows, setNumRows] = useState(1);
  const [numCols, setNumCols] = useState(1);
  const [matrices, setMatrices] = useState([]);
  const [actualMatrix, setActualMatrix] = useState([]);
  const [result, setResult] = useState({});

  const generateMatrix = (e) => {
    e.preventDefault();

    let data = [];
    for (let i = 0; i <= numRows; i++) {
      let row = [];
      for (let j = 0; j <= numCols; j++) {
        if (i === 0 && j === 0) {
          row.push(
            <input
              key={`${i}-${j}`}
              id={`${i}-${j}`}
              type="text"
              readOnly={true}
              value="Assign"
            />
          );
        } else if (i === 0) {
          row.push(
            <input
              key={`${i}-${j}`}
              id={`${i}-${j}`}
              type="text"
              defaultValue={`Operation ${j}`}
            />
          );
        } else if (j === 0) {
          row.push(
            <input
              key={`${i}-${j}`}
              id={`${i}-${j}`}
              type="text"
              defaultValue={`Operator ${i}`}
            />
          );
        } else {
          row.push(
            <input
              key={`${i}-${j}`}
              id={`${i}-${j}`}
              type="number"
              defaultValue="0"
            />
          );
        }
      }
      data.push(row);
    }
    setMatrices(data);
  };

  const fetchResults = async (matrix) => {
    console.log(matrix);
    const result = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/assignment-problem`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matrix: matrix }),
      }
    );
    const data = await result.json();
    return data;
  };

  const solveProblem = async (e) => {
    e.preventDefault();
    let arr = [];
    for (let i = numCols + 2; i < e.target.elements.length - 1; i++) {
      let element = e.target.elements[i];
      if (!element.id.includes("0")) {
        arr.push(+element.value);
      }
    }

    let matrix = [];
    while (arr.length) matrix.push(arr.splice(0, numCols));
    setActualMatrix(matrix);
    const results = await fetchResults(matrix);
    setResult(results);
    console.log(results);
  };

  console.log(result.column_reduction);

  return (
    <div>
      <h1>Hungarian Algorithm</h1>
      <form onSubmit={generateMatrix}>
        <p>Enter the number of rows:</p>
        <input
          type="number"
          name="num_rows"
          id="num_rows"
          value={numRows}
          min={1}
          onChange={(e) => setNumRows(+e.target.value)}
        />
        <p>Enter the number of colums:</p>
        <input
          type="number"
          name="num_cols"
          id="num_cols"
          value={numCols}
          min={1}
          onChange={(e) => setNumCols(+e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {matrices && matrices.length ? (
          <form onSubmit={solveProblem}>
            {matrices.map((row, idx) => (
              <div key={idx}>{row.map((col) => col)}</div>
            ))}

            <button type="submit">Solve Problem</button>
          </form>
        ) : null}
      </div>
      {Object.keys(result).length ? (
        <>
          <h4>Column Reductions</h4>
          <TileDeck matrix={result.column_reduction} />
          <h4>Row Reductions</h4>
          <TileDeck matrix={result.row_reduction} />
          {result.iterations.map((it, idx) => (
            <>
              <h4>Iteration {idx + 1}</h4>
              <TileDeck
                matrix={it.initial_matrix}
                crossedCols={new Set(it.covered_columns)}
                crossedRows={new Set(it.covered_rows)}
              />
            </>
          ))}
          <h4>Optimal Assignment</h4>
          <table>
            <thead>
              <td>Operator</td>
              <td>Operation</td>
              <td>Cost</td>
            </thead>
            {result.results.map((row) => (
              <tr>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{actualMatrix[row[0]][row[1]]}</td>
              </tr>
            ))}
          </table>
          <p>Total Cost: {result.total_cost}</p>
        </>
      ) : null}
    </div>
  );
}

export default App;
