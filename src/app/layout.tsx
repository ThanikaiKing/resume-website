import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ThemeScript } from "@/components/providers/theme-script";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLdSchema } from "@/components/layout/json-ld-schema";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { getResumeSection } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Generate metadata from resume data
function generateMetadata(): Metadata {
  try {
    const meta = getResumeSection("meta");
    const name = getResumeSection("name");
    const contacts = getResumeSection("contacts");
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const ogImageUrl = `${baseUrl}/api/og`;
    
    return {
      title: {
        default: meta.ogTitle,
        template: `%s | ${name}`,
      },
      description: meta.ogDesc,
      keywords: meta.keywords,
      authors: [{ name, url: baseUrl }],
      creator: name,
      publisher: name,
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: baseUrl,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        type: "website",
        locale: "en_US",
        url: baseUrl,
        title: meta.ogTitle,
        description: meta.ogDesc,
        siteName: `${name} - Resume Portfolio`,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: `${name} - ${meta.ogDesc}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: meta.ogTitle,
        description: meta.ogDesc,
        images: [ogImageUrl],
        creator: contacts.links.find(link => 
          link.label.toLowerCase().includes('twitter') || 
          link.label.toLowerCase().includes('x')
        )?.url ? `@${name.toLowerCase().replace(/\s+/g, '')}` : undefined,
      },
      verification: {
        google: process.env.GOOGLE_SITE_VERIFICATION,
      },
    };
  } catch {
    // Fallback metadata if resume data fails to load
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return {
      title: "Resume Site",
      description: "Personal resume website built with Next.js",
      metadataBase: new URL(baseUrl),
    };
  }
}

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} antialiased font-sans`}
      >
        <JsonLdSchema />
        <SkipToContent />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main 
              id="main-content" 
              className="flex-1"
              role="main"
              aria-label="Main content"
            >
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
