import { For } from "solid-js";
import { education, certifications } from "../lib/data";

export default function Education() {
  return (
    <section id="education" class="relative py-16 md:py-24">
      <div class="mx-auto max-w-6xl px-4 md:px-6">
        <p class="section-eyebrow">// education</p>
        <h2 class="section-title mt-2">Foundations.</h2>

        <div class="grid md:grid-cols-2 gap-4 md:gap-5 mt-8">
          <For each={education}>
            {(e) => (
              <div class="glass p-6 reveal">
                <h3 class="font-display text-lg text-ink">{e.school}</h3>
                <p class="text-ink-dim text-sm mt-1">{e.degree}</p>
                <p class="text-ink-faint text-xs mt-2 font-mono">{e.period} · {e.location}</p>
              </div>
            )}
          </For>
        </div>

        <div class="glass mt-6 p-5 reveal">
          <h3 class="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan/80">
            Certifications
          </h3>
          <ul class="mt-2.5 flex flex-wrap gap-1.5">
            <For each={certifications}>
              {(c) => (
                <li class="chip">
                  <span class="i-carbon-certificate" /> {c}
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </section>
  );
}
