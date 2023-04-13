import { z } from 'zod';
import { emailSchema, passwordSchema, usernameSchema, firstNameSchema, lastNameSchema, phoneSchema } from './users';

const trainerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phone: phoneSchema,
  description: z.string().max(255).nullable(),
  specialty: z.string().max(45).nullable(),
  certificate: z.string().max(45).nullable(),
  imageUrl: z.union([
    z.string().length(0, { message: 'Image url must be empty or a valid url' }).nullable(),
    z.string().url(),
  ]),
  id: z.number(),
  _action: z.string(),
});

export default trainerSchema;
