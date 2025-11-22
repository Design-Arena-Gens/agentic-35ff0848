'use client';

import { BarChart3, Gauge, GlobeLock } from "lucide-react";

const metrics = [
  {
    id: "roi",
    icon: Gauge,
    label: "Projected ROI",
    value: "412%",
    sublabel: "vs. manual operations",
    accent: "text-[var(--positive)]",
  },
  {
    id: "sla",
    icon: GlobeLock,
    label: "Compliance & Security",
    value: "SOC2 • GDPR • HIPAA Lite",
    sublabel: "Enterprise-grade audit logs",
    accent: "text-[var(--accent)]",
  },
  {
    id: "engagement",
    icon: BarChart3,
    label: "Engagement Lift",
    value: "+68%",
    sublabel: "Avg. personalized sales response rate",
    accent: "text-[var(--accent-strong)]",
  },
];

export default function InsightDashboard() {
  return (
    <section className="glass p-6 md:p-8 space-y-6">
      <header className="flex items-start justify-between gap-6">
        <div>
          <span className="badge">Proof for Buyers</span>
          <h2 className="text-2xl font-semibold mt-3">
            Conversion assets for your sales team
          </h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Hand prospects a live ROI model, security posture readiness, and real proof
            from pilot programs. Every datapoint below can be customized per client.
          </p>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-5">
        {metrics.map(({ id, icon: Icon, label, value, sublabel, accent }) => (
          <article
            key={id}
            className="border border-[var(--surface-border)] rounded-2xl p-5 bg-[rgba(15,23,42,0.58)] hover:border-[rgba(34,211,238,0.28)] transition"
          >
            <Icon size={24} className="text-[var(--accent)] mb-4" />
            <div className="text-sm text-[var(--muted)] uppercase tracking-wide">{label}</div>
            <div className={`text-2xl font-semibold mt-2 ${accent}`}>{value}</div>
            <p className="text-xs text-[var(--muted)] mt-3 leading-relaxed">{sublabel}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
