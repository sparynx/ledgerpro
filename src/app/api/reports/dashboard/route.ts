import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const isAdmin = searchParams.get("admin");
  if (isAdmin) {
    // Admin stats
    const [totalContributions, totalExpenses, activeMembers, pendingReceipts] = await Promise.all([
      prisma.receipt.aggregate({
        where: { status: "APPROVED" },
        _sum: { amount: true },
      }).then(r => Number(r._sum.amount || 0)),
      prisma.expense.aggregate({
        _sum: { amount: true },
      }).then(r => Number(r._sum.amount || 0)),
      prisma.user.count({ where: { isActive: true } }),
      prisma.receipt.count({ where: { status: "PENDING" } }),
    ]);
    return NextResponse.json({
      totalContributions,
      totalExpenses,
      activeMembers,
      pendingReceipts,
    });
  }

  // Member stats (default)
  const firebaseUid = searchParams.get("firebaseUid");
  if (!firebaseUid) {
    return NextResponse.json({ error: "Missing firebaseUid" }, { status: 400 });
  }
  // Find user by firebaseUid
  const user = await prisma.user.findUnique({ where: { firebaseUid } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  // Total paid: sum of all approved receipts for this user
  const receiptsApproved = await prisma.receipt.count({
    where: { userId: user.id, status: "APPROVED" },
  });
  const receiptsSubmitted = await prisma.receipt.count({
    where: { userId: user.id },
  });
  const totalPaidResult = await prisma.receipt.aggregate({
    where: { userId: user.id, status: "APPROVED" },
    _sum: { amount: true },
  });
  const totalPaid = Number(totalPaidResult._sum.amount || 0);
  // Pending amount: sum of all active contributions minus total paid
  const contributions = await prisma.contribution.findMany({
    where: { isActive: true },
    select: { amount: true },
  });
  const totalContributions = contributions.reduce((sum, c) => sum + Number(c.amount), 0);
  const pendingAmount = Math.max(totalContributions - totalPaid, 0);
  return NextResponse.json({
    totalPaid,
    pendingAmount,
    receiptsSubmitted,
    receiptsApproved,
  });
}
