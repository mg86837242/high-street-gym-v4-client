import { z } from 'zod';
import { emailSchema, passwordSchema, usernameSchema, firstNameSchema, lastNameSchema, phoneSchema } from './users';
import { lineOneSchema, lineTwoSchema, suburbSchema, postcodeSchema, stateSchema, countrySchema } from './addresses.js';

export const ageNoRHFSchema = z.union([
  // NB This `ageNoRHFSchema` is for the `Signup` page only, where RHF is not used and `FormData` is used so its input
  //  is collected as empty string if left blank
  z
    .number({ message: 'Age only accepts numbers' })
    .nonnegative()
    .max(999, { message: 'Age only accepts at most 3 digits' })
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

export const memberDetailedSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phone: phoneSchema,
  age: ageSchema,
  gender: genderSchema,
  lineOne: lineOneSchema,
  lineTwo: lineTwoSchema,
  suburb: suburbSchema,
  postcode: postcodeSchema,
  state: stateSchema,
  country: countrySchema,
});

// NB Empty string within the `enum()` is for the "Choose ..." option in case the user wants to intentionally leave it
//  blank

// NB Empty input of "type='number" will be deemed as NaN during the validation by React Hook Form (or resolver), thus
//  this union type (however, will be converted to empty string after being returned from `handleSubmit()`), see this
//  Github post for alternative solution: https://github.com/orgs/react-hook-form/discussions/6980
