import { Show } from "solid-js";
import { profile } from "../lib/data";

export default function Contact() {
  return (
    <section id="contact" class="relative py-16 md:py-24">
      <div class="mx-auto max-w-6xl px-4 md:px-6">
        <div class="glass p-8 md:p-12 reveal text-center overflow-hidden relative">
          <div
            aria-hidden
            class="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(600px 200px at 50% 0%, rgba(167,139,250,0.35), transparent 60%)",
            }}
          />
          <p class="section-eyebrow relative">// contact</p>
          <h2 class="section-title mt-2 relative">Let's build something solid.</h2>
          <p class="text-ink-dim mt-3 max-w-xl mx-auto relative">
            Open to backend, cloud, and platform engineering opportunities. Reach out — I reply fast.
          </p>

          <div class="mt-7 flex flex-wrap justify-center gap-3 relative">
            <a
              href={`mailto:${profile.email}`}
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-500 text-bg bg-gradient-to-r from-accent-cyan to-accent-violet hover:opacity-90 transition shadow-glow"
            >
              <span class="i-carbon-email" /> {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass glass-hover text-ink"
            >
              <span class="i-carbon-logo-github" /> @{profile.githubUser}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass glass-hover text-ink"
            >
              <span class="i-carbon-logo-linkedin" /> @{profile.linkedinUser ?? "linkedin"}
            </a>
            <Show when={profile.resumeUrl}>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass glass-hover text-ink"
              >
                <span class="i-carbon-document" /> Resume
              </a>
            </Show>
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass glass-hover text-ink"
            >
              <span class="i-carbon-phone" /> {profile.phone}
            </a>
          </div>
        </div>

        <footer class="mt-10 pb-6 text-center text-xs text-ink-faint font-mono">
          <p>
            Crafted with SolidJS · Three.js · UnoCSS · Hosted via GitHub Pages
          </p>
          <p class="mt-1">© {new Date().getFullYear()} {profile.name}</p>
        </footer>
      </div>
    </section>
  );
}
