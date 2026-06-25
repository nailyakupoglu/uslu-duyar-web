import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Minimum sipariş miktarı nedir?",
    answer: "Ürün, ambalaj ve sevkiyat tipine göre değişir. Ürün detay sayfalarında ön planlama aralığı verilir; nihai MOQ teklif aşamasında partiye göre teyit edilir."
  },
  {
    question: "İhracat evrakları hazırlanıyor mu?",
    answer: "FOB, CFR ve CIF süreçlerine uygun fatura, paket listesi ve sertifika akışı desteklenir."
  },
  {
    question: "Özel marka üretim yapılabilir mi?",
    answer: "Uygun ürün gruplarında private label, ambalaj ve parti planlaması teklif aşamasında değerlendirilir."
  }
];

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="rounded-lg bg-white/70 px-5">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.question} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
