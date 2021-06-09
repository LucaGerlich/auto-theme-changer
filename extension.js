const vscode = require('vscode');
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "auto-theme" is now active!');

	let disposable = vscode.commands.registerCommand('auto-theme.helloWorld', function () {
		if (today.getHours() >= 12) {
			vscode.window.showInformationMessage("Es ist nach 12 Uhr");
			vscode.window.activeColorTheme
		} else {
			vscode.window.showInformationMessage("Es ist vor 12 Uhr");
		}
		vscode.window.showInformationMessage('Hello World from auto-theme!');
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
