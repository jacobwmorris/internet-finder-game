import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";

import GameArea from "../GameArea";

const sampleChars = {
  "Dramatic Chipmunk": {x: 0, y: 0, found: true},
  "Chuck Testa": {x: 1, y: 0, found: false},
  "Mudkip": {x: 0, y: 1, found: false}
}

it("Renders an image", () => {
  render(<GameArea characters={sampleChars} handleCharFound={() => {}}/>);
  expect(screen.getByRole("img")).toBeInTheDocument();
})

it("Shows a list of names when the image is marked", async () => {
  userEvent.setup();
  render(<GameArea characters={sampleChars} handleCharFound={() => {}}/>);
  const mainImage = screen.getByRole("img");

  await act(async () => userEvent.click(mainImage));

  expect(screen.queryByText("Dramatic Chipmunk")).toBeNull();
  expect(screen.queryByText("Chuck Testa")).toBeInTheDocument();
  expect(screen.queryByText("Mudkip")).toBeInTheDocument();
})
