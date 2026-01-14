'use client';

import { getAgent } from '@/lib/agentEngine';
import AIChatCard from '@/components/ui/ai-chat';
import Image from 'next/image';

interface ChatWindowProps {
  agentId: string;
}

export default function ChatWindow({ agentId }: ChatWindowProps) {
  const agent = getAgent(agentId);

  // Get agent image
  const agentImage = agentId === 'memes' ? '/images/memes.jpg' : agentId === 'casino' ? '/images/casino.jpg' : null;

  if (!agent) {
    return <div className="text-white">Agent not found</div>;
  }

  return (
    <div className="flex h-screen bg-black overflow-hidden fixed inset-0">
      {/* Left Side - Agent Image */}
      <div className="hidden lg:block w-2/5 relative overflow-hidden h-full flex-shrink-0">
        {agentImage ? (
          <>
            <Image
              src={agentImage}
              alt={agent.name}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-black flex items-center justify-center">
            <p className="text-slate-500 text-xl">No image available</p>
          </div>
        )}
      </div>

      {/* Right Side - Chat */}
      <div className="flex-1 flex items-center justify-center h-full flex-shrink-0">
        <AIChatCard 
          agent={agent}
          agentId={agentId}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
