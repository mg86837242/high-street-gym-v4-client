import { z } from 'zod';

export const addressAdminSchema = z.object({
  lineOne: z.string().max(45).nullable(),
  lineTwo: z.string().max(45).nullable(),
  suburb: z.string().max(45).nullable(),
  postcode: z.string().max(10).nullable(),
  state: z.string().max(45).nullable(),
  country: z.string().max(45).nullable(),
  adminId: z.number(),
  _action: z.string(),
});
export const addressTrainerSchema = z.object({
  lineOne: z.string().max(45).nullable(),
  lineTwo: z.string().max(45).nullable(),
  suburb: z.string().max(45).nullable(),
  postcode: z.string().max(10).nullable(),
  state: z.string().max(45).nullable(),
  country: z.string().max(45).nullable(),
  trainerId: z.number(),
  _action: z.string(),
});
export const addressMemberSchema = z.object({
  lineOne: z.string().max(45).nullable(),
  lineTwo: z.string().max(45).nullable(),
  suburb: z.string().max(45).nullable(),
  postcode: z.string().max(10).nullable(),
  state: z.string().max(45).nullable(),
  country: z.string().max(45).nullable(),
  memberId: z.number(),
  _action: z.string(),
});
export const lineOneSchema = z.string().max(45).nullable();
export const lineTwoSchema = z.string().max(45).nullable();
export const suburbSchema = z.string().max(45).nullable();
export const postcodeSchema = z.string().max(10).nullable();
export const stateSchema = z.string().max(45).nullable();
export const countrySchema = z.string().max(45).nullable();
