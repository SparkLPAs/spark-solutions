"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/content";
import { site } from "@/lib/env";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-4">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-body transition hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href={site.loginUrl} className="btn-ghost h-11 px-5 text-sm">
            Login
          </Link>
          <Link href="/start-trial">
            <Button>Start Free Trial</Button>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-white px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-ink-body"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href={site.loginUrl} className="text-base font-medium text-ink-body">
              Login
            </Link>
            <Link href="/start-trial" onClick={() => setOpen(false)}>
              <Button className="w-full">Start Free Trial</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
