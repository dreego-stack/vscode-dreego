# Dreego for VS Code

Syntax highlighting, snippets, configuration validation, formatting, and
diagnostics for [Dreego](https://github.com/dreego-stack/dreego) (`.dreego`)
files.

## Features

- **Semantic sections** — highlighting for `<server>`, `<body>`, `<client>`,
  `<head>`, and `<style>` sections
- **Markdown bodies** — `<body lang="md">` markdown and the inline `<md>` tag
- **Component syntax** — `Component Name (props)` headers, typed props,
  `import` statements, and `<@Component>` calls
- **Template expressions** — `{{ ... }}` with `raw`/`upper` filters and
  `{#if}` / `{#each}` / `{#slot}` / `{#verbatim}` blocks
- **Snippets** — for components, routes, sections, and template blocks
- **Config validation** — JSON validation for `dreego.config.json` (logging,
  redirects, rewrites)
- **Formatting** — format the active document with the Dreego CLI
- **Diagnostics** — parse Dreego CLI errors into the Problems panel

## Install

Download the latest `.vsix` from the
[GitHub Releases](https://github.com/dreego-stack/vscode-dreego/releases) page
and install it with `code --install-extension dreego-extension-<version>.vsix`,
or install from a local clone:

```sh
git clone --depth 1 https://github.com/dreego-stack/vscode-dreego /tmp/vscode-dreego
/tmp/vscode-dreego/install.sh
```

Restart VS Code afterwards. Remove with `./install.sh uninstall`.

Marketplace publishing is planned for a future release.

## Commands

The extension requires the `dreego` CLI on your `PATH` (or configured via
`dreego.cliPath`).

- **Dreego: Format Document** — runs `dreego fmt --stdout` on the active file
  and replaces the document content with the formatted output
- **Dreego: Run Diagnostics** — runs `dreego generate --check` in the workspace
  root and maps `file:line:col` errors to the Problems panel
- **Dreego: Select Dreego CLI path** — set the path to the `dreego` binary if
  it is not on `PATH`

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| `dreego.cliPath` | `dreego` | Path to the `dreego` CLI binary |
| `dreego.formatOnSave` | `false` | Format the active Dreego document on save |
| `dreego.diagnoseOnSave` | `false` | Run Dreego diagnostics on save |

## Usage

A route page defines a `Component` header and one or more sections:

```dreego
Component Home (title string)

<server>
    now := time.Now()
</server>

<body>
    <h1>{{ title }}</h1>
    <p>Generated at {{ now }}</p>
    {#if now.Hour() < 12}
        <p>Good morning.</p>
    {#else}
        <p>Good day.</p>
    {/if}
</body>
```

Markdown bodies let you write prose directly:

```dreego
<body lang="md">
# Title
Some **markdown** with {{ name }}.
</body>
```

## Development

- `syntaxes/dreego.tmLanguage.json` — grammar
- `snippets/dreego.json` — snippets
- `schemas/dreego-config.schema.json` — config validation
- `extension.js` — commands, formatting, and diagnostics

### Testing

Snapshot tests against the VSCode TextMate engine:

```sh
npm install          # dev dependency: vscode-tmgrammar-test
npm test             # compare against committed .snap goldfiles
npm run test:update  # regenerate goldfiles after intentional grammar changes
```

## License

MPL-2.0
