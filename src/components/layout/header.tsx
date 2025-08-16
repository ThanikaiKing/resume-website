"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold tracking-tight">Resume</h1>
        </div>
        
        <nav className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#about" className="transition-colors hover:text-foreground/80 text-foreground/60">
              About
            </a>
            <a href="#experience" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Experience
            </a>
            <a href="#projects" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Projects
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Contact
            </a>
          </div>
          
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
