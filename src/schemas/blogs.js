import { z } from 'zod';

// Because how React Hook Form
const blogSchema = z.object({
  title: z.string().max(45),
  body: z.string().max(6000),
  loginId: z.number(),
});

export default blogSchema;
