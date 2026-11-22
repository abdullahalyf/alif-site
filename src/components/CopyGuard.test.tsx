import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CopyGuard } from "./CopyGuard";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

const fire = (target: Element, type: string) => {
  const event = new Event(type, { bubbles: true, cancelable: true });
  target.dispatchEvent(event);
  return event.defaultPrevented;
};

describe("CopyGuard", () => {
  it("blocks copy, cut, selection and dragging on page content", () => {
    render(<CopyGuard />);
    const text = document.body.appendChild(document.createElement("p"));
    for (const type of ["copy", "cut", "selectstart", "dragstart"]) expect(fire(text, type)).toBe(true);
  });

  it("keeps form fields fully usable", () => {
    render(<CopyGuard />);
    const input = document.body.appendChild(document.createElement("input"));
    for (const type of ["copy", "cut", "selectstart"]) expect(fire(input, type)).toBe(false);
  });

  it("blocks the context menu on images only", () => {
    render(<CopyGuard />);
    const image = document.body.appendChild(document.createElement("img"));
    const text = document.body.appendChild(document.createElement("p"));
    expect(fire(image, "contextmenu")).toBe(true);
    expect(fire(text, "contextmenu")).toBe(false);
  });
});
