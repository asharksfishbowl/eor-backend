declare module 'passport-jwt' {
    import { Strategy as PassportStrategy } from 'passport-strategy';

    export interface JwtFromRequestFunction {
        (req: Request): string | null;
    }

    export class ExtractJwt {
        static fromHeader(headerName: string): JwtFromRequestFunction;
        static fromBodyField(fieldName: string): JwtFromRequestFunction;
        static fromUrlQueryParameter(paramName: string): JwtFromRequestFunction;
        static fromAuthHeaderAsBearerToken(): JwtFromRequestFunction;
        static fromAuthHeaderWithScheme(authScheme: string): JwtFromRequestFunction;
    }

    export interface StrategyOptions {
        jwtFromRequest: JwtFromRequestFunction;
        secretOrKey: string | Buffer;
        issuer?: string;
        audience?: string;
        algorithms?: string[];
        ignoreExpiration?: boolean;
        passReqToCallback?: boolean;
        jsonWebTokenOptions?: Record<string, unknown>;
    }

    export class Strategy extends PassportStrategy {
        constructor(
            options: StrategyOptions,
            verify: (payload: any, done: (error: any, user?: any) => void) => void
        );
    }
}
