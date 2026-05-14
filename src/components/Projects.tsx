import { createMemo, createResource, createSignal, For, Show } from "solid-js";
import { fetchRepos, inferTechStack, prettifyRepoName, repoRank, type Repo } from "../lib/github";
import { profile } from "../lib/data";

type Filter = "all" | "owned" | "starred";

export default function Projects() {
  const [repos] = createResource(() => profile.githubUser, fetchRepos);
  const [filter, setFilter] = createSignal<Filter>("owned");
  const [query, setQuery] = createSignal("");
  const [showAll, setShowAll] = createSignal(false);

  const filtered = createMemo(() => {
    const data = repos() ?? [];
    const q = query().trim().toLowerCase();
    let list = data.slice();
    if (filter() === "owned") list = list.filter((r) => !r.fork);
    if (filter() === "starred") list = list.filter((r) => r.stargazers_count > 0);
    if (q) {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description ?? "").toLowerCase().includes(q) ||
          (r.language ?? "").toLowerCase().includes(q) ||
          (r.topics ?? []).some((t) => t.toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => repoRank(b) - repoRank(a));
    return list;
  });

  const visible = createMemo(() => (showAll() ? filtered() : filtered().slice(0, 9)));

  const langColor = (lang: string | null) => {
    const map: Record<string, string> = {
      "C#": "#9d6cf2",
      TypeScript: "#3178c6",
      JavaScript: "#f7df1e",
      Python: "#3776ab",
      Java: "#f89820",
      Shell: "#89e051",
      HTML: "#e34c26",
      CSS: "#264de4",
      EJS: "#a91e50",
      C: "#5c6bc0",
    };
    return lang && map[lang] ? map[lang] : "#a78bfa";
  };

  return (
    <section id="projects" class="relative py-16 md:py-24">
      <div class="mx-auto max-w-6xl px-4 md:px-6">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p class="section-eyebrow">// projects</p>
            <h2 class="section-title mt-2">From GitHub, live.</h2>
            <p class="text-ink-dim mt-2">
              Fetched at runtime from{" "}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener"
                class="text-accent-cyan hover:underline"
              >
                @{profile.githubUser}
              </a>
              . Sorted by stars, activity, and signal.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <label class="glass flex items-center gap-2 px-3.5 py-2 flex-1 sm:flex-none sm:w-72 focus-within:border-accent-violet/50 transition-colors">
              <span class="i-carbon-search text-ink-faint shrink-0" />
              <input
                value={query()}
                onInput={(e) => setQuery(e.currentTarget.value)}
                placeholder="Search repos, language, topic…"
                class="bg-transparent outline-none text-sm text-ink placeholder:text-ink-faint w-full min-w-0"
              />
              {query() && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  class="text-ink-faint hover:text-ink shrink-0"
                  aria-label="Clear search"
                >
                  <span class="i-carbon-close" />
                </button>
              )}
            </label>
            <div class="glass p-1 flex gap-1 self-stretch sm:self-auto">
              {(["owned", "all", "starred"] as Filter[]).map((f) => (
                <button
                  onClick={() => setFilter(f)}
                  class="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors"
                  classList={{
                    "bg-gradient-to-r from-accent-cyan/20 to-accent-violet/20 text-ink border border-white/10": filter() === f,
                    "text-ink-dim hover:text-ink hover:bg-white/5": filter() !== f,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Show when={repos.error}>
          <div class="glass mt-8 p-6 text-center text-ink-dim">
            <p class="text-rose-300">Could not load repositories.</p>
            <p class="text-sm mt-1">GitHub API rate-limit or network issue.</p>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 mt-4 chip glass-hover"
            >
              <span class="i-carbon-logo-github" /> Visit profile directly
            </a>
          </div>
        </Show>

        <Show when={repos.loading}>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-8">
            <For each={Array.from({ length: 6 })}>
              {() => (
                <div class="glass p-5 h-44">
                  <div class="h-4 w-1/2 rounded shimmer" />
                  <div class="h-3 w-3/4 rounded shimmer mt-3" />
                  <div class="h-3 w-2/3 rounded shimmer mt-2" />
                  <div class="flex gap-1.5 mt-4">
                    <div class="h-5 w-14 rounded-full shimmer" />
                    <div class="h-5 w-12 rounded-full shimmer" />
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>

        <Show when={!repos.loading && !repos.error}>
          <Show
            when={filtered().length > 0}
            fallback={
              <div class="glass mt-8 p-8 text-center text-ink-dim">No repos match that filter.</div>
            }
          >
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-8">
              <For each={visible()}>{(r) => <ProjectCard repo={r} langColor={langColor} />}</For>
            </div>

            <Show when={filtered().length > 9}>
              <div class="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll(!showAll())}
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-500 glass glass-hover text-ink"
                >
                  {showAll() ? "Show fewer" : `Show all ${filtered().length}`}
                  <span class={showAll() ? "i-carbon-chevron-up" : "i-carbon-chevron-down"} />
                </button>
              </div>
            </Show>
          </Show>
        </Show>
      </div>
    </section>
  );
}

function ProjectCard(props: { repo: Repo; langColor: (l: string | null) => string }) {
  const stack = inferTechStack(props.repo);
  return (
    <a
      href={props.repo.html_url}
      target="_blank"
      rel="noopener"
      class="glass glass-hover p-5 flex flex-col group reveal"
    >
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-display text-lg text-ink leading-tight group-hover:text-accent-cyan transition-colors">
          {prettifyRepoName(props.repo.name)}
        </h3>
        <span class="i-carbon-arrow-up-right text-ink-faint group-hover:text-accent-cyan transition" />
      </div>

      <p class="text-sm text-ink-dim mt-2 leading-relaxed line-clamp-3 min-h-[3.6em]">
        {props.repo.description || "No description provided."}
      </p>

      <div class="flex flex-wrap gap-1.5 mt-3">
        <For each={stack}>{(s) => <span class="chip">{s}</span>}</For>
      </div>

      <div class="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs text-ink-faint">
        <span class="inline-flex items-center gap-1.5">
          <span
            class="inline-block w-2 h-2 rounded-full"
            style={{ background: props.langColor(props.repo.language) }}
          />
          {props.repo.language ?? "—"}
        </span>
        <span class="inline-flex items-center gap-3">
          <span class="inline-flex items-center gap-1"><span class="i-carbon-star" /> {props.repo.stargazers_count}</span>
          <span class="inline-flex items-center gap-1"><span class="i-carbon-fork" /> {props.repo.forks_count}</span>
          {props.repo.fork && <span class="chip !py-0 !px-1.5 !text-[10px]">fork</span>}
          {props.repo.archived && <span class="chip !py-0 !px-1.5 !text-[10px]">archived</span>}
        </span>
      </div>
    </a>
  );
}
