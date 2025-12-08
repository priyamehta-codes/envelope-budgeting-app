import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const envelopes = await prisma.envelope.findMany({
    orderBy: { name: "asc" }
  });
  return NextResponse.json(envelopes);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const envelope = await prisma.envelope.create({
    data: { name, balance: 0 }
  });
  return NextResponse.json(envelope);
}

