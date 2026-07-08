"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  businessTypes,
  demoRequestSchema,
  referralSources,
  type DemoRequestInput,
} from "@/lib/validations";
import { trackDemoRequestSubmitted } from "@/lib/analytics-events";

export function DemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DemoRequestInput>({
    resolver: zodResolver(demoRequestSchema),
  });

  async function onSubmit(data: DemoRequestInput) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      trackDemoRequestSubmitted();
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong sending your request. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="card flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-accent" />
        <h3 className="font-heading text-2xl font-semibold text-ink">
          Thanks — Jason will be in touch within 1 business day
        </h3>
        <p className="max-w-md text-sm text-ink-body">
          We&apos;ve sent a confirmation to your email. In the meantime, feel free to
          explore our pricing or partner models.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" autoComplete="name" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-xs text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="businessName">Business name</Label>
          <Input id="businessName" {...register("businessName")} />
          {errors.businessName && (
            <p className="text-xs text-red-600">{errors.businessName.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="businessType">Business type</Label>
          <Select id="businessType" defaultValue="" {...register("businessType")}>
            <option value="" disabled>
              Select an option
            </option>
            {businessTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
          {errors.businessType && (
            <p className="text-xs text-red-600">{errors.businessType.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="referralSource">How did you hear about us?</Label>
          <Select id="referralSource" defaultValue="" {...register("referralSource")}>
            <option value="" disabled>
              Select an option
            </option>
            {referralSources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          {errors.referralSource && (
            <p className="text-xs text-red-600">{errors.referralSource.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
          {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea id="message" {...register("message")} />
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Request Your Demo"}
      </Button>
    </form>
  );
}
