import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { ScrollToHash } from "./ScrollToHash";

describe("ScrollToHash", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    window.location.hash = "";
  });

  it("returns null", () => {
    const { container } = render(<ScrollToHash />);
    expect(container.firstChild).toBeNull();
  });

  it("scrolls to element when hash matches", () => {
    const scrollIntoView = vi.fn();
    const target = document.createElement("div");
    target.id = "young";
    target.scrollIntoView = scrollIntoView;
    document.body.appendChild(target);

    window.location.hash = "#young";
    render(<ScrollToHash />);

    vi.advanceTimersByTime(150);

    expect(scrollIntoView).toHaveBeenCalled();

    document.body.removeChild(target);
  });
});
