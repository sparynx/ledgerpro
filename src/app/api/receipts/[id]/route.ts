import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, adminNotes } = body;

    if (!status || !['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { message: 'Invalid status' },
        { status: 400 }
      );
    }

    const receipt = await prisma.receipt.update({
      where: { id: params.id },
      data: {
        status,
        adminNotes,
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
    console.error('Error updating receipt:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 