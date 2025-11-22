'use client';

import { FormEvent, useEffect, useRef, useState } from "react";
import { ConversationMessage } from "@/types/agent";
import { ArrowUpCircle, Loader2, RefreshCw } from "lucide-react";

interface ConversationPanelProps {
  messages: ConversationMessage[];
  isStreaming: boolean;
  onSend: (message: string) => Promise<void>;
  onReset: () => void;
}

export default function ConversationPanel({
  messages,
  isStreaming,
  onSend,
  onReset,
}: ConversationPanelProps) {
  const [input, setInput] = useState("");
  const scrollAnchor = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollAnchor.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() || isStreaming) return;
    const content = input.trim();
    setInput("");
    await onSend(content);
  };

  return (
    <section className="glass p-0 overflow-hidden flex flex-col h-full">
      <header className="px-6 py-5 border-b border-[var(--surface-border)] flex items-center justify-between">
        <div>
          <span className="badge">Live Copilot</span>
          <h3 className="text-xl font-semibold mt-2">Preview the Agent&apos;s Voice</h3>
          <p className="text-sm text-[var(--muted)]">
            Test-drive the conversational AI with the current configuration.
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-xs uppercase tracking-wide text-[var(--muted)] hover:text-[var(--accent)] transition flex items-center gap-2"
        >
          <RefreshCw size={14} />
          Reset session
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[92%] md:max-w-[75%] ${
              message.role === "assistant" ? "ml-auto" : ""
            }`}
          >
            <div
              className={`rounded-2xl px-4 py-3 text-sm leading-relaxed border ${
                message.role === "assistant"
                  ? "bg-[rgba(34,211,238,0.1)] border-[rgba(34,211,238,0.3)] text-[var(--foreground)]"
                  : "bg-[var(--surface-strong)] border-[var(--surface-border)] text-[var(--muted-strong)]"
              }`}
            >
              <p>{message.content}</p>
              <span className="block mt-2 text-[0.65rem] uppercase tracking-wide text-[var(--muted)]">
                {message.role === "assistant" ? "Atlas Agent" : "You"} •{" "}
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isStreaming && (
          <div className="ml-auto flex items-center gap-2 text-xs text-[var(--muted)]">
            <Loader2 size={16} className="animate-spin" />
            Agent thinking...
          </div>
        )}
        <div ref={scrollAnchor} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-[var(--surface-border)] px-6 py-4 flex items-center gap-3 bg-[rgba(2,6,23,0.65)]"
      >
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask the agent to build a go-to-market plan, draft a proposal, or automate a workflow..."
          rows={2}
          className="flex-1 resize-none bg-transparent text-sm text-[var(--foreground)] outline-none"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          className="flex items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent)] hover:bg-[rgba(34,211,238,0.15)] transition h-12 w-12 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isStreaming ? <Loader2 className="animate-spin" size={22} /> : <ArrowUpCircle size={22} />}
        </button>
      </form>
    </section>
  );
}
