import { z } from 'zod';
import { emailSchema, passwordSchema, usernameSchema, firstNameSchema, lastNameSchema, phoneSchema } from './users';

export const ageSchemaNoRHF = z.union([
  // NB This `ageSchemaNoRHF` is for the `Signup` page only, where RHF is not used and `FormData` is used so its input
  //  is collected as empty string if left blank
  z
    .number({ message: 'Age only accepts numbers' })
    .nonnegative()
    .max(999, { message: 'Age must have at most 3 digits' })
    .nullable(),
  z.string().length(0, { message: 'Age must be empty or a valid number' }),
]);
export const ageSchema = z.union([
  z
    .number({ message: 'Age only accepts numbers' })
    .nonnegative()
    .max(999, { message: 'Age must have at most 3 digits' })
    .nullable(),
  z.nan(),
]);
export const genderSchema = z.enum(['Female', 'Male', 'Other', '']).nullable();

export const memberSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phone: phoneSchema,
  age: ageSchema,
  gender: genderSchema,
  id: z.number(),
  _action: z.string(),
});
