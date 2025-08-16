"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Copy, Check, ExternalLink } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { getResumeSection } from "@/lib/content";
import { cn } from "@/lib/utils";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// Copy-to-clipboard hook
function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
      toast.success("Copied to clipboard!");
      return true;
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2000);
        toast.success("Copied to clipboard!");
        return true;
      } catch {
        toast.error("Failed to copy to clipboard");
        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return { copy, copiedText };
}

interface ContactChipProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
}

function ContactChip({ icon, label, value, href, copyable = false }: ContactChipProps) {
  const { copy, copiedText } = useCopyToClipboard();
  const isCopied = copiedText === value;

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await copy(value);
  };

  const content = (
    <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:bg-accent/50 transition-colors group">
      <div className="text-accent-from group-hover:text-accent-via transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground/80">{label}</div>
        <div className="text-base font-semibold text-foreground truncate">{value}</div>
      </div>
      {copyable && (
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 min-h-[36px] min-w-[36px] rounded-lg hover:bg-accent text-foreground/60 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label={`Copy ${label}`}
        >
          {isCopied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </motion.button>
      )}
    </div>
  );

  if (href) {
    return (
      <a 
        href={href}
        className="block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-xl"
      >
        {content}
      </a>
    );
  }

  return content;
}

interface ContactFormProps {
  formspreeEndpoint?: string;
}

function ContactForm({ formspreeEndpoint }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // Spam protection
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam protection
    if (formData.honeypot) {
      toast.error("Spam detected. Please try again.");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = formspreeEndpoint || process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      
      if (!endpoint) {
        toast.error("Contact form is not configured. Please use direct contact methods.");
        return;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      toast.error("Failed to send message. Please try again or use direct contact methods.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      variants={itemVariants}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-from focus:border-transparent transition-colors"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-from focus:border-transparent transition-colors"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent-from focus:border-transparent transition-colors resize-none"
          placeholder="Tell me about your project, questions, or how we can work together..."
        />
      </div>

      {/* Cloudflare Turnstile placeholder */}
      <div id="cf-turnstile" className="flex justify-center">
        {/* Turnstile widget will be inserted here if configured */}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent-from text-white rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          isSubmitting 
            ? "opacity-60 cursor-not-allowed" 
            : "hover:bg-accent-via hover:shadow-lg"
        )}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </motion.button>

      <p className="text-xs text-foreground/60 text-center">
        By submitting this form, you agree to receive email responses from me. 
        Your information will never be shared with third parties.
      </p>
    </motion.form>
  );
}

interface ContactProps {
  className?: string;
}

export function Contact({ className }: ContactProps) {
  const contacts = getResumeSection("contacts");
  const settings = getResumeSection("settings");

  return (
    <section 
      id="contact"
      className={cn(
        "py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-background via-background/98 to-accent/5",
        className
      )}
      aria-labelledby="contact-heading"
    >
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "bg-card border border-border text-foreground",
          duration: 4000,
        }}
      />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 id="contact-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-display">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Ready to start your next project? I&apos;d love to hear about your ideas and discuss how we can bring them to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-foreground font-display mb-6">
                Send a Message
              </h3>
              <ContactForm />
            </div>
          </motion.div>

          {/* Direct Contact */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground font-display mb-6">
                Direct Contact
              </h3>
              <div className="space-y-4">
                <ContactChip
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                  value={contacts.email}
                  href={`mailto:${contacts.email}`}
                  copyable={true}
                />

                {settings.showPhone && (
                  <ContactChip
                    icon={<Phone className="w-5 h-5" />}
                    label="Phone"
                    value={contacts.phone}
                    href={`tel:${contacts.phone}`}
                    copyable={true}
                  />
                )}

                <ContactChip
                  icon={<MapPin className="w-5 h-5" />}
                  label="Location"
                  value={contacts.location}
                  copyable={true}
                />
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-accent/10 border border-accent-from/20 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Quick Response Guarantee
              </h4>
              <p className="text-foreground/70 mb-4">
                I typically respond to all inquiries within 24 hours during business days. 
                For urgent matters, feel free to call or send a direct email.
              </p>
              <div className="flex items-center gap-2 text-sm text-accent-from">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Available for new projects
              </div>
            </div>

            {/* Social Links */}
            {contacts.links.some(link => link.url.trim() !== '') && (
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  Connect Online
                </h4>
                <div className="flex gap-3">
                  {contacts.links
                    .filter(link => link.url.trim() !== '')
                    .map((link) => (
                      <motion.a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </motion.a>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
