import { z } from 'zod';

export const addressSchema = z.object({
  lineOne: z.string().max(45).nullable(),
  lineTwo: z.string().max(45).nullable(),
  suburb: z.string().max(45).nullable(),
  postcode: z.string().max(10).nullable(),
  state: z.string().max(45).nullable(),
  country: z.string().max(45).nullable(),
  id: z.number(),
  _action: z.string(),
});
export const lineOneSchema = z.string().max(45).nullable();
export const lineTwoSchema = z.string().max(45).nullable();
export const suburbSchema = z.string().max(45).nullable();
export const postcodeSchema = z.string().max(10).nullable();
export const stateSchema = z.string().max(45).nullable();
export const countrySchema = z.string().max(45).nullable();
