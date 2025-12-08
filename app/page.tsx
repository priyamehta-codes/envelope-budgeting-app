import { prisma } from '@/lib/prisma';
import { IncomeForm } from '@/app/components/IncomeForm';
import { EnvelopeForm } from '@/app/components/EnvelopeForm';
import { MoveForm } from '@/app/components/MoveForm';
import { SpendForm } from '@/app/components/SpendForm';

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
        <section className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-800">
            Income
          </h2>
          <div className="mb-4 text-xl font-medium text-green-600">
            Balance: ${incomeBalance.toFixed(2)}
          </div>
          <IncomeForm />
        </section>
        {/* Envelopes Section */}
        <section className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-800">
            Envelopes
          </h2>
          <EnvelopeForm />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {envelopes.map((envelope) => (
              <div
                key={envelope.id}
                className="rounded-lg border border-zinc-200 p-4"
              >
                <h3 className="text-lg font-semibold text-zinc-800">
                  {envelope.name}
                </h3>
                <p className="text-xl font-medium text-blue-600">
                  ${envelope.balance.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* Move Money Section */}
        <section className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-800">
            Move Money to Envelope
          </h2>
          <MoveForm envelopes={envelopes} />
        </section>
        {/* Spend Money Section */}
        <section className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-800">
            Spend from Envelope
          </h2>
          <SpendForm envelopes={envelopes} />
        </section>
      </div>
    </div>
  );
}
