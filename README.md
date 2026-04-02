# toolpad

Reusable React components and hooks extracted from this repository.

## Install

```bash
pnpm add toolpad
```

Peer dependencies are required in the consuming app (`react`, `react-dom`, MUI, emotion, and optionally `next` for `toolpad/nextjs`).

## Usage

```tsx
import { AppProvider, DashboardLayout } from 'toolpad';
```

Use subpath exports when you only need a subset:

```tsx
import { AppProvider } from 'toolpad/core';
import { useBoolean } from 'toolpad/utils';
import { NextAppProvider } from 'toolpad/nextjs';
```

## Build

```bash
pnpm install
pnpm build
```

Build output is generated in `dist/`.

## Reuse Locally In Another Project

From this repository:

```bash
pnpm build
pnpm pack
```

Then in another project:

```bash
pnpm add /absolute/path/to/toolpad-1.0.0.tgz
```

## Published Exports

- `toolpad`
- `toolpad/core`
- `toolpad/utils`
- `toolpad/nextjs`

