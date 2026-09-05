# LSP Roadmap

Staged plan for moving from CLI-based diagnostics to a full Language Server
Protocol (LSP) integration. Revisit when the Dreego language stabilizes near
v1.0 — the grammar and transpiler are still evolving, so an LSP built now would
churn.

## Stage 1 — Diagnostics via CLI parse (current)

- `dreego generate --check` in the workspace root
- Parse `file:line:col: message` output into `vscode.Diagnostic` objects
- Shipped in 0.1.0 as the `Dreego: Run Diagnostics` command and
  `dreego.diagnoseOnSave`

## Stage 2 — LSP with completion

- Stand up a language server (e.g. `gopls`-style, or a dedicated Dreego server)
- Completion for components and props based on the transpiler's symbol table
- Replace the CLI-parse diagnostics with LSP `textDocument/publishDiagnostics`

## Stage 3 — Hover docs

- Hover on components, props, and template expressions
- Surface inline documentation from the Dreego docs and component headers

## Stage 4 — Go-to-definition

- Jump from `<@Component>` calls to their component definitions
- Jump from prop usages to their declarations

## Notes

- Revisit this roadmap when the language stabilizes near v1.0.
- Keep the CLI-parse diagnostics as a fallback for environments without an LSP.
