export type AgentRole = "assistant" | "user" | "system";

export interface ConversationMessage {
  id: string;
  role: AgentRole;
  content: string;
  createdAt: string;
}

export interface AgentPersona {
  codename: string;
  industry: string;
  tone: "Professional" | "Conversational" | "Analytical" | "Playful";
  voice: "Executive" | "Advisor" | "Operator";
  competencies: string[];
  guardrails: string[];
}

export interface BusinessObjective {
  id: string;
  title: string;
  category: "Revenue" | "Operations" | "Support" | "Marketing";
  successMetric: string;
  priority: "High" | "Medium" | "Low";
  enabled: boolean;
}

export interface IntegrationOption {
  id: string;
  name: string;
  category: "CRM" | "Support" | "Marketing" | "Data";
  description: string;
  enabled: boolean;
}

export interface AutomationPlay {
  id: string;
  title: string;
  description: string;
  trigger: string;
  action: string;
  metric: string;
  enabled: boolean;
}

export interface AgentConfigurationSnapshot {
  persona: AgentPersona;
  objectives: BusinessObjective[];
  integrations: IntegrationOption[];
  automations: AutomationPlay[];
}
