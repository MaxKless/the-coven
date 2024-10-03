# The Coven - Your SpellCasting Companion

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

Welcome to The Coven's SpellCasting Companion, an Nx-powered monorepo for managing and casting magical spells!

This project is created for the purpose of the [Squiggle Conf 2024](https://2024.squiggleconf.com/) workshop [_Build Editor Extensions with the Makers of Nx Console_](https://2024.squiggleconf.com/sessions#workshop-katerina-and-max).

## Project Structure

This Nx workspace is organized into the following apps and libraries:

```tree
.
├── apps
│   ├── codex-arcana-jetbrains  # JetBrains IDE plugin
│   ├── codex-arcana-vscode     # Visual Studio Code extension
│   └── spells                  # Next.js application for spellcasting
├── libs
│   ├── shared
│   │   └── util-interface      # Shared TypeScript interfaces and types
│   └── spellcasting-sdk        # SDK for interacting with the API
```

## Documentation

API and SDK documentation can be found in the respective project directories.

- [Spells API Documentation](apps/spells/README.md)
- [SpellCasting SDK Documentation](libs/spellcasting-sdk/README.md)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or Yarn or pnpm
- JetBrains IDE (for the JetBrains plugin)
- Visual Studio Code (for the VS Code extension)

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

### Running the Project

1. Start the spells application:

   ```bash
   npx nx serve spells
   ```

2. In a new terminal window, go to the spells directory and run partykit:

   ```bash
   cd apps/spells
   npx partykit dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Development

### JetBrains Plugin (apps/codex-arcana-jetbrains)

To build the JetBrains plugin:

```bash
npx nx build codex-arcana-jetbrains
```

### VS Code Extension (apps/codex-arcana-vscode)

To build the VS Code extension:

```bash
npx nx build codex-arcana-vscode
```

### Building Projects

To create a production build of a project:

```bash
npx nx build <project-name>
```

For example:

```bash
npx nx build spells
```

### Running Tests

To run tests for all projects:

```bash
npx nx run-many --target=test --all
```

To run tests for a specific project:

```bash
npx nx test <project-name>
```

### Linting

To lint all projects:

```bash
npx nx run-many --target=lint --all
```

To lint a specific project:

```bash
npx nx lint <project-name>
```

## Useful Nx Commands

- `npx nx graph`: Visually explore the project graph
- `npx nx affected:graph`: See what's been affected by your changes
- `npx nx show project <project-name>`: See available targets for a project

## Learn More About Nx

- [Nx Documentation](https://nx.dev)
- [Nx Cloud](https://nx.app/)

### Max & Katerina links

- [Max's X](https://x.com/MaxKless)
- [Katerina's X](https://x.com/psybercity)

## Community

Join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Twitter](https://twitter.com/nxdevtools)
- [YouTube Channel](https://www.youtube.com/@nxdevtools)

## Additional Information

- The project uses [PartyKit](https://www.partykit.io/) for real-time functionality. See [`partykit.json`](apps/spells/partykit.json) and [`server.ts`](apps/spells/README.md) in the spells app for configuration.
- The `spells` application uses Next.js and includes [API routes](apps/spells/src/app/api) for spell casting, ingredients, incantations, and recipes.
- The project includes ESLint configurations for code linting.
- Jest and Vitest are set up for testing.
- The `libs/shared/util-interface` contains shared TypeScript interfaces and types used across the project.
- The `libs/spellcasting-sdk` provides a convenient SDK for interacting with the spellcasting API.
