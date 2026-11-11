import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Scratch, fireCelebratoryConfetti } from '@/components/wedding/Scratch';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('Scratch Component', () => {
  beforeEach(() => {
    // Mock getContext for HTMLCanvasElement in JSDOM
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      scale: vi.fn(),
      createLinearGradient: vi.fn().mockReturnValue({
        addColorStop: vi.fn(),
      }),
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      lineTo: vi.fn(),
      moveTo: vi.fn(),
      closePath: vi.fn(),
      fillText: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      getImageData: vi.fn().mockReturnValue({
        data: new Uint8ClampedArray(100),
      }),
    });
  });

  it('renders the scratch canvas with accessible label', () => {
    render(<Scratch />);
    expect(screen.getByLabelText(/scratch the sparkling golden heart to reveal the date/i)).toBeDefined();
  });

  it('renders the revealed wedding date inside the heart', () => {
    render(<Scratch />);
    expect(screen.getByText('24th December 2026')).toBeDefined();
    expect(screen.getByText(/save the auspicious date/i)).toBeDefined();
    expect(screen.getByText('Thursday')).toBeDefined();
  });

  it('does not render bride and groom names in the scratch card', () => {
    render(<Scratch />);
    expect(screen.queryByText('Tanzilah Fatema & Zeeshan Alam')).toBeNull();
  });

  it('triggers fireCelebratoryConfetti without throwing', () => {
    expect(() => fireCelebratoryConfetti()).not.toThrow();
  });
});
