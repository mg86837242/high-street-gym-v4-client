import { z } from "zod";

export const lineOneSchema = z.string().max(45).nullable();
export const lineTwo = z.string().max(45).nullable();
export const suburb = z.string().max(45).nullable();
export const postcode = z.string().max(10).nullable();
export const state = z.string().max(45).nullable();
export const country = z.string().max(45).nullable();

// FIX Test if is needed: { message: 'Password exceeds maximum character requirement' }
