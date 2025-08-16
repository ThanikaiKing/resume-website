"use client";

import { Mail } from "lucide-react";
import { getResumeSection } from "@/lib/content";

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  const name = getResumeSection("name");
  const contacts = getResumeSection("contacts");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Copyright & Name */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              <p className="text-sm text-foreground/70">
                © {currentYear} {name}. All rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Quick Links
              </h4>
              <nav className="flex flex-col space-y-2">
                {quickLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors py-1 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Contact
              </h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${contacts.email}`}
                  className="inline-flex items-center space-x-2 text-sm text-foreground/70 hover:text-foreground transition-colors py-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                >
                  <Mail className="h-4 w-4" />
                  <span>{contacts.email}</span>
                </a>
                
                <p className="text-sm text-foreground/60">
                  {contacts.location}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-border/40">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p className="text-xs text-foreground/60">
                Built with Next.js, TypeScript, and Tailwind CSS
              </p>
              
              <div className="flex items-center space-x-1">
                {/* Social Links - only show if URLs are provided */}
                {contacts.links
                  .filter(link => link.url.trim() !== '')
                  .map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-foreground/60 hover:text-foreground transition-colors px-2 py-1 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {link.label}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
