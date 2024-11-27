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
