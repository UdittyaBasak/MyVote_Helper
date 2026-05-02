'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: any) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    throw new Error('Unauthorized');
  }

  try {
    const { name, email, phone, voterId, bio, image } = formData;

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        email,
        phone,
        voterId,
        bio,
        image,
      },
    });

    revalidatePath('/profile');
    revalidatePath('/general-info');

    return {
      success: true,
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
      },
    };
  } catch (error: any) {
    console.error('Error updating profile action:', error);
    throw new Error(error.message || 'Failed to update profile');
  }
}
