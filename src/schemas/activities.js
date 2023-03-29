import { z } from 'zod';

const activitySchema = z.object({
  name: z.string().max(4),
  category: z.string().max(45),
  description: z.string().max(45),
  intensityLevel: z.string().max(45),
  maxPeopleAllowed: z.string().max(45),
  requirementOne: z.string().max(255),
  requirementTwo: z.string().max(255),
  durationMinutes: z.string().max(45),
  price: z.string().max(45),
});

export default activitySchema;
