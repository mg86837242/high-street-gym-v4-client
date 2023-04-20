import { z } from 'zod';

export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: 'Email must be at least 1 character(s)' })
  .max(45, { message: 'Email must be at most 45 character(s)' })
  .email();
export const passwordSchema = z
  // NB Max length of password is set to 100 for server-side validation b/c encrypting password results in longer
  //  password
  .string()
  .min(8, { message: 'Password must be at least 8 character(s)' })
  .max(100, { message: 'Password exceeds maximum character requirement' })
  .regex(/^((?=\S*?[a-zA-Z])(?=\S*?[0-9]).+)\S$/, {
    message: 'Password must have at least 1 letter, and 1 number with no spaces',
  });
export const usernameSchema = z
  .string()
  .trim()
  .min(3, { message: 'Username must be at least 3 character(s)' })
  .max(15, { message: 'Username must be at most 15 character(s)' })
  .regex(/^[a-zA-Z0-9_-]{3,15}$/, {
    message: 'Username only allows letter(s), number(s), underscore(s)(_) and hyphen(s)(-)',
  });
export const firstNameSchema = z
  .string()
  .trim()
  .min(1, { message: 'Name must be at least 1 character(s)' })
  .max(45)
  .regex(/^[a-zA-Z]+$/, {
    message: 'Name must have only English letters',
  });
export const lastNameSchema = z
  .string()
  .trim()
  .min(1, { message: 'Name must be at least 1 character(s)' })
  .max(45)
  .regex(/^[a-zA-Z]+$/, {
    message: 'Name must have only English letters',
  });
export const phoneSchema = z
  .string()
  .trim()
  .min(1, { message: 'Phone must be at least 1 character(s)' })
  .max(45)
  .regex(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, {
    message: 'Invalid phone number format',
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
