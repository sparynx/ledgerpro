import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f7a9856 (feat(member-dashboard): filter paid contributions; add timeline and UI improvements)
export async function GET() {
  try {
    const contributions = await prisma.contribution.findMany({
      where: { isActive: true },
<<<<<<< HEAD
=======
export async function GET(request: NextRequest) {
  try {
    // support optional query params to customize the member view
    // - firebaseUid: exclude contributions the user already has a receipt for
    // - excludeAdminManual: when 'true', hide contributions that look like manual/admin adjustments
    const { searchParams } = new URL(request.url);
    const firebaseUid = searchParams.get('firebaseUid');
    const excludeAdminManual = searchParams.get('excludeAdminManual');

  // build a Prisma where clause
  type WithNot = Prisma.ContributionWhereInput & { NOT?: Prisma.ContributionWhereInput[] };
  const where: WithNot = { isActive: true };

  const notConditions: Prisma.ContributionWhereInput[] = [];

    // If firebaseUid provided, map to internal user id and exclude contributions
    // that the user already has receipts for.
    if (firebaseUid) {
      const user = await prisma.user.findUnique({ where: { firebaseUid } });
      if (user) {
        notConditions.push({ receipts: { some: { userId: user.id } } });
      }
    }

    // Optionally hide contributions that appear to be manual/admin adjustments.
    // Assumption: admin/manual contributions include the words 'manual' or 'admin' in the title.
    if (excludeAdminManual === 'true') {
      notConditions.push({ title: { contains: 'manual', mode: 'insensitive' } });
      notConditions.push({ title: { contains: 'admin', mode: 'insensitive' } });
    }

    if (notConditions.length > 0) {
      // assign NOT array to where (typed)
      where.NOT = notConditions;
    }

    const contributions = await prisma.contribution.findMany({
      where,
>>>>>>> e201f34 (added stuff)
=======
>>>>>>> f7a9856 (feat(member-dashboard): filter paid contributions; add timeline and UI improvements)
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
