"use client"

import type React from "react"

import type { HTMLAttributes } from "react"
import { TextScramble } from "@/components/ui/text-scramble"
import { cn } from "@/lib/utils"

type CornerFrameScrambleTextProps = {
  value: string | number
  className?: string
  as?: React.ElementType
  frameColor?: string
} & HTMLAttributes<HTMLDivElement>

const CornerFrameScrambleText = ({
  value,
  className,
  as,
  frameColor = "var(--foreground)",
  ...props
}: CornerFrameScrambleTextProps) => {
  return (
    <div
      className={cn("relative inline-block px-6 py-3", className)}
      style={{
        background: `
          linear-gradient(to right, ${frameColor} 1.5px, transparent 1.5px),
          linear-gradient(to right, ${frameColor} 1.5px, transparent 1.5px),
          linear-gradient(to left, ${frameColor} 1.5px, transparent 1.5px),
          linear-gradient(to left, ${frameColor} 1.5px, transparent 1.5px),
          linear-gradient(to bottom, ${frameColor} 1.5px, transparent 1.5px),
          linear-gradient(to bottom, ${frameColor} 1.5px, transparent 1.5px),
          linear-gradient(to top, ${frameColor} 1.5px, transparent 1.5px),
          linear-gradient(to top, ${frameColor} 1.5px, transparent 1.5px)
        `,
        backgroundSize: "15px 15px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 0, 0 100%, 100% 0, 100% 100%, 0 0, 100% 0, 0 100%, 100% 100%",
      }}
      {...props}
    >
      <TextScramble as={as} className="relative z-10">
        {String(value)}
      </TextScramble>
    </div>
  )
}

export default CornerFrameScrambleText
