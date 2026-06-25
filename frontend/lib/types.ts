export type ApplicationStatus = "approved" | "pending" | "declined";

export type Application = {
  id: string;
  customerName: string;
  product: string;
  amount: number;
  provider: string;
  status: ApplicationStatus;
  date: string; // ISO date
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  applicationCount: number;
  totalFinanced: number;
  joinedDate: string;
};

export type PaymentLink = {
  id: string;
  label: string;
  url: string;
  amount: number;
  createdAt: string;
  uses: number;
};

export type ActivityItem = {
  id: string;
  message: string;
  timestamp: string;
  type: ApplicationStatus | "info";
};
