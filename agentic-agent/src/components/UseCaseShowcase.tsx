'use client';

import { Building2, Headset, LineChart, Users, Zap } from "lucide-react";

const useCases = [
  {
    id: "sales",
    icon: LineChart,
    title: "Revenue Acceleration",
    description:
      "Automate prospecting research, write hyper-personalized outreach, and generate proposals aligned with your ICP in seconds.",
    metrics: ["+35% SQL lift", "4.2x pipeline coverage"],
  },
  {
    id: "success",
    icon: Headset,
    title: "Customer Success Ops",
    description:
      "Resolve tickets, summarize CS calls, and proactively flag churn risk with CRM notes synchronized in real-time.",
    metrics: ["-52% resolution time", "+21 NPS delta"],
  },
  {
    id: "ops",
    icon: Building2,
    title: "Operations Co-pilot",
    description:
      "Monitor systems, answer policy questions, and keep SOPs up to date with autonomous document updates and approvals.",
    metrics: ["100% policy compliance", "-18 hrs manual QA"],
  },
  {
    id: "hr",
    icon: Users,
    title: "People Partner Agent",
    description:
      "Guide managers through performance reviews, draft job descriptions, and onboard teammates with tailored journeys.",
    metrics: ["-4 weeks onboarding", "+96% manager satisfaction"],
  },
  {
    id: "automation",
    icon: Zap,
    title: "Autonomous Routines",
    description:
      "Chain together LLM reasoning with API actions to automate weekly reports, renewal cadences, and compliance audits.",
    metrics: ["780 hrs saved / quarter", "Audit-ready logs"],
  },
];

export default function UseCaseShowcase() {
  return (
    <section className="glass p-6 md:p-8 space-y-6">
      <header>
        <span className="badge">B2B Proven Plays</span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="text-3xl font-semibold text-gradient">Monetize across teams</h2>
          <p className="text-sm text-[var(--muted)] max-w-xl leading-relaxed">
            Productize your agent with verticalized templates. Bundle it with integrations,
            SLAs, and reporting to create a complete package businesses can adopt in days,
            not months.
          </p>
        </div>
      </header>

      <div className="grid-auto-fill">
        {useCases.map(({ id, icon: Icon, title, description, metrics }) => (
          <article
            key={id}
            className="border border-[var(--surface-border)] rounded-2xl p-5 bg-[rgba(15,23,42,0.6)] hover:border-[rgba(34,211,238,0.3)] transition group"
          >
            <Icon size={28} className="text-[var(--accent)] mb-4" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm text-[var(--muted-strong)] leading-relaxed mb-4">
              {description}
            </p>
            <div className="flex flex-wrap gap-2">
              {metrics.map((metric) => (
                <span
                  key={metric}
                  className="text-xs uppercase tracking-wide px-3 py-2 rounded-full bg-[rgba(34,211,238,0.12)] border border-[rgba(34,211,238,0.3)] text-[var(--accent-strong)]"
                >
                  {metric}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
