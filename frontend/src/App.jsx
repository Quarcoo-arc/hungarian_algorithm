import { useState } from "react";
import "./App.css";
import { Table, TileDeck, Button } from "./components";
import {
  Form,
  Heading,
  InputField,
  InputWrapper,
  ResultContainer,
  SectionWrapper,
  Title,
} from "./App.styled";

function App() {
  const [numRows, setNumRows] = useState(1);
  const [numCols, setNumCols] = useState(1);
  const [matrices, setMatrices] = useState([]);
  const [actualMatrix, setActualMatrix] = useState([]);
  const [result, setResult] = useState({});
  const [rowHeading, setRowHeading] = useState("Operator");
  const [columnHeading, setColumnHeading] = useState("Operation");
  const [matrixType, setMatrixType] = useState("Cost");

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
              value={`${columnHeading} ${j}`}
              readOnly={true}
            />
          );
        } else if (j === 0) {
          row.push(
            <input
              key={`${i}-${j}`}
              id={`${i}-${j}`}
              type="text"
              value={`${rowHeading} ${i}`}
              readOnly={true}
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
    const result = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/assignment-problem`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matrix: matrix,
          is_profit_matrix: matrixType === "Profit" ? true : false,
        }),
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
  };

  return (
    <div>
      <Title>Hungarian Algorithm</Title>
      <Form onSubmit={generateMatrix}>
        <span>
          <span>
            <label htmlFor="row_heading">Row Heading:</label>
            <InputField
              type="text"
              name="row_heading"
              id="row_heading"
              value={rowHeading}
              onChange={(e) => setRowHeading(e.target.value)}
            />
          </span>
          <span>
            <label htmlFor="column_heading">Column Heading:</label>
            <InputField
              type="text"
              name="column_heading"
              id="column_heading"
              value={columnHeading}
              onChange={(e) => setColumnHeading(e.target.value)}
            />
          </span>
        </span>
        <span>
          <span>
            <label htmlFor="num_rows">Number of rows:</label>
            <InputField
              short
              type="number"
              name="num_rows"
              id="num_rows"
              value={numRows}
              min={1}
              onChange={(e) => setNumRows(+e.target.value)}
            />
          </span>
          <span>
            <label htmlFor="num_cols">Number of colums:</label>
            <InputField
              short
              type="number"
              name="num_cols"
              id="num_cols"
              value={numCols}
              min={1}
              onChange={(e) => setNumCols(+e.target.value)}
            />
          </span>
        </span>
        <span>
          <p>Type of Matrix:</p>
          <span>
            <label htmlFor="profit">Profit</label>
            <input
              type="radio"
              name="matrix_type"
              value="Profit"
              id="profit"
              onChange={(e) => setMatrixType(e.target.value)}
            />
          </span>
          <span>
            <label htmlFor="cost">Cost</label>
            <input
              defaultChecked
              type="radio"
              name="matrix_type"
              value="Cost"
              id="cost"
              onChange={(e) => setMatrixType(e.target.value)}
            />
          </span>
        </span>
        <Button type="submit">Generate Table</Button>
      </Form>
      <div>
        {matrices && matrices.length ? (
          <Form column onSubmit={solveProblem}>
            <Heading>{matrixType} Table for Assignment</Heading>
            <InputWrapper>
              {matrices.map((row, idx) => (
                <div key={idx}>{row.map((col) => col)}</div>
              ))}
            </InputWrapper>

            <Button type="submit">Solve Problem</Button>
          </Form>
        ) : null}
      </div>
      {Object.keys(result).length ? (
        <>
          <ResultContainer>
            {matrixType === "Profit" ? (
              <span>
                <h4>Cost Table</h4>
                <TileDeck matrix={result.cost_matrix} />
              </span>
            ) : null}
            <span>
              <h4>Column Reductions</h4>
              <TileDeck matrix={result.column_reduction} />
            </span>
            <span>
              <h4>Row Reductions</h4>
              <TileDeck matrix={result.row_reduction} />
            </span>
            {result.iterations.map((it, idx) => (
              <span key={idx}>
                <h4>Iteration {idx + 1}</h4>
                <TileDeck
                  matrix={it.initial_matrix}
                  crossedCols={new Set(it.covered_columns)}
                  crossedRows={new Set(it.covered_rows)}
                />
              </span>
            ))}
          </ResultContainer>
          <SectionWrapper>
            <Heading>Optimal Assignment</Heading>
            <Table
              rowHeading={rowHeading}
              colHeading={columnHeading}
              actualMatrix={actualMatrix}
              results={result.results}
              isProfitRelated={matrixType === "Profit" ? true : false}
            />
            <p>
              Total {matrixType}: {result.total_cost}
            </p>
          </SectionWrapper>
        </>
      ) : null}
    </div>
  );
}

export default App;
