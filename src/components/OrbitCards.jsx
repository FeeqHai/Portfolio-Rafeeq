import { useEffect, useRef } from "react";
import { projects } from "../data/portfolio";
import { usePreferences } from "../hooks/usePreferences";
const cards = projects.flatMap((project) => project.images.map((src) => ({ src, title: project.title })));
const points = cards.map((_, index) => {
  const y = 1 - (index / (cards.length - 1)) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = index * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(angle) * radius, y * 0.82, Math.sin(angle) * radius];
});
export default function OrbitCards() {
  const root = useRef(null);
  const { motion } = usePreferences();
  useEffect(() => {
    const element = root.current, items = Array.from(element.children);
    let frame = 0, angle = 0.6, last = 0, visible = false;
    let targetX = 0, targetY = 0, mouseX = 0, mouseY = 0;
    function draw(time = 0) {
      const delta = last ? Math.min(time - last, 40) : 0; last = time;
      if (motion) angle += delta * 0.00013;
      mouseX += (targetX - mouseX) * 0.035; mouseY += (targetY - mouseY) * 0.035;
      const radius = element.clientWidth * 0.37;
      points.forEach(([px, py, pz], index) => {
        const theta = angle + mouseX;
        const x = px * Math.cos(theta) + pz * Math.sin(theta);
        const z = -px * Math.sin(theta) + pz * Math.cos(theta);
        const y = py + mouseY * z * 0.3;
        const depth = (z + 1) / 2;
        const scale = 0.58 + depth * 0.48;
        const item = items[index];
        item.style.transform = `translate(-50%, -50%) translate3d(${x * radius}px, ${y * radius}px, 0) scale(${scale}) rotateY(${x * -28}deg) rotateZ(${x * 8}deg)`;
        item.style.opacity = String(0.2 + depth * 0.8);
        item.style.zIndex = String(Math.round(depth * 100));
      });
      frame = motion && visible && !document.hidden ? requestAnimationFrame(draw) : 0;
    }
    function start() { cancelAnimationFrame(frame); last = 0; draw(); }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); });
    observer.observe(element);
    const resize = new ResizeObserver(start); resize.observe(element);
    function move(event) {
      const bounds = element.getBoundingClientRect();
      targetX = (event.clientX - bounds.left - bounds.width / 2) / bounds.width * 0.5;
      targetY = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
    }
    function leave() { targetX = 0; targetY = 0; }
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", start);
    draw();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); document.removeEventListener("visibilitychange", start); };
  }, [motion]);
  return <div className="orbit-scene" ref={root} aria-hidden="true">
    {cards.map((card, index) => <figure className="orbit-card" key={index}><img src={card.src} alt="" width={280} height={155} draggable={false} /><figcaption>{card.title}</figcaption></figure>)}
  </div>;
}
