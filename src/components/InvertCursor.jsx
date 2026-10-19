import { useEffect, useRef } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
export default function InvertCursor() {
  const cursor = useRef(null);
  const enabled = useMediaQuery("(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  useEffect(() => {
    if (!enabled) return;
    const node = cursor.current;
    let frame = 0, x = -100, y = -100;
    function move(event) {
      if (event.pointerType === "touch") return;
      x = event.clientX; y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        node.dataset.visible = "true";
        document.documentElement.classList.add("custom-cursor");
        frame = 0;
      });
    }
    function hover(event) { node.dataset.interactive = String(Boolean(event.target.closest("a,button,summary"))); }
    function hide() { node.dataset.visible = "false"; document.documentElement.classList.remove("custom-cursor"); }
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", hover);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    document.addEventListener("keydown", hide);
    return () => {
      cancelAnimationFrame(frame); hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", hover);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      document.removeEventListener("keydown", hide);
    };
  }, [enabled]);
  return enabled ? <div ref={cursor} className="invert-cursor" aria-hidden="true"><span /></div> : null;
}
