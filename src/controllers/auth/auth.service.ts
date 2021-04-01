import * as jwt from 'jsonwebtoken';
import { getUser } from '../user/user.service';

const users = [
    {
        id: 123,
        role: "basic",
        name: "Basic Thomas",
        username: "basic-thomas",
        password: "sR-_pcoow-27-6PAwCD8",
    },
    {
        id: 434,
        role: "premium",
        name: "Premium Jim",
        username: "premium-jim",
        password: "GBLtTyq3E_UNjFnpo9m6",
    },
];

export class AuthError extends Error { }

export const authFactory = (secret: string) => async (username: string, password: string) => {
    // const user = users.find((u) => u.username === username);

    const user = await getUser({ username });
    const passwordValidate = await user.validatePassword(password)
        .catch(err => {
            throw new AuthError("invalid username or password");
        })
    if (!user || !passwordValidate) {
        throw new AuthError("invalid username or password");
    }

    return jwt.sign(
        {
            userId: user.id,
            name: user.name,
            role: user.role,
        },
        secret,
        {
            issuer: "https://www.netguru.com/",
            subject: `${user.id}`,
            expiresIn: 30 * 60,
        }
    );
};

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

export const auth = authFactory(JWT_SECRET);