'use client'

import { useActionState } from 'react'
import { spendFromEnvelope } from '../actions'
import { FormButton } from './FormButton'

type Envelope = {
  id: string
  name: string
  balance: number
}

export function SpendForm({ envelopes }: { envelopes: Envelope[] }) {
  const [state, formAction] = useActionState(spendFromEnvelope, null)

  return (
    <form action={formAction} className="flex gap-4">
      <select
        name="envelopeId"
        required
        className="rounded border border-zinc-300 px-4 py-2"
      >
        <option value="">Select envelope</option>
        {envelopes.map((envelope) => (
          <option key={envelope.id} value={envelope.id}>
            {envelope.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="amount"
        step="0.01"
        min="0"
        placeholder="Amount"
        required
        className="flex-1 rounded border border-zinc-300 px-4 py-2"
      />
      <FormButton>Spend</FormButton>
      {state?.error && (
        <div className="text-red-600">{state.error}</div>
      )}
    </form>
  )
}

