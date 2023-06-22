import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

import StatusBar from "../StatusBar";

const sampleChars = {
  "Dramatic Chipmunk": {x: 0, y: 0, found: true},
  "Chuck Testa": {x: 1, y: 0, found: false},
  "Mudkip": {x: 0, y: 1, found: false}
}

it("Renders the time", () => {
  console.log("made it");
  render(<StatusBar characters={sampleChars} time={90}/>);
  expect(screen.getByText("1:30")).toBeInTheDocument();
})

it("Checks off found characters", () => {
  const renderResult = render(<StatusBar characters={sampleChars} time={0}/>);
  const checklist = renderResult.container.querySelectorAll(".StatusBar-checklist-item");
  expect(checklist[0].querySelector(".StatusBar-checkmark")).toBeInTheDocument();
  expect(checklist[1].querySelector(".StatusBar-checkmark")).not.toBeInTheDocument();
  expect(checklist[2].querySelector(".StatusBar-checkmark")).not.toBeInTheDocument();
})
