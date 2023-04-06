import React from "react";
import Tile from "../Tile/Tile";
import { Row, Col } from "./TileDeck.styled";

const TileDeck = ({
  matrix,
  crossedCols = new Set(),
  crossedRows = new Set(),
}) => {
  return (
    <Col>
      {matrix.map((row, ridx) => (
        <Row key={ridx}>
          {row.map((el, cidx) => (
            <Tile
              key={`${ridx}-${cidx}`}
              vLine={crossedCols.has(cidx)}
              hLine={crossedRows.has(ridx)}
            >
              {el}
            </Tile>
          ))}
        </Row>
      ))}
    </Col>
  );
};

export default TileDeck;
