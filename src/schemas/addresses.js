import { z } from 'zod';

export const lineOneSchema = z.string().max(45).nullable();
export const lineTwoSchema = z.string().max(45).nullable();
export const suburbSchema = z.string().max(45).nullable();
export const postcodeSchema = z.string().max(10).nullable();
export const stateSchema = z.string().max(45).nullable();
export const countrySchema = z.string().max(45).nullable();
export const addressSchema = z.object({
  lineOneSchema: z.string().max(45).nullable(),
  lineTwoSchema: z.string().max(45).nullable(),
  suburbSchema: z.string().max(45).nullable(),
  postcodeSchema: z.string().max(10).nullable(),
  stateSchema: z.string().max(45).nullable(),
  countrySchema: z.string().max(45).nullable(),
});
