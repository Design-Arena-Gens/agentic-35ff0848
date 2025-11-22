## Agentic GTM Studio

Enterprise-ready AI agent workspace tailored for B2B deployments. Configure personas, align objectives to buyer KPIs, orchestrate automations, and preview the live agent experience from a single console.

### Highlights

- Persona DNA editor: tune tone, competencies, and compliance guardrails.
- Objective + integration toggles that shape the orchestration prompt in real time.
- Automation catalog with projected ROI metrics for sales collateral.
- Conversational sandbox powered by OpenAI (`/api/agent`) for demos and validation.
- Packaging narrative and CTA sections optimized for go-to-market teams.

### Prerequisites

Create a `.env.local` file and include:

```bash
OPENAI_API_KEY=sk-...
```

Without the key the `/api/agent` route will surface an error response.

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the studio.

### Production Build

```bash
npm run build
npm run start
```

### Deploy on Vercel

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-35ff0848
```

The app is optimized for Vercel’s edge runtime and uses the App Router.
