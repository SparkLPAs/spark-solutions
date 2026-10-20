"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { businessTypes } from "@/lib/validations";

type Question = {
  key: string;
  area?: string;
  question: string;
  options: string[];
  scored?: boolean;
};

const QUESTIONS: Question[] = [
  {
    key: "businessType",
    question: "What best describes your business?",
    options: [...businessTypes],
    scored: false,
  },
  {
    key: "current",
    area: "Current process",
    question: "How do you currently handle wills, trusts or LPAs for clients?",
    options: [
      "We don't offer this at all",
      "We refer clients elsewhere",
      "We offer it informally, ad hoc",
      "We already have our own process or platform",
    ],
  },
  {
    key: "volume",
    area: "Volume",
    question: "Roughly how many clients a month would need this?",
    options: ["Fewer than 5", "5–15", "15–40", "40+"],
  },
  {
    key: "brand",
    question: "Do you already have a brand or website you'd want this under?",
    options: ["No, starting from scratch", "Yes, a basic one", "Yes, an established brand"],
    scored: false,
  },
  {
    key: "aiComfort",
    area: "AI comfort",
    question: "How comfortable are you recommending AI-assisted tools to clients?",
    options: [
      "Not comfortable",
      "Open to it, with the right safeguards",
      "Already using AI tools",
      "Actively looking for this",
    ],
  },
  {
    key: "priority",
    question: "What matters most to you in a platform like this?",
    options: [
      "Low cost, simple pricing",
      "Keeping my own brand",
      "Having a regulated legal partner behind me",
      "An extra revenue stream with minimal effort",
    ],
    scored: false,
  },
  {
    key: "timeline",
    area: "Timeline",
    question: "How soon would you want this live?",
    options: ["Just researching", "Within 3 months", "Within a month", "ASAP"],
  },
];

const PRIORITY_COPY: Record<string, { title: string; body: string }> = {
  "Low cost, simple pricing": {
    title: "Simple, single-fee pricing",
    body: "One monthly fee covers all six modules — no add-ons to negotiate.",
  },
  "Keeping my own brand": {
    title: "Fully white-labelled",
    body: "Your logo, your colours — clients see your brand throughout, not Spark Solutions.",
  },
  "Having a regulated legal partner behind me": {
    title: "A regulated partner behind every case",
    body: "Every piece of legal & probate work is reviewed by a qualified, regulated solicitor.",
  },
  "An extra revenue stream with minimal effort": {
    title: "Revenue without the overhead",
    body: "Online Wills gives you a low-cost lead generator, and your Probate Bank grows with every will written — paid directly via Stripe.",
  },
};

function tierFor(pct: number): { label: string; body: string } {
  if (pct < 34) {
    return {
      label: "Worth Exploring",
      body: "There's a clear opportunity here, even if estate planning isn't part of your business yet.",
    };
  }
  if (pct < 67) {
    return {
      label: "Good Fit",
      body: "Your answers suggest Spark Solutions would fit well alongside what you already do.",
    };
  }
  return {
    label: "Strong Fit",
    body: "This looks like a strong match — volume, comfort with AI tools, and timing are all in your favour.",
  };
}

type Report = {
  headline: string;
  summary: string;
  fit_points: string[];
  watch_outs: string[];
  recommended_path: string;
  closing: string;
};

export function ReadinessQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"quiz" | "result" | "report">("quiz");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [emailed, setEmailed] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const renderedAtRef = useRef(Date.now());

  const question = QUESTIONS[step];

  function choose(option: string) {
    const next = { ...answers, [question.key]: option };
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setPhase("result");
    }
  }

  const scored = QUESTIONS.filter((q) => q.scored !== false);
  const score = Math.round(
    (scored.reduce((total, q) => total + QUESTIONS_INDEX(q.options, answers[q.key]), 0) /
      (scored.length * 3)) *
      100
  );
  const tier = tierFor(score);
  const priority = answers.priority ? PRIORITY_COPY[answers.priority] : undefined;

  async function getReport(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please check your email address.");
      return;
    }
    if (email && !consent) {
      setError("Tick the box so we can email your result.");
      return;
    }
    if (honeypotRef.current?.value) return; // silently drop — see lib/spam-check.ts

    setLoading(true);
    try {
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: tier.label,
          score,
          answers: QUESTIONS.map((q) => ({ question: q.question, answer: answers[q.key] })),
          businessDescription,
          name,
          email: consent ? email : "",
          consent,
          honeypot: honeypotRef.current?.value ?? "",
          renderedAt: renderedAtRef.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.report) throw new Error(data.error);
      setReport(data.report);
      setEmailed(!!data.emailed);
      setPhase("report");
    } catch (err) {
      setError(
        (err instanceof Error && err.message) ||
          "We couldn't generate your report just now. Please try again in a minute."
      );
    } finally {
      setLoading(false);
    }
  }

  function retake() {
    setStep(0);
    setAnswers({});
    setReport(null);
    setError(null);
    setPhase("quiz");
  }

  return (
    <div className="card mx-auto max-w-xl">
      {phase === "quiz" && (
        <div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
            />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Question {step + 1} of {QUESTIONS.length}
            {question.area ? ` · ${question.area}` : ""}
          </p>
          <h3 className="mt-2 font-heading text-xl font-semibold text-ink">{question.question}</h3>
          <div className="mt-5 flex flex-col gap-2.5">
            {question.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => choose(option)}
                className="rounded-md border border-border bg-white px-4 py-3 text-left text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-sm"
              >
                {option}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="mt-5 text-sm font-semibold text-ink-muted hover:text-primary"
            >
              ← Back
            </button>
          )}
        </div>
      )}

      {phase === "result" && (
        <div>
          <p className="eyebrow">Your result</p>
          <h3 className="mt-2 font-heading text-2xl font-bold text-ink">{tier.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-body">{tier.body}</p>

          {priority && (
            <div className="mt-6 rounded-md border border-border bg-surface p-4">
              <p className="text-sm font-semibold text-ink">{priority.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-body">{priority.body}</p>
            </div>
          )}

          <form onSubmit={getReport} className="mt-7 space-y-4">
            <p className="text-sm font-semibold text-ink">Get a personalised recommendation</p>
            <div className="space-y-1.5">
              <Label htmlFor="rq-biz">What does your business do? (optional)</Label>
              <Input
                id="rq-biz"
                maxLength={300}
                placeholder="e.g. mortgage broker in Leeds, 3 advisers"
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="rq-name">First name (optional)</Label>
                <Input id="rq-name" maxLength={80} value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rq-email">Email (to receive a copy)</Label>
                <Input
                  id="rq-email"
                  type="email"
                  maxLength={160}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <label className="flex items-start gap-2 text-sm text-ink-body">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5"
              />
              Email me a copy and let Spark Solutions follow up about my result. See our{" "}
              <a href="/legal/privacy" className="underline">
                privacy notice
              </a>
              .
            </label>
            <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
              <label htmlFor="rq-web">Leave this field blank</label>
              <input ref={honeypotRef} id="rq-web" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Writing your recommendation…" : "Get my recommendation"}
            </Button>
          </form>
          <button type="button" onClick={retake} className="mt-4 text-sm font-semibold text-ink-muted hover:text-primary">
            Retake the check
          </button>
        </div>
      )}

      {phase === "report" && report && (
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
            <div>
              <p className="eyebrow">{tier.label} · {score}%</p>
              <h3 className="mt-1 font-heading text-xl font-bold text-ink">{report.headline}</h3>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-ink-body">{report.summary}</p>

          <div>
            <h4 className="font-heading text-sm font-semibold text-ink">Why it fits</h4>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-body">
              {report.fit_points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          {report.watch_outs.length > 0 && (
            <div>
              <h4 className="font-heading text-sm font-semibold text-ink">Worth raising with the team</h4>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-body">
                {report.watch_outs.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-md border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-ink">Recommended next step</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-body">{report.recommended_path}</p>
          </div>

          <p className="text-sm leading-relaxed text-ink-body">{report.closing}</p>
          {emailed && <p className="text-sm font-medium text-primary">✦ A copy is on its way to your inbox.</p>}

          <div className="flex flex-wrap gap-3 pt-1">
            <a href="/demo">
              <Button size="lg">Book a demo</Button>
            </a>
            <button
              type="button"
              onClick={retake}
              className="text-sm font-semibold text-ink-muted hover:text-primary"
            >
              Retake the check
            </button>
          </div>
          <p className="text-xs text-ink-muted">
            This result was written by AI from your answers. It&apos;s a starting point, not professional
            advice.
          </p>
        </div>
      )}
    </div>
  );
}

function QUESTIONS_INDEX(options: string[], answer: string | undefined): number {
  if (!answer) return 0;
  return Math.max(0, options.indexOf(answer));
}
