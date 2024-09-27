import * as alt from "alt-server";
import { logMessage } from "./log.js";
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';

// __dirname in ES-Modulen nachbilden
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dynamisch alle Dateien in einem Verzeichnis laden
const loadEvents = async (directory) => {
    const dirPath = path.join(__dirname, directory);
    fs.readdirSync(dirPath).forEach(async file => {
        if (file.endsWith('.js')) {
            const fullPath = path.join(dirPath, file);
            // Konvertiere den absoluten Pfad in eine `file://`-URL
            const fileUrl = pathToFileURL(fullPath).href;
            try {
                await import(fileUrl); // Dynamischer Import mit URL
            } catch (err) {
                console.error(`Fehler beim Laden von ${file}:`, err);
            }
        }
    });
};

// Lade alle Events aus dem Ordner `events/playerEvents`
loadEvents('./events/playerEvents');

console.log('Server gestartet und Events geladen.');


 
