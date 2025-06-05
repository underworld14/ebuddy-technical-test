# EBuddy Technical Test - Turborepo Monorepo

This is a Turborepo monorepo containing the backend API, frontend web application, and shared types for the EBuddy technical test.

## Project Structure

```
ebuddy/
├── apps/
│   ├── backend/          # Express.js + Firebase backend API
│   └── frontend/         # Next.js + React MUI + Redux frontend
├── packages/
│   └── shared-types/     # Shared TypeScript types and interfaces
├── docs/                 # Project documentation
├── package.json          # Root workspace configuration
├── turbo.json           # Turborepo pipeline configuration
└── README.md
```

## Tech Stack

### Backend (`@ebuddy/backend`)

- **Framework**: Express.js with TypeScript
- **Database**: Firebase Firestore
- **Authentication**: Custom auth middleware with Firebase tokens
- **Port**: 3001

### Frontend (`@ebuddy/frontend`)

- **Framework**: Next.js 14+ with App Router
- **UI Library**: React Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Authentication**: Firebase Authentication
- **Port**: 3000

### Shared Types (`@ebuddy/shared-types`)

- **Purpose**: Shared TypeScript interfaces and utilities
- **Used by**: Both backend and frontend packages
- **Exports**: User interfaces, validation helpers, response types

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 10.0.0

### Installation

```bash
# Install all dependencies for all packages
npm install
```

### Development

```bash
# Build all packages
pnpm run build

# Run all packages in development mode (parallel)
pnpm run dev:all

# Run individual packages
pnpm run backend       # Backend only
pnpm run frontend      # Frontend only
pnpm run shared        # Shared types in watch mode

# Other commands
pnpm run lint         # Lint all packages
pnpm run test         # Test all packages
pnpm run clean        # Clean all build artifacts
```

### Production

```bash
# Build all packages for production
pnpm run build:all

# Start production servers
pnpm run start:backend    # Start backend production server
pnpm run start:frontend   # Start frontend production server
```

## Package Scripts

Each package has its own scripts that can be run independently:

### Backend (`apps/backend`)

```bash
cd apps/backend
pnpm run dev      # Development with nodemon
pnpm run build    # TypeScript compilation
pnpm run start    # Production server
pnpm run clean    # Remove dist folder
```

### Frontend (`apps/frontend`)

```bash
cd apps/frontend
pnpm run dev      # Next.js development server
pnpm run build    # Next.js production build
pnpm run start    # Next.js production server
pnpm run lint     # ESLint
pnpm run clean    # Remove .next folder
```

### Shared Types (`packages/shared-types`)

```bash
cd packages/shared-types
pnpm run dev      # TypeScript watch mode
pnpm run build    # TypeScript compilation
pnpm run clean    # Remove dist folder
```

## API Endpoints

### Backend API (http://localhost:3001)

- `POST /api/update-user-data` - Update user data in Firestore
- `GET /api/fetch-user-data` - Fetch user data from Firestore

Both endpoints require Firebase authentication tokens.

## Shared Types

The `@ebuddy/shared-types` package contains:

- `User` interface - Core user data structure
- `UserResponse` interface - API response wrapper
- `UsersResponse` interface - Multiple users response
- Validation helpers - `isValidRating()`, `isValidRentCount()`
- Utility functions - `createUser()`

## Turborepo Benefits

1. **Parallel Execution**: Build and run multiple packages simultaneously
2. **Incremental Builds**: Only rebuild what changed
3. **Dependency Management**: Automatic dependency resolution between packages
4. **Caching**: Intelligent caching for faster builds
5. **Task Pipeline**: Define task dependencies and execution order

## Firebase Configuration

- Backend uses Firebase Admin SDK with service account
- Frontend uses Firebase Client SDK with web configuration
- Both support development (emulator) and production environments

## Development Workflow

1. **Shared Types First**: Modify shared types when changing data structures
2. **Backend Implementation**: Update API endpoints using shared types
3. **Frontend Integration**: Update UI components using shared types
4. **Testing**: Use `npm run build` to verify all packages compile correctly

## Monorepo Commands Summary

| Command             | Description                     |
| ------------------- | ------------------------------- |
| `pnpm run build`    | Build all packages              |
| `pnpm run dev:all`  | Run all packages in development |
| `pnpm run backend`  | Run backend only                |
| `pnpm run frontend` | Run frontend only               |
| `pnpm run shared`   | Run shared types in watch mode  |
| `pnpm run lint`     | Lint all packages               |
| `pnpm run clean`    | Clean all build artifacts       |

This monorepo setup ensures type consistency across the full stack while maintaining independent package development and deployment capabilities.
