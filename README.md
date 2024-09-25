# The Coven - Your SpellCasting companion

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

Welcome to The Coven's SpellCasting Companion, an Nx-powered monorepo for managing and casting magical spells!

This project is created for the purpose of the [Squiggle Conf 2024](https://2024.squiggleconf.com/) workshop [_Build Editor Extensions with the Makers of Nx Console_](https://2024.squiggleconf.com/sessions#workshop-katerina-and-max).

## Project Structure

This Nx workspace is organized into the following apps and libraries:

```tree
.
├── apps
│   ├── spell-playground        # React.js client application
│   ├── spellcasting-api        # Express.js API server
│   └── spellcasting-api-e2e    # E2E tests for the API
├── libs
│   ├── shared
│   │   ├── util-interface      # Shared TypeScript interfaces and types
│   │   └── util-spellcaster    # Core spellcasting logic
│   └── spellcasting-sdk        # SDK for interacting with the API
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or Yarn or pnpm

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

1. Start the API server:

   ```bash
   npx nx serve spellcasting-api
   ```

2. In a new terminal, start the client application:

   ```bash
   npx nx serve spell-playground
   ```

3. Open your browser and navigate to `http://localhost:4200` to view the application.

## Development

### API Server (apps/spellcasting-api)

To run the API server in development mode:

```bash
npx nx serve spellcasting-api
```

### Client Application (apps/spell-playground)

To run the client in development mode:

```bash
npx nx serve spell-playground
```

### Building Projects

To create a production build of a project:

```bash
npx nx build <project-name>
```

For example:

```bash
npx nx build spellcasting-api
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

## Documentation

API and SDK documentation can be found in the respective project directories.

- [SpellCasting API Documentation](apps/spellcasting-api/README.md)
- [SpellCasting SDK Documentation](libs/spellcasting-sdk/README.md)

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
