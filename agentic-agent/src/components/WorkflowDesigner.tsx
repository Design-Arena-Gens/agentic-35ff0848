'use client';

import { AutomationPlay } from "@/types/agent";
import { Brain, Clock, Rocket, ToggleLeft } from "lucide-react";

interface WorkflowDesignerProps {
  automations: AutomationPlay[];
  onToggleAutomation: (automationId: string) => void;
}

export default function WorkflowDesigner({
  automations,
  onToggleAutomation,
}: WorkflowDesignerProps) {
  return (
    <section className="glass p-6 md:p-8 space-y-6">
      <header className="flex items-start gap-4">
        <div>
          <span className="badge">
            <Brain size={14} />
            Automation Canvas
          </span>
          <h2 className="text-2xl font-semibold mt-3">Workflow Orchestration</h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Toggle the automations your clients can deploy out-of-the-box. Each play is
            accompanied with live ROI tracking once connected to their stack.
          </p>
        </div>
      </header>

      <div className="grid-auto-fill">
        {automations.map((play) => (
          <article
            key={play.id}
            className={`border rounded-2xl p-5 transition ${
              play.enabled
                ? "border-[rgba(34,211,238,0.35)] bg-[rgba(34,211,238,0.12)]"
                : "border-[var(--surface-border)] bg-[rgba(15,23,42,0.55)]"
            }`}
          >
            <header className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold">{play.title}</h3>
                <p className="text-xs uppercase tracking-wide text-[var(--muted)] mt-1">
                  Trigger: {play.trigger}
                </p>
              </div>
              <button
                onClick={() => onToggleAutomation(play.id)}
                className={`flex items-center gap-2 text-xs uppercase tracking-wide transition ${
                  play.enabled ? "text-[var(--accent)]" : "text-[var(--muted)]"
                }`}
                aria-pressed={play.enabled}
              >
                <ToggleLeft
                  size={18}
                  style={{
                    transform: play.enabled ? "scaleX(-1)" : "none",
                    color: play.enabled ? "var(--accent)" : "inherit",
                    transition: "transform 0.25s ease",
                  }}
                />
                {play.enabled ? "Enabled" : "Disabled"}
              </button>
            </header>
            <p className="text-sm text-[var(--muted-strong)] leading-relaxed mb-4">
              {play.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
              <Clock size={14} />
              SLA: {play.action}
            </div>
            <div className="flex items-center gap-3 text-xs text-[var(--muted)] mt-2">
              <Rocket size={14} className="text-[var(--positive)]" />
              Success Metric: {play.metric}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
