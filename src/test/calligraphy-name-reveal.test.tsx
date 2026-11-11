import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { CalligraphyNameReveal } from "@/components/wedding/CalligraphyNameReveal";
import { Opening } from "@/components/wedding/Opening";

describe("CalligraphyNameReveal", () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("renders both names and the ampersand in the document", () => {
    const onComplete = vi.fn();
    render(<CalligraphyNameReveal active={true} onComplete={onComplete} />);

    expect(screen.getByText("Tanzilah Fatema")).toBeDefined();
    expect(screen.getByText("&")).toBeDefined();
    expect(screen.getByText("Zeeshan Alam")).toBeDefined();
  });

  it("renders names in the document when active is true", async () => {
    const onComplete = vi.fn();
    render(<CalligraphyNameReveal active={true} onComplete={onComplete} />);

    await waitFor(() => {
      expect(screen.getByText("Tanzilah Fatema")).toBeDefined();
      expect(screen.getByText("Zeeshan Alam")).toBeDefined();
    });
  });
});

describe("Opening Sequence", () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("renders the interactive sealed invitation with tap prompt initially", () => {
    const onDone = vi.fn();
    render(<Opening onDone={onDone} />);

    expect(screen.getByText("YOU ARE CORDIALLY INVITED")).toBeDefined();
    expect(screen.getByRole("button", { name: /tap to open your invitation/i })).toBeDefined();
  });

  it("initiates opening playback when tapped", async () => {
    const onDone = vi.fn();
    const playMock = vi.fn().mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.play = playMock;

    render(<Opening onDone={onDone} />);

    const openButton = screen.getByRole("button", { name: /tap to open your invitation/i });
    expect(openButton).toBeDefined();

    await act(async () => {
      fireEvent.click(openButton);
    });

    expect(playMock).toHaveBeenCalled();
  });

  it("allows skipping to the invitation", async () => {
    const onDone = vi.fn();
    window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);

    render(<Opening onDone={onDone} />);

    const openButton = screen.getByRole("button", { name: /tap to open your invitation/i });
    await act(async () => {
      fireEvent.click(openButton);
    });

    const skipButton = screen.getByText("SKIP");
    expect(skipButton).toBeDefined();

    fireEvent.click(skipButton);
    // After fade duration, onDone should be triggered
    await new Promise((r) => setTimeout(r, 1000));
    expect(onDone).toHaveBeenCalled();
  });
});
