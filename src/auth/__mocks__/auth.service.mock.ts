import { authTokensStub } from '../test/stubs/auth-tokens.stub';

export const AuthService = jest.fn().mockReturnValue({
    signTokens: jest.fn().mockResolvedValue(authTokensStub()),
    signupLocal: jest.fn().mockResolvedValue(authTokensStub()),
    signinLocal: jest.fn().mockResolvedValue(authTokensStub()),
    logout: jest.fn(),
    refreshTokens: jest.fn().mockResolvedValue(authTokensStub()),
});