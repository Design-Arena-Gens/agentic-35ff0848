'use client';

import { useCallback, useMemo, useState } from "react";
import AgentConfigurator from "@/components/AgentConfigurator";
import ConversationPanel from "@/components/ConversationPanel";
import WorkflowDesigner from "@/components/WorkflowDesigner";
import UseCaseShowcase from "@/components/UseCaseShowcase";
import InsightDashboard from "@/components/InsightDashboard";
import {
  AgentConfigurationSnapshot,
  AgentPersona,
  AutomationPlay,
  BusinessObjective,
  ConversationMessage,
  IntegrationOption,
} from "@/types/agent";
import { Building, ShieldCheck, Sparkles } from "lucide-react";

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const defaultPersona: AgentPersona = {
  codename: "Atlas",
  industry: "B2B SaaS",
  tone: "Professional",
  voice: "Advisor",
  competencies: [
    "Pipeline acceleration strategy",
    "Customer expansion playbooks",
  ],
  guardrails: [
    "Never promise incentives without approval",
    "Always reference compliance policies before giving legal advice",
  ],
};

const defaultObjectives: BusinessObjective[] = [
  {
    id: "pipeline",
    title: "Warm outbound at scale",
    category: "Revenue",
    successMetric: "Meetings booked / rep",
    priority: "High",
    enabled: true,
  },
  {
    id: "renewals",
    title: "Proactive renewal success plans",
    category: "Support",
    successMetric: "Net revenue retention",
    priority: "High",
    enabled: true,
  },
  {
    id: "intelligence",
    title: "Account intelligence briefs",
    category: "Operations",
    successMetric: "Time-to-insight",
    priority: "Medium",
    enabled: true,
  },
  {
    id: "support",
    title: "Tier-1 ticket automation",
    category: "Support",
    successMetric: "Resolution time",
    priority: "Medium",
    enabled: false,
  },
];

const defaultIntegrations: IntegrationOption[] = [
  {
    id: "hubspot",
    name: "HubSpot CRM",
    category: "CRM",
    description: "Sync deal stages, log activities, and trigger workflows.",
    enabled: true,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    description: "Enterprise CRM connector with granular permissioning.",
    enabled: false,
  },
  {
    id: "zendesk",
    name: "Zendesk",
    category: "Support",
    description: "Auto resolve tickets and summarize escalations.",
    enabled: true,
  },
  {
    id: "slack",
    name: "Slack",
    category: "Data",
    description: "Bi-directional agent collaboration with channel routing.",
    enabled: true,
  },
  {
    id: "notion",
    name: "Notion",
    category: "Data",
    description: "Keep SOPs updated, mirror briefs, and sync knowledge base.",
    enabled: false,
  },
];

const defaultAutomations: AutomationPlay[] = [
  {
    id: "deal-desk",
    title: "Deal Desk Co-Pilot",
    description:
      "Ingest RFPs, highlight blockers, and deliver a pricing strategy deck with approval workflows.",
    trigger: "New enterprise opportunity over $50k ARR",
    action: "10-minute SLA response with annotated draft",
    metric: "Win-rate delta vs. control",
    enabled: true,
  },
  {
    id: "renewal-radar",
    title: "Renewal Radar",
    description:
      "Surfaces expansion opportunities, drafts success plans, and schedules QBRs with smart agendas.",
    trigger: "Renewal within 90 days",
    action: "Auto-generated plan with exec summary",
    metric: "Net revenue retention (NRR)",
    enabled: true,
  },
  {
    id: "support-autoresolve",
    title: "Support Auto Resolve",
    description:
      "Handles tier-1 tickets end-to-end with escalation guardrails and customer satisfaction tracking.",
    trigger: "Ticket severity: low",
    action: "Autonomous resolution + CRM notes",
    metric: "First response time",
    enabled: false,
  },
  {
    id: "board-analytics",
    title: "Board Analytics Pack",
    description:
      "Aggregates GTM metrics, annotates trends, and drafts quarterly board readouts automatically.",
    trigger: "Quarterly board meeting upcoming",
    action: "Board-ready narrative with charts",
    metric: "Prep hours saved",
    enabled: false,
  },
];

const introMessages: ConversationMessage[] = [
  {
    id: createId(),
    role: "assistant",
    content:
      "Hi there! I’m Atlas, your revenue-ready AI partner. Upload a target account list or ask me to craft a market entry plan and I’ll spin it up instantly.",
    createdAt: new Date().toISOString(),
  },
];

async function callAgentAPI(
  snapshot: AgentConfigurationSnapshot,
  conversation: ConversationMessage[],
  prompt: string,
) {
  const response = await fetch("/api/agent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      snapshot,
      messages: conversation.map(({ role, content }) => ({ role, content })),
      userPrompt: prompt,
    }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Failed to generate response");
  }

  const data = await response.json();
  return data.message as string;
}

export default function AgentStudio() {
  const [persona, setPersona] = useState<AgentPersona>(defaultPersona);
  const [objectives, setObjectives] = useState<BusinessObjective[]>(defaultObjectives);
  const [integrations, setIntegrations] =
    useState<IntegrationOption[]>(defaultIntegrations);
  const [automations, setAutomations] =
    useState<AutomationPlay[]>(defaultAutomations);
  const [messages, setMessages] =
    useState<ConversationMessage[]>(introMessages);
  const [isStreaming, setIsStreaming] = useState(false);

  const snapshot: AgentConfigurationSnapshot = useMemo(
    () => ({
      persona,
      objectives,
      integrations,
      automations,
    }),
    [persona, objectives, integrations, automations],
  );

  const handleToggleObjective = useCallback(
    (objectiveId: string) => {
      setObjectives((list) =>
        list.map((objective) =>
          objective.id === objectiveId
            ? { ...objective, enabled: !objective.enabled }
            : objective,
        ),
      );
    },
    [],
  );

  const handleToggleIntegration = useCallback((integrationId: string) => {
    setIntegrations((list) =>
      list.map((integration) =>
        integration.id === integrationId
          ? { ...integration, enabled: !integration.enabled }
          : integration,
      ),
    );
  }, []);

  const handleToggleAutomation = useCallback((automationId: string) => {
    setAutomations((list) =>
      list.map((automation) =>
        automation.id === automationId
          ? { ...automation, enabled: !automation.enabled }
          : automation,
      ),
    );
  }, []);

  const handleSendMessage = useCallback(
    async (input: string) => {
      const userMessage: ConversationMessage = {
        id: createId(),
        role: "user",
        content: input,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsStreaming(true);

      try {
        const agentMessages = [...messages, userMessage];
        const result = await callAgentAPI(snapshot, agentMessages, input);
        const assistantMessage: ConversationMessage = {
          id: createId(),
          role: "assistant",
          content: result,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        const assistantMessage: ConversationMessage = {
          id: createId(),
          role: "assistant",
          content:
            error instanceof Error
              ? `⚠️ ${error.message}`
              : "⚠️ Something went wrong generating a response.",
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, snapshot],
  );

  const handleResetConversation = useCallback(() => {
    setMessages(introMessages);
  }, []);

  return (
    <main className="page-shell">
      <header className="hero">
        <div className="hero-content">
          <div className="badge">
            <Sparkles size={16} />
            Agentic OS for B2B teams
          </div>
          <h1>
            Sell a turnkey AI agent{" "}
            <span className="text-gradient">businesses trust</span>
          </h1>
          <p>
            Launch revenue-grade copilots with compliance guardrails, enterprise
            integrations, and automation blueprints. Customize the persona, align it to
            your buyer’s KPIs, and prove value instantly.
          </p>
          <div className="hero-metrics">
            <div>
              <strong>12</strong>
              <span>industry playbooks</span>
            </div>
            <div>
              <strong>8h</strong>
              <span>to onboard a client</span>
            </div>
            <div>
              <strong>99.9%</strong>
              <span>uptime with audit logs</span>
            </div>
          </div>
          <div className="hero-objectives">
            <span>Active objectives</span>
            <div>
              {objectives
                .filter((objective) => objective.enabled)
                .map((objective) => (
                  <em key={objective.id}>{objective.title}</em>
                ))}
            </div>
          </div>
        </div>
        <div className="hero-card glass">
          <Building size={24} className="text-[var(--accent)]" />
          <h2>Commercial Packaging</h2>
          <ul>
            <li>Volume-based pricing tiers with usage caps</li>
            <li>Custom service level agreements & on-call support</li>
            <li>White-label chat surfaces and analytics portal</li>
          </ul>
          <div className="hero-card-footer">
            <ShieldCheck size={16} />
            Compliance-ready out of the box
          </div>
        </div>
      </header>

      <section className="studio-grid">
        <div className="studio-left">
          <AgentConfigurator
            persona={persona}
            objectives={objectives}
            integrations={integrations}
            onPersonaChange={setPersona}
            onToggleObjective={handleToggleObjective}
            onToggleIntegration={handleToggleIntegration}
          />
          <WorkflowDesigner
            automations={automations}
            onToggleAutomation={handleToggleAutomation}
          />
        </div>
        <div className="studio-right">
          <ConversationPanel
            messages={messages}
            isStreaming={isStreaming}
            onSend={handleSendMessage}
            onReset={handleResetConversation}
          />
          <InsightDashboard />
        </div>
      </section>

      <UseCaseShowcase />

      <section className="cta glass">
        <div>
          <h2>Ready to productize your AI agent?</h2>
          <p>
            Bundle professional services, add-on integrations, and revenue share plans.
            We’ll handle model orchestration, monitoring, and deployment for every new
            customer.
          </p>
        </div>
        <a href="https://vercel.com" className="cta-button" rel="noreferrer" target="_blank">
          Launch Pilot
        </a>
      </section>
    </main>
  );
}
