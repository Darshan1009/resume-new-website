"use client";

import { useEffect, useRef } from "react";

const Cursor = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;
    let hover = false;
    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    let rafId = 0;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        pos.x += (mouse.x - pos.x) / delay;
        pos.y += (mouse.y - pos.y) / delay;
        cursor.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(loop);

    const onOver = (e: Event) => {
      const t = e.currentTarget as HTMLElement;
      if (t.dataset.cursor === "disable") cursor.classList.add("cursor-disable");
    };
    const onOut = () => cursor.classList.remove("cursor-disable");

    const items = document.querySelectorAll<HTMLElement>("[data-cursor]");
    items.forEach((it) => {
      it.addEventListener("mouseover", onOver);
      it.addEventListener("mouseout", onOut);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      items.forEach((it) => {
        it.removeEventListener("mouseover", onOver);
        it.removeEventListener("mouseout", onOut);
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div className="cursor-main" ref={ref} />;
};

export default Cursor;
