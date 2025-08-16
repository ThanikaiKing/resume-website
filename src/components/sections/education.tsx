"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, Download, ExternalLink } from "lucide-react";
import { getResumeSection } from "@/lib/content";
import { cn } from "@/lib/utils";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

interface EducationCardProps {
  education: {
    degree: string;
    org: string;
    period: string;
    details?: string;
  };
  index: number;
}

function EducationCard({ education }: EducationCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <div className="bg-card border border-border rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-all duration-200">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-accent/10 border border-accent-from/20 rounded-xl group-hover:bg-accent/20 transition-colors">
            <GraduationCap className="w-6 h-6 text-accent-from" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground font-display mb-1">
              {education.degree}
            </h3>
            <p className="text-accent-from font-medium mb-2">
              {education.org}
            </p>
            
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <Calendar className="w-4 h-4" />
              <span>{education.period}</span>
            </div>
          </div>
        </div>

        {/* Details */}
        {education.details && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-foreground/60" />
              <span className="text-sm font-medium text-foreground/80">Academic Performance</span>
            </div>
            <p className="text-lg font-semibold text-foreground">
              {education.details}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <motion.a
            href="/transcript.pdf" // Placeholder - add actual transcript to public folder
            download="Thanikaivelan-Transcript.pdf"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-from text-white rounded-lg text-sm font-medium hover:bg-accent-via transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Download className="w-4 h-4" />
            Download Transcript
          </motion.a>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <ExternalLink className="w-4 h-4" />
            View Institution
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

interface EducationProps {
  className?: string;
}

export function Education({ className }: EducationProps) {
  const education = getResumeSection("education");

  return (
    <section 
      id="education"
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        className
      )}
      aria-labelledby="education-heading"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={cardVariants} className="text-center mb-16">
          <h2 id="education-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-display">
            Education
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Academic foundation that shaped my technical expertise and problem-solving approach.
          </p>
        </motion.div>

        {/* Education Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {education.map((edu, index) => (
            <EducationCard
              key={`${edu.org}-${edu.degree}-${index}`}
              education={edu}
              index={index}
            />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          variants={cardVariants}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4 font-display">
              Continuing Education
            </h3>
            <p className="text-foreground/70 mb-6">
              I believe in lifelong learning and continuously updating my skills through courses, 
              certifications, and hands-on projects to stay current with technology trends.
            </p>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-from text-white rounded-xl font-medium hover:bg-accent-via transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <GraduationCap className="w-4 h-4" />
              Discuss Learning Opportunities
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
