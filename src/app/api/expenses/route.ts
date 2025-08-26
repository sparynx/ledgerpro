import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all expenses
export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        amount: true,
        description: true,
        category: true,
        date: true,
        createdBy: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch expenses' }, { status: 500 });
  }
}

// POST a new expense
export async function POST(req: NextRequest) {
  try {
    const { title, description, amount, category, date, createdBy } = await req.json();
    if (
      !title || typeof title !== 'string' || title.trim() === '' ||
      !description || typeof description !== 'string' ||
      amount === undefined || isNaN(Number(amount)) ||
      !category || typeof category !== 'string' || category.trim() === '' ||
      !date || isNaN(Date.parse(date)) ||
      !createdBy || typeof createdBy !== 'string' || createdBy.trim() === ''
    ) {
      return NextResponse.json({ message: 'All fields (title, description, amount, category, date, createdBy) are required and must be valid.' }, { status: 400 });
    }

    // Map firebaseUid to user.id
    const user = await prisma.user.findUnique({ where: { firebaseUid: createdBy.trim() } });
    if (!user) {
      return NextResponse.json({ message: 'User not found for provided firebaseUid.' }, { status: 400 });
    }

    const expense = await prisma.expense.create({
      data: {
        title: title.trim(),
        description,
        amount: parseFloat(amount),
        category: category.trim(),
        date: new Date(date),
        createdBy: user.id,
      },
    });
    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create expense' }, { status: 500 });
  }
}
