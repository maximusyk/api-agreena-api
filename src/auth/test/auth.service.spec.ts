import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { CreateUserDto } from '../../users/dto/users.dto';
import { userStub } from '../../users/test/stubs/user.stub';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthTokensDto, SigninLocalDto } from '../dto/auth.dto';
import { AccessTokenStrategy } from '../strategies/access-token.strategy';
import { JwtRefreshPayload, RefreshTokenStrategy } from '../strategies/refresh-token.strategy';
import { authTokensStub } from './stubs/auth-tokens.stub';

jest.mock('../auth.service');
// const ENV_PATH = process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : '.env';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            ],
            controllers: [AuthController],
            providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, ConfigService],
        }).compile();

        authController = moduleRef.get<AuthController>(AuthController);
        authService = moduleRef.get<AuthService>(AuthService);
        jest.clearAllMocks();
    });

    describe('signupLocal', () => {
        describe('when signupLocal is called', () => {
            let authTokens: AuthTokensDto;
            const signupData: CreateUserDto = {
                firstName: userStub.firstName,
                lastName: userStub.lastName,
                username: userStub.username,
                email: userStub.email,
                phone: userStub.phone,
                password: userStub.password,
            };

            beforeEach(async () => {
                authTokens = await authService.signupLocal(signupData);
            });

            test('then it should call AuthService', () => {
                expect(authService.signupLocal).toBeCalledWith(signupData);
            });

            test('then it should return tokens', () => {
                expect(authTokens).toEqual(authTokensStub());
            });
        });
    });

    describe('signinLocal', () => {
        describe('when signinLocal is called', () => {
                let authTokens: AuthTokensDto;
                const signinData: SigninLocalDto = {
                    email: userStub.email,
                    password: userStub.password,
                };

                beforeEach(async () => {
                    authTokens = await authService.signinLocal(signinData);
                });

                test('then it should call AuthService', () => {
                    expect(authService.signinLocal).toBeCalledWith(signinData);
                });

                test('then it should return tokens', () => {
                    expect(authTokens).toEqual(authTokensStub());
                });
            },
        );
    });

    describe('refreshTokens', () => {
        describe('when refreshTokens is called', () => {
                let authTokens: AuthTokensDto;
                const refreshData: JwtRefreshPayload = {
                    sub: userStub.id,
                    email: userStub.email,
                    refreshToken: authTokensStub().refreshToken,
                };

                beforeEach(async () => {
                    authTokens = await authService.refreshTokens(refreshData.sub, refreshData.refreshToken);
                });

                test('then it should call AuthService', () => {
                    expect(authService.refreshTokens).toBeCalledWith(refreshData.sub, refreshData.refreshToken);
                });

                test('then it should return tokens', () => {
                    expect(authTokens).toEqual(authTokensStub());
                });
            },
        );
    });
});