"use client";

import { useActionState } from "react";
import { createEnvelope } from "@/app/actions";
import FormButton from "@/components/FormButton";

function EnvelopeForm() {
  const [state, formAction] = useActionState(createEnvelope, null);

  return (
    <form action={formAction} className="mb-4 flex gap-4">
      <input
        type="text"
        name="name"
        placeholder="Envelope name"
        required
        className="flex-1 rounded border border-zinc-300 px-4 py-2"
      />
      <FormButton>Create Envelope</FormButton>
      {state?.error && (
        <div className="text-red-600">{state.error}</div>
      )}
    </form>
  );
}

export default EnvelopeForm;
