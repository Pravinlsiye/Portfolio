export const profile = {
  name: "Pravin Loganathan",
  role: "Software Developer",
  tagline: ".NET · Azure · Kubernetes · Cloud-Native Systems",
  location: "Erode, Tamil Nadu 638153",
  email: "pravin270320@gmail.com",
  phone: "+91 8870698224",
  github: "https://github.com/Pravinlsiye",
  githubUser: "Pravinlsiye",
  linkedin: "https://linkedin.com/in/pravinsiye",
  summary:
    "Software Developer with 3+ years of experience in backend and cloud-native application development using C#, ASP.NET Core, Azure, Kubernetes, Docker, SQL Server, microservices, REST APIs, and CI/CD automation.",
};

export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  period: string;
  blurb: string;
  projects?: { name: string; desc: string; stack: string[] }[];
  highlights?: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Trimble Inc",
    role: "Software Developer",
    location: "Chennai, India",
    period: "Jan 2023 — Present",
    blurb:
      "Contributed across backend development, API integration, cloud solutions, and scalable enterprise application workflows in agile environments.",
    projects: [
      {
        name: "Report Previewer",
        desc: "Real-time PDF viewer and export system, reducing dependency on third-party subscriptions and improving report access workflows.",
        stack: ["C#", "WPF", "PDF Rendering"],
      },
      {
        name: "GNSS Hardware Integration",
        desc: "Integrated Trimble GNSS devices using SDKs with Wi-Fi and Bluetooth communication workflows for seamless field connectivity.",
        stack: ["C#", "WPF", "Hardware SDKs", "Bluetooth", "Wi-Fi"],
      },
      {
        name: "Scan Inspection & Visualization",
        desc: "Enhanced 3D point cloud inspection workflows for high-volume scan datasets with defect visualization and bidirectional inspection processing.",
        stack: ["C#", "WPF", "3D Visualization", "Spatial Data"],
      },
      {
        name: "Real-time Data Sync Microservices",
        desc: "Containerized microservices for bidirectional sync between field and office, doubling API performance across 15+ products.",
        stack: ["ASP.NET Core", "Microservices", "Docker", "Kubernetes", "Azure"],
      },
      {
        name: "Survey Data API & Object Processing",
        desc: "High-performance APIs and converters transforming proprietary binary survey job data into cloud-compatible formats (GeoJSON, LAZ).",
        stack: ["ASP.NET Core", "SQL Server", "Spatial Data"],
      },
      {
        name: "Cloud Platform & DevOps",
        desc: "Led Azure Kubernetes Service (AKS) infrastructure setup, optimized CI/CD pipelines, monitoring solutions — reduced operational costs by 30%.",
        stack: ["Azure", "AKS", "Azure DevOps", "Docker", "Kubernetes", "Prometheus"],
      },
      {
        name: "Web-based Survey Job Editor",
        desc: "Technical lead for migrating legacy desktop workflows to browser-based applications using .NET WASM and modern JS.",
        stack: [".NET WASM", "SolidJS", "Three.js"],
      },
    ],
  },
  {
    company: "Intersect IQ",
    role: "Project Trainee",
    location: "Bengaluru, India",
    period: "Jan 2022 — Apr 2022",
    blurb:
      "Collaborated on 10+ road safety and cobble detection case studies using Python analytics and ML workflows.",
    highlights: [
      "Built analytical models and visualization pipelines contributing to a 75% reduction in accident-prone scenarios.",
    ],
  },
];

export const education = [
  {
    school: "Kongu Engineering College",
    location: "Erode, Tamil Nadu",
    degree: "B.E. Computer Science and Engineering",
    period: "Sep 2020 — Jul 2023",
  },
  {
    school: "Kongu Polytechnic College",
    location: "Erode, Tamil Nadu",
    degree: "Diploma in Electrical and Electronics Engineering",
    period: "Aug 2018 — Aug 2020",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["C#", "TypeScript", "JavaScript", "Python", "SQL"] },
  { group: "Backend", items: [".NET", "ASP.NET Core", "Entity Framework", "REST APIs", "Microservices"] },
  { group: "Cloud / DevOps", items: ["Azure", "AKS", "Azure DevOps", "Docker", "Kubernetes", "CI/CD", "Prometheus"] },
  { group: "Frontend", items: ["SolidJS", "React", "Angular", "WPF", "Three.js"] },
  { group: "Data", items: ["SQL Server", "GeoJSON", "Spatial Data", "LAZ"] },
  { group: "Tools", items: ["Git", "Linux", "Bash"] },
];

export const certifications = ["Microsoft Certified: Azure Fundamentals (AZ-900)"];
