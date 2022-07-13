import { AuthTokensDto } from '../../dto/auth.dto';

export const authTokensStub = (): AuthTokensDto => ({
    accessToken: 'AccessToken',
    refreshToken: 'RefreshToken',
});