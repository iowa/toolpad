# toolpad

Reusable React components and hooks extracted from this repository.

## Install

```bash
pnpm add @iowas/toolpad
```

Peer dependencies are required in the consuming app (`react`, `react-dom`, MUI, emotion, and optionally `next` for `toolpad/nextjs`).

## Usage

```tsx
import { AppProvider, DashboardLayout } from '@iowas/toolpad';
```

Use subpath exports when you only need a subset:

```tsx
import { AppProvider } from '@iowas/toolpad/core';
import { useBoolean } from '@iowas/toolpad/utils';
import { NextAppProvider } from '@iowas/toolpad/nextjs';
```

## Build

```bash
pnpm install
pnpm run build
```

Build output is generated in `dist/`.

## Reuse Locally In Another Project

From this repository:

```bash
pnpm run build
pnpm pack
```

Then in another project:

```bash
pnpm add /absolute/path/to/@iowas%2ftoolpad-1.0.0.tgz
```

## Published Exports

- `@iowas/toolpad`
- `@iowas/toolpad/core`
- `@iowas/toolpad/utils`
- `@iowas/toolpad/nextjs`

```bash
npm login
```

```bash
pnpm publish
```