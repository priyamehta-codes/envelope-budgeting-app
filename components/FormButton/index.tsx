"use client";

import { useFormStatus } from "react-dom";

function FormButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400">
      {pending ? "Processing..." : children}
    </button>
  );
}

export default FormButton;
