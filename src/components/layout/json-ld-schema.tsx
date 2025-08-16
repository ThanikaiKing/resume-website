"use client";

import { getResumeSection, getValidContactLinks } from '@/lib/content';

export function JsonLdSchema() {
  try {
    const name = getResumeSection('name');
    const title = getResumeSection('title');
    const summary = getResumeSection('summary');
    const contacts = getResumeSection('contacts');
    const experience = getResumeSection('experience');
    const education = getResumeSection('education');
    const skills = getResumeSection('skills');
    const validLinks = getValidContactLinks();

    // Build work experience for schema
    const workExperience = experience.map((exp) => ({
      "@type": "WorkExperience",
      "jobTitle": exp.role,
      "employer": {
        "@type": "Organization",
        "name": exp.company || "Current Company"
      },
      "startDate": exp.period.split(' – ')[0],
      "endDate": exp.period.includes('Present') ? new Date().getFullYear().toString() : exp.period.split(' – ')[1],
      "description": exp.highlights.join('. ')
    }));

    // Build education for schema
    const educationBackground = education.map((edu) => ({
      "@type": "EducationalOccupationalCredential",
      "name": edu.degree,
      "educationalCredentialAwarded": edu.degree,
      "recognizedBy": {
        "@type": "EducationalOrganization",
        "name": edu.org
      },
      "dateCreated": edu.period
    }));

    // Build skills array
    const skillsArray = Object.values(skills).flat();

    // Build social links
    const sameAs = validLinks.map(link => link.url);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": name,
      "jobTitle": title,
      "description": summary,
      "email": contacts.email,
      "telephone": contacts.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": contacts.location
      },
      "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "image": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/og`,
      "sameAs": sameAs,
      "knowsAbout": skillsArray,
      "workExperience": workExperience,
      "educationalCredential": educationBackground,
      "seeks": {
        "@type": "Demand",
        "description": "Software development opportunities, technical consulting, and collaborative projects"
      },
      "alumniOf": education.map(edu => ({
        "@type": "EducationalOrganization",
        "name": edu.org
      })),
      "hasOccupation": {
        "@type": "Occupation",
        "name": title,
        "description": summary,
        "skills": skillsArray
      }
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
      />
    );
  } catch (error) {
    console.error('Error generating JSON-LD schema:', error);
    return null;
  }
}
