import * as assert from 'assert';
import * as vscode from 'vscode';

suite('CodingStyleExtension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('ApplyCodingStyle should format the code according to the style guidelines', async () => {
        // Open the styles.txt file
        const stylesFile = await vscode.workspace.openTextDocument('/path/to/styles.txt');
        const stylesText = stylesFile.getText();

        // Get the active editor
        const editor = vscode.window.activeTextEditor;

        // Set the code to be formatted
        const codeToFormat = `
            function helloWorld() {
                console.log("Hello, World!");
            }
        `;

        // Apply the coding style
        const formattedCode = await vscode.commands.executeCommand('applyCodingStyle', codeToFormat, stylesText);

        // Verify that the code is formatted correctly
        assert.strictEqual(formattedCode, `function helloWorld() {
    console.log("Hello, World!");
}`);
    });
});
