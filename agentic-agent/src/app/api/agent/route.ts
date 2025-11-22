import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/prompt";

const requestSchema = z.object({
  snapshot: z.object({
    persona: z.object({
      codename: z.string().min(1),
      industry: z.string().min(1),
      tone: z.enum(["Professional", "Conversational", "Analytical", "Playful"]),
      voice: z.enum(["Executive", "Advisor", "Operator"]),
      competencies: z.array(z.string().min(1)).min(1),
      guardrails: z.array(z.string().min(1)).min(1),
    }),
    objectives: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        category: z.enum(["Revenue", "Operations", "Support", "Marketing"]),
        successMetric: z.string(),
        priority: z.enum(["High", "Medium", "Low"]),
        enabled: z.boolean(),
      }),
    ),
    integrations: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        category: z.enum(["CRM", "Support", "Marketing", "Data"]),
        description: z.string(),
        enabled: z.boolean(),
      }),
    ),
    automations: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        trigger: z.string(),
        action: z.string(),
        metric: z.string(),
        enabled: z.boolean(),
      }),
    ),
  }),
  messages: z
    .array(
      z.object({
        role: z.enum(["assistant", "user", "system"]),
        content: z.string().min(1),
      }),
    )
    .min(1),
  userPrompt: z.string().min(1),
});

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const parsed = requestSchema.parse(body);

    const systemPrompt = buildSystemPrompt(parsed.snapshot);

    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: systemPrompt },
        ...parsed.messages,
        {
          role: "user",
          content: `You are responding to the following input from the buyer: ${parsed.userPrompt}.
Remember the active objectives and automations as configured. Provide an action plan with bullet points, suggested automations to trigger, and quantify the projected impact where possible.`,
        },
      ],
    });

    const message = response.choices[0]?.message?.content ?? "";

    return NextResponse.json({ message });
  } catch (error) {
    console.error("[agent-route-error]", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to generate a response from the agent." },
      { status: 500 },
    );
  }
}
