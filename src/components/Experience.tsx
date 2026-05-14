import { For, Show } from "solid-js";
import { experience } from "../lib/data";

export default function Experience() {
  return (
    <section id="experience" class="relative py-16 md:py-24">
      <div class="mx-auto max-w-6xl px-4 md:px-6">
        <p class="section-eyebrow">// experience</p>
        <h2 class="section-title mt-2">Where I've built things.</h2>

        <div class="mt-8 space-y-6">
          <For each={experience}>
            {(job) => (
              <article class="glass p-6 md:p-8 reveal">
                <header class="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                  <div>
                    <h3 class="font-display text-xl md:text-2xl text-ink">
                      {job.role} <span class="text-accent-violet">@ {job.company}</span>
                    </h3>
                    <p class="text-sm text-ink-faint mt-0.5">{job.location}</p>
                  </div>
                  <p class="text-sm font-mono text-ink-dim whitespace-nowrap">{job.period}</p>
                </header>

                <p class="text-ink-dim mt-3 leading-relaxed">{job.blurb}</p>

                <Show when={job.projects?.length}>
                  <ul class="mt-5 grid sm:grid-cols-2 gap-3">
                    <For each={job.projects}>
                      {(p) => (
                        <li class="rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-accent-violet/40 transition-colors">
                          <h4 class="font-500 text-ink">{p.name}</h4>
                          <p class="text-sm text-ink-dim mt-1 leading-relaxed">{p.desc}</p>
                          <div class="mt-2.5 flex flex-wrap gap-1.5">
                            <For each={p.stack}>{(s) => <span class="chip">{s}</span>}</For>
                          </div>
                        </li>
                      )}
                    </For>
                  </ul>
                </Show>

                <Show when={job.highlights?.length}>
                  <ul class="mt-4 space-y-2">
                    <For each={job.highlights}>
                      {(h) => (
                        <li class="flex gap-2 text-ink-dim">
                          <span class="i-carbon-checkmark-filled text-accent-cyan mt-1 shrink-0" />
                          <span>{h}</span>
                        </li>
                      )}
                    </For>
                  </ul>
                </Show>
              </article>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
