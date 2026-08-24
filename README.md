# Dreego for VS Code

Syntax highlighting, snippets, and configuration validation for
[Dreego](https://github.com/dreego-stack/dreego) (`.dreego`) files.

## Features

- Full syntax highlighting for `.dreego` files:
  - `Component` headers with typed props, `import` statements
  - Sections `<server>`, `<head>`, `<body>`, `<style>`, `<client>`
  - Template expressions `{{ ... }}` with `raw`/`upper` filters
  - Logic blocks `{#if}` / `{#else if}` / `{#each}` / `{#slot}` / `{#verbatim}`
  - Component calls `<@Component prop="value"/>` and `<@Component>...</@Component>`
- Snippets for components, routes, sections, and template blocks
- JSON validation for `dreego.config.json` (logging, redirects, rewrites)
- Sensible editor defaults for `.dreego` files

## Install

The extension is installed as a symlink from a cloned checkout, so it is
always up to date with the repository.

```sh
git clone --depth 1 https://github.com/dreego-stack/vscode-dreego /tmp/vscode-dreego
cd /tmp/vscode-dreego
./install.sh
```

Restart VS Code afterwards. Uninstall:

```sh
cd /tmp/vscode-dreego
./install.sh uninstall
```

## Development

- `syntaxes/dreego.tmLanguage.json` — grammar
- `snippets/dreego.json` — snippets
- `schemas/dreego-config.schema.json` — `dreego.config.json` validation
- `language-configuration.json` — brackets, word pattern, indentation

### Testing

Grammar tests are snapshot tests against the VSCode TextMate engine:

```sh
npm install          # dev dependency: vscode-tmgrammar-test
npm test             # compare against committed .snap goldfiles
npm run test:update  # regenerate goldfiles after intentional grammar changes
```

The test config in `tests/config/` maps the grammar plus stub grammars for
`source.go`, `source.js`, `source.css`, and `text.html.basic` so sections can
be tokenized in isolation without requiring the Go/JS/CSS extensions.

## License

MPL-2.0
