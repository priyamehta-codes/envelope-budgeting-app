'use client';

import { useActionState } from 'react';
import { addIncome } from '@/app/actions';
import { FormButton } from '@/app/components/FormButton';

export function IncomeForm() {
  const [state, formAction] = useActionState(addIncome, null);

  return (
    <form action={formAction} className="flex gap-4">
      <input
        type="number"
        name="amount"
        step="0.01"
        min="0"
        placeholder="Amount"
        required
        className="flex-1 rounded border border-zinc-300 px-4 py-2"
      />
      <FormButton>Add Income</FormButton>
      {state?.error && (
        <div className="text-red-600">{state.error}</div>
      )}
    </form>
  );
}

