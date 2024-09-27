import * as alt from "alt-server";
import { logMessage } from "../../log.js";
import dotenv from 'dotenv';

dotenv.config();

alt.on('playerConnect', handlePlayerConnect);

/**
 * @param {alt.Player} player
 */
function handlePlayerConnect(player) {
    player.spawn(-1291.71, 83.43, 54.89, 0);
    player.model = 'mp_m_freemode_01';
    logMessage(`+ Player connect (${player.name})`);
    console.log('discord app ' + process.env.DISCORD_APP_ID);
    alt.emitClient(player, 'setDiscordAppId', process.env.DISCORD_APP_ID);
  }