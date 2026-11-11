import { describe, expect, it } from "vitest";
import { getRemaining } from "@/components/wedding/Countdown";

const target = "2026-12-24T00:00:00+05:30";
describe("countdown", () => {
  it("targets 24 Dec 2026 midnight Kolkata time", () => {
    const r = getRemaining(target, Date.parse("2026-12-23T00:00:00+05:30"));
    expect(r).toEqual({ days: 1, hours: 0, minutes: 0, seconds: 0 });
  });
  it("returns null after the date passes, never negative", () => {
    expect(getRemaining(target, Date.parse("2026-12-24T00:00:01+05:30"))).toBeNull();
  });
});
