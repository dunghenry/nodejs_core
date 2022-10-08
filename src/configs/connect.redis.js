const { createClient } = require('redis');
// config redis build docker
const client = createClient({
    url: 'redis://redis:6379',
});

//config development
// const client = createClient({});
client.on('connect', () => {
    console.log('Redis plugged in.');
});
client.on('error', (err) => console.log('Redis Client Error', err));
client.on('ready', () => {
    console.log('Client create successfully!');
});
(async () => {
    await client.connect();
})();
module.exports = client;
