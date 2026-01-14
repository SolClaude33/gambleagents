"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Component as ShatterButton } from "@/components/ui/shatter-button"

// Define the type for a single agent
type Agent = {
  id: string
  name: string
  description: string
  imageSrc: string
  backgroundSrc: string
  disabled?: boolean
}

// Define the props for the slider component
interface AgentSliderProps {
  agents: Agent[]
  className?: string
  autoplay?: boolean
  onSelect?: (agent: Agent) => void
  onActiveChange?: (agent: Agent) => void
}

/**
 * Agent slider component for CLAUDE ALL IN
 */
export const AgentSlider = ({ agents, className, autoplay = false, onSelect, onActiveChange }: AgentSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")

  const activeAgent = agents[currentIndex]

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setDirection("right")
      setCurrentIndex((prev) => (prev + 1) % agents.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, agents.length])

  // Notify parent of active agent changes
  useEffect(() => {
    if (onActiveChange && activeAgent) {
      onActiveChange(activeAgent)
    }
  }, [currentIndex, activeAgent, onActiveChange])

  const handleNext = () => {
    setDirection("right")
    setCurrentIndex((prev) => (prev + 1) % agents.length)
  }

  const handlePrev = () => {
    setDirection("left")
    setCurrentIndex((prev) => (prev - 1 + agents.length) % agents.length)
  }

  const handleSelect = () => {
    if (onSelect && activeAgent && !activeAgent.disabled) {
      onSelect(activeAgent)
    }
  }

  // Animation variants for the main image
  const imageVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  }

  // Animation variants for the text content
  const textVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
    }),
  }

  return (
    <div className={cn("relative w-full h-screen flex items-center justify-center overflow-hidden", className)}>
      <div className="absolute top-8 left-8 text-white z-20">
        <div className="text-sm tracking-wider">
          {String(currentIndex + 1).padStart(2, "0")} / {String(agents.length).padStart(2, "0")}
        </div>
        <div className="text-xs tracking-[0.3em] mt-1 opacity-70">AGENTS</div>
      </div>

      <div className="w-full max-w-7xl px-8 md:px-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
        {/* === Main Character Image === */}
        <div className="relative w-full md:w-[480px] h-[480px] md:h-[600px] flex-shrink-0 pointer-events-none">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                pointerEvents: 'none'
              }}
            >
              <img
                src={activeAgent.imageSrc || "/placeholder.svg"}
                alt={activeAgent.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* === Text Content === */}
        <div className="flex flex-col items-start justify-center max-w-lg relative z-10">
          <div className="relative overflow-visible min-h-[280px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-6"
              >
                <div className="text-sm text-gray-400 tracking-wider uppercase">
                  {activeAgent.id === "memes" && "Crypto Analysis"}
                  {activeAgent.id === "casino" && "Casino Strategy"}
                  {activeAgent.id === "sport" && "Sports Betting"}
                </div>

                <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight" style={{ color: '#FF6B35' }}>
                  {activeAgent.name}
                </h2>

                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">"{activeAgent.description}"</p>

                {!activeAgent.disabled && (
                  <ShatterButton onClick={handleSelect} shatterColor="#FF6B35" className="mt-2 text-lg">
                    Enter
                  </ShatterButton>
                )}
                {activeAgent.disabled && <div className="text-gray-500 text-sm italic mt-2">Not available yet</div>}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* === Navigation Arrows === */}
      <div className="absolute bottom-12 right-8 md:right-16 flex items-center gap-3 z-20">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-12 h-12 bg-white hover:bg-gray-200 text-black transition-all duration-300"
          onClick={handlePrev}
          aria-label="Previous agent"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-12 h-12 bg-white hover:bg-gray-200 text-black transition-all duration-300"
          onClick={handleNext}
          aria-label="Next agent"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="absolute bottom-12 left-8 flex items-center gap-3 z-20">
        {agents.map((agent, index) => (
          <button
            key={agent.id}
            onClick={() => {
              setDirection(index > currentIndex ? "right" : "left")
              setCurrentIndex(index)
            }}
            className={cn(
              "w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300",
              index === currentIndex
                ? "border-white scale-110 shadow-lg"
                : "border-white/30 opacity-60 hover:opacity-100 hover:border-white/60",
            )}
            aria-label={`Go to ${agent.name}`}
          >
            <img src={agent.imageSrc || "/placeholder.svg"} alt={agent.name} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default AgentSlider
