/**
 * Content loading and validation utilities
 */

import { ResumeData, isValidResumeData } from '@/types/resume';
import resumeData from '@/content/resume.json';

/**
 * Loads and validates the resume data from JSON
 * @returns Typed and validated resume data
 * @throws Error if the resume data is invalid
 */
export function getResumeData(): ResumeData {
  if (!isValidResumeData(resumeData)) {
    throw new Error('Invalid resume data structure. Please check the resume.json file.');
  }
  
  return resumeData;
}

/**
 * Gets a specific section of the resume data
 * @param section - The section key to retrieve
 * @returns The requested section data
 */
export function getResumeSection<K extends keyof ResumeData>(section: K): ResumeData[K] {
  const data = getResumeData();
  return data[section];
}

/**
 * Safely gets resume data with error handling
 * @returns Resume data or null if invalid
 */
export function getResumeDataSafe(): ResumeData | null {
  try {
    return getResumeData();
  } catch (error) {
    console.error('Failed to load resume data:', error);
    return null;
  }
}

/**
 * Gets contact links with valid URLs only
 * @returns Array of contact links that have non-empty URLs
 */
export function getValidContactLinks() {
  const contacts = getResumeSection('contacts');
  return contacts.links.filter(link => link.url.trim() !== '');
}

/**
 * Gets skills grouped by category with non-empty categories only
 * @returns Skills object with only categories that have skills
 */
export function getSkillsWithContent() {
  const skills = getResumeSection('skills');
  return Object.entries(skills).reduce((acc, [category, skillList]) => {
    if (skillList.length > 0) {
      acc[category] = skillList;
    }
    return acc;
  }, {} as Record<string, string[]>);
}
