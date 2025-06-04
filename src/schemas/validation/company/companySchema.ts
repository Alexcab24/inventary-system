import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  logotype: z
    .any()
    .refine(
      (file) =>
        file instanceof File ||
        typeof file === 'undefined' ||
        file === null,
      'Logotype must be a valid file'
    )
    .optional(),
});