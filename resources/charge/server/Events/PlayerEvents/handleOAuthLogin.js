import * as alt from "alt-server";
import axios from 'axios';
import pool from '../../database.js';

alt.onClient('token', async (player, token) => {
    // Validate the token with a GET request to the Discord api
    const request = await axios
        .get('https://discordapp.com/api/users/@me', {
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            }
        })
        .catch((err) => {
            return null;
        });

    // Check if the request was successful and if the neccessary properties are included
    if (!request || !request.data || !request.data.id || !request.data.username) {
        player.kick('Authorization failed');
        return;
    }

    const user = await findUserInDatabase(request.data.id);

    if (user) {
        alt.log(`User already exists: ${user.discord_name} (${user.discord_id})`);
        
    } else {
        await saveUserToDatabase(request.data.id, request.data.username, request.data.discriminator);
        player.setPlayerData(request.data.id, request.data.username, request.data.discriminator);
    }

    const playerData = player.getPlayerData();
    playerData.logPlayerInfo();
});

async function findUserInDatabase(discordId) {
    try {
        const [rows] = await pool.query('SELECT * FROM accounts WHERE discord_id = ?', [discordId]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        alt.logError('Error checking user in database:', error);
        return null;
    }
}

async function saveUserToDatabase(discordId, username, discriminator) {
    try {
        const [result] = await pool.query('INSERT INTO accounts (discord_id, discord_name, discriminator) VALUES (?, ?, ?)', [discordId, username, discriminator]);
        alt.log(`User saved with ID: ${result.insertId}`);
    } catch (error) {
        alt.logError('Error saving user to database:', error);
    }
}