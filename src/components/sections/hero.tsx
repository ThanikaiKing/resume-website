"use client";

import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import Image from "next/image";
import { getResumeSection, getValidContactLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const buttonVariants = {
  hover: {
    scale: 1.02,
  },
  tap: {
    scale: 0.98,
  },
};

const socialIconVariants = {
  hover: {
    scale: 1.1,
    y: -2,
  },
  tap: {
    scale: 0.95,
  },
};

// Icon mapping for social links
const socialIcons = {
  github: Github,
  linkedin: Linkedin,
} as const;

interface HeroProps {
  avatarSrc?: string;
  className?: string;
}

export function Hero({ avatarSrc, className }: HeroProps) {
  const name = getResumeSection("name");
  const title = getResumeSection("title");
  const summary = getResumeSection("summary");
  const validLinks = getValidContactLinks();

  // Get social links that we have icons for
  const socialLinks = validLinks.filter(link => {
    const linkType = link.label.toLowerCase() as keyof typeof socialIcons;
    return linkType in socialIcons;
  });

  return (
    <section 
      className={cn(
        "relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8",
        "bg-gradient-to-br from-background via-background/95 to-background/90",
        className
      )}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto text-center space-y-8 max-w-4xl"
      >
        {/* Avatar - Optional */}
        {avatarSrc && (
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-4 ring-accent-from/20 ring-offset-4 ring-offset-background">
              <Image
                src={avatarSrc}
                alt={`${name} profile photo`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 128px, 160px"
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rc5NCTCK5xrTmLYMZjqL2YjAo/hC6J0PSQQIAEe5ggWl8pYpK5hGYPWVVjBSiIUPe5WJPVhRnvK"
              />
            </div>
          </motion.div>
        )}

        {/* Name with Gradient */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="fluid-h1 gradient-text font-bold tracking-tight">
            {name}
          </h1>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-foreground/80 font-display">
            {title}
          </h2>
        </motion.div>

        {/* Summary */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed"
        >
          {summary}
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        >
          {/* Download Resume Button */}
          <motion.a
            href="/resume.pdf" // You'll need to add this file to the public folder
            download={`${name}-Resume.pdf`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="inline-flex items-center gap-3 px-8 py-4 min-h-[44px] bg-primary text-primary-foreground rounded-2xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group"
          >
            <Download className="w-5 h-5 transition-transform group-hover:scale-110" />
            Download PDF Resume
          </motion.a>

          {/* Contact Button */}
          <motion.a
            href="#contact"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="inline-flex items-center gap-3 px-8 py-4 min-h-[44px] border border-border bg-background text-foreground rounded-2xl font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group"
          >
            <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
            Contact
          </motion.a>
        </motion.div>

        {/* Social Links - Conditional */}
        {socialLinks.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="pt-8"
          >
            <div className="flex justify-center items-center gap-4">
              <span className="text-sm text-foreground/60 font-medium">Connect with me</span>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const linkType = link.label.toLowerCase() as keyof typeof socialIcons;
                  const IconComponent = socialIcons[linkType];
                  
                  if (!IconComponent) return null;
                  
                  return (
                    <motion.a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={socialIconVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-card border border-border hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group"
                      aria-label={`Visit ${link.label} profile`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Scroll Indicator - Optional */}
        <motion.div
          variants={itemVariants}
          className="pt-16 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: [0.42, 0, 0.58, 1] 
            }}
            className="flex flex-col items-center gap-2 text-foreground/40"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-foreground/40 to-transparent"></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
