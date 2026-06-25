/**
 * Kök layout — tüm sayfaları sarmalar.
 * Prop'lar: { children } (sayfa içeriği).
 * Kullanım: Next.js App Router otomatik render eder; fontları, global metadata'yı,
 * sticky header/footer'ı, WhatsApp FAB'ı ve skip-to-content erişilebilirlik linkini sağlar.
 */
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Analytics } from "@/components/analytics";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700", "800"]
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.slogan}`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    "Uslu Duyar",
    "Mersin narenciye",
    "Çukurova narenciye",
    "portakal mandalina limon greyfurt",
    "kavun karpuz",
    "yaş meyve sebze ihracat",
    "toptan narenciye",
    "market tedariği",
    "tarım ihracat"
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
      "en-US": "/en"
    }
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.slogan}`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/og/og-default.svg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.slogan}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.slogan}`,
    description: siteConfig.description,
    images: ["/images/og/og-default.svg"]
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#0C3B16" }
  ],
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={cn(inter.variable, playfair.variable, jetbrainsMono.variable)} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // JSON-LD güvenli üretim: yalnızca kendi statik objemizi serialize ediyoruz.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </head>
      <body className="min-h-dvh bg-cream font-sans text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-lg focus:bg-primary-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          İçeriğe geç
        </a>
        <ScrollProgress />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFab />
        <Analytics />
      </body>
    </html>
  );
}
