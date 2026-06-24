import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uslu Duyar Tarım Ürünleri",
  description:
    "Mersin'den dünyaya taze meyve-sebze, tahıl, baharat ve silaj üretimi. 30 yıllık tecrübe, 25+ ülkeye ihracat.",
  keywords: [
    "Uslu Duyar",
    "Mersin",
    "tarım",
    "meyve sebze",
    "tahıl",
    "baharat",
    "silaj",
    "ihracat",
  ],
  openGraph: {
    title: "Uslu Duyar Tarım Ürünleri",
    description:
      "Mersin'den dünyaya taze meyve-sebze, tahıl, baharat ve silaj üretimi.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
