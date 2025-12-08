"use client";

import { useActionState } from "react";

import { addIncome } from "@/app/actions";
import FormButton from "@/components/FormButton";
import Input from "@/components/ui/Input";
import ErrorMessage from "@/components/ErrorMessage";

function IncomeForm() {
  const [state, formAction] = useActionState(addIncome, null);

  return (
    <form action={formAction} className="flex gap-4">
      <Input
        type="number"
        name="amount"
        step="0.01"
        min="0"
        placeholder="Amount"
        required
        className="flex-1" />
      <FormButton>Add Income</FormButton>
      <ErrorMessage error={state?.error} />
    </form>
  );
}

export default IncomeForm;
