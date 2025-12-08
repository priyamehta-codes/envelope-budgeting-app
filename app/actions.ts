"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type ActionState = { success?: boolean; error?: string } | null;

export async function addIncome(prevState: ActionState, formData: FormData) {
  const amount = parseFloat(formData.get("amount") as string);
  
  if (isNaN(amount) || amount <= 0) {
    return { error: "Invalid amount" };
  }
  
  const income = await prisma.income.findFirst();
  
  if (income) {
    await prisma.income.update({
      where: { id: income.id },
      data: { balance: { increment: amount } },
    });
  } else {
    await prisma.income.create({
      data: { amount, balance: amount },
    });
  }
  
  revalidatePath("/");
  return { success: true };
}

export async function createEnvelope(prevState: ActionState, formData: FormData) {
  const name = formData.get("name") as string;
  
  if (!name || name.trim() === "") {
    return { error: "Name is required" };
  }
  
  await prisma.envelope.create({
    data: { name: name.trim(), balance: 0 },
  });
  
  revalidatePath("/");
  return { success: true };
}

export async function moveToEnvelope(prevState: ActionState, formData: FormData) {
  const envelopeId = formData.get("envelopeId") as string;
  const amount = parseFloat(formData.get("amount") as string);
  
  if (!envelopeId || isNaN(amount) || amount <= 0) {
    return { error: "Invalid input" };
  }
  
  const income = await prisma.income.findFirst();
  if (!income || income.balance < amount) {
    return { error: "Insufficient income balance" };
  }
  
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
  
  revalidatePath("/");
  return { success: true };
}

export async function spendFromEnvelope(prevState: ActionState, formData: FormData) {
  const envelopeId = formData.get("envelopeId") as string;
  const amount = parseFloat(formData.get("amount") as string);
  
  if (!envelopeId || isNaN(amount) || amount <= 0) {
    return { error: "Invalid input" };
  }
  
  const envelope = await prisma.envelope.findUnique({
    where: { id: envelopeId },
  });
  
  if (!envelope) {
    return { error: "Envelope not found" };
  }
  
  if (envelope.balance < amount) {
    return { error: "Insufficient envelope balance" };
  }
  
  await prisma.envelope.update({
    where: { id: envelopeId },
    data: { balance: { decrement: amount } },
  });
  
  revalidatePath("/");
  return { success: true };
}

