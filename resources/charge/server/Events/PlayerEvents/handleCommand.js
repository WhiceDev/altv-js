import * as alt from 'alt-server';
import { logMessage } from '../../log.js';

alt.on('consoleCommand', handleConsoleCommand);

/**
 * @param {string[]} ..args
 */
function handleConsoleCommand(...args) {
    logMessage(command);
}