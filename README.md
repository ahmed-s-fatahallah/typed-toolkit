# typed-toolkit

A strongly and strictly typed utilities library, providing advanced type inference and runtime helpers.

## Features

1. **getFullPath**
   - Validate and extract dynamic parameters from route strings like `/user/:id/profile/:tab` with full TypeScript type inference, replacing them with their respective values.
   - Ensures your route parameters match your path structure, both at runtime and in your editor for maximum safety.
   - Supports passing parameters as arrays or objects for flexible usage.

## Installation

```bash
pnpm add typed-toolkit
# or
npm install typed-toolkit
```

## Usage

```ts
import { getFullPath } from "typed-toolkit";

// Using array parameters
const path1 = getFullPath("/user/:id/profile/:tab", "123", "settings");
// path1: "/user/123/profile/settings"

// Using object parameters
const path2 = getFullPath("/user/:id/profile/:tab", {
  id: "123",
  tab: "settings"
});
// path2: "/user/123/profile/settings"
```

## API

### `getFullPath<TPath, TParams>(path, ...params): string`

- **`path`**: A string with dynamic segments (e.g., `/user/:id`).
- **`params`**: Either a list of values (in order) or a single object mapping segment names to values.

#### Type Safety

- Compile-time errors if you provide the wrong number or names of parameters.
- Type inference for returned path.

## Advanced Types

- `ExtractDynamicSegments<TPath>`: Extracts dynamic segment names from a path.
- `ValidPath<TPath>`: Ensures the path format is valid.
- `ParamsAsObject<TPath, TParams>`: Enforces object parameter structure.
- `DynamicParams<TPath, TParams>`: Enforces array parameter structure.
- `ReturnedPath<TPath, TParams>`: Infers the final path string.

## License

MIT
