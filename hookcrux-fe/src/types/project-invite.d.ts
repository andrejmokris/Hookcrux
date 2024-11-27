type ProjectInvite = {
  id: string;
  projectId: string;
  projectRole: ProjectRole;
  createdAt: string;
  expiresAt: string;
  createdById: string;
  inviteToken: string;
  acceptedById: string | null;
};

type ProjectInviteDetail = ProjectInvite & {
  project: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  createdBy: {
    id: string;
    name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
};
