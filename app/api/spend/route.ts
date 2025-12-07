import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { envelopeId, amount } = await request.json();
  
  const envelope = await prisma.envelope.findUnique({
    where: { id: envelopeId },
  });
  
  if (!envelope) {
    return NextResponse.json(
      { error: 'Envelope not found' },
      { status: 404 }
    );
  }
  
  if (envelope.balance < amount) {
    return NextResponse.json(
      { error: 'Insufficient envelope balance' },
      { status: 400 }
    );
  }
  
  const updated = await prisma.envelope.update({
    where: { id: envelopeId },
    data: { balance: { decrement: amount } },
  });
  
  return NextResponse.json(updated);
}

