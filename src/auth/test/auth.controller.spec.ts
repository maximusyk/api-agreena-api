import { Test } from '@nestjs/testing';
import { Response } from 'express';
import { CreateUserDto } from '../../users/dto/users.dto';
import { userStub } from '../../users/test/stubs/user.stub';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthTokensDto, SigninLocalDto } from '../dto/auth.dto';
import { JwtAccessPayload } from '../strategies/access-token.strategy';
import { JwtRefreshPayload } from '../strategies/refresh-token.strategy';
import { authTokensStub } from './stubs/auth-tokens.stub';

jest.mock('../auth.service');

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [AuthController],
            providers: [AuthService],
        }).compile();

        authController = moduleRef.get<AuthController>(AuthController);
        authService = moduleRef.get<AuthService>(AuthService);
        jest.clearAllMocks();
    });

    describe('signupLocal', () => {
        describe('when signupLocal is called', () => {
            let authTokens: AuthTokensDto;
            const signupData: CreateUserDto = {
                firstName: userStub().firstName,
                lastName: userStub().lastName,
                username: userStub().username,
                email: userStub().email,
                phone: userStub().phone,
                password: userStub().password,
            };

            beforeEach(async () => {
                authTokens = await authController.signupLocal(signupData);
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
                let response: Response;
                const signinData: SigninLocalDto = {
                    email: userStub().email,
                    password: userStub().password,
                };

                beforeEach(async () => {
                    authTokens = await authController.signinLocal(signinData, response);
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
                let response: Response;
                const refreshData: JwtRefreshPayload = {
                    sub: userStub().id,
                    email: userStub().email,
                    refreshToken: authTokensStub().refreshToken,
                };

                beforeEach(async () => {
                    authTokens = await authController.refreshTokens(refreshData, response);
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

    describe('logout', () => {
        describe('when logout is called', () => {
            let response: Response;
            const currentUser: JwtAccessPayload = {
                sub: userStub().id,
                email: userStub().email,
            };

            beforeEach(async () => {
                await authController.logout(currentUser, response);
            });

            test('then it should call AuthService', () => {
                expect(authService.logout);
            });
        });
    });
});