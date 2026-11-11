import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { AudioProvider, useWeddingAudio } from "@/components/wedding/AudioContext";

function TestAudioConsumer() {
  const { playing, toggle, startMusic } = useWeddingAudio();
  return (
    <div>
      <span data-testid="status">{playing ? "PLAYING" : "PAUSED"}</span>
      <button onClick={startMusic}>Start</button>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

AudioProvider.toString = () => "AudioProvider";

describe("Wedding Audio Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders consumer with initial paused state and allows start/toggle", async () => {
    render(
      <AudioProvider>
        <TestAudioConsumer />
      </AudioProvider>
    );

    expect(screen.getByTestId("status").textContent).toBe("PAUSED");

    const startBtn = screen.getByText("Start");
    await act(async () => {
      fireEvent.click(startBtn);
    });

    const toggleBtn = screen.getByText("Toggle");
    await act(async () => {
      fireEvent.click(toggleBtn);
    });
  });

  it("exposes playTapSound and playSparkleSound without throwing", () => {
    let audioContextMethods: any = null;
    function Helper() {
      audioContextMethods = useWeddingAudio();
      return null;
    }
    render(
      <AudioProvider>
        <Helper />
      </AudioProvider>
    );

    expect(typeof audioContextMethods.playTapSound).toBe("function");
    expect(typeof audioContextMethods.playSparkleSound).toBe("function");
    expect(() => audioContextMethods.playTapSound()).not.toThrow();
    expect(() => audioContextMethods.playSparkleSound()).not.toThrow();
  });
});
