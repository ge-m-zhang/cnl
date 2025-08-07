import { useEffect, useState } from 'react';

// credit: https://stackoverflow.com/a/54114180

/**
 * A custom React hook that delays the unmounting of a component.
 *
 * This hook is useful for implementing animations when a component is being removed from the DOM.
 * It allows the component to remain in the DOM for a specified delay time after it's been signaled to unmount,
 * giving time for exit animations to complete.
 *
 * @param isMounted - A boolean indicating whether the component should be mounted.
 * @param delayTime - The time in milliseconds to delay the unmounting of the component.
 * @returns A boolean indicating whether the component should be rendered in the DOM.
 *
 * @example
 * in ModalWrapper.tsx
 */
export const useDelayUnmount = (isMounted: boolean, delayTime: number) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isMounted && !shouldRender) {
      // mount the component
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      // unmount the component, but delay the unmounting
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
};
