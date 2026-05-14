import { profile, stats } from "../lib/data";

export default function About() {
  return (
    <section id="about" class="relative py-16 md:py-24">
      <div class="mx-auto max-w-6xl px-4 md:px-6">
        <p class="section-eyebrow">// about</p>
        <h2 class="section-title mt-2">Backend & cloud, with care.</h2>

        <div class="grid md:grid-cols-3 gap-4 md:gap-6 mt-8">
          <div class="md:col-span-2 glass p-6 md:p-7 reveal">
            <p class="text-ink-dim leading-relaxed">
              I build resilient backend systems and cloud-native infrastructure across the
              <span class="text-ink"> .NET </span> ecosystem. My day-to-day blends API design,
              microservices, container orchestration on <span class="text-ink">AKS</span>, and
              CI/CD that just works. I enjoy turning legacy desktop workflows into modern
              web experiences — and the occasional 3D visualization detour.
            </p>
            <div class="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s) => (
                <div class="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                  <div class="font-display text-2xl font-700 text-ink">{s.k}</div>
                  <div class="text-xs text-ink-faint">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div class="glass p-6 md:p-7 reveal">
            <h3 class="font-display text-lg text-ink flex items-center gap-2">
              <span class="i-carbon-information text-accent-violet" />
              Quick facts
            </h3>
            <ul class="mt-4 space-y-3 text-sm">
              <li class="flex items-center gap-3 text-ink-dim hover:text-ink transition-colors">
                <span class="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-accent-cyan/10 text-accent-cyan shrink-0">
                  <span class="i-carbon-location" />
                </span>
                <span>{profile.location}</span>
              </li>
              <li class="flex items-center gap-3 text-ink-dim hover:text-ink transition-colors">
                <span class="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-accent-cyan/10 text-accent-cyan shrink-0">
                  <span class="i-carbon-email" />
                </span>
                <a href={`mailto:${profile.email}`} class="truncate hover:text-accent-cyan">{profile.email}</a>
              </li>
              <li class="flex items-center gap-3 text-ink-dim hover:text-ink transition-colors">
                <span class="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-accent-cyan/10 text-accent-cyan shrink-0">
                  <span class="i-carbon-phone" />
                </span>
                <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} class="hover:text-accent-cyan">{profile.phone}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
