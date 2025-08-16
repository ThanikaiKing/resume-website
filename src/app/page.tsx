"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container flex min-h-screen items-center justify-center py-24">
        <div className="text-center space-y-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="fluid-h1 gradient-text">
              Hello, I&apos;m Your Name
            </h1>
            <h2 className="fluid-h2 text-muted-foreground">
              Full-Stack Developer & UI/UX Designer
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            I create beautiful, functional, and user-centered digital experiences. 
            Passionate about modern web technologies and design systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-medium hover:bg-primary/90 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-2xl font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View Work
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-6 pt-8"
          >
            <a
              href="https://github.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Design System Showcase */}
      <section id="about" className="container py-24 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="fluid-h2">Design System Showcase</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Modern design system with fluid typography, beautiful colors, and consistent spacing.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Typography Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded-2xl p-6 space-y-4"
          >
            <h3 className="fluid-h3">Typography</h3>
            <div className="space-y-2">
              <h4 className="fluid-h4">Heading 4</h4>
              <p className="text-base">Body text with Inter font</p>
              <p className="text-sm text-muted-foreground">Muted text</p>
            </div>
          </motion.div>

          {/* Colors Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 space-y-4"
          >
            <h3 className="fluid-h3">Colors</h3>
            <div className="grid grid-cols-5 gap-2">
              <div className="aspect-square bg-neutral-100 rounded-md"></div>
              <div className="aspect-square bg-neutral-300 rounded-md"></div>
              <div className="aspect-square bg-neutral-500 rounded-md"></div>
              <div className="aspect-square bg-neutral-700 rounded-md"></div>
              <div className="aspect-square bg-neutral-900 rounded-md"></div>
            </div>
            <div className="h-8 bg-gradient-to-r from-accent-from via-accent-via to-accent-to rounded-md"></div>
          </motion.div>

          {/* Spacing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6 space-y-4"
          >
            <h3 className="fluid-h3">Spacing</h3>
            <div className="space-y-2">
              <div className="h-2 bg-primary/20 rounded"></div>
              <div className="h-3 bg-primary/40 rounded"></div>
              <div className="h-4 bg-primary/60 rounded"></div>
              <div className="h-6 bg-primary/80 rounded"></div>
              <div className="h-8 bg-primary rounded"></div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
