import basicAuth from 'basic-auth'
import { env } from "node:process";

export async function basicAuthMiddleware(req, res, next) {
    const credentials = basicAuth(req);
    console.log(req);
    if (!credentials || credentials.name !== env.User || credentials.pass !== env.Password ) {
        res.set('WWW-Authenticate', 'Basic realm="Protected Area"');
        return res.status(401).send('Authentication required');
    }
    next();
}