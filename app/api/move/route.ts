import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { envelopeId, amount } = await request.json();
  
  // Get current income balance
  const income = await prisma.income.findFirst();
  if (!income || income.balance < amount) {
    return NextResponse.json(
      { error: "Insufficient income balance" },
      { status: 400 }
    );
  }
  
  // Update income and envelope in a transaction
  await prisma.$transaction([
    prisma.income.update({
      where: { id: income.id },
      data: { balance: { decrement: amount } },
    }),
    prisma.envelope.update({
      where: { id: envelopeId },
      data: { balance: { increment: amount } },
    }),
  ]);
  
  return NextResponse.json({ success: true });
}

