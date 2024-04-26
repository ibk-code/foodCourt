import { describe, expect, test } from "@jest/globals";
import { hardPasswordStrength, mediumPasswordStrength } from "./helpers";

describe("Hard Password strength", () => {
  test("Test123@ty", () => {
    expect(hardPasswordStrength("Test123@ty")).toBeTruthy();
  });
});

describe("Medium Password strength", () => {
  test("Athd@", () => {
    expect(mediumPasswordStrength("Athd@")).toBeTruthy();
  });
});
