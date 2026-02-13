"use client"

import type React from "react"

import { useScrollRestore } from "@/hooks/use-scroll-restore"

export function ScrollRestoreProvider({ children }: { children: React.ReactNode }) {
  useScrollRestore()
  return <>{children}</>
}
