import { useCallback, useSyncExternalStore } from "react";
export default function useMediaQuery(query) {
  const subscribe = useCallback((callback) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
  }, [query]);
  const snapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
