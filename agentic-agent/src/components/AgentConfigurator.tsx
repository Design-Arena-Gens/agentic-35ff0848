'use client';

import { ChangeEvent } from "react";
import { AgentPersona, IntegrationOption, BusinessObjective } from "@/types/agent";
import { Sparkles, ShieldCheck, Settings2, Database } from "lucide-react";

interface AgentConfiguratorProps {
  persona: AgentPersona;
  objectives: BusinessObjective[];
  integrations: IntegrationOption[];
  onPersonaChange: (persona: AgentPersona) => void;
  onToggleObjective: (objectiveId: string) => void;
  onToggleIntegration: (integrationId: string) => void;
}

const toneOptions: AgentPersona["tone"][] = [
  "Professional",
  "Conversational",
  "Analytical",
  "Playful",
];

const voiceOptions: AgentPersona["voice"][] = ["Executive", "Advisor", "Operator"];

export default function AgentConfigurator({
  persona,
  objectives,
  integrations,
  onPersonaChange,
  onToggleObjective,
  onToggleIntegration,
}: AgentConfiguratorProps) {
  const handleInput =
    (field: keyof AgentPersona) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onPersonaChange({ ...persona, [field]: event.target.value });
    };

  const handleCompetencyChange = (index: number, value: string) => {
    const next = [...persona.competencies];
    next[index] = value;
    onPersonaChange({ ...persona, competencies: next });
  };

  const handleGuardrailChange = (index: number, value: string) => {
    const next = [...persona.guardrails];
    next[index] = value;
    onPersonaChange({ ...persona, guardrails: next });
  };

  return (
    <section className="glass p-6 md:p-8 space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <span className="badge">
            <Sparkles size={14} />
            Agent DNA
          </span>
          <h2 className="text-2xl font-semibold mt-3">Persona Configuration</h2>
          <p className="text-sm text-[var(--muted)] mt-1 max-w-3xl leading-relaxed">
            Define how your agent should sound, what it knows, and the guardrails that
            keep it compliant. These settings drive the prompts used by the orchestration
            layer.
          </p>
        </div>
      </header>

      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-[var(--muted-strong)] uppercase tracking-wide">
                Codename
              </span>
              <input
                value={persona.codename}
                onChange={handleInput("codename")}
                className="bg-[var(--surface-strong)] border border-[var(--surface-border)] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-[var(--muted-strong)] uppercase tracking-wide">
                Primary Industry
              </span>
              <input
                value={persona.industry}
                onChange={handleInput("industry")}
                className="bg-[var(--surface-strong)] border border-[var(--surface-border)] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-[var(--muted-strong)] uppercase tracking-wide">
                Tone
              </span>
              <select
                value={persona.tone}
                onChange={handleInput("tone")}
                className="bg-[var(--surface-strong)] border border-[var(--surface-border)] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                {toneOptions.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-[var(--muted-strong)] uppercase tracking-wide">
                Voice
              </span>
              <select
                value={persona.voice}
                onChange={handleInput("voice")}
                className="bg-[var(--surface-strong)] border border-[var(--surface-border)] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                {voiceOptions.map((voice) => (
                  <option key={voice} value={voice}>
                    {voice}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {persona.competencies.map((competency, index) => (
              <label key={index} className="flex flex-col gap-2 text-sm">
                <span className="text-[var(--muted-strong)] uppercase tracking-wide">
                  {index === 0 ? "Core Competencies" : " "}
                </span>
                <input
                  value={competency}
                  onChange={(event) => handleCompetencyChange(index, event.target.value)}
                  className="bg-[var(--surface-strong)] border border-[var(--surface-border)] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  placeholder="Competency"
                />
              </label>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {persona.guardrails.map((guardrail, index) => (
              <label key={index} className="flex flex-col gap-2 text-sm">
                <span className="text-[var(--muted-strong)] uppercase tracking-wide">
                  {index === 0 ? "Safety Guardrails" : " "}
                </span>
                <input
                  value={guardrail}
                  onChange={(event) => handleGuardrailChange(index, event.target.value)}
                  className="bg-[var(--surface-strong)] border border-[var(--surface-border)] rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  placeholder="Guardrail"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass bg-[var(--surface-strong)] border border-[var(--surface-border)] rounded-2xl px-5 py-6 space-y-3">
            <div className="flex items-center gap-3 font-medium text-lg">
              <Settings2 size={18} className="text-[var(--accent)]" />
              Active Objectives
            </div>
            <div className="space-y-2">
              {objectives.map((objective) => (
                <button
                  key={objective.id}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                    objective.enabled
                      ? "border-[var(--accent)] bg-[rgba(34,211,238,0.12)] text-[var(--accent-strong)]"
                      : "border-[var(--surface-border)] text-[var(--muted)]"
                  }`}
                  onClick={() => onToggleObjective(objective.id)}
                >
                  <div className="text-sm font-semibold">{objective.title}</div>
                  <p className="text-xs opacity-75 mt-1">
                    KPI: {objective.successMetric} • Priority: {objective.priority}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="glass bg-[var(--surface-strong)] border border-[var(--surface-border)] rounded-2xl px-5 py-6 space-y-3">
            <div className="flex items-center gap-3 font-medium text-lg">
              <Database size={18} className="text-[var(--accent)]" />
              Integrations
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {integrations.map((integration) => (
                <button
                  key={integration.id}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                    integration.enabled
                      ? "border-[var(--accent)] bg-[rgba(56,189,248,0.12)] text-[var(--accent-strong)]"
                      : "border-[var(--surface-border)] text-[var(--muted)]"
                  }`}
                  onClick={() => onToggleIntegration(integration.id)}
                >
                  <div className="text-sm font-semibold">{integration.name}</div>
                  <p className="text-xs opacity-75 mt-1">{integration.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-between flex-wrap gap-3 border-t border-[var(--surface-border)] pt-4">
        <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
          <ShieldCheck size={14} />
          SOC2-ready logging, conversation redaction, and enterprise controls included.
        </div>
        <p className="text-xs text-[var(--muted)]">
          Persona settings sync automatically to the orchestration engine.
        </p>
      </footer>
    </section>
  );
}
