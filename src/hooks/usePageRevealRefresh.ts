// src/hooks/usePageRevealRefresh.ts
"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PAGE_REVEALED_EVENT } from "@/src/components/common/PageRevealProvider";

export function usePageRevealRefresh() {
  useEffect(() => {
    const refresh = () => {
      // double rAF — ek frame layout ke liye, ek paint commit hone ke liye
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    };

    window.addEventListener(PAGE_REVEALED_EVENT, refresh);
    // agar event already fire ho chuka ho (race condition — section
    // PAGE_REVEALED_EVENT ke baad mount hua), window load pe bhi refresh
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener(PAGE_REVEALED_EVENT, refresh);
      window.removeEventListener("load", refresh);
    };
  }, []);
}