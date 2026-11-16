import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Button, ButtonLink } from "./button";
import { shell } from "@/content/site";

afterEach(cleanup);

it("activates as a native button and does not submit forms by default", () => {
  const click = vi.fn();
  render(<Button onClick={click}>{shell.menu}</Button>);
  const button = screen.getByRole("button", { name: shell.menu });
  expect(button).toHaveAttribute("type", "button");
  fireEvent.click(button);
  expect(click).toHaveBeenCalledOnce();
});

it("supports disabled buttons and secondary link actions", () => {
  const click = vi.fn();
  render(<><Button disabled onClick={click}>{shell.menu}</Button><ButtonLink href={shell.home.href} variant="secondary">{shell.backHome}</ButtonLink></>);
  fireEvent.click(screen.getByRole("button"));
  expect(click).not.toHaveBeenCalled();
  expect(screen.getByRole("link", { name: shell.backHome })).toHaveAttribute("href", shell.home.href);
  expect(screen.getByRole("link")).toHaveClass("button--secondary");
});
