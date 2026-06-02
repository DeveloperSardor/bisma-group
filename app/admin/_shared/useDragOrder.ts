"use client";

import { useEffect, useState, useTransition } from "react";

type Identified = { id: string };

export function useDragOrder<T extends Identified>(
  initial: T[],
  reorderAction: (ids: string[]) => Promise<void>,
) {
  const [items, setItems] = useState<T[]>(initial);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const [pending, startTransition] = useTransition();
  const [savedHint, setSavedHint] = useState(false);

  // Sync when the parent prop changes (e.g., after revalidation)
  useEffect(() => {
    setItems(initial);
  }, [initial]);

  const commitMove = (from: number, to: number) => {
    if (from === to) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setItems(next);
    startTransition(async () => {
      try {
        await reorderAction(next.map((i) => i.id));
        setSavedHint(true);
        setTimeout(() => setSavedHint(false), 1500);
      } catch (e) {
        console.error("Reorder failed:", e);
        // revert on error
        setItems(initial);
      }
    });
  };

  const rowProps = (idx: number) => ({
    draggable: true,
    onDragStart: (e: React.DragEvent) => {
      setDragIdx(idx);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(idx));
    },
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (overIdx !== idx) setOverIdx(idx);
    },
    onDragLeave: () => {
      // no-op; overIdx is updated by next dragOver
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      const from = dragIdx;
      if (from === null) return;
      commitMove(from, idx);
      setDragIdx(null);
      setOverIdx(null);
    },
    onDragEnd: () => {
      setDragIdx(null);
      setOverIdx(null);
    },
    "data-drag-state":
      dragIdx === idx ? "dragging" : overIdx === idx && dragIdx !== null ? "over" : undefined,
  });

  return { items, rowProps, pending, savedHint };
}
