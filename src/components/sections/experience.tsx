"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Calendar, 
  TrendingUp, 
  Users, 
  Zap, 
  Target,
  Award,
  Activity,
  Layers,
  Database
} from "lucide-react";
import { getResumeSection } from "@/lib/content";
import { cn } from "@/lib/utils";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const timelineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 0, y: 30 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
};

// Extract impact metrics from highlight text
function extractMetrics(highlight: string) {
  const metrics = [];
  
  // Look for percentage patterns
  const percentMatch = highlight.match(/(\d+%)/g);
  if (percentMatch) {
    metrics.push(...percentMatch.map(match => ({ text: match, type: 'percentage' })));
  }
  
  // Look for YoY patterns
  const yoyMatch = highlight.match(/(\d+%\s*YoY)/gi);
  if (yoyMatch) {
    metrics.push(...yoyMatch.map(match => ({ text: match, type: 'growth' })));
  }
  
  // Look for request patterns
  const requestMatch = highlight.match(/(\d+[,\d]*\s*requests?\/min)/gi);
  if (requestMatch) {
    metrics.push(...requestMatch.map(match => ({ text: match, type: 'performance' })));
  }
  
  // Look for time reduction patterns
  const timeMatch = highlight.match(/(\d+%\s*reduction)/gi);
  if (timeMatch) {
    metrics.push(...timeMatch.map(match => ({ text: match, type: 'efficiency' })));
  }
  
  // Look for team size patterns
  const teamMatch = highlight.match(/(\d+\s*engineers?)/gi);
  if (teamMatch) {
    metrics.push(...teamMatch.map(match => ({ text: match, type: 'team' })));
  }
  
  return metrics;
}

// Get icon for metric type
function getMetricIcon(type: string) {
  switch (type) {
    case 'percentage':
    case 'growth':
      return TrendingUp;
    case 'performance':
      return Zap;
    case 'efficiency':
      return Target;
    case 'team':
      return Users;
    default:
      return Award;
  }
}

// Get company icon based on company name
function getCompanyIcon(company: string) {
  if (company.toLowerCase().includes('amazon')) return Database;
  if (company.toLowerCase().includes('zoho')) return Layers;
  return Building2;
}

interface MetricBadgeProps {
  metric: { text: string; type: string };
}

function MetricBadge({ metric }: MetricBadgeProps) {
  const IconComponent = getMetricIcon(metric.type);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        "bg-accent/20 border border-accent-from/20 text-accent-from",
        "hover:bg-accent/30 hover:border-accent-from/30 transition-colors"
      )}
    >
      <IconComponent className="w-3 h-3" />
      <span>{metric.text}</span>
    </motion.div>
  );
}

interface ExperienceCardProps {
  experience: {
    company: string;
    role: string;
    period: string;
    highlights: string[];
  };
  index: number;
  isLast: boolean;
}

function ExperienceCard({ experience, index, isLast }: ExperienceCardProps) {
  const isEven = index % 2 === 0;
  const CompanyIcon = getCompanyIcon(experience.company);
  
  // Extract all metrics from highlights
  const allMetrics = experience.highlights.flatMap(highlight => extractMetrics(highlight));
  
  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "relative flex items-center gap-6 md:gap-8 lg:gap-12",
        // Mobile: always center
        "flex-col md:flex-row",
        // Desktop: alternate sides
        !isEven && "lg:flex-row-reverse"
      )}
      role="region"
      aria-labelledby={`experience-${index}-heading`}
      aria-describedby={`experience-${index}-details`}
    >
      {/* Timeline Node */}
      <div className="relative flex-shrink-0">
        {/* Vertical Line */}
        {!isLast && (
          <div className="absolute top-16 left-1/2 w-0.5 h-24 md:h-32 bg-gradient-to-b from-accent-from/60 to-accent-from/20 -translate-x-0.5" />
        )}
        
        {/* Timeline Dot */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-12 h-12 bg-card border-2 border-accent-from rounded-full flex items-center justify-center shadow-lg"
        >
          <CompanyIcon className="w-5 h-5 text-accent-from" />
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex-1 bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow",
          "max-w-md md:max-w-lg lg:max-w-xl"
        )}
      >
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 
                id={`experience-${index}-heading`}
                className="text-xl font-semibold text-foreground font-display"
              >
                {experience.role}
              </h3>
              <p className="text-accent-from font-medium">
                {experience.company || "Current Company"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <Calendar className="w-4 h-4" />
            <span>{experience.period}</span>
          </div>
        </div>

        {/* Metrics */}
        {allMetrics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {allMetrics.slice(0, 3).map((metric, metricIndex) => (
              <MetricBadge key={metricIndex} metric={metric} />
            ))}
          </div>
        )}

        {/* Highlights */}
        <div id={`experience-${index}-details`}>
          <ul className="space-y-3">
            {experience.highlights.map((highlight, highlightIndex) => (
              <motion.li
                key={highlightIndex}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: highlightIndex * 0.1 }}
                className="flex items-start gap-3 text-sm text-foreground/80"
              >
                <div className="w-1.5 h-1.5 bg-accent-from rounded-full mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ExperienceProps {
  className?: string;
}

export function Experience({ className }: ExperienceProps) {
  const experience = getResumeSection("experience");

  return (
    <section 
      id="experience"
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        className
      )}
      aria-labelledby="experience-heading"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={timelineVariants} className="text-center mb-16">
          <h2 id="experience-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-display">
            Experience
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A journey through roles where I&apos;ve built scalable systems, led teams, and delivered impactful solutions.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Background decorative line for large screens */}
          <div className="hidden lg:block absolute left-1/2 top-24 bottom-24 w-0.5 bg-gradient-to-b from-transparent via-accent-from/10 to-transparent -translate-x-0.5" />
          
          <div className="space-y-12 md:space-y-16 lg:space-y-20">
            {experience.map((exp, index) => (
              <ExperienceCard
                key={`${exp.company}-${exp.role}-${index}`}
                experience={exp}
                index={index}
                isLast={index === experience.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          variants={timelineVariants}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-from text-white rounded-xl font-medium hover:bg-accent-via transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Activity className="w-4 h-4" />
            Let&apos;s Build Something Together
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
