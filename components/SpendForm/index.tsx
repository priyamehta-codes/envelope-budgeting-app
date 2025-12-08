"use client";

import { useActionState } from "react";
import { spendFromEnvelope } from "@/app/actions";
import FormButton from "@/components/FormButton";
import Input from "@/components/ui/Input";
import ErrorMessage from "@/components/ErrorMessage";

type Envelope = {
  id: string;
  name: string;
  balance: number;
};

function SpendForm({ envelopes }: { envelopes: Envelope[] }) {
  const [state, formAction] = useActionState(spendFromEnvelope, null);

  return (
    <form action={formAction} className="flex gap-4">
      <select
        name="envelopeId"
        required
        className="rounded border border-zinc-300 px-4 py-2"
      >
        <option value={""}>Select envelope</option>
        {envelopes.map((envelope) => (
          <option key={envelope.id} value={envelope.id}>
            {envelope.name}
          </option>
        ))}
      </select>
      <Input
        type="number"
        name="amount"
        step="0.01"
        min="0"
        placeholder="Amount"
        required
        className="flex-1" />
      <FormButton>Spend</FormButton>
      <ErrorMessage error={state?.error} />
    </form>
  );
}

export default SpendForm;
