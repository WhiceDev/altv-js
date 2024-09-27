

export function logMessage(message) {
    if(message) {
        const date = new Date();
        let time = date.toLocaleString();
        console.log(`[${time}] ${message}`);
    }
}