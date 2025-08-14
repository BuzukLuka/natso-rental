"use client";
import { ReactNode } from "react";
import clsx from "clsx";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={clsx("container max-w-7xl", className)}>{children}</div>
  );
}
