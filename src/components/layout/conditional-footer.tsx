"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    // Delay showing footer to prevent flash during loading or navigation
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!showFooter) return null;

  return <Footer />;
}
