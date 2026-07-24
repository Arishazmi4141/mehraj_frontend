"use client";

import { useState, useEffect } from "react";

export function useLoader() {
  const [shouldShow, setShouldShow] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = () => {
    setIsComplete(true);
    setShouldShow(false);
  };

  return { shouldShow, isComplete, handleComplete };
}