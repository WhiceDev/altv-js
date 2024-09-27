import * as alt from 'alt-server';
import { Events } from '../shared/events.js';

class PlayerData {
    constructor(player, discordId, username, discriminator) {
        this.player = player;
        this.discordId = discordId;
        this.username = username;
        this.discriminator = discriminator;
        this.isFrozen = false;
    }

    toggleFreeze() {
        this.isFrozen = !this.isFrozen;
        alt.log(`${this.username} is now ${this.isFrozen ? 'frozen' : 'unfrozen'}.`);
    }

    logPlayerInfo() {
        alt.log(`Player Info - Discord ID: ${this.discordId}, Username: ${this.username}, Discriminator: ${this.discriminator}`);
    }
}

alt.Player.prototype.playerData = null;

alt.Player.prototype.setPlayerData = function(discordId, username, discriminator) {
    this.playerData = new PlayerData(this, discordId, username, discriminator);
};

alt.Player.prototype.getPlayerData = function() {
    return this.playerData;
};

export default PlayerData;