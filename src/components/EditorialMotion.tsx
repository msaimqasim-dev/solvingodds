"use client";

import { useRef, type ComponentProps } from "react";
import { useEditorialMotion } from "../hooks/useEditorialMotion";

export function EditorialMotion(props: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  useEditorialMotion(ref);
  return <div {...props} ref={ref} />;
}
