import { profile } from "../lib/data";

export default function Hero() {
  return (
    <section id="top" class="relative pt-32 md:pt-40 pb-20 md:pb-28">
      <div class="mx-auto max-w-6xl px-4 md:px-6">
        <div class="flex flex-col items-start gap-6 reveal">
          <span class="chip">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            <span>Available for collaboration</span>
          </span>

          <h1 class="font-display font-700 tracking-tight text-5xl sm:text-6xl md:text-7xl leading-[1.05]">
            <span class="block text-ink">{profile.name.split(" ")[0]}</span>
            <span class="block bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-pink bg-clip-text text-transparent">
              {profile.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p class="text-lg md:text-xl text-ink-dim max-w-2xl">
            {profile.role} —{" "}
            <span class="text-ink">{profile.tagline}</span>
          </p>

          <p class="text-base md:text-lg text-ink-dim max-w-2xl leading-relaxed">
            {profile.summary}
          </p>

          <div class="flex flex-wrap items-center gap-3 mt-2">
            <a
              href="#projects"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-500 text-bg bg-gradient-to-r from-accent-cyan to-accent-violet hover:opacity-90 transition shadow-glow"
            >
              View Projects
              <span class="i-carbon-arrow-down" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-500 glass glass-hover text-ink"
            >
              <span class="i-carbon-email" /> Get in touch
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-500 glass glass-hover text-ink"
              aria-label="GitHub"
            >
              <span class="i-carbon-logo-github" /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-500 glass glass-hover text-ink"
              aria-label="LinkedIn"
            >
              <span class="i-carbon-logo-linkedin" /> LinkedIn
            </a>
          </div>

          <div class="flex flex-wrap gap-2 mt-2">
            {[".NET", "Azure", "Kubernetes", "Docker", "ASP.NET Core", "SolidJS", "Three.js"].map((t) => (
              <span class="chip">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
