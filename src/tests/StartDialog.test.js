import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

import StartDialog from "../StartDialog";

const sampleChars = {
  "Dramatic Chipmunk": {x: 0, y: 0, found: true},
  "Chuck Testa": {x: 1, y: 0, found: false},
  "Mudkip": {x: 0, y: 1, found: false}
}

it("Renders character list", () => {
  render(<StartDialog show={true} characters={sampleChars} handleStart={() => {}}/>);
  expect(screen.getByText("Dramatic Chipmunk")).toBeInTheDocument();
  expect(screen.getByText("Chuck Testa")).toBeInTheDocument();
  expect(screen.getByText("Mudkip")).toBeInTheDocument();
})
