import { z } from 'zod';
import { emailSchema, passwordSchema, usernameSchema, firstNameSchema, lastNameSchema, phoneSchema } from './users';
import { lineOneSchema, lineTwoSchema, suburbSchema, postcodeSchema, stateSchema, countrySchema } from './addresses.js';

const descriptionSchema = z.string().trim().max(255).nullable();
const specialtySchema = z.string().trim().max(45).nullable();
const certificateSchema = z.string().trim().max(45).nullable();
const imageUrlSchema = z.union([
  z.string().trim().url().nullable(),
  z.string().trim().length(0, { message: 'Image url must be empty or a valid url' }),
]);

export const trainerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phone: phoneSchema,
  description: descriptionSchema,
  specialty: specialtySchema,
  certificate: certificateSchema,
  imageUrl: imageUrlSchema,
  id: z.number(),
  _action: z.string().trim(),
});

export const trainerDetailedSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phone: phoneSchema,
  description: descriptionSchema,
  specialty: specialtySchema,
  certificate: certificateSchema,
  imageUrl: imageUrlSchema,
  lineOne: lineOneSchema,
  lineTwo: lineTwoSchema,
  suburb: suburbSchema,
  postcode: postcodeSchema,
  state: stateSchema,
  country: countrySchema,
});
