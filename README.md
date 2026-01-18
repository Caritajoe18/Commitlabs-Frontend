# CommitLabs Frontend

Frontend application for the CommitLabs protocol, built with Next.js and TypeScript.

## Overview

This frontend provides a user interface for:
- Creating liquidity commitments
- Viewing and managing commitments
- Browsing the commitment marketplace
- Viewing attestation history and health metrics

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your contract addresses and network configuration

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home page
│   ├── create/            # Create commitment page
│   ├── commitments/       # My commitments page
│   └── marketplace/       # Marketplace page
├── components/            # Reusable components
│   ├── CommitmentForm.tsx
│   ├── NFTDisplay.tsx
│   └── AttestationHistory.tsx
└── utils/                 # Utility functions
    └── soroban.ts         # Soroban contract utilities
```

## Features

### Current (Placeholders)
- ✅ Home page with overview
- ✅ Create commitment form (UI only)
- ✅ My commitments page (mock data)
- ✅ Marketplace page (mock data)
- ✅ Basic styling and layout

### TODO
- [ ] Wallet integration (Freighter, etc.)
- [ ] Contract integration
- [ ] Real-time commitment data
- [ ] Attestation history visualization
- [ ] NFT display and metadata
- [ ] Transaction handling
- [ ] Error handling
- [ ] Loading states
- [ ] Responsive design improvements

## Development Status

⚠️ **Early Development**: This is a skeleton frontend with placeholder components. Core functionality needs to be implemented.

## Next Steps

1. Integrate Stellar wallet (Freighter)
2. Generate TypeScript bindings from contracts
3. Implement contract interactions
4. Add real-time data fetching
5. Implement transaction flows
6. Add error handling and loading states
7. Improve UI/UX

## License

MIT

