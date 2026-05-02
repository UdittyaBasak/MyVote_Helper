import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { image: true },
    });

    if (!user || !user.image) {
      return new NextResponse('Not Found', { status: 404 });
    }

    // If it's a base64 string (data:image/jpeg;base64,...), we need to extract the raw data
    if (user.image.startsWith('data:')) {
      const [meta, data] = user.image.split(',');
      const mime = meta.split(':')[1].split(';')[0];
      const buffer = Buffer.from(data, 'base64');
      
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': mime,
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    return new NextResponse('Invalid Image Format', { status: 400 });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
