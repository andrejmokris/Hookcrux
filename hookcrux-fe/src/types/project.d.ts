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

type ProjectDetail = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  members: ProjectMember[];
};

type ProjectMember = {
  id: number;
  userId: string;
  projectId: string;
  role: ProjectRole;
  createdAt: string;
  updatedAt: string;
};

type ProjectMemberDetail = ProjectMember & {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
};

type ProjectRole = 'OWNER' | 'ADMIN' | 'MEMBER';
