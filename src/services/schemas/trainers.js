import { z } from 'zod';

export const descriptionSchema = z.string().max(255).nullable();
export const specialtySchema = z.string().max(45).nullable();
export const certificateSchema = z.string().max(45).nullable();
export const imageUrlSchema = z
  .string()
  .refine(
    (val) =>
      val === '' ||
      (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/.test(
        val
      ) === true &&
        val.length <= 255),
    {
      message: 'Invalid url format',
    }
  );
