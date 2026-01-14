export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AgentContext {
  bankroll?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  messages: Message[];
}

export interface Agent {
  id: string;
  name: string;
  systemStyle: string;
  respond: (userText: string, context: AgentContext) => string;
}

// Intent detection
function detectIntent(text: string): {
  hasDirectPick: boolean;
  keywords: string[];
} {
  const lowerText = text.toLowerCase();
  const directPickKeywords = [
    'numero exacto', 'número exacto', 'exact number',
    'all-in', 'all in', 'todo',
    'compra', 'buy', 'comprar',
    'ahora', 'now', 'inmediato',
    'garantiza', 'garantiza', 'guarantee',
    'ticker', 'coin', 'token',
    'apuesta', 'bet', 'apostar'
  ];
  
  const foundKeywords = directPickKeywords.filter(kw => lowerText.includes(kw));
  return {
    hasDirectPick: foundKeywords.length > 0,
    keywords: foundKeywords
  };
}

// Meme Agent
export class MemeAgent implements Agent {
  id = 'memes';
  name = 'Vera';
  systemStyle = 'crypto-native, fun, direct';

  respond(userText: string, context: AgentContext): string {
    const intent = detectIntent(userText);
    
    if (intent.hasDirectPick) {
      return this.generateRefusalResponse(userText, context);
    }

    // Generate structured response
    const quickRead = this.generateQuickRead(userText);
    const checklist = this.generateChecklist(userText);
    const riskPlan = this.generateRiskPlan(context);
    const questions = this.generateQuestions(userText);

    return `${quickRead}\n\n${checklist}\n\n${riskPlan}\n\n${questions}`;
  }

  private generateRefusalResponse(userText: string, context: AgentContext): string {
    const refusalTemplates = [
      "🚫 I can't give you direct picks, but here's the safe process:",
      "⚠️ I don't make direct buy recommendations, but I'll guide you with the framework:",
      "🔒 I don't give trading signals, but here's how to evaluate it yourself:"
    ];
    
    const refusal = refusalTemplates[Math.floor(Math.random() * refusalTemplates.length)];
    
    return `${refusal}

**Safe process:**
1. Define your max position (${this.getMaxPosition(context)}% of bankroll)
2. Verify minimum liquidity 10x your entry
3. Set stop-loss at -30% and staggered take-profit
4. Only enter if you pass the complete checklist

**Questions to refine:**
- What % of your bankroll are you willing to risk?
- What's your time horizon (scalp, swing, hold)?
- Have you reviewed the token's unlock schedule?`;
  }

  private generateQuickRead(userText: string): string {
    const reads = [
      "📊 **Quick read:**\n• Extreme volatility expected\n• Narrative > fundamentals in memes\n• Timing is everything",
      "⚡ **Quick read:**\n• High risk / high reward\n• Liquidity can disappear fast\n• FOMO kills portfolios",
      "🎯 **Quick read:**\n• Momentum is key\n• Community strength > tokenomics\n• Exit strategy before entering"
    ];
    return reads[Math.floor(Math.random() * reads.length)];
  }

  private generateChecklist(userText: string): string {
    return `✅ **Pre-entry checklist:**
• Liquidity: Minimum 10x your position?
• Volume: 24h > $500k?
• Narrative: Is it alive or dead?
• Holders: Concentration < 20% in top 10?
• Unlock risks: Upcoming unlocks in 7 days?
• Chart: Breakout or pump & dump?`;
  }

  private generateRiskPlan(context: AgentContext): string {
    const maxPos = this.getMaxPosition(context);
    const bankroll = context.bankroll || 1000;
    const suggestedBet = (bankroll * maxPos / 100).toFixed(2);
    
    return `🎲 **Risk plan:**
• Max position: ${maxPos}% of bankroll ($${suggestedBet})
• Invalidation: If it drops -30% or narrative dies
• Exit: Staggered take-profit (50% at +50%, 30% at +100%, 20% at +200%)
• Stop-loss: ALWAYS active`;
  }

  private generateQuestions(userText: string): string {
    const questionSets = [
      `❓ **Questions to refine:**
• What % of bankroll do you want to risk?
• What's your horizon (scalp/swing/hold)?
• Have you reviewed the unlock schedule?`,
      `💭 **Food for thought:**
• Why this meme and not another?
• What's your edge in this trade?
• What would make you exit early?`
    ];
    return questionSets[Math.floor(Math.random() * questionSets.length)];
  }

  private getMaxPosition(context: AgentContext): number {
    const riskMap = { low: 2, medium: 5, high: 10 };
    return riskMap[context.riskLevel || 'medium'];
  }
}

// Casino Agent
export class CasinoAgent implements Agent {
  id = 'casino';
  name = 'Diana';
  systemStyle = 'calm, mathematical';

  respond(userText: string, context: AgentContext): string {
    const intent = detectIntent(userText);
    
    if (intent.hasDirectPick) {
      return this.generateRefusalResponse(userText, context);
    }

    // Detect game type
    const gameType = this.detectGameType(userText);
    
    const probability = this.calculateProbability(gameType);
    const sessionRule = this.generateSessionRule(context);
    const betSizing = this.calculateBetSizing(context);
    const antiTilt = this.generateAntiTilt();

    return `${probability}\n\n${sessionRule}\n\n${betSizing}\n\n${antiTilt}`;
  }

  private detectGameType(text: string): string {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('roulette')) return 'roulette';
    if (lowerText.includes('blackjack') || lowerText.includes('21')) return 'blackjack';
    if (lowerText.includes('dice')) return 'dice';
    if (lowerText.includes('slots')) return 'slots';
    return 'generic';
  }

  private calculateProbability(gameType: string): string {
    const edges: Record<string, { edge: string; explanation: string }> = {
      roulette: {
        edge: '2.7% (European) / 5.26% (American)',
        explanation: 'Simple bet (red/black): 48.65% win chance'
      },
      blackjack: {
        edge: '0.5% - 2%',
        explanation: 'With basic strategy: ~49% win chance per hand'
      },
      dice: {
        edge: '1.4% - 16.67%',
        explanation: 'Depends on bet. Pass line: 1.41% house edge'
      },
      slots: {
        edge: '2% - 15%',
        explanation: 'Varies by machine. Typical RTP: 85-98%'
      },
      generic: {
        edge: '1% - 5%',
        explanation: 'Typical house edge in casino games'
      }
    };

    const game = edges[gameType] || edges.generic;
    const edgeNum = game.edge.split('%')[0].split(' ')[0];
    return `📊 **Probability / Edge:**
• House edge: ${game.edge}
• ${game.explanation}
• For every $100 bet, expect to lose $${edgeNum} on average`;
  }

  private generateSessionRule(context: AgentContext): string {
    const bankroll = context.bankroll || 1000;
    const riskLevel = context.riskLevel || 'medium';
    
    const stopLossMap = { low: 0.1, medium: 0.2, high: 0.3 };
    const stopWinMap = { low: 0.15, medium: 0.3, high: 0.5 };
    
    const stopLoss = bankroll * stopLossMap[riskLevel];
    const stopWin = bankroll * stopWinMap[riskLevel];
    const timeLimit = riskLevel === 'high' ? '60 min' : riskLevel === 'medium' ? '90 min' : '120 min';

    return `⏱️ **Session rule:**
• Stop-loss: -$${stopLoss.toFixed(2)} (${stopLossMap[riskLevel] * 100}% of bankroll)
• Stop-win: +$${stopWin.toFixed(2)} (${stopWinMap[riskLevel] * 100}% of bankroll)
• Max time: ${timeLimit}
• If you reach either → STOP. Come back tomorrow.`;
  }

  private calculateBetSizing(context: AgentContext): string {
    const bankroll = context.bankroll || 1000;
    const riskLevel = context.riskLevel || 'medium';
    
    const betPercentMap = { low: 1, medium: 2, high: 5 };
    const betPercent = betPercentMap[riskLevel];
    const suggestedBet = (bankroll * betPercent / 100).toFixed(2);

    return `💰 **Bet sizing:**
• % per bet: ${betPercent}% of bankroll
• Suggested size: $${suggestedBet}
• Never more than ${betPercent * 2}% on a single bet
• Maximum 10 bets per session`;
  }

  private generateAntiTilt(): string {
    const tips = [
      `🧘 **Anti-tilt check:**
• Are you emotional? → STOP
• Lost 3 in a row? → Take 5 min
• Are you "chasing losses"? → CLOSE SESSION`,
      `⚖️ **Keep a cool head:**
• Losses are normal (house edge)
• Don't increase bets after losing
• If you feel pressure, stop and breathe`
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  }

  private generateRefusalResponse(userText: string, context: AgentContext): string {
    return `🚫 I can't give you exact numbers or tell you "all-in", but here's the safe process:

**Decision framework:**
1. Calculate your bet size (${this.calculateBetSizing(context)})
2. Apply session rule (stop-loss/stop-win)
3. Use basic strategy when applicable
4. Respect the time limit

**Remember:**
• The house always has an advantage
• No system guarantees profits
• Only play with money you can afford to lose

What specific game do you want to analyze?`;
  }
}

// Agent registry
export const agents: Record<string, Agent> = {
  memes: new MemeAgent(),
  casino: new CasinoAgent(),
};

export function getAgent(id: string): Agent | null {
  return agents[id] || null;
}
