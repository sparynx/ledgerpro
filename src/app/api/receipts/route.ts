import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const firebaseUid = searchParams.get('firebaseUid');
    const status = searchParams.get('status');

    let userId: string | undefined = undefined;
    if (firebaseUid) {
      const user = await prisma.user.findUnique({ where: { firebaseUid } });
      if (user) userId = user.id;
    }

    const where: any = {};
    if (userId) {
      where.userId = userId;
    }
    if (status) {
      where.status = status;
    }

    const receipts = await prisma.receipt.findMany({
      where,
      include: {
        user: {
          select: {
            username: true,
            displayName: true,
            stateCode: true,
          },
        },
        contribution: {
          select: {
            title: true,
            amount: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(receipts);
  } catch (error) {
    console.error('Error fetching receipts:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, contributionId, amount, imageUrl, description } = body;

    if (!userId || !contributionId || !amount || !imageUrl) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const receipt = await prisma.receipt.create({
      data: {
        userId,
        contributionId,
        amount: parseFloat(amount),
        imageUrl,
        description,
        status: 'PENDING',
      },
      include: {
        user: {
          select: {
            username: true,
            displayName: true,
            stateCode: true,
          },
        },
        contribution: {
          select: {
            title: true,
            amount: true,
          },
        },
      },
    });

    return NextResponse.json(receipt);
  } catch (error) {
    console.error('Error creating receipt:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
