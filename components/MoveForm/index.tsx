"use client";

import { useActionState } from "react";

import { moveToEnvelope } from "@/app/actions";
import FormButton from "@/components/FormButton";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import ErrorMessage from "@/components/ErrorMessage";

type Envelope = {
  id: string;
  name: string;
  balance: number;
};

function MoveForm({ envelopes }: { envelopes: Envelope[] }) {
  const [state, formAction] = useActionState(moveToEnvelope, null);

  return (
    <form action={formAction} className="flex gap-4">
      <Select name="envelopeId" required>
        <option value={""}>Select envelope</option>
        {envelopes.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
      <Input
        type="number"
        name="amount"
        step="0.01"
        min="0"
        placeholder="Amount"
        required
        className="flex-1" />
      <FormButton>Move</FormButton>
      <ErrorMessage error={state?.error} />
    </form>
  );
}

export default MoveForm;
