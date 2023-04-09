import { z } from 'zod';

export const memberSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email must have at least 1 character(s)' })
    .email()
    .max(45, { message: 'Email must have at most 45 character(s)' }),
  password: z
    .string()
    .min(8, { message: 'Password must have at least 8 character(s)' })
    .max(100, { message: 'Password exceeds maximum character requirement' }),
  username: z
    .string()
    .regex(/^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]+$/, {
      message: 'Username only accepts English letters and numbers, and must include at least 1 letter',
    })
    .max(45, { message: 'Username must have at most 45 character(s)' }),
  firstName: z
    .string()
    .min(1, { message: 'Name must have at least 1 character(s)' })
    .regex(/^[a-zA-Z]+$/, {
      message: 'Name only accepts English letters at the moment',
    })
    .max(45),
  lastName: z
    .string()
    .min(1, { message: 'Name must have at least 1 character(s)' })
    .regex(/^[a-zA-Z]+$/, {
      message: 'Name only accepts English letters at the moment',
    })
    .max(45),
  phone: z
    .string()
    .min(1, { message: 'Phone must have at least 1 character(s)' })
    .regex(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, {
      message: 'Invalid phone number format',
    })
    .max(45),
  age: z
    .string()
    .regex(/^\d*$/, { message: 'Age only accepts numbers' })
    .max(3, { message: 'Age must have at most 3 number(s)' })
    .nullable(),
  gender: z.enum(['Female', 'Male', 'Other', '']).nullable(),
});
export const firstNameSchema = z
  .string()
  .min(1, { message: 'Name must have at least 1 character(s)' })
  .regex(/^[a-zA-Z]+$/, {
    message: 'Name only accepts English letters at the moment',
  })
  .max(45);
export const lastNameSchema = z
  .string()
  .min(1, { message: 'Name must have at least 1 character(s)' })
  .regex(/^[a-zA-Z]+$/, {
    message: 'Name only accepts English letters at the moment',
  })
  .max(45);
export const phoneSchema = z
  .string()
  .min(1, { message: 'Phone must have at least 1 character(s)' })
  .regex(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, {
    message: 'Invalid phone number format',
  })
  .max(45);
export const ageSchema = z
  .string()
  .regex(/^\d*$/, { message: 'Age only accepts numbers' })
  .max(3, { message: 'Age must have at most 3 number(s)' })
  .nullable();
export const genderSchema = z.enum(['Female', 'Male', 'Other', '']).nullable();
