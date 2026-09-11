# GitHub Copilot Instructions

## Code Style & Standards

- Use React 18+ functional components with explicit TypeScript interfaces for props.
- Prefer named exports over default exports.
- Never use `any`—use strict types, generics, or `unknown` where applicable.
- Use early returns to reduce nested conditional logic.
- Use MUI version 9+ when creating components.

## Framework & Tooling Preferences

- Use Vite for build/bundling configurations.
- Use modern `async/await` syntax instead of promise chaining.
- Extract reusable business/state logic into custom hooks.
