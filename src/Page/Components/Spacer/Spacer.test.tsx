import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Spacer } from "..";
import "@vitest/browser/matchers.d.ts";

test("render spacer showHint true", async () => {
  const { getByText } = render(
    <Spacer showHint={true} handleClick={() => console.log(2)} />
  );
  await expect
    .element(getByText("Click to edit first paragraph"))
    .toBeInTheDocument();
});

test("render spacer showHint false", async () => {
  const { getByText } = render(
    <Spacer showHint={false} handleClick={() => console.log(2)} />
  );
  await expect
    .element(getByText("Click to edit first paragraph"))
    .not.toBeInTheDocument();
});
