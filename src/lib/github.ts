export type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  updated_at: string;
  homepage: string | null;
  topics: string[];
};

const API = "https://api.github.com";

export async function fetchRepos(user: string): Promise<Repo[]> {
  const res = await fetch(`${API}/users/${user}/repos?per_page=100&sort=updated`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return (await res.json()) as Repo[];
}

export async function fetchLanguages(user: string, repo: string): Promise<Record<string, number>> {
  const res = await fetch(`${API}/repos/${user}/${repo}/languages`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) return {};
  return (await res.json()) as Record<string, number>;
}

const PRETTY_NAME: Record<string, string> = {
  truckgamedemo: "Truck Game Demo",
  myportfolio: "My Portfolio",
  qrgenerator: "QR Generator",
  stockmangement: "Stock Management",
  k8sjobs: "K8s Jobs",
  numberapi: "Number API",
  lovecalculator: "Love Calculator",
  siyemapviewer: "Siye Map Viewer",
  pgmsolar: "PGM Solar",
  siyefinace: "Siye Finance",
  voicegenderconverter: "Voice Gender Converter",
  webview: "WebView",
  reactecommercewebsite: "React E-commerce",
  k8svmorchestrator: "K8s VM Orchestrator",
  portforwordingdocker: "Port Forwarding · Docker",
  k8smonitorning: "K8s Monitoring",
  dockerinstallautomation: "Docker Install Automation",
  dockerinstallation: "Docker Installation",
  linuxportmonitoringtool: "Linux Port Monitoring Tool",
  webstatuschecks: "Web Status Checks",
  zerodowntimeapp: "Zero Downtime App",
  ecomwebsite: "E-commerce Website",
  consoleapppplication: "Console Application",
  consoleappplication: "Console Application",
  bankingapplication: "Banking Application",
  simpleportfolio: "Simple Portfolio",
  smtwebsite: "SMT Website",
  automationprojects: "Automation Projects",
  miningonwindowsautomator: "Mining on Windows Automator",
  flightreservationsystem: "Flight Reservation System",
  youtubeviewbot: "YouTube View Bot",
  seleniumbasedinstagramtools: "Selenium Instagram Tools",
  onlineclassbot: "Online Class Bot",
  feedbackreactapp: "Feedback React App",
  hackulus: "Hackulus",
  pravinlsiye: "GitHub Profile",
  ibmproject221371659805756: "Smart Fashion Recommender",
};

export function prettifyRepoName(name: string): string {
  const key = name.toLowerCase().replace(/[-_]/g, "");
  if (PRETTY_NAME[key]) return PRETTY_NAME[key];
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

const STACK_HINTS: { match: RegExp; tags: string[] }[] = [
  { match: /k8s|kubernetes/i, tags: ["Kubernetes"] },
  { match: /docker/i, tags: ["Docker"] },
  { match: /vm|virtual\s*machine/i, tags: ["Virtualization"] },
  { match: /portforword|port[-_]?forward/i, tags: ["Networking"] },
  { match: /monitor/i, tags: ["Monitoring"] },
  { match: /api/i, tags: ["REST API"] },
  { match: /map|geo/i, tags: ["Maps", "GeoJSON"] },
  { match: /finace|finance/i, tags: ["Finance"] },
  { match: /ecom|ecommerce|shop/i, tags: ["E-commerce"] },
  { match: /bot|selenium/i, tags: ["Automation"] },
  { match: /portfolio/i, tags: ["Portfolio"] },
  { match: /solar/i, tags: ["IoT"] },
  { match: /voice|gender/i, tags: ["Audio", "ML"] },
  { match: /banking/i, tags: ["FinTech"] },
  { match: /flight|reservation/i, tags: ["Booking"] },
  { match: /game/i, tags: ["Game"] },
  { match: /qr/i, tags: ["QR"] },
  { match: /mining/i, tags: ["Crypto"] },
  { match: /webview|web[-_]?status/i, tags: ["Web"] },
  { match: /jobs/i, tags: ["Workloads"] },
  { match: /stock/i, tags: ["Inventory"] },
];

const LANG_FRIENDLY: Record<string, string> = {
  "C#": "C#",
  TypeScript: "TypeScript",
  JavaScript: "JavaScript",
  Python: "Python",
  Java: "Java",
  Shell: "Shell",
  HTML: "HTML",
  CSS: "CSS",
  EJS: "EJS",
  C: "C",
};

export function inferTechStack(repo: Repo): string[] {
  const stack = new Set<string>();
  if (repo.language && LANG_FRIENDLY[repo.language]) stack.add(LANG_FRIENDLY[repo.language]);
  for (const t of repo.topics ?? []) stack.add(t);
  const hay = `${repo.name} ${repo.description ?? ""}`;
  for (const h of STACK_HINTS) {
    if (h.match.test(hay)) h.tags.forEach((t) => stack.add(t));
  }
  return Array.from(stack).slice(0, 6);
}

export function repoRank(r: Repo): number {
  let score = 0;
  score += r.stargazers_count * 10;
  score += r.forks_count * 4;
  if (r.description) score += 3;
  if ((r.topics ?? []).length) score += 2;
  if (r.fork) score -= 8;
  if (r.archived) score -= 4;
  const ageDays = (Date.now() - new Date(r.pushed_at).getTime()) / 86400000;
  score += Math.max(0, 30 - ageDays / 30);
  return score;
}
