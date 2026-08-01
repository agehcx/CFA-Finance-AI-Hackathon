"use client";

import { useState } from "react";
import { Sparkles, Send, X } from "lucide-react";
import { ChatMessage } from "@/types";

const SEED_MESSAGES: ChatMessage[] = [
  {
    id: "seed-1",
    role: "copilot",
    text: "How can I help with this investigation? I can summarize evidence, surface gaps, or draft a review task.",
    timestamp: "10:15 AM",
  },
];

const CANNED_REPLY =
  "Here is a summary based on the human-verified evidence linked to this investigation. All evidence is human-verified — review before relying on it for a decision.";

export function CopilotPanel({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(SEED_MESSAGES);
  const [draft, setDraft] = useState("");

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((prev) => [
      ...prev,
      { id: `u-${prev.length}`, role: "user", text, timestamp: now },
      {
        id: `c-${prev.length + 1}`,
        role: "copilot",
        text: CANNED_REPLY,
        timestamp: now,
      },
    ]);
    setDraft("");
  }

  return (
    <div className="flex h-full w-80 shrink-0 flex-col border-l border-border bg-white">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Sparkles size={16} className="text-accent" />
          Copilot
        </div>
        {onClose && (
          <button onClick={onClose} aria-label="Close copilot" className="text-muted hover:text-ink">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <div key={m.id}>
            <div
              className={
                m.role === "user"
                  ? "rounded-lg bg-accent-soft px-3 py-2 text-sm text-ink"
                  : "rounded-lg bg-canvas px-3 py-2 text-sm text-ink"
              }
            >
              {m.text}
            </div>
            <p className="mt-1 text-xs text-muted">{m.timestamp}</p>
          </div>
        ))}
        <p className="text-xs text-muted">All evidence is human-verified.</p>
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask a question..."
            className="min-w-0 flex-1 text-sm text-ink placeholder:text-muted focus:outline-none"
          />
          <button
            onClick={sendMessage}
            aria-label="Send"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent text-white hover:bg-accent/90"
          >
            <Send size={14} />
          </button>
        </div>
        <p className="mt-2 text-xs text-muted">Copilot can make mistakes. Verify important information.</p>
      </div>
    </div>
  );
}
