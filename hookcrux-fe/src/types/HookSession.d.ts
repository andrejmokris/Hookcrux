type HookSession = {
  id: string;
  createdAt: string;
  updatedAt: string;
  allowedHeaders: string[];
  name: string | null;
  HookEvent: HookEvent[];
};
