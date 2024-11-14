import { z } from 'zod';

export const githubLoginSchema = z.object({
  code: z.string(),
});
