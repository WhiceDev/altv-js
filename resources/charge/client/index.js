import * as alt from "alt-client";
import * as native from 'natives';

var freezed = false;

alt.on('consoleCommand', (command, ...args) => {
    alt.log(`Command: ${command} | Args: ${args} | Player: ${alt.Player.local.name}`);
    
    switch(command) {
        case 'veh': {
            alt.log('createVeh');
            break;
        }
        case 'freeze': {
            if(freezed) freezed = false;
            else freezed = true;
            native.freezeEntityPosition(alt.Player.local.scriptID, freezed);
            break;
        }
    }

});

import * as alt from "alt-server";
import { logMessage } from "../../log.js";

alt.on('playerConnect', handlePlayerConnect);

/**
 * @param {alt.Player} player
 */
function handlePlayerConnect(player) {
    player.spawn(-1291.71, 83.43, 54.89, 0);
    player.model = 'mp_m_freemode_01';
    logMessage(`+ Player connect (${player.name})`);
  }

  async function getOAuthToken() {
    try {
        const token = await alt.Discord.requestOAuth2Token(process.env.DISCORD_APP_ID);
        alt.emitServer('token', token);
    } catch (e) {
        // Error can be due invalid app id, discord server issues or the user denying access.
        alt.logError(e);
    }
}

getOAuthToken();