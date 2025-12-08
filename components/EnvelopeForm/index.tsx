"use client";

import { useActionState } from "react";

import { createEnvelope } from "@/app/actions";
import FormButton from "@/components/FormButton";
import Input from "@/components/ui/Input";
import ErrorMessage from "@/components/ErrorMessage";

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
      <ErrorMessage error={state?.error} />
    </form>
  );
}

export default EnvelopeForm;
