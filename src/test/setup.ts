import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

if (typeof window !== "undefined") {
  if (typeof SVGPathElement !== "undefined") {
    SVGPathElement.prototype.getTotalLength = SVGPathElement.prototype.getTotalLength || (() => 600);
    SVGPathElement.prototype.getPointAtLength = SVGPathElement.prototype.getPointAtLength || ((len: number) => ({
      x: 100 + len * 0.5,
      y: 150,
      matrixTransform: () => ({} as DOMPoint),
    } as DOMPoint));
  }

  if (window.HTMLMediaElement) {
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = () => {};
  }
}

