const vscode = require('vscode');
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

/**
 * @param {vscode.ExtensionContext} context
*/

 let statusBarItem = null;
 let currentStatusMessage = null;
 let currentStatusTimeout = null;

function getThemeForDark(dark) {
	const workbenchConfiguration = vscode.workspace.getConfiguration('workbench');
	const theme = workbenchConfiguration.get(dark ? 'preferredDarkColorTheme' : 'preferredLightColorTheme');
	return theme;
}

function toggleTheme() {

	if (today.getHours() >= 12) {
		vscode.window.showInformationMessage("Es ist nach 12 Uhr");

	} else {
		vscode.window.showInformationMessage("Es ist vor 12 Uhr");
	}

	/*
	try {
		const currentTheme = vscode.workspace.getConfiguration('workbench').get('colorTheme');
		const isDark = currentTheme === getThemeForDark(true);
		const setDark = !isDark;
		const newTheme = getThemeForDark(setDark);
		if (newTheme && newTheme !== currentTheme) {
			vscode.workspace.getConfiguration('workbench').update('colorTheme', newTheme, vscode.ConfigurationTarget.Global);
			//statusMessage(`${setDark ? 'Dark' : 'Light'}`);
		}
	} catch(e) {
		console.error(e);
		vscode.window.showErrorMessage(`Error toggling theme`);
	}*/
}

function activate(context) {
	const commandId = 'auto-dark-mode-windows.toggle';
	let disposable = vscode.commands.registerCommand(commandId, toggleTheme);
	context.subscriptions.push(disposable);
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = commandId;
	context.subscriptions.push(statusBarItem);
	updateStatusBarItem();
}

function updateStatusBarItem() {
	if (!statusBarItem) return;
	let text = `$(color-mode)`;
	if (currentStatusMessage) {
		text = text + ' ' + currentStatusMessage;
	}
	statusBarItem.text = text;
	const autoDetectColorScheme = vscode.workspace.getConfiguration('window').get('autoDetectColorScheme');
	if (autoDetectColorScheme) {
		statusBarItem.tooltip = `Toggle dark/light theme.\nTracking system theme.`;
	} else {
		statusBarItem.tooltip = `Toggle dark/light theme.\nSet 'window.autoDetectColorScheme' to track system theme.`;
	}
	statusBarItem.show();
}

/*function statusMessage(message) {
	const timeout = 2000;
	if (currentStatusTimeout) {
		clearTimeout(currentStatusTimeout);
		currentStatusTimeout = null;
	}
	if (!statusBarItem) {
		if (message) {
			vscode.window.setStatusBarMessage(message, timeout);
		}
		return;
	}
	currentStatusMessage = message;
	updateStatusBarItem();
	currentStatusTimeout = setTimeout(() => {
		statusMessage(null);
	}, timeout);
}*/


/*function activate(context) {

	vscode.window.showInformationMessage("Extention loaded");

	if (today.getHours() >= 12) {
		vscode.window.showInformationMessage("Es ist nach 12 Uhr");
	} else {
		vscode.window.showInformationMessage("Es ist vor 12 Uhr");
	}

	console.log('Congratulations, your extension "auto-theme" is now active!');

	let disposable = vscode.commands.registerCommand('auto-theme.helloWorld', function () {
		if (today.getHours() >= 12) {
			vscode.window.showInformationMessage("Es ist nach 12 Uhr");
		} else {
			vscode.window.showInformationMessage("Es ist vor 12 Uhr");
		}
		vscode.window.showInformationMessage('Hello World from auto-theme!');
	});

	context.subscriptions.push(disposable);
}*/

module.exports = {
	activate
}
