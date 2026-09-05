# Changelog

All notable changes to the Dreego VS Code extension are documented in this
file. Version numbers follow [Semantic Versioning](https://semver.org/).

The extension version is independent of the Dreego framework version.

## [0.1.0] - 2026-09-05

- Dreego grammar: semantic sections (`<server>`, `<body>`, `<client>`,
  `<head>`, `<style>`), markdown bodies (`<body lang="md">`, inline `<md>`),
  component syntax, template expressions, and control blocks
- Snippets for components, routes, sections, and template blocks
- JSON validation for `dreego.config.json`
- New D monogram logo
- Commands: `Dreego: Format Document`, `Dreego: Run Diagnostics`,
  `Dreego: Select Dreego CLI path`
- Settings: `dreego.cliPath`, `dreego.formatOnSave`, `dreego.diagnoseOnSave`
- Tag-triggered CI build that packages the VSIX as a release artifact
