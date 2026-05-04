// app/components/canvas/Draggable.tsx
"use client";
import {
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

const HARD_NO_DRAG =
  'input, textarea, select, [contenteditable], [data-no-drag]';
const DRAG_THRESHOLD = 4;

export function Draggable({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const drag = useRef<{
    x: number;
    y: number;
    px: number;
    py: number;
    moved: boolean;
  } | null>(null);
  const swallowNextClick = useRef(false);
  const [grabbing, setGrabbing] = useState(false);

  const apply = () => {
    if (elRef.current) {
      elRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest(HARD_NO_DRAG)) return;
    e.stopPropagation();
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      px: pos.current.x,
      py: pos.current.y,
      moved: false,
    };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
      d.moved = true;
      setGrabbing(true);
    }
    if (!d.moved) return;
    pos.current = { x: d.px + dx, y: d.py + dy };
    apply();
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    if (d.moved) {
      swallowNextClick.current = true;
      // Clear on next frame so a later, unrelated click isn't eaten.
      requestAnimationFrame(() => {
        swallowNextClick.current = false;
      });
    }
    drag.current = null;
    setGrabbing(false);
    (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
  };

  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (swallowNextClick.current) {
      e.stopPropagation();
      e.preventDefault();
      swallowNextClick.current = false;
    }
  };

  return (
    <div
      ref={elRef}
      data-canvas-block
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      className={className}
      style={{
        transform: "translate3d(0px, 0px, 0)",
        touchAction: "none",
        cursor: grabbing ? "grabbing" : "grab",
      }}
    >
      {children}
    </div>
  );
}
