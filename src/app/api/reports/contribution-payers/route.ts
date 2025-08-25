import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || 'monthly';
    const startDate = searchParams.get('startDate');
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
      to = now;
      from = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Fetch receipts with user and contribution within the window
    const receipts = await prisma.receipt.findMany({
      where: {
        createdAt: { gte: from, lte: to },
      },
      include: {
        user: { select: { id: true, username: true, displayName: true, stateCode: true } },
        contribution: { select: { id: true, title: true, amount: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Group receipts by contribution
    type Payer = {
      receiptId: string;
      userId: string | null;
      username: string;
      displayName: string;
      stateCode: string | null;
      paidAmount: number;
      status: string;
      timestamp: Date;
    };

    type ContributionGroup = {
      contributionId: string;
      contributionTitle: string;
      contributionAmount: number;
      payers: Payer[];
    };

    const map = new Map<string, ContributionGroup>();
    for (const r of receipts) {
      const cid = r.contribution?.id || 'unknown';
      if (!map.has(cid)) {
        map.set(cid, {
          contributionId: cid,
          contributionTitle: r.contribution?.title || '',
          contributionAmount: r.contribution ? Number(r.contribution.amount) : 0,
          payers: [],
        });
      }
  map.get(cid)!.payers.push({
        receiptId: r.id,
        userId: r.user?.id || null,
        username: r.user?.username || '',
        displayName: r.user?.displayName || '',
        stateCode: r.user?.stateCode || '',
        paidAmount: Number(r.amount),
        status: r.status,
        timestamp: r.createdAt,
      });
    }

    const result = Array.from(map.values());
    return NextResponse.json({ period, from: from.toISOString(), to: to.toISOString(), contributions: result });
  } catch (err) {
    console.error('contribution-payers error', err);
    return NextResponse.json({ error: 'Failed to fetch contribution payers' }, { status: 500 });
  }
}
