import { Application, Customer, PaymentLink, ActivityItem } from "./types";

export const mockApplications: Application[] = [
  { id: "APP-1042", customerName: "Adaeze Okafor", product: "iPhone 15 Pro", amount: 850000, provider: "Samplify Direct", status: "approved", date: "2026-06-22" },
  { id: "APP-1041", customerName: "Tunde Bakare", product: 'Samsung Smart TV 55"', amount: 420000, provider: "PartnerFi", status: "pending", date: "2026-06-22" },
  { id: "APP-1040", customerName: "Chioma Eze", product: "HP Pavilion Laptop", amount: 610000, provider: "Samplify Direct", status: "approved", date: "2026-06-21" },
  { id: "APP-1039", customerName: "Emeka Nwosu", product: "LG Fridge 350L", amount: 380000, provider: "PartnerFi", status: "declined", date: "2026-06-21" },
  { id: "APP-1038", customerName: "Fatima Bello", product: "Dell Inspiron 15", amount: 540000, provider: "Samplify Direct", status: "pending", date: "2026-06-20" },
  { id: "APP-1037", customerName: "Ibrahim Sani", product: "Sofa Set 7-Seater", amount: 290000, provider: "PartnerFi", status: "approved", date: "2026-06-19" },
  { id: "APP-1036", customerName: "Ngozi Achebe", product: "Office Desk Set", amount: 175000, provider: "Samplify Direct", status: "approved", date: "2026-06-18" },
  { id: "APP-1035", customerName: "Kunle Afolabi", product: "PlayStation 5", amount: 460000, provider: "PartnerFi", status: "pending", date: "2026-06-18" },
];

export const mockCustomers: Customer[] = [
  { id: "CUS-201", name: "Adaeze Okafor", email: "adaeze.okafor@gmail.com", applicationCount: 3, totalFinanced: 1620000, joinedDate: "2026-02-14" },
  { id: "CUS-202", name: "Tunde Bakare", email: "tunde.bakare@gmail.com", applicationCount: 1, totalFinanced: 420000, joinedDate: "2026-05-03" },
  { id: "CUS-203", name: "Chioma Eze", email: "chioma.eze@yahoo.com", applicationCount: 2, totalFinanced: 1180000, joinedDate: "2026-01-29" },
  { id: "CUS-204", name: "Emeka Nwosu", email: "emeka.nwosu@gmail.com", applicationCount: 1, totalFinanced: 380000, joinedDate: "2026-06-01" },
  { id: "CUS-205", name: "Fatima Bello", email: "fatima.bello@outlook.com", applicationCount: 2, totalFinanced: 940000, joinedDate: "2026-03-17" },
  { id: "CUS-206", name: "Ibrahim Sani", email: "ibrahim.sani@gmail.com", applicationCount: 4, totalFinanced: 2100000, joinedDate: "2025-11-22" },
];

export const mockPaymentLinks: PaymentLink[] = [
  { id: "LNK-301", label: "iPhone 15 Pro — Installments", url: "https://pay.samplify.app/lnk-301", amount: 850000, createdAt: "2026-06-20", uses: 12 },
  { id: "LNK-300", label: "Furniture Bundle Deal", url: "https://pay.samplify.app/lnk-300", amount: 465000, createdAt: "2026-06-15", uses: 4 },
  { id: "LNK-299", label: "Back to School Laptops", url: "https://pay.samplify.app/lnk-299", amount: 540000, createdAt: "2026-06-10", uses: 27 },
];

export const mockActivity: ActivityItem[] = [
  { id: "1", message: "Adaeze Okafor's application for iPhone 15 Pro was approved", timestamp: "2 hours ago", type: "approved" },
  { id: "2", message: "New application submitted by Tunde Bakare", timestamp: "5 hours ago", type: "pending" },
  { id: "3", message: "Emeka Nwosu's application was declined by PartnerFi", timestamp: "1 day ago", type: "declined" },
  { id: "4", message: "Payment link 'Back to School Laptops' reached 25 uses", timestamp: "1 day ago", type: "info" },
  { id: "5", message: "Ibrahim Sani's application for Sofa Set was approved", timestamp: "2 days ago", type: "approved" },
];

export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}
