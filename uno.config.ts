import { defineConfig, presetUno, presetIcons, presetWebFonts, transformerVariantGroup } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({ scale: 1.2, cdn: "https://esm.sh/" }),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: ["Inter:400,500,600,700"],
        mono: ["JetBrains Mono:400,500,600"],
        display: ["Space Grotesk:500,600,700"],
      },
    }),
  ],
  transformers: [transformerVariantGroup()],
  theme: {
    colors: {
      bg: {
        DEFAULT: "#070912",
        soft: "#0d1020",
        card: "rgba(20, 24, 44, 0.45)",
      },
      accent: {
        cyan: "#67e8f9",
        violet: "#a78bfa",
        pink: "#f0abfc",
      },
      ink: {
        DEFAULT: "#e7e9f3",
        dim: "#9aa0b8",
        faint: "#5b6079",
      },
    },
    boxShadow: {
      glow: "0 0 40px -10px rgba(167, 139, 250, 0.35)",
      glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    },
  },
  shortcuts: {
    glass: "bg-[rgba(20,24,44,0.45)] backdrop-blur-xl border border-white/10 rounded-2xl shadow-glass",
    "glass-hover": "hover:border-accent-violet/40 hover:shadow-glow transition-all duration-300",
    chip: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-ink-dim",
    "section-title": "font-display text-3xl md:text-4xl font-700 tracking-tight text-ink relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-[3px] after:rounded-full after:bg-gradient-to-r after:from-accent-cyan after:to-accent-violet",
    "section-eyebrow": "font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan/80",
  },
  safelist: ["i-carbon-logo-github", "i-carbon-logo-linkedin", "i-carbon-email"],
});
