import { db } from '@app/db/prisma';
import { NotFoundError } from '@app/utils/errors';

export const getUser = async (userId: string) => {
  const userData = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userData) {
    throw new NotFoundError('User not found');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Ignoring the user's password
  const { password, ...user } = userData;

  return user;
};
