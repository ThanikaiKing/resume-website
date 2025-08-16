"use client";

import { motion } from "framer-motion";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

export default function Home() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-6 w-6" />;
      case "dark":
        return <Moon className="h-6 w-6" />;
      default:
        return <Monitor className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent"
        >
          Hello Resume
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-md"
        >
          Welcome to your new resume website built with Next.js 15, TypeScript, and Tailwind CSS.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            aria-label={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} mode`}
          >
            {getThemeIcon()}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm text-muted-foreground"
        >
          Current theme: <span className="font-medium capitalize">{theme}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
