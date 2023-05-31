import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42')
{
    constructor() {
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        });
    }
    
    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any,
    ) {
        const { id, username, emails, displayName, name } = profile;
        const user = {
            id,
            username,
            displayName,
            last_name: name.familyName,
            first_name: name.givenName,
            email: emails[0].value,
            accessToken
        };
        done(null, user);
    }
}