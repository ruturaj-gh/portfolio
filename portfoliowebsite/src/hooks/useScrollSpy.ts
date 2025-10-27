import { useEffect, useState, useRef } from 'react';

interface Options {
  offset?: number; // Offset from the top of the viewport
  throttle?: number; // How often to check scroll position (ms)
}

/**
 * A hook to determine which HTML section is currently in view.
 * @param sectionIds An array of IDs for the sections to observe.
 * @param options Configuration options like offset and throttle.
 * @returns The ID of the currently active section.
 */
export function useScrollSpy(
  sectionIds: string[],
  options?: Options
): string | undefined {
  const { offset = 0, throttle: throttleTime = 100 } = options || {};
  const [activeSection, setActiveSection] = useState<string | undefined>(undefined);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Collect all intersecting entries
        const intersectingEntries = entries.filter(entry => entry.isIntersecting);

        // Sort entries by their position to find the topmost visible one
        // This is a more robust way to handle multiple intersecting elements
        if (intersectingEntries.length > 0) {
          intersectingEntries.sort((a, b) => {
            const aRect = a.target.getBoundingClientRect();
            const bRect = b.target.getBoundingClientRect();
            return aRect.top - bRect.top;
          });

          // The first entry in the sorted list (closest to the top) is the "active" one
          const topMostEntry = intersectingEntries[0];
          setActiveSection(topMostEntry.target.id);
        } else {
          // If no sections are intersecting, clear the active section
          setActiveSection(undefined);
        }
      },
      {
        rootMargin: `-${offset}px 0px -${window.innerHeight - offset - 1}px 0px`, // Detect when top of section crosses offset
        threshold: 0, // Trigger as soon as 1 pixel is visible
      }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [sectionIds, offset, throttleTime]);

  return activeSection;
}