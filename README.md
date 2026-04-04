# 🔥 SaaS Idea Validator

> Validate your SaaS idea in seconds using AI + real-time web research. Get a full report with competitor analysis, market size, viability score, and actionable recommendations.

![SaaS Idea Validator](https://img.shields.io/badge/Status-In%20Development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Live Demo

> Coming soon — [saas-validator.vercel.app](https://saas-validator.vercel.app)

---

## 📸 Screenshots

> Coming soon

---

## ✨ Features

- 🤖 **AI-Powered Analysis** — Uses Claude API to generate deep, structured validation reports
- 🔍 **Real-Time Research** — Tavily API searches the web for live competitor and market data
- 📊 **Viability Score** — Every idea gets scored from 0–100
- 🏆 **Verdict System** — Hot 🔥 / Warm ⚠️ / Cold ❄️ rating for each idea
- 👥 **Competitor Discovery** — Finds top 5 existing competitors with links
- 🎯 **Target Audience** — Identifies who your ideal customers are
- 💰 **Revenue Model Suggestions** — Recommends the best monetization strategies
- 🛠️ **MVP Feature List** — Tells you exactly what to build first
- 📄 **PDF Export** — Download your full report (Pro plan)
- 📁 **History** — Save and revisit all your past validations
- 🔐 **Authentication** — Secure login with BetterAuth
- 💳 **Subscription Plans** — Free and Pro tiers via Stripe

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Shadcn/ui |
| **Database** | Neon (PostgreSQL) |
| **ORM** | Drizzle ORM |
| **Auth** | BetterAuth |
| **AI** | Claude API (Anthropic) |
| **Search** | Tavily API |
| **Payments** | Stripe |
| **Email** | Resend + React Email |
| **PDF Export** | React PDF |
| **Deployment** | Vercel |

---

## 📋 Validation Report Includes

Each report generated contains:

- ✅ Idea Summary
- ✅ Viability Score (0–100)
- ✅ Market Size Estimate
- ✅ Top 5 Competitors (with links)
- ✅ Target Audience Breakdown
- ✅ Biggest Risks & Challenges
- ✅ Recommended Revenue Models
- ✅ Suggested MVP Features
- ✅ Overall Verdict (Hot / Warm / Cold)


## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) database
- [Anthropic API](https://console.anthropic.com) key
- [Tavily API](https://tavily.com) key
- [Stripe](https://stripe.com) account
- [Resend](https://resend.com) account

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/saas-idea-validator.git

# Navigate into the project
cd saas-idea-validator

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```


### Database Setup

```bash
# Push schema to your Neon database
npx drizzle-kit push

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
/app
  /(auth)
    /login/page.tsx
    /register/page.tsx
  /(dashboard)
    /dashboard/page.tsx        ← All validations
    /validate/page.tsx         ← New idea submission
    /report/[id]/page.tsx      ← Full report view
    /history/page.tsx          ← Past reports
    /settings/page.tsx         ← Account & billing
  /(marketing)
    /page.tsx                  ← Landing page
    /pricing/page.tsx
    /blog/page.tsx
  /api
    /auth/                     ← BetterAuth routes
    /validate/                 ← AI validation endpoint
    /payments/                 ← Stripe routes
    /webhooks/                 ← Stripe webhooks

/db
  schema.ts                    ← Drizzle tables
  index.ts                     ← Neon connection

/lib
  anthropic.ts                 ← Claude API client
  tavily.ts                    ← Tavily search client
  stripe.ts                    ← Stripe client
  auth.ts                      ← BetterAuth config
  resend.ts                    ← Email client

/components
  /ui                          ← Shadcn components
  /dashboard                   ← Dashboard components
  /report                      ← Report display components
  /marketing                   ← Landing page components
```

---

## 🔄 How It Works

```
1. User submits a business idea
          ↓
2. Tavily searches the web for competitors & market data
          ↓
3. Claude API receives idea + search results
          ↓
4. Claude generates a full structured validation report
          ↓
5. Report is saved to Neon database
          ↓
6. User sees a beautiful, detailed report
          ↓
7. Pro users can export the report as PDF
```

---

## 🗺️ Roadmap

- [x] Project setup & architecture
- [ ] Landing page
- [ ] Authentication (login/register)
- [ ] Idea submission form
- [ ] Tavily API integration
- [ ] Claude API report generation
- [ ] Report display page
- [ ] Dashboard & history
- [ ] Stripe subscription integration
- [ ] Usage limits (free plan)
- [ ] PDF export (pro plan)
- [ ] Blog pages (SEO)
- [ ] Email notifications
- [ ] Mobile responsive polish
- [ ] Product Hunt launch

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change.

```bash
# Fork the repo
# Create your feature branch
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m 'Add amazing feature'

# Push to the branch
git push origin feature/amazing-feature

# Open a Pull Request
```

---

## ⭐ Show Your Support

If you find this project useful, please consider giving it a ⭐ on GitHub!


