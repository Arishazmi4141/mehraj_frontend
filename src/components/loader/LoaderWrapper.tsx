"use client";

import { useLoader } from "@/src/hooks/useLoader";
import Loader from "@/src/components/loader/Loader";

export function LoaderWrapper() {
  const { shouldShow, handleComplete } = useLoader();

  if (!shouldShow) return null;

  return <Loader onFinish={handleComplete} />;
}