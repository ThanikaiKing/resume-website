"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Copy, Check, ExternalLink } from "lucide-react";
import { getResumeSection, getSkillsWithContent } from "@/lib/content";
import { cn } from "@/lib/utils";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

// Copy-to-clipboard hook
function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
      return true;
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2000);
        return true;
      } catch (fallbackError) {
        console.error("Failed to copy text: ", fallbackError);
        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return { copy, copiedText };
}

interface ContactInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
  className?: string;
}

function ContactInfoItem({ 
  icon, 
  label, 
  value, 
  href, 
  copyable = false,
  className 
}: ContactInfoItemProps) {
  const { copy, copiedText } = useCopyToClipboard();
  const isCopied = copiedText === value;

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    await copy(value);
  };

  const content = (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors group",
      className
    )}>
      <div className="text-foreground/70 group-hover:text-foreground transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-foreground/60 font-medium uppercase tracking-wide">
          {label}
        </div>
        <div className="text-sm font-medium text-foreground truncate">
          {value}
        </div>
      </div>
      {copyable && (
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 min-h-[32px] min-w-[32px] rounded-md hover:bg-accent text-foreground/60 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label={`Copy ${label}`}
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </motion.button>
      )}
    </div>
  );

  if (href) {
    return (
      <a 
        href={href}
        className="block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
      >
        {content}
      </a>
    );
  }

  return content;
}

interface StrengthBadgeProps {
  strength: string;
  category: string;
}

function StrengthBadge({ strength, category }: StrengthBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-2 px-3 py-2 bg-accent/50 border border-border rounded-full text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground transition-colors"
    >
      <span className="w-2 h-2 bg-accent-from rounded-full"></span>
      <span>{strength}</span>
      <span className="text-xs text-foreground/50">({category})</span>
    </motion.div>
  );
}

interface AboutProps {
  className?: string;
}

export function About({ className }: AboutProps) {
  const summary = getResumeSection("summary");
  const contacts = getResumeSection("contacts");
  const settings = getResumeSection("settings");
  const skills = getSkillsWithContent();

  // Create key strengths from skills data
  const keyStrengths = Object.entries(skills).flatMap(([category, skillList]) =>
    skillList.slice(0, 2).map(skill => ({ skill, category })) // Take top 2 from each category
  ).slice(0, 6); // Limit to 6 total strengths

  // Enhanced summary for prose content
  const enhancedSummary = `
    ${summary}
    
    I specialize in building scalable software solutions with a focus on performance, reliability, and user experience. My approach combines technical expertise with strong problem-solving skills to deliver projects from conception to completion.
    
    With experience across the full development lifecycle, I excel at architecting systems that can handle high-throughput workloads while maintaining code quality and team collaboration.
  `;

  return (
    <section 
      id="about"
      className={cn(
        "pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 bg-gradient-to-br from-background via-background/98 to-accent/5",
        className
      )}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="fluid-h2 mb-4">About</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Get to know more about my background, expertise, and what drives me as a developer.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Main About Content */}
          <motion.div variants={cardVariants} className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 h-full">
              <h3 className="fluid-h3 mb-6">My Story</h3>
              
              {/* Prose Content */}
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <div className="text-foreground/80 leading-relaxed space-y-4">
                  {enhancedSummary.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>

              {/* Contact Info Row */}
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="text-sm font-semibold text-foreground/80 mb-4 uppercase tracking-wide">
                  Contact Information
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  
                  {/* Location */}
                  <ContactInfoItem
                    icon={<MapPin className="w-4 h-4" />}
                    label="Location"
                    value={contacts.location}
                    copyable={true}
                  />

                  {/* Email */}
                  <ContactInfoItem
                    icon={<Mail className="w-4 h-4" />}
                    label="Email"
                    value={contacts.email}
                    href={`mailto:${contacts.email}`}
                    copyable={true}
                  />

                  {/* Phone - Conditional */}
                  {settings.showPhone && (
                    <ContactInfoItem
                      icon={<Phone className="w-4 h-4" />}
                      label="Phone"
                      value={contacts.phone}
                      href={`tel:${contacts.phone}`}
                      copyable={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Strengths Panel */}
          <motion.div variants={cardVariants} className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 h-full">
              <div className="flex items-center gap-2 mb-6">
                <h3 className="fluid-h4">Key Strengths</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-accent-from/20 to-transparent"></div>
              </div>
              
              <div className="space-y-3">
                {keyStrengths.map(({ skill, category }, index) => (
                  <motion.div
                    key={`${category}-${skill}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <StrengthBadge strength={skill} category={category} />
                  </motion.div>
                ))}
              </div>

              {/* Skills Summary */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Proficient across <strong>{Object.keys(skills).length} technical areas</strong> with 
                  deep expertise in <strong>{Object.values(skills).flat().length} technologies</strong> and frameworks.
                </p>
                
                <motion.a
                  href="#skills"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-accent-from hover:text-accent-via transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                >
                  View all skills
                  <ExternalLink className="w-3 h-3" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
