"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Sparkles, X, Send, MessageCircle } from "lucide-react";

type ChatMessage = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "spark-solutions-chat-v1";
const TEASER_DISMISSED_KEY = "spark-solutions-chat-teaser-dismissed";
const TEASER_TEXT = "👋 Got a question about Spark Solutions? Ask me anything.";
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
  const [showTeaser, setShowTeaser] = useState(false);
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

  // A one-time proactive nudge bubble, so the launcher isn't easy to miss
  // on first visit — never on a return visit that already has a
  // conversation, and only once someone hasn't already dismissed or opened
  // it. The pulsing glow on the launcher itself (below) is separate and
  // permanent — it never turns off, so the button stays easy to spot even
  // after this one-time nudge has been dismissed.
  useEffect(() => {
    let dismissed = false;
    let hasHistory = false;
    try {
      dismissed = sessionStorage.getItem(TEASER_DISMISSED_KEY) === "1";
      hasHistory = !!sessionStorage.getItem(STORAGE_KEY);
    } catch {
      // ignore storage read failures
    }
    if (dismissed || hasHistory) return;
    // Stays up until someone actually notices it — dismissed or opened —
    // rather than auto-hiding on a timer, which reads as the assistant
    // having vanished rather than as a deliberate close.
    const showAt = setTimeout(() => setShowTeaser(true), 3000);
    return () => clearTimeout(showAt);
  }, []);

  function dismissTeaser() {
    setShowTeaser(false);
    try {
      sessionStorage.setItem(TEASER_DISMISSED_KEY, "1");
    } catch {
      // ignore storage write failures
    }
  }

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

  function toggleOpen() {
    setOpen((v) => !v);
    setShowTeaser(false);
    try {
      sessionStorage.setItem(TEASER_DISMISSED_KEY, "1");
    } catch {
      // ignore storage write failures
    }
  }

  return (
    <>
      {showTeaser && !open && (
        <div className="fixed bottom-24 right-6 z-50 w-64 max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-white p-3.5 pr-7 text-sm leading-relaxed text-ink-body shadow-[0_16px_32px_-12px_rgba(15,23,42,0.25)]">
          <button
            type="button"
            onClick={dismissTeaser}
            aria-label="Dismiss"
            className="absolute right-2 top-2 rounded p-1 text-ink-muted hover:bg-surface hover:text-ink"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={toggleOpen} className="text-left">
            {TEASER_TEXT}
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={toggleOpen}
        aria-label={open ? "Close the Spark Solutions assistant" : "Open the Spark Solutions assistant"}
        className="fixed bottom-6 right-6 z-50 flex h-14 items-center gap-2 rounded-full bg-primary pl-4 pr-5 text-white shadow-[0_12px_24px_-8px_rgba(29,78,216,0.5)] transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_16px_32px_-8px_rgba(29,78,216,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary relative"
      >
        {!open && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/60" />}
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="font-heading text-sm font-semibold">{open ? "Close" : "AI Assistant"}</span>
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
