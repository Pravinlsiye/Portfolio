import { For } from "solid-js";
import { education, certifications } from "../lib/data";

export default function Education() {
  return (
    <section id="education" class="relative py-16 md:py-24">
      <div class="mx-auto max-w-6xl px-4 md:px-6">
        <p class="section-eyebrow">// education</p>
        <h2 class="section-title mt-2">Foundations.</h2>

        <div class="grid md:grid-cols-2 gap-4 md:gap-5 mt-10">
          <For each={education}>
            {(e, i) => (
              <article class="glass glass-hover p-6 md:p-7 reveal group relative overflow-hidden">
                <div
                  aria-hidden
                  class="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      i() === 0
                        ? "radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)"
                        : "radial-gradient(circle, rgba(167,139,250,0.18), transparent 70%)",
                  }}
                />
                <div class="flex items-start gap-4 relative">
                  <span
                    class={`inline-flex w-12 h-12 items-center justify-center rounded-xl shrink-0 ${
                      i() === 0
                        ? "bg-accent-cyan/10 text-accent-cyan"
                        : "bg-accent-violet/10 text-accent-violet"
                    }`}
                  >
                    <span class="i-carbon-education text-xl" />
                  </span>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-display text-lg md:text-xl text-ink leading-tight">
                      {e.school}
                    </h3>
                    <p class="text-ink-dim text-sm mt-1.5">{e.degree}</p>
                    <div class="flex flex-wrap gap-1.5 mt-4">
                      <span class="chip">
                        <span class="i-carbon-calendar text-accent-cyan" />
                        {e.period}
                      </span>
                      <span class="chip">
                        <span class="i-carbon-location text-accent-violet" />
                        {e.location}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            )}
          </For>
        </div>

        <div class="glass mt-6 p-6 md:p-7 reveal relative overflow-hidden">
          <div
            aria-hidden
            class="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(400px 120px at 0% 0%, rgba(103,232,249,0.10), transparent 60%)",
            }}
          />
          <div class="flex items-center justify-between mb-4 relative">
            <h3 class="flex items-center gap-2.5">
              <span class="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
                <span class="i-carbon-badge" />
              </span>
              <span class="font-mono text-xs uppercase tracking-[0.25em] text-ink">
                Certifications
              </span>
            </h3>
            <span class="text-[10px] font-mono text-ink-faint">
              {certifications.length}
            </span>
          </div>

          <ul class="grid sm:grid-cols-2 gap-3 relative">
            <For each={certifications}>
              {(c) => {
                const iconClass =
                  c.icon === "azure"
                    ? "i-simple-icons-microsoftazure"
                    : c.icon === "aws"
                    ? "i-simple-icons-amazonaws"
                    : c.icon === "gcp"
                    ? "i-simple-icons-googlecloud"
                    : c.icon
                    ? `i-simple-icons-${c.icon}`
                    : "i-carbon-certificate";
                return (
                  <li class="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-accent-cyan/40 transition-colors">
                    <span class="inline-flex w-10 h-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent-cyan/15 to-accent-violet/15 text-accent-cyan shrink-0">
                      <span class={`${iconClass} text-lg`} />
                    </span>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm text-ink truncate">{c.name}</p>
                      <p class="text-[11px] font-mono text-ink-faint mt-0.5 flex items-center gap-1">
                        <span class="i-carbon-checkmark-filled text-emerald-400" />
                        Verified{c.issuer ? ` · ${c.issuer}` : ""}
                      </p>
                    </div>
                  </li>
                );
              }}
            </For>
          </ul>
        </div>
      </div>
    </section>
  );
}
