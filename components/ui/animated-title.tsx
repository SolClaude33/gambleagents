"use client"
import { motion } from "framer-motion"
import { TextScramble } from "@/components/ui/text-scramble"

interface AnimatedTitleProps {
  agentType: "memes" | "casino" | "sport"
}

export const AnimatedTitle = ({ agentType }: AnimatedTitleProps) => {
  const colorSchemes = {
    memes: "#00ff88", // Cyan/green for crypto vibes
    casino: "#ffd700", // Gold for casino luxury
    sport: "#ff6b35", // Orange for sports energy
  }

  const frameColor = colorSchemes[agentType]
  const claudeOrange = "#FF6B35" // Claude AI brand orange

  return (
    <motion.div
      key={agentType}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="select-none"
    >
      <div
        className="relative inline-block px-6 py-3"
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
      >
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-wider relative z-10 flex items-center gap-2">
          <TextScramble as="span" style={{ color: claudeOrange }}>
            CLAUDE
          </TextScramble>
          <TextScramble as="span" className="text-white">
            ALL IN
          </TextScramble>
        </h1>
      </div>
    </motion.div>
  )
}
