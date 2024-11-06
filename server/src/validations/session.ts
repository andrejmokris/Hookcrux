import { z } from 'zod';

export const createSessionSchema = {
  name: z.string().optional(),
};
