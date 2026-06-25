/**
 * İletişim / teklif formu zod şeması ve tipi (paylaşılan doğrulama).
 * Prop'lar: yok (şema + tip export'u).
 * Kullanım: react-hook-form resolver'ında ve /api/contact route'unda ortak kullanılır.
 */
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Lütfen adınızı girin.").max(120),
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  phone: z
    .string()
    .max(40)
    .optional()
    .or(z.literal("")),
  company: z.string().max(160).optional().or(z.literal("")),
  subject: z.string().max(160).optional().or(z.literal("")),
  message: z.string().min(10, "Lütfen en az 10 karakterlik bir mesaj yazın.").max(4000),
  // Honeypot — botlar doldurur, insanlar görmez.
  website: z.string().max(0).optional().or(z.literal(""))
});

export type ContactInput = z.infer<typeof contactSchema>;
