import { createClient } from 'redis';

const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT
    }
});

client.on('error', (err) => {
    console.error('Redis client error', err);
});

client.connect();

export default client;