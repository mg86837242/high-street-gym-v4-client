import { z } from 'zod';

import { countrySchema,lineOneSchema, lineTwoSchema, postcodeSchema, stateSchema, suburbSchema } from './addresses.js';
import { emailSchema, firstNameSchema, lastNameSchema, passwordSchema, phoneSchema,usernameSchema } from './users';

export const adminSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phone: phoneSchema,
  id: z.number(),
  _action: z.string().trim(),
});

export const adminDetailedSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phone: phoneSchema,
  lineOne: lineOneSchema,
  lineTwo: lineTwoSchema,
  suburb: suburbSchema,
  postcode: postcodeSchema,
  state: stateSchema,
  country: countrySchema,
});
