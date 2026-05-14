import { createSignal, onCleanup, onMount } from "solid-js";

const items = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = createSignal("about");
  const [open, setOpen] = createSignal(false);
  const [scrolled, setScrolled] = createSignal(false);
  const [progress, setProgress] = createSignal(0);

  onMount(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      const probe = y + 140;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        if (el.offsetTop <= probe && el.offsetTop + el.offsetHeight > probe) {
          setActive(it.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    onCleanup(() => window.removeEventListener("scroll", onScroll));
  });

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      classList={{ "py-3": !scrolled(), "py-2": scrolled() }}
    >
      <div class="mx-auto max-w-6xl px-4 md:px-6">
        <nav
          class="glass relative flex items-center justify-between px-4 md:px-5 py-2.5 md:py-3 overflow-hidden"
          classList={{ "shadow-glow": scrolled() }}
        >
          <span
            aria-hidden
            class="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-pink transition-[width] duration-150"
            style={{ width: `${progress() * 100}%` }}
          />
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} class="flex items-center gap-2 font-display font-700 tracking-tight">
            <span class="inline-block w-2 h-2 rounded-full bg-accent-cyan pulse-dot" />
            <span>Pravin<span class="text-accent-violet">.</span></span>
          </a>

          <ul class="hidden md:flex items-center gap-0.5 relative">
            {items.map((it) => (
              <li>
                <a
                  href={`#${it.id}`}
                  onClick={(e) => { e.preventDefault(); go(it.id); }}
                  class="relative px-3 py-1.5 rounded-full text-sm text-ink-dim hover:text-ink transition-colors"
                  classList={{ "text-ink": active() === it.id }}
                >
                  {active() === it.id && (
                    <span
                      aria-hidden
                      class="absolute inset-0 rounded-full bg-white/5 border border-white/10 -z-1"
                    />
                  )}
                  <span class="relative">{it.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div class="hidden md:flex items-center gap-2">
            <a
              href="https://github.com/Pravinlsiye"
              target="_blank"
              rel="noopener"
              class="chip glass-hover"
              aria-label="GitHub"
            >
              <span class="i-carbon-logo-github" /> GitHub
            </a>
          </div>

          <button
            class="md:hidden p-2 rounded-lg border border-white/10 text-ink"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open())}
          >
            <span class={open() ? "i-carbon-close" : "i-carbon-menu"} />
          </button>
        </nav>

        {open() && (
          <div class="md:hidden glass mt-2 p-2 reveal">
            <ul class="flex flex-col">
              {items.map((it) => (
                <li>
                  <a
                    href={`#${it.id}`}
                    onClick={(e) => { e.preventDefault(); go(it.id); }}
                    class="block px-3 py-2 rounded-lg text-sm text-ink-dim hover:bg-white/5 hover:text-ink"
                    classList={{ "bg-white/5 text-ink": active() === it.id }}
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
