import { z } from 'zod';

export const inviteReplySchema = z.object({
  accepted: z.boolean(),
  inviteToken: z.string().min(1),
});
