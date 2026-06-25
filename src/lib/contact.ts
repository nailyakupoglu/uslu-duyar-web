/**
 * B2B İletişim / RFQ (Request for Quote) formu zod şeması ve tipi.
 * Prop'lar: yok (şema + tip export'u).
 * Kullanım: react-hook-form resolver'ında ve /api/contact route'unda ortak kullanılır.
 *
 * Alanlar:
 *  - contact: şirket bilgileri (zorunlu: name/email/company)
 *  - inquiry: ürün/tonaj/Incoterm/liman/alıcı tipi (B2B RFQ)
 *  - honeypot: bot koruması
 */
import { z } from "zod";

const buyerTypes = [
  "wholesaler",
  "retail-chain",
  "horeca",
  "importer",
  "broker",
  "other",
] as const;

const incoterms = [
  "FOB",
  "CFR",
  "CIF",
  "EXW",
  "FCA",
  "DAP",
  "DDP",
] as const;

export const contactSchema = z.object({
  // === İletişim (zorunlu) ===
  name: z.string().min(2, "Lütfen adınızı girin.").max(120),
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  phone: z
    .string()
    .max(40)
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .min(2, "Şirket adı zorunlu (B2B).")
    .max(160),

  // === B2B RFQ ===
  product: z
    .string()
    .max(160)
    .optional()
    .or(z.literal("")),
  quantity: z
    .string()
    .max(40)
    .optional()
    .or(z.literal("")),
  incoterm: z
    .enum(incoterms)
    .optional(),
  destinationPort: z
    .string()
    .max(120)
    .optional()
    .or(z.literal("")),
  destinationCountry: z
    .string()
    .max(80)
    .optional()
    .or(z.literal("")),
  buyerType: z
    .enum(buyerTypes)
    .optional(),

  // === Mesaj (zorunlu) ===
  subject: z.string().max(160).optional().or(z.literal("")),
  message: z.string().min(10, "Lütfen en az 10 karakterlik bir mesaj yazın.").max(4000),

  // Honeypot — botlar doldurur, insanlar görmez.
  website: z.string().max(200).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
export { buyerTypes, incoterms };
