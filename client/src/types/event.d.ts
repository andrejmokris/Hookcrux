export type HookEvent = {
  path: string;
  body: Record<string, any>;
  headers: Record<string, any>;
  method: string;
};

export type InfoEvent = {
  message: string;
};

export type ErrorEvent = {
  message: string;
  type: string;
  status: number;
};
