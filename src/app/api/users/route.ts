import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
<<<<<<< HEAD
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const stateCode = searchParams.get('stateCode');
    const q = searchParams.get('q'); // generic query (partial match on username/displayName/email)
    const where: Prisma.UserWhereInput = {};

    if (stateCode) {
      (where as any).stateCode = { equals: stateCode.toUpperCase() };
    }

    if (q) {
      (where as any).OR = [
        { username: { contains: q, mode: 'insensitive' } },
        { displayName: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
=======

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
>>>>>>> f7a9856 (feat(member-dashboard): filter paid contributions; add timeline and UI improvements)
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        stateCode: true,
        isActive: true,
        createdAt: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
<<<<<<< HEAD
    console.error('Error fetching users:', error);
=======
>>>>>>> f7a9856 (feat(member-dashboard): filter paid contributions; add timeline and UI improvements)
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}
