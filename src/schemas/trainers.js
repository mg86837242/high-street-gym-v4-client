import { z } from 'zod';

export const descriptionSchema = z.string().max(255).nullable();
export const specialtySchema = z.string().max(45).nullable();
export const certificateSchema = z.string().max(45).nullable();
export const imageUrlSchema = z.union([
  z.string().length(0, { message: 'Image url must be empty or a valid url' }),
  z.string().url(),
]);
