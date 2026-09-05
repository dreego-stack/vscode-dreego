const vscode = require('vscode');
const { execFile } = require('child_process');

const DIAG_PATTERN = /^(.+):(\d+):(\d+):\s*(.+)$/;

function activate(context) {
  const diagnostics = vscode.languages.createDiagnosticCollection('dreego');
  context.subscriptions.push(diagnostics);

  context.subscriptions.push(
    vscode.commands.registerCommand('dreego.format', () => formatActiveDocument()),
    vscode.commands.registerCommand('dreego.diagnose', () => runDiagnostics(diagnostics)),
    vscode.commands.registerCommand('dreego.selectDreegoCli', () => selectDreegoCli())
  );

  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((doc) => {
      if (doc.languageId !== 'dreego') {
        return;
      }
      const config = vscode.workspace.getConfiguration('dreego');
      if (config.get('formatOnSave')) {
        formatDocument(doc);
      }
      if (config.get('diagnoseOnSave')) {
        runDiagnostics(diagnostics);
      }
    })
  );
}

function deactivate() {}

function cliPath() {
  const config = vscode.workspace.getConfiguration('dreego');
  return config.get('cliPath') || 'dreego';
}

function runCli(args, cwd) {
  return new Promise((resolve) => {
    execFile(cliPath(), args, { cwd }, (error, stdout, stderr) => {
      resolve({ error, stdout, stderr });
    });
  });
}

async function formatActiveDocument() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.languageId !== 'dreego') {
    vscode.window.showWarningMessage('Dreego: open a .dreego file to format.');
    return;
  }
  await formatDocument(editor.document);
}

async function formatDocument(doc) {
  if (!doc.fileName.endsWith('.dreego')) {
    return;
  }
  const { error, stdout, stderr } = await runCli(['fmt', '--stdout', doc.fileName]);
  if (error) {
    vscode.window.showErrorMessage(`Dreego format failed: ${stderr || error.message}`);
    return;
  }
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.uri.toString() !== doc.uri.toString()) {
    return;
  }
  const fullRange = new vscode.Range(
    doc.positionAt(0),
    doc.positionAt(doc.getText().length)
  );
  await editor.edit((edit) => edit.replace(fullRange, stdout));
}

async function runDiagnostics(diagnostics) {
  diagnostics.clear();
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    vscode.window.showWarningMessage('Dreego: open a workspace folder to run diagnostics.');
    return;
  }
  const root = folders[0].uri.fsPath;
  const { error, stderr } = await runCli(['generate', '--check'], root);
  if (!error) {
    return;
  }
  const entries = parseDiagnostics(stderr);
  if (entries.length === 0) {
    vscode.window.showErrorMessage(`Dreego diagnostics failed: ${stderr.trim()}`);
    return;
  }
  const byFile = new Map();
  for (const entry of entries) {
    const uri = vscode.Uri.file(entry.file);
    if (!byFile.has(uri.toString())) {
      byFile.set(uri.toString(), { uri, items: [] });
    }
    byFile.get(uri.toString()).items.push(entry.diagnostic);
  }
  for (const group of byFile.values()) {
    diagnostics.set(group.uri, group.items);
  }
}

function parseDiagnostics(stderr) {
  const entries = [];
  for (const line of stderr.split('\n')) {
    const match = DIAG_PATTERN.exec(line);
    if (!match) {
      continue;
    }
    const file = match[1];
    const lineNum = parseInt(match[2], 10) - 1;
    const colNum = parseInt(match[3], 10) - 1;
    const message = match[4];
    const range = new vscode.Range(lineNum, colNum, lineNum, colNum);
    entries.push({
      file,
      diagnostic: new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Error)
    });
  }
  return entries;
}

async function selectDreegoCli() {
  const current = cliPath();
  const value = await vscode.window.showInputBox({
    prompt: 'Path to the dreego CLI binary',
    value: current,
    placeHolder: 'dreego'
  });
  if (value === undefined) {
    return;
  }
  const config = vscode.workspace.getConfiguration('dreego');
  await config.update('cliPath', value.trim() || 'dreego', vscode.ConfigurationTarget.Workspace);
}

module.exports = { activate, deactivate };
