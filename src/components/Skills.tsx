import { For } from "solid-js";
import { skills } from "../lib/data";

const ICON: Record<string, string> = {
  "C#": "i-simple-icons-dotnet",
  TypeScript: "i-simple-icons-typescript",
  JavaScript: "i-simple-icons-javascript",
  Python: "i-simple-icons-python",
  SQL: "i-carbon-sql",
  ".NET": "i-simple-icons-dotnet",
  "ASP.NET Core": "i-simple-icons-dotnet",
  "Entity Framework": "i-simple-icons-dotnet",
  "REST APIs": "i-carbon-api",
  Microservices: "i-carbon-microservices-1",
  Azure: "i-simple-icons-microsoftazure",
  AKS: "i-simple-icons-kubernetes",
  "Azure DevOps": "i-simple-icons-azuredevops",
  Docker: "i-simple-icons-docker",
  Kubernetes: "i-simple-icons-kubernetes",
  "CI/CD": "i-carbon-continuous-deployment",
  Prometheus: "i-simple-icons-prometheus",
  SolidJS: "i-simple-icons-solid",
  React: "i-simple-icons-react",
  Angular: "i-simple-icons-angular",
  WPF: "i-simple-icons-dotnet",
  "Three.js": "i-simple-icons-threedotjs",
  "SQL Server": "i-simple-icons-microsoftsqlserver",
  GeoJSON: "i-carbon-map",
  "Spatial Data": "i-carbon-earth-filled",
  LAZ: "i-carbon-3d-cursor",
  Git: "i-simple-icons-git",
  Linux: "i-simple-icons-linux",
  Bash: "i-simple-icons-gnubash",
};

type Accent = {
  ring: string;
  tile: string;
  text: string;
  glow: string;
  header: string;
};

const ACCENTS: Record<string, Accent> = {
  Languages:     { ring: "border-accent-cyan/30",    tile: "bg-accent-cyan/10",    text: "text-accent-cyan",    glow: "hover:shadow-[0_0_30px_-10px_rgba(103,232,249,0.5)]",  header: "i-carbon-code"          },
  Backend:       { ring: "border-accent-violet/30",  tile: "bg-accent-violet/10",  text: "text-accent-violet",  glow: "hover:shadow-[0_0_30px_-10px_rgba(167,139,250,0.5)]",  header: "i-carbon-cube"          },
  "Cloud / DevOps": { ring: "border-emerald-400/30", tile: "bg-emerald-400/10",   text: "text-emerald-300",    glow: "hover:shadow-[0_0_30px_-10px_rgba(52,211,153,0.5)]",   header: "i-carbon-cloud-services"},
  Frontend:      { ring: "border-accent-pink/30",    tile: "bg-accent-pink/10",    text: "text-accent-pink",    glow: "hover:shadow-[0_0_30px_-10px_rgba(240,171,252,0.5)]",  header: "i-carbon-application-web" },
  Data:          { ring: "border-amber-400/30",      tile: "bg-amber-400/10",      text: "text-amber-300",      glow: "hover:shadow-[0_0_30px_-10px_rgba(251,191,36,0.5)]",   header: "i-carbon-data-base"     },
  Tools:         { ring: "border-sky-400/30",        tile: "bg-sky-400/10",        text: "text-sky-300",        glow: "hover:shadow-[0_0_30px_-10px_rgba(56,189,248,0.5)]",   header: "i-carbon-tools"         },
};

const DEFAULT_ACCENT: Accent = {
  ring: "border-white/10",
  tile: "bg-white/5",
  text: "text-ink-dim",
  glow: "",
  header: "i-carbon-bookmark",
};

export default function Skills() {
  return (
    <section id="skills" class="relative py-16 md:py-24">
      <div class="mx-auto max-w-6xl px-4 md:px-6">
        <p class="section-eyebrow">// stack</p>
        <h2 class="section-title mt-2">Tools of the trade.</h2>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-10">
          <For each={skills}>
            {(group) => {
              const a = ACCENTS[group.group] ?? DEFAULT_ACCENT;
              return (
                <div
                  class={`glass p-5 reveal transition-all duration-300 hover:-translate-y-0.5 ${a.glow}`}
                >
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="flex items-center gap-2.5">
                      <span class={`inline-flex w-8 h-8 items-center justify-center rounded-lg ${a.tile} ${a.text}`}>
                        <span class={a.header} />
                      </span>
                      <span class="font-mono text-xs uppercase tracking-[0.25em] text-ink">
                        {group.group}
                      </span>
                    </h3>
                    <span class="text-[10px] font-mono text-ink-faint">
                      {group.items.length}
                    </span>
                  </div>

                  <div class="flex flex-wrap gap-1.5">
                    <For each={group.items}>
                      {(skill) => (
                        <span
                          class={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/[0.04] border ${a.ring} text-ink-dim hover:text-ink hover:bg-white/[0.08] transition-colors`}
                        >
                          {ICON[skill] && (
                            <span class={`${ICON[skill]} ${a.text} text-sm`} aria-hidden />
                          )}
                          <span>{skill}</span>
                        </span>
                      )}
                    </For>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </section>
  );
}
