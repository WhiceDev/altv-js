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

alt.onServer('setDiscordAppId', (appId) => {
    console.log('test ' + appId);
    getOAuthToken(appId);
});

async function getOAuthToken(appId) {
    console.log('test');
    try {
        const token = await alt.Discord.requestOAuth2Token(appId);
        alt.emitServer('token', token);
    } catch (e) {
        // Error can be due invalid app id, discord server issues or the user denying access.
        alt.logError(e);
    }
}