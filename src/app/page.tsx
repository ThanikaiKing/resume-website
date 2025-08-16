"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Experience Section */}
      <Experience />

      {/* Skills Section */}
      <Skills />

      {/* Education Section */}
      <Education />

      {/* Contact Section */}
      <Contact />

      {/* Design System Showcase */}
      <section id="design-system" className="container py-24 space-y-16">
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
