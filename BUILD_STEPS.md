# Envelope Budgeting App - Build Steps

## Setup

1. Create Next.js app with TypeScript and TailwindCSS:
   ```bash
   npx create-next-app@latest . --typescript --tailwind --app
   ```

2. Install Prisma:
   ```bash
   pnpm add @prisma/client@^6.19.0 prisma@^6.19.0
   pnpm add -D dotenv
   ```

3. Initialize Prisma with SQLite:
   ```bash
   pnpm prisma init --datasource-provider sqlite
   ```

## Database Schema

4. Update `prisma/schema.prisma`:
   ```prisma
   model Envelope {
     id      String  @id @default(cuid())
     name    String
     balance Float   @default(0)
   }

   model Income {
     id      String  @id @default(cuid())
     balance Float   @default(0)
   }
   ```

5. Generate Prisma Client and run migration:
   ```bash
   pnpm prisma generate
   pnpm prisma migrate dev --name init
   ```

## Prisma Client Setup

6. Create `lib/prisma.ts`:
   ```typescript
   import { PrismaClient } from "@prisma/client";

   const globalForPrisma = globalThis as unknown as {
     prisma: PrismaClient | undefined;
   };

   export const prisma = globalForPrisma.prisma ?? new PrismaClient();

   if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
   ```

## Server Actions

7. Create `app/actions.ts` with server actions (use Prisma directly):
    - `addIncome`: Find first income or create, increment balance, revalidatePath
    - `createEnvelope`: Create envelope with name and balance: 0, revalidatePath
    - `moveToEnvelope`: Transaction to decrement income and increment envelope, revalidatePath
    - `spendFromEnvelope`: Decrement envelope balance, revalidatePath

## UI Components

8. Create reusable components:
    - `components/ui/Input/index.tsx` - Input wrapper
    - `components/ui/Select/index.tsx` - Select wrapper
    - `components/Card/index.tsx` - Card container
    - `components/FormButton/index.tsx` - Submit button with loading state
    - `components/ErrorMessage/index.tsx` - Error display

9. Create form components:
    - `components/IncomeForm/index.tsx` - Add income form (useActionState)
    - `components/EnvelopeForm/index.tsx` - Create envelope form (useActionState)
    - `components/MoveForm/index.tsx` - Move money form (useActionState, select envelope)
    - `components/SpendForm/index.tsx` - Spend money form (useActionState, select envelope)

## Main Page

10. Update `app/page.tsx`:
    - Fetch envelopes and income balance (server component)
    - Display income balance
    - Show list of envelopes with balances
    - Render all form components

## Styling

11. Style with TailwindCSS:
    - Use Card component for sections
    - Green for income, blue for envelope balances
    - Responsive grid for envelope list
    - Clean, minimal design

## Testing

12. Test the flow:
    - Add income
    - Create envelopes
    - Move money from income to envelopes
    - Spend from envelopes
