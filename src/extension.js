"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const fs = require("fs");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.applyStyleGuide', () => {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor found.');
            return;
        }
        // Read the style guide file
        const styleGuidePath = '/path/to/styles.txt'; // Replace with the actual path to styles.txt
        fs.readFile(styleGuidePath, 'utf8', (err, data) => {
            if (err) {
                vscode.window.showErrorMessage(`Failed to read style guide file: ${err.message}`);
                return;
            }
            // Apply the style guide to the active document
            applyStyleGuide(editor, data);
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function applyStyleGuide(editor, styleGuide) {
    // Parse the style guide
    const lines = styleGuide.split('\n');
    const exampleCode = lines.filter(line => line.startsWith('Example Code:')).map(line => line.substring('Example Code:'.length).trim());
    const verbalGuidelines = lines.filter(line => line.startsWith('Verbal Guidelines:')).map(line => line.substring('Verbal Guidelines:'.length).trim());
    // Apply the style guide to the active document
    const document = editor.document;
    const textEdits = [];
    // Apply example code
    exampleCode.forEach(code => {
        const range = document.validateRange(new vscode.Range(0, 0, document.lineCount - 1, 0));
        textEdits.push(new vscode.TextEdit(range, code));
    });
    // Apply verbal guidelines as comments
    verbalGuidelines.forEach(guideline => {
        const range = document.validateRange(new vscode.Range(0, 0, 0, 0));
        textEdits.push(new vscode.TextEdit(range, `// ${guideline}`));
    });
    // Apply the text edits
    const workspaceEdit = new vscode.WorkspaceEdit();
    workspaceEdit.set(document.uri, textEdits);
    vscode.workspace.applyEdit(workspaceEdit);
}
function deactivate() { }
exports.deactivate = deactivate;
