# Envelope Budgeting App

A modern, full-stack envelope budgeting application built with Next.js, React, and Prisma. This app helps you manage your finances using the envelope budgeting method, where you allocate income into different spending categories (envelopes) and track expenses from each envelope.

## Features

- **Income Management**: Add and track your total income balance
- **Envelope Creation**: Create custom spending categories (envelopes) for different budget items
- **Money Allocation**: Move money from your income to specific envelopes
- **Expense Tracking**: Record spending from envelopes and automatically update balances
- **Real-time Updates**: See balance changes instantly with server-side rendering
- **Responsive Design**: Beautiful, modern UI that works on all devices

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Runtime**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [SQLite](https://www.sqlite.org/) with [Prisma ORM](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Font**: [Geist](https://vercel.com/font) (optimized with `next/font`)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (or npm/yarn/bun)
- A code editor (VS Code recommended)

## Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd envelope-budgeting-app
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up the database**:
   ```bash
   pnpm prisma generate
   pnpm prisma migrate dev
   ```
   
   This will:
   - Generate the Prisma Client
   - Create the SQLite database file (`prisma/dev.db`)
   - Run database migrations

4. **Configure environment variables** (if needed):
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

## Usage

### Development

Start the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page will automatically reload when you make changes to the code.

### Production Build

Build the application for production:

```bash
pnpm build
pnpm start
```

## How It Works

### Envelope Budgeting Method

The envelope budgeting method is a cash-based budgeting system where you:

1. **Add Income**: Start by adding your income, which creates your available balance
2. **Create Envelopes**: Create envelopes for different spending categories (e.g., "Groceries", "Entertainment", "Bills")
3. **Allocate Funds**: Move money from your income to envelopes based on your budget
4. **Track Spending**: When you spend money, deduct it from the appropriate envelope

### Application Flow

- **Income Section**: Add income to your account. The balance accumulates as you add more income.
- **Envelopes Section**: Create and view all your spending envelopes with their current balances.
- **Move Money**: Transfer funds from your income balance to any envelope.
- **Spend Money**: Record expenses by deducting money from a specific envelope.

## Project Structure

```
envelope-budgeting-app/
├── app/
│   ├── actions.ts              # Server actions for form handling
│   ├── api/                    # API routes
│   │   ├── envelopes/
│   │   ├── income/
│   │   ├── move/
│   │   └── spend/
│   ├── components/             # React components
│   │   ├── EnvelopeForm.tsx
│   │   ├── IncomeForm.tsx
│   │   ├── MoveForm.tsx
│   │   ├── SpendForm.tsx
│   │   └── FormButton.tsx
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── lib/
│   └── prisma.ts               # Prisma client singleton
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── dev.db                  # SQLite database (generated)
├── public/                     # Static assets
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Database Schema

The application uses two main models:

- **Income**: Tracks total income and available balance
  - `id`: Unique identifier
  - `amount`: Income amount
  - `balance`: Current available balance

- **Envelope**: Represents spending categories
  - `id`: Unique identifier
  - `name`: Envelope name (e.g., "Groceries")
  - `balance`: Current balance in the envelope

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Development

### Database Migrations

When modifying the Prisma schema (`prisma/schema.prisma`), run:

```bash
pnpm prisma migrate dev --name your_migration_name
```

### Prisma Studio

View and edit your database using Prisma Studio:

```bash
pnpm prisma studio
```

This opens a GUI at [http://localhost:5555](http://localhost:5555) where you can interact with your database.

## Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Add your environment variables (if needed)
5. Deploy!

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

### Other Platforms

This app can be deployed on any platform that supports Next.js:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- Any Node.js hosting provider

**Note**: For production deployments, consider using PostgreSQL or another production-ready database instead of SQLite.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Prisma Documentation](https://www.prisma.io/docs) - Learn about Prisma ORM
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS

## License

This project is private and not licensed for public use.
