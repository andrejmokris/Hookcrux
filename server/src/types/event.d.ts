export type HookEvent = {
  path: string;
  body: Record<string, any>;
  headers: Record<string, any>;
  method: string;
};
