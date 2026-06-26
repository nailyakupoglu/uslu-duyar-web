/**
 * Kök layout — tüm sayfaları sarmalar.
 * Prop'lar: { children } (sayfa içeriği).
 * Kullanım: Next.js App Router otomatik render eder; fontları, global metadata'yı,
 * sticky header/footer'ı, WhatsApp FAB'ı ve skip-to-content erişilebilirlik linkini sağlar.
 */
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { Splash } from "@/components/motion/splash";
import { Analytics } from "@/components/analytics";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/data";
import { cn, pick } from "@/lib/utils";
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

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const slogan = pick(siteConfig.slogan, locale);
  const description = pick(siteConfig.description, locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${slogan}`,
      template: `%s | ${siteConfig.name}`
    },
    description,
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
      canonical: locale === "en" ? "/en" : "/",
      languages: {
        "tr-TR": "/",
        "en-US": "/en",
        "x-default": "/"
      }
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "tr_TR",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: `${siteConfig.name} — ${slogan}`,
      description,
      images: [
        {
          url: "/images/og/og-default.png",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${slogan}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${slogan}`,
      description,
      images: ["/images/og/og-default.png"]
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
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#0C3B16" }
  ],
  width: "device-width",
  initialScale: 1
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const skipLabel = locale === "en" ? "Skip to content" : "İçeriğe geç";

  return (
    <html lang={locale} className={cn(inter.variable, playfair.variable, jetbrainsMono.variable)} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // JSON-LD güvenli üretim: yalnızca kendi statik objemizi serialize ediyoruz.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd(locale)) }}
        />
      </head>
      <body className="min-h-dvh bg-cream font-sans text-ink antialiased">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-lg focus:bg-primary-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
          >
            {skipLabel}
          </a>
          <Splash />
          <SmoothScrollProvider />
          <ScrollProgress />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppFab />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
