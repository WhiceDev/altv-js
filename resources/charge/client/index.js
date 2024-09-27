import * as alt from "alt-client";


alt.on('playerConnect', handleConnect);


/**
 * @param {alt.Player} player
 */
function handleConnect(player) {
  player.spawn(-1291.71, 83.43, 54.89, 0);
  player.model = `mp_m_freemode_01`;
}