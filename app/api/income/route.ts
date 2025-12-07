import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const { amount } = await request.json()
  
  const income = await prisma.income.findFirst()
  
  let updatedIncome
  if (income) {
    updatedIncome = await prisma.income.update({
      where: { id: income.id },
      data: { balance: { increment: amount } },
    })
  } else {
    updatedIncome = await prisma.income.create({
      data: { amount, balance: amount },
    })
  }
  
  return NextResponse.json(updatedIncome)
}

