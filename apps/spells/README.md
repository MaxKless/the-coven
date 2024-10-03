# The Coven - Magical Spell Casting App

Welcome to The Coven, a magical spell casting application built with Next.js and [PartyKit](https://www.partykit.io/)! This README will guide you through the setup, features, and architecture of our enchanting project.

## 🌟 Features

- Browse a collection of magical recipes
- Cast spells from predefined recipes
- Create and cast custom spells
- Real-time updates when spells are cast
- Responsive design with magical UI elements

## 🚀 Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:MaxKless/the-coven.git
   cd the-coven
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:

   ```bash
   NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com
   NEXT_PUBLIC_PARTYKIT_HOST=your-partykit-host.com
   ```

4. Run the development server:

   ```bash
   npx nx start spells
   ```

5. Go to the spells directory and run partykit:

   ```bash
   cd apps/spells
   npx partykit dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the magic!

## 🧙‍♀️ How It Works

### Architecture

The Coven is built using:

- Next.js for the frontend and API routes
- PartyKit for real-time functionality
- Custom SpellCasting SDK for spell-related operations

### Key Components

1. **App.tsx**: The main component that orchestrates the entire application.
2. **CustomSpellCreator.tsx**: Allows users to create and cast custom spells.
3. **Toast.tsx**: Displays notifications for spell casting results.
4. **PartyKit Server**: Handles real-time broadcasting of spell casting events.

### Spell Casting Process

1. User selects a recipe or creates a custom spell.
2. The application sends a POST request to `/api/cast-spell`.
3. The API route forwards the request to the PartyKit server.
4. PartyKit server validates the request and broadcasts the new spell.
5. Connected clients receive the update and display the new spell.

## 🔮 API Endpoints

- `GET /api/recipes`: Fetch all recipes or a specific recipe by ID
- `GET /api/ingredients`: Fetch all available ingredients
- `GET /api/incantations`: Fetch all available incantations
- `POST /api/cast-spell`: Cast a spell (sends request to PartyKit server)

## 🌙 PartyKit Server

The PartyKit server (`server.ts`) handles:

- Validating spell casting requests
- Broadcasting new spells to all connected clients
- Maintaining real-time connections with clients

May your code be bug-free and your spells always cast successfully! 🔮✨
