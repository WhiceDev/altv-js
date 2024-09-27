import * as alt from "alt-client";
import { logMessage } from "./log";


alt.on('playerConnect', handlePlayerConnect);
alt.on('playerDeath', handlePlayerDeath);


/**
 * @param {alt.Player} player
 */
function handlePlayerConnect(player) {
  player.spawn(-1291.71, 83.43, 54.89, 0);
  player.model = 'mp_m_freemode_01';
  logMessage(`+ Player connect (${player.name})`);
}

/**
 * @param {alt.Player} player
 */
function handlePlayerDeath(player) {
  player.spawn(-1291.71, 83.43, 54.89, 5000);
  logMessage(`- Player death (${player.name})`);
}

