import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VideoEmbed } from "./VideoEmbed";

describe("VideoEmbed", () => {
  it("renders video title, duration and thumbnail", () => {
    render(<VideoEmbed videoId="dQw4w9WgXcQ" title="Test Video" duration="3:33" />);
    expect(screen.getByText("Test Video")).toBeInTheDocument();
    expect(screen.getByText("3:33")).toBeInTheDocument();
    expect(screen.getByAltText("Test Video")).toBeInTheDocument();
  });

  it("toggles iframe on click", async () => {
    const user = userEvent.setup();
    render(<VideoEmbed videoId="dQw4w9WgXcQ" title="Test Video" duration="3:33" />);

    await user.click(screen.getByText("Test Video"));
    expect(screen.getByTitle("Test Video")).toBeInTheDocument();
  });
});
