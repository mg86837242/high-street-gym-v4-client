import { z } from 'zod';
import { emailSchema, passwordSchema, usernameSchema, firstNameSchema, lastNameSchema, phoneSchema } from './users';

export const ageSchema = z
  .string()
  .regex(/^\d*$/, { message: 'Age only accepts numbers' })
  .max(3, { message: 'Age must have at most 3 number(s)' })
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
    .max(3, { message: 'Age must have at most 3 number(s)' })
    .nullable(),
  gender: z.enum(['Female', 'Male', 'Other', '']).nullable(),
  id: z.number(),
  _action: z.string(),
});
