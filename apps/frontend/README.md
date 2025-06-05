# Frontend Repository - EBuddy Technical Test

Next.js 14+ frontend with Material UI, Redux, and Firebase authentication for user data management.

## Features

- **Next.js 14+ App Router**: Modern React framework with App Router
- **Material UI**: Complete UI component library with theming
- **Redux Toolkit**: State management for auth and user data
- **Firebase Authentication**: Google & Email/Password login
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first Material UI components

## Installation & Setup

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Configure environment variables:**

   - Create `.env.local` file with Firebase credentials
   - Set NEXT_PUBLIC_API_BASE_URL for backend connection

3. **Start development server:**
   ```bash
   pnpm run dev
   ```

## Environment Variables Required

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## Key Components

- **Login Page**: Google & Email authentication
- **Main Page**: Protected route with user data management
- **UpdateButton**: Fetch and update user information
- **Redux Store**: Centralized state management
- **Material UI Theme**: Consistent design system

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
