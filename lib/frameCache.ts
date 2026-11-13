// Shared frame cache for the sequence scrollytelling
export const TOTAL_FRAMES = 189;

// In-memory cache for HTMLImageElements
export const frameImages: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES + 1).fill(null);
export const frameLoadedState: boolean[] = new Array(TOTAL_FRAMES + 1).fill(false);
const frameLoadingState: boolean[] = new Array(TOTAL_FRAMES + 1).fill(false);

const listeners = new Set<() => void>();

export function onFrameLoaded(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function notifyFrameLoaded() {
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {
      // ignore listener error
    }
  });
}

export function getFrameUrl(index: number): string {
  const padded = String(Math.max(1, Math.min(TOTAL_FRAMES, Math.round(index)))).padStart(3, "0");
  return `/sequence/burning/f_${padded}.webp`;
}

// Helper to load a single frame
export function loadFrame(index: number): Promise<HTMLImageElement> {
  const safeIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(index)));
  return new Promise((resolve) => {
    if (frameImages[safeIndex] && frameLoadedState[safeIndex]) {
      resolve(frameImages[safeIndex]!);
      return;
    }

    if (frameLoadingState[safeIndex] && frameImages[safeIndex]) {
      // Already loading, wait on existing instance
      const existing = frameImages[safeIndex]!;
      if (existing.complete) {
        frameLoadedState[safeIndex] = true;
        resolve(existing);
        return;
      }
      existing.addEventListener("load", () => {
        frameLoadedState[safeIndex] = true;
        notifyFrameLoaded();
        resolve(existing);
      }, { once: true });
      existing.addEventListener("error", () => {
        frameLoadedState[safeIndex] = true;
        resolve(existing);
      }, { once: true });
      return;
    }

    frameLoadingState[safeIndex] = true;
    const img = new Image();
    img.src = getFrameUrl(safeIndex);
    frameImages[safeIndex] = img;

    img.onload = () => {
      frameLoadedState[safeIndex] = true;
      notifyFrameLoaded();
      resolve(img);
    };
    img.onerror = () => {
      frameLoadedState[safeIndex] = true;
      resolve(img);
    };
  });
}

// Find nearest loaded frame for fast fallback while frames are still streaming in
export function getNearestLoadedFrame(targetIndex: number): HTMLImageElement | null {
  const safe = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(targetIndex)));
  if (frameImages[safe] && frameLoadedState[safe]) {
    return frameImages[safe];
  }

  // Trigger loading of target frame if not started
  if (!frameLoadingState[safe]) {
    loadFrame(safe);
  }

  // Look outwards for closest ready frame
  for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
    const left = safe - offset;
    const right = safe + offset;
    if (left >= 1 && frameImages[left] && frameLoadedState[left]) {
      return frameImages[left];
    }
    if (right <= TOTAL_FRAMES && frameImages[right] && frameLoadedState[right]) {
      return frameImages[right];
    }
  }

  return frameImages[1] || null;
}
