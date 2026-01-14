'use client';

import { useParams, useRouter } from 'next/navigation';
import ChatWindow from '@/components/Chat/ChatWindow';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AgentPage() {
  const params = useParams();
  const router = useRouter();
  const agentId = params.id as string;

  return (
    <div className="relative h-screen">
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="text-white hover:text-white/80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
      <ChatWindow agentId={agentId} />
    </div>
  );
}
