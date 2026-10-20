"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Sparkles, X, Send } from "lucide-react";

type ChatMessage = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "spark-solutions-chat-v1";
const GREETING =
  "Hi, I'm the Spark Solutions assistant. Ask me about the platform, pricing, or whether it's a fit for your business.";
const STARTER_SUGGESTIONS = [
  "What's included in the platform?",
  "How does pricing work?",
  "Is this right for my business?",
  "I'd like to book a demo",
];

// Escape first, then apply a small, safe markdown subset — same approach
// as spark-ai.co.uk's chat widget: bold, bullet lists, and links to this
// site's own pages only (never an external href).
function renderMarkdown(text: string): string {
  const escape = (s: string) =>
    s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

  const lines = escape(text).split(/\n/);
  let html = "";
  let inList = false;
  for (let line of lines) {
    line = line
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2" class="underline underline-offset-2">$1</a>');
    if (/^\s*[-•*]\s+/.test(line)) {
      if (!inList) {
        html += "<ul class='list-disc pl-4 space-y-1'>";
        inList = true;
      }
      html += `<li>${line.replace(/^\s*[-•*]\s+/, "")}</li>`;
      continue;
    }
    if (inList) {
      html += "</ul>";
      inList = false;
    }
    if (line.trim()) html += `<p>${line}</p>`;
  }
  if (inList) html += "</ul>";
  return html;
}

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>(STARTER_SUGGESTIONS);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [leadNotice, setLeadNotice] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      // ignore corrupt/unavailable storage
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      // ignore storage write failures (private mode, quota, etc.)
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, busy]);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput("");
    setSuggestions([]);
    setLeadNotice(false);
    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-20), page: pathname }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) throw new Error(data.error || "unavailable");

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
      if (data.leadCaptured) setLeadNotice(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I can't connect right now. You can still [book a demo](/demo) and we'll reply within one working day.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close the Spark Solutions assistant" : "Open the Spark Solutions assistant"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_12px_24px_-8px_rgba(29,78,216,0.5)] transition hover:-translate-y-0.5 hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Spark Solutions assistant"
          className="fixed bottom-24 right-6 z-50 flex h-[min(600px,75vh)] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border border-border bg-white shadow-[0_24px_48px_-12px_rgba(15,23,42,0.25)]"
        >
          <div className="flex items-center gap-3 rounded-t-lg bg-primary-dark px-4 py-3.5 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-primary-dark">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-sm font-semibold">Spark Solutions assistant</p>
              <p className="flex items-center gap-1.5 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                AI assistant · replies in seconds
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-md p-1 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            <div className="max-w-[85%] rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink-body">
              {GREETING}
            </div>
            {messages.map((m, i) =>
              m.role === "assistant" ? (
                <div
                  key={i}
                  className="max-w-[85%] rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-ink-body [&_a]:font-semibold [&_a]:text-primary [&_ul]:mt-1"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }}
                />
              ) : (
                <div
                  key={i}
                  className="ml-auto max-w-[85%] rounded-lg bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-white"
                >
                  {m.content}
                </div>
              )
            )}
            {busy && (
              <div className="flex max-w-[85%] items-center gap-1 rounded-lg border border-border bg-surface px-3.5 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted" />
              </div>
            )}
            {leadNotice && (
              <p className="text-xs font-medium text-primary">
                ✦ Your details have been passed on. Expect a reply within one working day.
              </p>
            )}
          </div>

          {suggestions.length > 0 && !busy && (
            <div className="flex flex-wrap gap-2 px-4 pb-1">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-primary transition hover:border-primary hover:bg-surface"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Spark Solutions…"
              maxLength={1500}
              disabled={busy}
              className="h-10 flex-1 rounded-md border border-border bg-white px-3 text-sm text-ink placeholder:text-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-white transition hover:bg-primary-dark disabled:pointer-events-none disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="px-4 pb-3 text-[11px] leading-snug text-ink-muted">
            AI can make mistakes. Please don&apos;t share sensitive personal data.{" "}
            <a href="/legal/privacy" className="underline underline-offset-2">
              Privacy
            </a>
          </p>
        </div>
      )}
    </>
  );
}
