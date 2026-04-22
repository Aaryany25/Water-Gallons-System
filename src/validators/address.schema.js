import { z } from "zod";

export const addressSchema = z.object({
  roomNo: z.string().trim().min(1, "Room number is required"),
  building: z.string().trim().min(1, "Building name is required"),
  street: z.string().trim().min(1, "Street is required"),
  city: z.string().trim().min(1, "City is required"),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Invalid Indian pincode"),
});

export const addressUpdateSchema = addressSchema.partial();
