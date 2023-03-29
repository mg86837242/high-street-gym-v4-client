import { z } from 'zod';

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
export const genderSchema = z.enum(['Female', 'Male', 'Prefer not to say', '']).nullable();
