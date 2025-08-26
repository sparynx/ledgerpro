import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stateCode = searchParams.get('query');

  if (!stateCode) {
    return NextResponse.json({ message: 'State code parameter is required' }, { status: 400 });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        stateCode: { contains: stateCode, mode: 'insensitive' },
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        stateCode: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error searching users by state code:', error);
    return NextResponse.json({ message: 'Failed to search users' }, { status: 500 });
  }
}
