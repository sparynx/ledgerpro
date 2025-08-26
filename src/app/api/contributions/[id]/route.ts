import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contribution = await prisma.contribution.findUnique({
      where: { id: params.id },
    });

    if (!contribution) {
      return NextResponse.json(
        { message: 'Contribution not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(contribution);
  } catch (error) {
    console.error('Error fetching contribution:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, amount, dueDate } = body;

    if (!title || !amount || !dueDate) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const contribution = await prisma.contribution.update({
      where: { id: params.id },
      data: {
        title,
        description,
        amount: parseFloat(amount),
        dueDate: new Date(dueDate),
      },
    });

    return NextResponse.json(contribution);
  } catch (error) {
    console.error('Error updating contribution:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { isActive } = body;

    if (typeof isActive !== 'boolean') {
      return NextResponse.json(
        { message: 'isActive field is required' },
        { status: 400 }
      );
    }

    const contribution = await prisma.contribution.update({
      where: { id: params.id },
      data: { isActive },
    });

    return NextResponse.json(contribution);
  } catch (error) {
    console.error('Error updating contribution status:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 