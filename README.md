# Universe

All of our open-source apps and packages as one monorepo.

## Contributing

Contributions to this project are welcome and should be submitted via GitHub pull requests.

### Creating the universe

Clone this repository, then run the following commands:

```bash
pnpm install --frozen-lockfile
```

### Structure of the universe

- The `apps` folder should contain workspaces for launchable apps.
- The `packages` folder should contain workspaces for packages used by either an app or another package.
