"use client";

import { motion, useReducedMotion } from "framer-motion";
import { 
  Code, 
  Layers, 
  Cloud, 
  Database, 
  Settings, 
  Lightbulb,
  Coffee,
  Terminal,
  Cpu,
  Shield,
  Zap
} from "lucide-react";
import { getSkillsWithContent } from "@/lib/content";
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

const skillItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

// Get icon for skill category
function getCategoryIcon(category: string) {
  const lowercaseCategory = category.toLowerCase();
  
  if (lowercaseCategory.includes('language')) return Code;
  if (lowercaseCategory.includes('architecture')) return Layers;
  if (lowercaseCategory.includes('cloud')) return Cloud;
  if (lowercaseCategory.includes('database')) return Database;
  if (lowercaseCategory.includes('tool')) return Settings;
  if (lowercaseCategory.includes('other')) return Lightbulb;
  
  return Terminal;
}

// Get category color theme
function getCategoryTheme(category: string) {
  const lowercaseCategory = category.toLowerCase();
  
  if (lowercaseCategory.includes('language')) {
    return {
      gradient: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/30",
      icon: "text-blue-600",
      accent: "bg-blue-500/10"
    };
  }
  
  if (lowercaseCategory.includes('architecture')) {
    return {
      gradient: "from-purple-500/20 to-purple-600/20",
      border: "border-purple-500/30",
      icon: "text-purple-600",
      accent: "bg-purple-500/10"
    };
  }
  
  if (lowercaseCategory.includes('cloud')) {
    return {
      gradient: "from-sky-500/20 to-sky-600/20",
      border: "border-sky-500/30",
      icon: "text-sky-600",
      accent: "bg-sky-500/10"
    };
  }
  
  if (lowercaseCategory.includes('database')) {
    return {
      gradient: "from-green-500/20 to-green-600/20",
      border: "border-green-500/30",
      icon: "text-green-600",
      accent: "bg-green-500/10"
    };
  }
  
  if (lowercaseCategory.includes('tool')) {
    return {
      gradient: "from-orange-500/20 to-orange-600/20",
      border: "border-orange-500/30",
      icon: "text-orange-600",
      accent: "bg-orange-500/10"
    };
  }
  
  // Default theme for "Other" or unknown categories
  return {
    gradient: "from-accent-from/20 to-accent-via/20",
    border: "border-accent-from/30",
    icon: "text-accent-from",
    accent: "bg-accent-from/10"
  };
}

// Get skill description/caption
function getSkillCaption(skill: string, category: string) {
  const skillDescriptions: Record<string, string> = {
    // Languages
    'Java': 'Enterprise-grade applications',
    'SQL': 'Database design & optimization',
    
    // Architecture
    'Microservices': 'Scalable distributed systems',
    
    // Cloud
    'AWS': 'Cloud infrastructure & services',
    'Kubernetes': 'Container orchestration',
    
    // Databases
    'MySQL': 'Relational database management',
    'Redis': 'In-memory data caching',
    
    // Tools
    'Docker': 'Application containerization',
    
    // Other
    'API design': 'RESTful service architecture',
    'Mentoring': 'Team leadership & growth',
  };
  
  return skillDescriptions[skill] || `${category} expertise`;
}

interface SkillItemProps {
  skill: string;
  category: string;
  index: number;
}

function SkillItem({ skill, category }: SkillItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const caption = getSkillCaption(skill, category);
  
  const hoverVariants = shouldReduceMotion ? {} : {
    hover: {
      scale: 1.05,
      y: -2,
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <motion.div
      variants={skillItemVariants}
      whileHover="hover"
      whileTap="tap"
      {...hoverVariants}
      className="group relative"
    >
      <div className={cn(
        "px-4 py-3 rounded-lg border bg-card text-center transition-all duration-200",
        "hover:shadow-lg hover:border-accent-from/40 cursor-default",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      )}>
        <div className="text-sm font-medium text-foreground mb-1">
          {skill}
        </div>
        
        {/* Caption - appears on hover */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: "auto" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className="text-xs text-foreground/60 overflow-hidden"
        >
          {caption}
        </motion.div>
      </div>
    </motion.div>
  );
}

interface SkillCategoryProps {
  category: string;
  skills: string[];
  index: number;
}

function SkillCategory({ category, skills, index }: SkillCategoryProps) {
  const IconComponent = getCategoryIcon(category);
  const theme = getCategoryTheme(category);
  const shouldReduceMotion = useReducedMotion();
  
  const cardHoverVariants = shouldReduceMotion ? {} : {
    hover: {
      y: -4,
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      {...cardHoverVariants}
      className="group h-full"
    >
      <div className={cn(
        "h-full bg-card border rounded-2xl p-6 transition-all duration-200",
        "hover:shadow-lg hover:shadow-accent-from/5",
        theme.border
      )}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={cn(
            "p-2 rounded-lg",
            theme.accent
          )}>
            <IconComponent className={cn("w-5 h-5", theme.icon)} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground font-display">
              {category}
            </h3>
            <p className="text-sm text-foreground/60">
              {skills.length} skill{skills.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skills.map((skill, skillIndex) => (
            <SkillItem
              key={skill}
              skill={skill}
              category={category}
              index={skillIndex}
            />
          ))}
        </div>

        {/* Proficiency Indicator */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-foreground/60 mb-2">
            <span>Proficiency</span>
            <span>Expert</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "90%" }}
              transition={{ duration: shouldReduceMotion ? 0 : 1, delay: index * 0.1 }}
              className={cn(
                "h-2 rounded-full bg-gradient-to-r",
                theme.gradient.replace('/20', '/60')
              )}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface SkillsProps {
  className?: string;
}

export function Skills({ className }: SkillsProps) {
  const skills = getSkillsWithContent();
  const skillCategories = Object.entries(skills);
  const totalSkills = Object.values(skills).flat().length;

  return (
    <section 
      id="skills"
      className={cn(
        "py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-background via-background/98 to-accent/5",
        className
      )}
      aria-labelledby="skills-heading"
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
          <h2 id="skills-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-display">
            Skills & Technologies
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-6">
            A comprehensive toolkit spanning {totalSkills} technologies across {skillCategories.length} domains, 
            refined through years of hands-on experience.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-accent-from" />
              <span className="text-foreground/70">{skillCategories.length} Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent-from" />
              <span className="text-foreground/70">{totalSkills} Technologies</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent-from" />
              <span className="text-foreground/70">6+ Years Experience</span>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {skillCategories.map(([category, skillList], index) => (
            <SkillCategory
              key={category}
              category={category}
              skills={skillList}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          variants={cardVariants}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4 font-display">
              Ready to leverage these skills for your next project?
            </h3>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-from text-white rounded-xl font-medium hover:bg-accent-via transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <Coffee className="w-4 h-4" />
              Let&apos;s Discuss Your Project
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
