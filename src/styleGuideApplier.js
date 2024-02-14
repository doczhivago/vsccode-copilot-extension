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
        const styleGuideFilePath = '/path/to/styles.txt'; // Replace with the actual file path
        fs.readFile(styleGuideFilePath, 'utf8', (err, data) => {
            if (err) {
                vscode.window.showErrorMessage(`Failed to read the style guide file: ${err.message}`);
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
    const codeBlocks = [];
    let currentCodeBlock = '';
    for (const line of lines) {
        if (line.startsWith('//')) {
            // Verbal guideline, ignore for now
            continue;
        }
        if (line.startsWith('```')) {
            // Start of a code block
            if (currentCodeBlock) {
                codeBlocks.push(currentCodeBlock);
            }
            currentCodeBlock = '';
        }
        else {
            // Code line
            currentCodeBlock += line + '\n';
        }
    }
    if (currentCodeBlock) {
        codeBlocks.push(currentCodeBlock);
    }
    // Apply the style guide code blocks to the active document
    editor.edit((editBuilder) => {
        const document = editor.document;
        const lastLine = document.lineAt(document.lineCount - 1);
        const range = new vscode.Range(new vscode.Position(0, 0), lastLine.range.end);
        // Replace the entire document content with the style guide code blocks
        editBuilder.replace(range, codeBlocks.join('\n'));
    });
}
function deactivate() { }
exports.deactivate = deactivate;
