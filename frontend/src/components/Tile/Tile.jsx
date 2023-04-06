import React from "react";
import { TileEl, Line } from "./Tile.styled";

const Tile = ({ children, vLine = false, hLine = false }) => {
  return (
    <TileEl>
      {children} <Line vertical={vLine} horizontal={hLine} />
    </TileEl>
  );
};

export default Tile;
