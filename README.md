# ⚡ Validly — SaaS Idea Validator

> Validate your SaaS idea in 30 seconds using advanced AI + real-time web research. Get high-fidelity reports with competitor analysis, market viability, and growth strategies.

![Validly Status](https://img.shields.io/badge/Status-Active-black)
![Next.js](https://img.shields.io/badge/Next.js-16.2-black)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-cyan)

---

## ✨ Features

- 🏎️ **30-Second Validation** — Interactive Hero experience with real-time feedback.
- 🌉 **Persistence Bridge** — Ideas follow you from landing page to registration seamlessly using `localStorage` & `URL` propagation.
- 🤖 **Multi-Model AI Engine** — Powered by **Vercel AI SDK** with Groq, Anthropic, and Google Gemini integration.
- 🔍 **Real-Time Research** — Deep web search via **Tavily SDK** for live competitor and pricing data.
- 💬 **V0-Style AI Chat** — Dynamic, auto-resizing chat interface for validating ideas within the dashboard.
- 📊 **Structured Insights** — Comprehensive reports covering Market Size, Competitors, Pricing, and Growth.
- 🎨 **Premium Aesthetic** — Minimalist monochrome design with glassmorphism, Framer Motion animations, and custom typography.
- 🔐 **Modern Auth** — Secure session management using **Better-Auth 1.5**.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16.2 (App Router + Turbopack) |
| **Runtime** | React 19 |
| **Styling** | Tailwind CSS v4 + Framer Motion |
| **Database** | Neon (Serverless PostgreSQL) |
| **ORM** | Drizzle ORM |
| **Auth** | Better-Auth 1.5 |
| **AI SDK** | Vercel AI SDK (with Groq, Anthropic, Google) |
| **Search** | Tavily SDK |
| **UI Components** | Radix UI + Custom Premium Components |

---

## 🏃 Getting Started

### Prerequisites

- Node.js 20+
- A [Neon](https://neon.tech) database
- API Keys: [Groq](https://wow.groq.com), [Tavily](https://tavily.com), [Better-Auth Secret](https://better-auth.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/jeff-nwadi/validly.git

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Database Setup

```bash
# Push schema to your database
npm run db:push

# Run the development server
npm run dev
```

---

## 🔄 The "Validly" Workflow

1. **The Hook**: User enters an idea on the Hero section.
2. **The Wait**: AI simulation runs with animated vertical stages (Researching → Analyzing → Finalizing).
3. **The Bridge**: User registers/logs in; their idea is persisted via `localStorage` and `query fragments`.
4. **The Trigger**: On dashboard mount, the `PendingValidationTrigger` auto-starts a real AI analysis.
5. **The Report**: High-fidelity structured report generated and saved for future access.

---

## 📁 Key Directories

- `/app`: Next.js 16 App Router (Auth, Dashboard, Marketing).
- `/lib`: Core logic for AI SDK, Drizzle Schema, and Better-Auth.
- `/components/frontpage`: Premium landing page components (Hero, Simulation, How it works).
- `/components/dashboard`: Dashboard UI including the `v0` AI Chat interface and the Persistence Trigger.

---

## 🗺️ Roadmap (Current Progress)

- [x] High-fidelity Landing Page & Hero Simulation
- [x] Vercel AI SDK Migration
- [x] Better-Auth Integration
- [x] Drizzle ORM & Postgres Support
- [x] Dashboard & AI Chat Transition
- [x] Idea Persistence Bridge (Landing → Dashboard)
- [ ] Stripe Payment Integration
- [ ] Multi-Project Workspaces
- [ ] Team Collaboration Features

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## ⭐ Support Validly

If you think this is a premium tool, please consider giving it a ⭐ on GitHub!
