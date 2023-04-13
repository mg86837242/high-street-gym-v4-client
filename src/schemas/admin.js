import { z } from 'zod';
import { emailSchema, passwordSchema, usernameSchema, firstNameSchema, lastNameSchema, phoneSchema } from '.';

const adminSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phone: phoneSchema,
  id: z.number(),
  _action: z.string(),
});

export default adminSchema;
