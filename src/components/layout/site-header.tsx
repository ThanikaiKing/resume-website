"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getResumeSection } from "@/lib/content";

const navigationItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const name = getResumeSection("name");

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
      aria-label="Site header"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Name */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold tracking-tight text-foreground hover:text-foreground/80 transition-colors">
              <a href="#" className="block py-2 px-1 min-h-[44px] min-w-[44px] flex items-center">
                {name}
              </a>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center space-x-1"
            role="navigation"
            aria-label="Main navigation"
          >
            <div className="flex items-center space-x-1 text-sm font-medium">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md text-foreground/70 transition-colors hover:text-foreground hover:bg-accent focus:text-foreground focus:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            <div className="ml-4 pl-4 border-l border-border">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-accent focus:text-foreground focus:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              
              <SheetContent 
                side="right" 
                className="w-[280px] sm:w-[300px]"
                aria-describedby="mobile-nav-description"
              >
                <SheetHeader>
                  <SheetTitle className="text-left">Navigation</SheetTitle>
                  <p id="mobile-nav-description" className="sr-only">
                    Mobile navigation menu with links to different sections of the resume
                  </p>
                </SheetHeader>
                
                <nav 
                  className="flex flex-col space-y-2 mt-6"
                  role="navigation"
                  aria-label="Mobile navigation menu"
                >
                  {navigationItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="px-4 py-3 min-h-[44px] flex items-center text-lg font-medium text-foreground/80 rounded-md transition-colors hover:text-foreground hover:bg-accent focus:text-foreground focus:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      aria-label={`Navigate to ${item.label} section`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
