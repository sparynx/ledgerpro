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
<<<<<<< HEAD
=======
        contribution: {
          select: {
            id: true,
            title: true,
            amount: true,
            dueDate: true,
          },
        },
>>>>>>> e201f34 (added stuff)
      },
      orderBy: { createdAt: 'desc' },
    });

<<<<<<< HEAD
    // Prepare data for export
    const exportData = receipts.map(r => ({
      username: r.user?.username || '',
      displayName: r.user?.displayName || '',
      stateCode: r.user?.stateCode || '',
      amount: r.amount.toString(),
=======
    const group = searchParams.get('group'); // e.g., 'contribution' to aggregate by contribution

    if (group === 'contribution') {
      // Aggregate receipts by contribution in JS (keeps query simple and avoids Prisma groupBy limitations)
      const map = new Map<string, {
        contributionId: string;
        contributionTitle: string;
        contributionAmount: string;
        contributionDueDate: string;
        totalPaid: number;
        receiptCount: number;
      }>();

      for (const r of receipts) {
        const cid = r.contribution?.id || 'unknown';
        const existing = map.get(cid);
        const contribAmount = r.contribution ? Number(r.contribution.amount) : 0;
        if (existing) {
          existing.totalPaid += Number(r.amount);
          existing.receiptCount += 1;
        } else {
          map.set(cid, {
            contributionId: cid,
            contributionTitle: r.contribution?.title || '',
            contributionAmount: contribAmount.toFixed(2),
            contributionDueDate: r.contribution ? r.contribution.dueDate.toISOString() : '',
            totalPaid: Number(r.amount),
            receiptCount: 1,
          });
        }
      }

      const exportData = Array.from(map.values()).map(g => ({
        contributionId: g.contributionId,
        contributionTitle: g.contributionTitle,
        contributionAmount: g.contributionAmount,
        totalPaid: g.totalPaid.toFixed(2),
        receiptCount: g.receiptCount,
        contributionDueDate: g.contributionDueDate,
      }));

      const fields = ['contributionId', 'contributionTitle', 'contributionAmount', 'totalPaid', 'receiptCount', 'contributionDueDate'];
      const csv = parse(exportData, { fields });
      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="receipts_report_${period}_by_contribution.csv"`,
        },
      });
    }

    // Prepare data for export
    const exportData = receipts.map(r => ({
      receiptId: r.id,
      username: r.user?.username || '',
      displayName: r.user?.displayName || '',
      stateCode: r.user?.stateCode || '',
      contributionId: r.contribution?.id || '',
      contributionTitle: r.contribution?.title || '',
      contributionAmount: r.contribution ? r.contribution.amount.toString() : '',
      contributionDueDate: r.contribution ? r.contribution.dueDate.toISOString() : '',
      paidAmount: r.amount.toString(),
>>>>>>> e201f34 (added stuff)
      status: r.status,
      timestamp: r.createdAt.toISOString(),
      description: r.description || '',
    }));

<<<<<<< HEAD
    // CSV export
    const csv = parse(exportData, { fields: ['username', 'displayName', 'stateCode', 'amount', 'status', 'timestamp', 'description'] });
=======
    // CSV export: include contribution columns so payments to different contributions are distinct
    const fields = [
      'receiptId',
      'username',
      'displayName',
      'stateCode',
      'contributionId',
      'contributionTitle',
      'contributionAmount',
      'contributionDueDate',
      'paidAmount',
      'status',
      'timestamp',
      'description',
    ];
    const csv = parse(exportData, { fields });
>>>>>>> e201f34 (added stuff)
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
