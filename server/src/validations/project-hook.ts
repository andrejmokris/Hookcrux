import { z } from 'zod';

const HttpMethod = z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']);

export const createProjectHookSchema = z.object({
  route: z
    .string()
    .min(1)
    .startsWith('/')
    .regex(/^[a-zA-Z0-9\-_/]+$/, 'Route can only contain letters, numbers, hyphens, underscores, and forward slashes'),
  method: HttpMethod,
  headers: z
    .array(z.string())
    .min(1, 'At least one header must be specified')
    .refine((headers) => new Set(headers).size === headers.length, 'Duplicate headers are not allowed'),
  description: z.string().nullable().optional(),
});
