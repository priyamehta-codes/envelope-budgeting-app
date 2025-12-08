"use client";

import { useActionState } from "react";

import { createEnvelope } from "@/app/actions";
import FormButton from "@/components/FormButton";
import Input from "@/components/ui/Input";

function EnvelopeForm() {
  const [state, formAction] = useActionState(createEnvelope, null);

  return (
    <form action={formAction} className="mb-4 flex gap-4">
      <Input
        type="text"
        name="name"
        placeholder="Envelope name"
        required
        className="flex-1" />
      <FormButton>Create Envelope</FormButton>
      {state?.error && (
        <div className="text-red-600">{state.error}</div>
      )}
    </form>
  );
}

export default EnvelopeForm;
