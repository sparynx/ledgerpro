import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { parse } from 'json2csv';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'monthly'; // 'monthly' or 'weekly'
    const startDate = searchParams.get('startDate'); // optional custom range
    const endDate = searchParams.get('endDate');

    let from: Date, to: Date;
    const now = new Date();
    if (startDate && endDate) {
      from = new Date(startDate);
      to = new Date(endDate);
    } else if (period === 'weekly') {
      to = now;
      from = new Date(now);
      from.setDate(now.getDate() - 7);
    } else {
      // monthly default
      to = now;
      from = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const receipts = await prisma.receipt.findMany({
      where: {
        createdAt: {
          gte: from,
          lte: to,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            displayName: true,
            stateCode: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Prepare data for export
    const exportData = receipts.map(r => ({
      username: r.user?.username || '',
      displayName: r.user?.displayName || '',
      stateCode: r.user?.stateCode || '',
      amount: r.amount.toString(),
      status: r.status,
      timestamp: r.createdAt.toISOString(),
      description: r.description || '',
    }));

    // CSV export
    const csv = parse(exportData, { fields: ['username', 'displayName', 'stateCode', 'amount', 'status', 'timestamp', 'description'] });
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="receipts_report_${period}.csv"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ message: 'Failed to export report' }, { status: 500 });
  }
}
