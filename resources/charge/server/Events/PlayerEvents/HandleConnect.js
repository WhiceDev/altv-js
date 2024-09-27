

alt.on('playerConnect', handlePlayerConnect);

/**
 * @param {alt.Player} player
 */
function handlePlayerConnect(player) {
    player.spawn(-1291.71, 83.43, 54.89, 0);
    player.model = 'mp_m_freemode_01';
    logMessage(`+ Player connect (${player.name})`);
  }