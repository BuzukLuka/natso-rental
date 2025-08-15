export const iso = (d: Date | string) => new Date(d).toISOString().slice(0, 10);

export const monthsBetween = (startISO: string, months: number) => {
  const d = new Date(startISO);
  const end = new Date(d);
  end.setMonth(end.getMonth() + months);
  return { start: d, end };
};
