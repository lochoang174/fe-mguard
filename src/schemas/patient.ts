import { z } from "zod";

export const patientSchema = z.object({
  fullName: z.string().min(2, "Tên phải có ít nhất 2 ký tự").optional(),
  age: z.number().min(0, "Tuổi phải lớn hơn 0").optional(),
  birthDate: z.date().optional(),
  pregnancyNumber: z
    .number()
    .min(0, "Số lần mang thai phải lớn hơn 0")
    .optional(),
  gestationalAgeAtBirth: z
    .number()
    .min(0, "Tuổi thai phải lớn hơn 0")
    .optional(),
  pregnancyConditions: z
    .array(
      z.enum([
        "THA thai kỳ",
        "THA mạn tính",
        "Tiền sản giật",
        "Tiền sản giật/THA mạn tính",
      ])
    )
    .optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;
