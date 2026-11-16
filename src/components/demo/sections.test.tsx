import type { ReactNode } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { LatestWriting } from "./sections";
import { getPosts } from "@/content/posts";
import { demoContent } from "@/content/site";

vi.mock("@/components/motion", () => ({ Reveal: ({ children }: { children: ReactNode }) => <div>{children}</div>, StaggerIn: ({ children }: { children: ReactNode }) => <div>{children}</div> }));
vi.mock("@/content/posts", () => ({ getPosts: vi.fn(), formatPostDate: (date: string) => date }));
afterEach(cleanup);
it("omits Latest writing when there are no published posts", () => {
  vi.mocked(getPosts).mockReturnValue([]);
  const { container } = render(<LatestWriting />);
  expect(container).toBeEmptyDOMElement();
  expect(getPosts).toHaveBeenCalledWith({ includeDrafts: false });
});
it("renders only the latest two returned published posts", () => {
  vi.mocked(getPosts).mockReturnValue(["new", "middle", "old"].map((slug) => ({ slug, title: slug, date: "2026-11-17", summary: "summary", tags: [], draft: false, body: "body" })));
  render(<LatestWriting />);
  expect(screen.getByRole("heading", { name: demoContent.latestTitle })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "new" })).toHaveAttribute("href", "/writing/new");
  expect(screen.getByRole("link", { name: "middle" })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "old" })).not.toBeInTheDocument();
});
