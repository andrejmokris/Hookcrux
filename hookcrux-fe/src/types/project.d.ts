type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    members: number;
  };
  members: {
    role: ProjectRole;
  }[];
};

type ProjectRole = 'OWNER' | 'ADMIN' | 'MEMBER';
