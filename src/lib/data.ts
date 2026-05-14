import config from "../../portfolio.config.json";

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  githubUser: string;
  linkedin: string;
  linkedinUser?: string;
  resumeUrl?: string;
  summary: string;
  availability?: string;
  heroChips?: string[];
};

export type Stat = { k: string; v: string };

export type Project = { name: string; desc: string; stack: string[] };

export type ExperienceItem = {
  company: string;
  role: string;
  location?: string;
  period: string;
  blurb?: string;
  projects?: Project[];
  highlights?: string[];
};

export type EducationItem = {
  school: string;
  location?: string;
  degree: string;
  period: string;
};

export type SkillGroup = { group: string; items: string[] };

export type Certification = { name: string; issuer?: string; icon?: string };

export const profile: Profile = config.profile;
export const stats: Stat[] = (config as { stats?: Stat[] }).stats ?? [];
export const experience: ExperienceItem[] = config.experience as ExperienceItem[];
export const education: EducationItem[] = config.education;
export const skills: SkillGroup[] = config.skills;
export const certifications: Certification[] = config.certifications as Certification[];
