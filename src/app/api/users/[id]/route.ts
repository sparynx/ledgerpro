import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
  const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
    photoURL: true,
        stateCode: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        receipts: {
          select: {
            id: true,
            amount: true,
            status: true,
            createdAt: true,
            description: true,
            imageUrl: true,
            contribution: {
              select: { title: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
      },
    });
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch user' }, { status: 500 });
  }
}
