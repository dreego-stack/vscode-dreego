# Dreego for VS Code

Syntax highlighting, snippets, and configuration validation for
[Dreego](https://github.com/dreego-stack/dreego) (`.dreego`) files.

## Features

- Full syntax highlighting for `.dreego` files:
  - `Component` headers with typed props, `import` statements
  - Sections `<head>`, `<go>`, `<div>`, `<script>`, `<style>`
  - Template expressions `{{ ... }}` with `raw`/`upper` filters
  - Logic blocks `{#if}` / `{#else if}` / `{#each}` / `{#slot}` / `{#verbatim}`
  - Component calls `<@Component prop="value"/>` and `<@Component>...</@Component>`
- Snippets for components, routes, sections, and template blocks
- JSON validation for `dreego.config.json` (logging, redirects, rewrites)
- Sensible editor defaults for `.dreego` files

## Install

### Marketplace

Install the published extension from the VS Code Marketplace (search "Dreego").

### From source (development)

```sh
git clone https://github.com/dreego-stack/vscode-dreego
cd vscode-dreego
npm install
code --install-extension ./dreego-stack.vscode-dreego-0.1.0.vsix   # after npx @vscode/vsce package
```

## Testing

Grammar tests are snapshot tests against the VSCode TextMate engine:

```sh
npm test          # compare against committed .snap goldfiles
npm run test:update  # regenerate goldfiles after intentional grammar changes
```

The test config in `tests/config/` maps the grammar plus stub grammars for
`source.go`, `source.js`, `source.css`, and `text.html.basic` so sections can
be tokenized in isolation without requiring the Go/JS/CSS extensions.

## License

MPL-2.0
