"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Message, AgentContext, Agent } from "@/lib/agentEngine";

interface AIChatCardProps {
  className?: string;
  agent: Agent | null;
  agentId: string;
}

export default function AIChatCard({ className, agent, agentId }: AIChatCardProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (agent) {
      let welcomeContent = '';
      
      if (agentId === 'memes') {
        welcomeContent = 'Hey 👋 I\'m Vera.\n\nI live in the trenches, run on Monster Energy, and read memes like market signals.';
      } else if (agentId === 'casino') {
        welcomeContent = 'Hey. I\'m Diana 🎲\n\nI like risk., I like pressure And I really like winning.';
      } else {
        welcomeContent = `👋 Hi, I'm ${agent.name}.\n\nHow can I help you today?`;
      }
      
      const welcomeMessage: Message = {
        role: 'assistant',
        content: welcomeContent,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [agent, agentId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !agent) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Call Claude API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentId,
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get response');
      }

      const data = await response.json();
      
      // Check if there's an error message
      if (data.error) {
        throw new Error(data.message || 'Claude AI is not available');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Claude API:', error);
      
      // Show error message to user
      const errorMessage: Message = {
        role: 'assistant',
        content: `⚠️ **Claude AI is not currently available.**\n\n${error instanceof Error ? error.message : 'Unable to connect to Claude AI. Please make sure the ANTHROPIC_API_KEY is configured in your environment variables.'}\n\nTo enable AI responses, please configure your Claude API key.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!agent) {
    return <div className="text-white">Agent not found</div>;
  }

  const claudeOrange = "#FF6B35";
  const claudeOrangeLight = "#FF7A3D";
  const claudeOrangeDark = "#E55A2B";

  // Get agent avatar image
  const getAgentAvatar = () => {
    if (agentId === 'casino') {
      return '/Screenshot 2026-01-14 051002.png';
    } else if (agentId === 'memes') {
      return '/Screenshot 2026-01-14 051045.png';
    }
    return '/claude-logo.png'; // fallback
  };

  const agentAvatar = getAgentAvatar();

  return (
    <div className={cn("relative w-full h-full overflow-hidden flex flex-col bg-[#1A1A1A]", className)}>
      {/* Header */}
      <div className="relative z-20 px-6 py-4 border-b border-white/5 bg-[#1F1F1F]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white/5">
            <Image
              src={agentAvatar}
              alt={agent.name}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{agent.name}</h2>
            <p className="text-xs text-white/50">Powered by Claude</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative z-10 min-h-0 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex gap-4",
                  msg.role === "assistant" ? "justify-start" : "justify-end"
                )}
              >
                {/* Avatar */}
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center mt-1 bg-white/5">
                    <Image
                      src={agentAvatar}
                      alt={agent.name}
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={cn(
                    "rounded-2xl px-5 py-4 max-w-[75%] shadow-lg",
                    msg.role === "assistant"
                      ? "bg-[#2A2A2A] text-white border border-white/5"
                      : "bg-[#3A3A3A] text-white"
                  )}
                >
                  <div className="prose prose-invert prose-sm max-w-none">
                    {msg.content.split('\n').map((line, idx) => {
                      const parts: (string | JSX.Element)[] = [];
                      let lastIndex = 0;
                      const boldRegex = /\*\*(.*?)\*\*/g;
                      let match;
                      
                      while ((match = boldRegex.exec(line)) !== null) {
                        if (match.index > lastIndex) {
                          parts.push(line.slice(lastIndex, match.index));
                        }
                        parts.push(
                          <strong key={`bold-${idx}-${match.index}`} className="font-semibold text-white">
                            {match[1]}
                          </strong>
                        );
                        lastIndex = match.index + match[0].length;
                      }
                      
                      if (lastIndex < line.length) {
                        parts.push(line.slice(lastIndex));
                      }
                      
                      return (
                        <p key={idx} className={cn("leading-relaxed", idx > 0 && "mt-2")}>
                          {parts.length > 0 ? parts : line}
                        </p>
                      );
                    })}
                  </div>
                </div>

                {/* User Avatar */}
                {msg.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3A3A3A] flex items-center justify-center mt-1 border border-white/10">
                    <User className="w-4 h-4 text-white/70" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* AI Typing Indicator */}
          {isTyping && (
            <motion.div
              className="flex items-center gap-4 justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white/5">
                <Image
                  src={agentAvatar}
                  alt={agent.name}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-[#2A2A2A] border border-white/5">
                <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ backgroundColor: claudeOrange }}></span>
                <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ backgroundColor: claudeOrange, animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ backgroundColor: claudeOrange, animationDelay: '0.4s' }}></span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="relative z-20 px-6 py-4 border-t border-white/5 bg-[#1F1F1F]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <input
              className="flex-1 px-4 py-3 text-sm bg-[#2A2A2A] rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 border border-white/5 transition-all"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              style={{
                backgroundColor: claudeOrange,
              }}
              className="p-3 rounded-xl hover:brightness-110 active:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#FF6B35]/20"
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = claudeOrangeLight;
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = claudeOrange;
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
