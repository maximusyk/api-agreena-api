import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type JwtAccessPayload = {
    sub: string,
    email: string,
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access') {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_ACCESS_KEY || 'secret',
        });
    }

    validate(payload: JwtAccessPayload) {
        return payload;
    }
}