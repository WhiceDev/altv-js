

alt.on('playerDeath', handlePlayerDeath);


/**
 * @param {alt.Player} player
 */
function handlePlayerDeath(player) {
  player.spawn(-1291.71, 83.43, 54.89, 5000);
  logMessage(`- Player death (${player.name})`);
}