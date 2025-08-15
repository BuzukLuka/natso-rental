"use client";
import { iso } from "@/utils/date";
import { useEffect, useState } from "react";

export default function DateRangePicker({
  start,
  months,
  onChange,
}: {
  start?: string;
  months?: number;
  onChange: (startISO: string, months: number) => void;
}) {
  const [s, setS] = useState(start || iso(new Date()));
  const [m, setM] = useState(months || 6);
  useEffect(() => onChange(s, m), [s, m, onChange]);
  return (
    <div className="grid grid-cols-2 gap-2">
      <input
        className="input"
        type="date"
        value={s}
        min={iso(new Date())}
        onChange={(e) => setS(e.target.value)}
      />
      <input
        className="input"
        type="number"
        min={1}
        max={12}
        value={m}
        onChange={(e) => setM(Number(e.target.value))}
      />
    </div>
  );
}
