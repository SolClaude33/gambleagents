# 🎲 Claude All In

<div align="center">

![Claude All In](https://img.shields.io/badge/Claude-All%20In-FF6B35?style=for-the-badge&logo=anthropic)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

**AI-powered gambling and trading assistants powered by Claude AI**

[Features](#-features) • [Agents](#-ai-agents) • [Installation](#-installation) • [Configuration](#-configuration)

</div>

---

## ✨ Features

- 🤖 **Three Specialized AI Agents** - Each with unique personalities and expertise
- 🎨 **Beautiful UI** - Modern design with Claude AI branding
- 💬 **Real-time Chat** - Interactive conversations with AI agents
- 🎯 **Specialized Expertise** - Memecoins, casino gambling, and sports betting
- 🔒 **Risk Management** - Built-in frameworks for responsible decision-making
- 🎭 **Personality-Driven** - Each agent has a distinct voice and style

## 🤖 AI Agents

### 👾 Vera - Memecoin Specialist
**"I live in the trenches, run on Monster Energy, and read memes like market signals."**

- **Expertise**: Memecoin narrative analysis, early theme detection, liquidity flows
- **Personality**: Confident, otaku/geek energy, Monster Energy vibe
- **Style**: Crypto-native, meme-aware, trench-tested veteran trader

### 🎰 Diana - Casino Strategist
**"I like risk. I like pressure. And I really like winning."**

- **Expertise**: Casino game logic, probability awareness, bankroll management
- **Personality**: Bold, risk-loving, sharp and slightly mischievous
- **Style**: Casino-floor energy, direct, confident decision-making

### ⚽ Mimi - Sports Analyst
**Coming Soon...**

- **Expertise**: Sports betting analysis, value betting, bankroll management
- **Status**: Under development

## 🚀 Installation

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/SolClaude33/gambleagents.git
   cd gambleagents
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   ANTHROPIC_API_KEY=your_claude_api_key_here
   ```
   
   Get your API key from: [Anthropic Console](https://console.anthropic.com/)

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Claude API Setup

1. Sign up at [Anthropic Console](https://console.anthropic.com/)
2. Create an API key
3. Add it to your `.env.local` file:
   ```env
   ANTHROPIC_API_KEY=sk-ant-api03-...
   ```

### Without Claude API

If Claude API is not configured, the application will display a message indicating that Claude AI is not available. The UI will still function, but AI responses will not be generated.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **AI**: [Claude AI (Anthropic)](https://www.anthropic.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📁 Project Structure

```
gambleagents/
├── app/
│   ├── agents/[id]/     # Agent chat pages
│   ├── api/chat/        # Claude API integration
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── Chat/            # Chat components
│   └── ui/              # UI components
├── lib/
│   ├── agentEngine.ts   # Agent logic
│   └── utils.ts         # Utilities
├── public/              # Static assets
└── styles/              # Global styles
```

## 🎨 Features in Detail

### Interactive Agent Selection
- Beautiful slider interface to browse agents
- Smooth animations and transitions
- Agent-specific backgrounds and imagery

### Chat Interface
- Real-time messaging with AI agents
- Claude AI-powered responses
- Agent-specific avatars and styling
- Typing indicators
- Message history

### Design System
- Claude AI color scheme (#FF6B35)
- Dark theme optimized
- Responsive design
- Smooth animations

## 🔧 Development

### Available Scripts

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private repository. Contributions are not currently accepted.

## 📧 Contact

For questions or support, please open an issue in the repository.

---

<div align="center">

**Built with ❤️ using Claude AI**

[![Claude AI](https://img.shields.io/badge/Powered%20by-Claude%20AI-FF6B35?style=for-the-badge)](https://www.anthropic.com/)

</div>
