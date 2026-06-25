import { z } from "zod";

export const signupSchema = z
  .object({
    businessName: z.string().min(1, "Business name is required"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    productCategory: z.string().min(1, "Please chose a Category"),
    location: z.string().min(1, "Please choose a location"),
    fullAddress: z.string().min(1, "Address is required"),
    primaryNumber: z.string().min(1, "Phone number must be at least 11 digits"),
    secondaryPhone: z
      .string()
      .min(1, "Secondary number must be at least 11 digits"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const merchantLoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "password is required"),
});
