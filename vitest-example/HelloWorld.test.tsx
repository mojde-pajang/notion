import React from "react";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import App from "../src/App";
import "@vitest/browser/matchers.d.ts";

test("renders name", async () => {
  const { getByText } = render(<App />);
  await expect.element(getByText("Hello World")).toBeInTheDocument();
});
