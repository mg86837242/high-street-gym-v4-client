import { z } from 'zod';

export const lineOneSchema = z.string().trim().max(45);
export const lineTwoSchema = z.string().trim().max(45);
export const suburbSchema = z.string().trim().max(45);
export const postcodeSchema = z.string().trim().max(45);
export const stateSchema = z.string().trim().max(45);
export const countrySchema = z.string().trim().max(45);

export const addressAdminSchema = z.object({
  lineOne: lineOneSchema,
  lineTwo: lineTwoSchema,
  suburb: suburbSchema,
  postcode: postcodeSchema,
  state: stateSchema,
  country: countrySchema,
  adminId: z.number(),
  _action: z.string().trim(),
});
export const addressTrainerSchema = z.object({
  lineOne: lineOneSchema,
  lineTwo: lineTwoSchema,
  suburb: suburbSchema,
  postcode: postcodeSchema,
  state: stateSchema,
  country: countrySchema,
  trainerId: z.number(),
  _action: z.string().trim(),
});
export const addressMemberSchema = z.object({
  lineOne: lineOneSchema,
  lineTwo: lineTwoSchema,
  suburb: suburbSchema,
  postcode: postcodeSchema,
  state: stateSchema,
  country: countrySchema,
  memberId: z.number(),
  _action: z.string().trim(),
});
