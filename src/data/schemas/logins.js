import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, { message: 'Email must have at least 1 character(s)' })
  .email()
  .max(45, { message: 'Email must have at most 45 character(s)' });
export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must have at least 8 character(s)' })
  .max(100, { message: 'Password exceeds maximum character requirement' });
export const usernameSchema = z
  .string()
  .regex(/^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]+$/, {
    message: 'Username only accepts letters and numbers, and must include at least 1 letter',
  })
  .max(45, { message: 'Username must have at most 45 character(s)' });
