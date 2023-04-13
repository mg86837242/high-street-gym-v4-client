import { z } from 'zod';
import { emailSchema, passwordSchema, usernameSchema, firstNameSchema, lastNameSchema, phoneSchema } from '.';

// NB This ageSchema is for the `Signup` page only, where RHF is not used and `FormData` is used so its input is collected as string
export const ageSchema = z
  .string()
  .regex(/^\d*$/, { message: 'Age only accepts numbers' })
  .max(3, { message: 'Age must have at most 3 digits' })
  .nullable();
export const genderSchema = z.enum(['Female', 'Male', 'Other', '']).nullable();

export const memberSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phone: phoneSchema,
  age: z
    .number({ message: 'Age only accepts numbers' })
    .max(999, { message: 'Age must have at most 3 digits' })
    .nullable(),
  gender: z.enum(['Female', 'Male', 'Other', '']).nullable(),
  id: z.number(),
  _action: z.string(),
});
