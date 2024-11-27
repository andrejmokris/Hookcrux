type HookEvent = {
  id: number;
  createdAt: string;
  path: string;
  body: Record<string, unknown>;
  headers: Record<string, string>;
  method: string;
  query: Record<string, string | number>;
  hostname: string;
};
