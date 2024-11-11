export type HookEvent = {
  id?: number;
  sessionId: string;
  path: string;
  body: Record<string, any>;
  headers: Record<string, any>;
  method: string;
  query: Record<string, any>;
  hostname: string;
};
