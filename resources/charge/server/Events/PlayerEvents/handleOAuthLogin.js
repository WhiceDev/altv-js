import * as alt from "alt-server";
import axios from 'axios';

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

    // Example of returned properties
    alt.log(`Id: ${request.data.id}`);
    alt.log(`Name: ${request.data.username}#${request.data.discriminator}`);
});