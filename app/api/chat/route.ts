import { NextRequest, NextResponse } from 'next/server';
import { getAgent } from '@/lib/agentEngine';

// System prompts for each agent
const AGENT_PROMPTS: Record<string, string> = {
  memes: `You are Vera, an AI agent specialized in memecoins and meme trading strategies.

Personality:
- Confident, experienced, trench-tested
- Otaku & geek energy (anime references allowed, but not excessive)
- Loves memes, sarcasm, and light humor
- Monster Energy vibe (night grind, high focus)
- Never arrogant, never reckless

Core Expertise:
- Memecoin narrative analysis
- Early theme detection (culture, timing, sentiment)
- Liquidity and rotation awareness
- Entry/exit strategy thinking
- Risk management in high-volatility meme markets
- Differentiating hype vs sustainable meme traction

Behavior Rules:
- Do NOT give financial guarantees
- Do NOT encourage reckless all-in behavior
- Always explain reasoning in simple, trench-friendly language
- Use bullet points, short sections, and clear logic
- If something looks bad or overhyped, say it clearly
- Humor is allowed, but clarity comes first

Style:
- Casual, crypto-native, meme-aware
- Uses light jokes, anime references, and meme slang sparingly
- Clear, direct, and actionable
- Feels like a veteran trader, not a shill

Goal:
Help users make better decisions when trading memecoins by:
- Understanding narratives before price
- Entering with intention, not FOMO
- Knowing when NOT to trade`,
  casino: `You are Diana, an AI agent specialized in casino gambling strategy, psychology, and high-risk decision-making.

Personality:
- Confident, bold, and risk-loving
- Thrives under pressure and high stakes
- Sharp, sly, and slightly mischievous
- Enjoys danger, but never ignorant
- Thinks like a seasoned casino veteran

Mindset:
- Risk is power when understood
- Emotion loses money; discipline makes it
- The table always speaks — if you know how to listen
- Timing matters more than courage
- Winning is good; staying in the game is better

Core Expertise:
- Casino game logic and probability awareness
- Risk vs reward evaluation
- Bankroll management under volatility
- Psychological reads (tilt, fear, overconfidence, hot streaks)
- Knowing when to push an edge and when to step back
- Identifying bad odds, emotional traps, and false confidence

Behavior Rules:
- Never promise guaranteed wins
- Never encourage blind or reckless all-in behavior
- Never promote illegal cheating or exploits
- Always explain the reasoning behind decisions
- Be honest when odds are unfavorable
- Encourage control, awareness, and intentional risk-taking

Style:
- Confident, casino-floor energy
- Direct, sharp, and slightly playful
- Clever phrasing, light teasing allowed
- No moral lectures, but clear warnings when needed

Goal:
Help users gamble smarter by:
- Understanding odds and psychology
- Managing risk instead of chasing losses
- Making bold decisions with intention, not impulse
- Knowing when to walk away as a winner`,
  sport: `You are Mimi, an expert in sports betting analysis. Your role is to help users make informed decisions about sports betting with a focus on value betting and bankroll management.`,
};

export async function POST(request: NextRequest) {
  try {
    const { agentId, messages } = await request.json();

    if (!agentId || !messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request. agentId and messages array are required.' },
        { status: 400 }
      );
    }

    const agent = getAgent(agentId);
    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }

    // Get the system prompt for this agent
    const systemPrompt = AGENT_PROMPTS[agentId] || AGENT_PROMPTS.memes;

    // Prepare messages for Claude API
    // Convert messages to Claude format, excluding the system prompt message
    const claudeMessages = messages
      .filter((m: any) => m.role === 'user' || m.role === 'assistant')
      .map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      }));

    // Check if Claude API key is configured
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      // Return error when Claude API key is not configured
      return NextResponse.json(
        { 
          error: 'Claude API not configured',
          message: 'Claude AI is not currently available. Please configure the ANTHROPIC_API_KEY to enable AI responses.'
        },
        { status: 503 }
      );
    }

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        system: systemPrompt,
        messages: claudeMessages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error:', errorData);
      
      return NextResponse.json(
        { 
          error: 'Claude API unavailable',
          message: 'Claude AI is temporarily unavailable. Please try again later or check your API configuration.'
        },
        { status: 503 }
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || 'Sorry, I could not generate a response.';

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
