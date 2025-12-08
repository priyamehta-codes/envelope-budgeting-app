import { prisma } from '@/lib/prisma';
import IncomeForm from '@/components/IncomeForm';
import EnvelopeForm from '@/components/EnvelopeForm';
import MoveForm from '@/components/MoveForm';
import SpendForm from '@/components/SpendForm';
import Card from '@/components/Card';

async function getData() {
  const envelopes = await prisma.envelope.findMany({
    orderBy: { name: 'asc' }
  });

  const income = await prisma.income.findFirst();

  return {
    envelopes,
    incomeBalance: income?.balance ?? 0
  };
}

export default async function Home() {
  const { envelopes, incomeBalance } = await getData();

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold text-zinc-900">
          Envelope Budgeting App
        </h1>
        {/* Income Section */}
        <Card title="Income">
          <h2 className="text-xl font-medium text-green-600">
            Balance: ${incomeBalance.toFixed(2)}
          </h2>
          <IncomeForm />
        </Card>
        {/* Envelopes Section */}
        <Card title="Envelopes">
          <EnvelopeForm />
          <div className="grid gap-4 md:grid-cols-2">
            {envelopes.map((envelope) => (
              <div
                key={envelope.id}
                className="rounded-lg border border-zinc-200 p-4">
                <h3 className="text-lg font-semibold text-zinc-800">
                  {envelope.name}
                </h3>
                <p className="text-xl font-medium text-blue-600">
                  ${envelope.balance.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </Card>
        {/* Move Money Section */}
        <Card title="Move Money to Envelope">
          <MoveForm envelopes={envelopes} />
        </Card>
        {/* Spend Money Section */}
        <Card title="Spend from Envelope">
          <SpendForm envelopes={envelopes} />
        </Card>
      </div>
    </div>
  );
}
