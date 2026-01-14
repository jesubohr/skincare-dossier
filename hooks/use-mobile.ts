"use client"

import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Returns true if the current window width is less than the MOBILE_BREAKPOINT
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    function updateMatch(e: MediaQueryListEvent | MediaQueryList) {
      setIsMobile(e.matches)
    }

    updateMatch(mediaQueryList)
    mediaQueryList.addEventListener("change", updateMatch)

    return () => {
      mediaQueryList.removeEventListener("change", updateMatch)
    }
  }, [])

  return isMobile
}
