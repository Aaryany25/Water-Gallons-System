import { z } from "zod";

export const createOrderSchema = z.object({
  address: z.string().length(24, "Invalid Address ID").optional(), // Optional if we use user's default
  gallons: z.number().int().min(1, "Minimum 1 gallon required"),
  deliveryTime: z.string().transform((val) => new Date(val)),
  paymentMethod: z.enum(["cash", "online"]),
  note: z.string().trim().optional(),
});

export const updateOrderSchema = z.object({
  gallons: z.number().int().min(1, "Minimum 1 gallon required").optional(),
  note: z.string().trim().optional(),
});
