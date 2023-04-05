import styled from "styled-components";

const TileEl = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  background-color: rgb(170 127 127);
  font-size: 1.5rem;
  border-radius: 0.2rem;
  position: relative;
  border: ${(props) => (props.crossed ? "0.1rem solid white" : "none")};
`;

const Line = styled.div`
  position: absolute;
  ${(props) =>
    props.vertical
      ? {
          width: "0.1rem",
          height: "100%",
          backgroundColor: "white",
        }
      : props.horizontal
      ? {
          width: "100%",
          height: "0.1rem",
          top: "50%",
          backgroundColor: "white",
        }
      : "none"}
`;

export { TileEl, Line };
