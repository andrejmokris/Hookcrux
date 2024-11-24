/* eslint-disable @typescript-eslint/no-explicit-any */

export type HookEvent = {
  id?: number;
  createdAt?: Date;
  sessionId: string;
  path: string;
  body: Record<string, any>;
  headers: Record<string, any>;
  method: string;
  query: Record<string, any>;
  hostname: string;
};
