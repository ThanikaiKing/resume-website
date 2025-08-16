/**
 * TypeScript interfaces for resume data structure
 */

export interface ContactLink {
  label: string;
  url: string;
}

export interface Contacts {
  email: string;
  phone: string;
  location: string;
  links: ContactLink[];
}

export interface Skills {
  [category: string]: string[];
}

export interface Education {
  degree: string;
  org: string;
  period: string;
  details?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Meta {
  ogTitle: string;
  ogDesc: string;
  keywords: string[];
}

export interface Settings {
  showPhone: boolean;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  contacts: Contacts;
  skills: Skills;
  education: Education[];
  experience: Experience[];
  meta: Meta;
  settings: Settings;
}

// Type guard to validate resume data structure
export function isValidResumeData(data: unknown): data is ResumeData {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  
  const resume = data as ResumeData;
  
  return (
    typeof resume.name === 'string' &&
    typeof resume.title === 'string' &&
    typeof resume.summary === 'string' &&
    typeof resume.contacts === 'object' &&
    resume.contacts !== null &&
    typeof resume.contacts.email === 'string' &&
    typeof resume.contacts.phone === 'string' &&
    typeof resume.contacts.location === 'string' &&
    Array.isArray(resume.contacts.links) &&
    typeof resume.skills === 'object' &&
    resume.skills !== null &&
    Array.isArray(resume.education) &&
    Array.isArray(resume.experience) &&
    typeof resume.meta === 'object' &&
    resume.meta !== null &&
    typeof resume.meta.ogTitle === 'string' &&
    typeof resume.meta.ogDesc === 'string' &&
    Array.isArray(resume.meta.keywords) &&
    typeof resume.settings === 'object' &&
    resume.settings !== null &&
    typeof resume.settings.showPhone === 'boolean'
  );
}
