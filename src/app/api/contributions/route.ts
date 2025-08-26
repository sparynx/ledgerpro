import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const contributions = await prisma.contribution.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(contributions);
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, amount, dueDate } = body;

    if (!title || !amount || !dueDate) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const contribution = await prisma.contribution.create({
      data: {
        title,
        description,
        amount: new Prisma.Decimal(amount),
        dueDate: new Date(dueDate),
        isActive: true,
      },
    });

    return NextResponse.json(contribution, { status: 201 });
  } catch (error) {
    console.error('Error creating contribution:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
