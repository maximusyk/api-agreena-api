import { Body, Controller, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/users.dto';
import { AuthService } from './auth.service';
import { AuthAccess, AuthRefresh } from './decorators/auth.decorator';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { AuthTokensDto, SigninLocalDto } from './dto/auth.dto';
import { JwtAccessPayload } from './strategies/access-token.strategy';
import { JwtRefreshPayload } from './strategies/refresh-token.strategy';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {}

    @ApiResponse(
        {
            status: 200,
            type: AuthTokensDto,
            description: 'User successfully registered and signed in',
        },
    )
    @Post('/local/signup')
    signupLocal(@Body() signupData: CreateUserDto): Promise<AuthTokensDto> {
        return this.authService.signupLocal(signupData);
    }

    @ApiResponse(
        {
            status: 200,
            type: AuthTokensDto,
            description: 'User successfully signed in',
        },
    )
    @Post('/local/signin')
    async signinLocal(@Body() signinData: SigninLocalDto, @Res({ passthrough: true }) response: Response): Promise<AuthTokensDto> {
        const tokens = await this.authService.signinLocal(signinData);
        response.cookie(
            'refreshToken',
            tokens.refreshToken,
            { httpOnly: true, expires: this.configService.get('JWT_REFRESH_TOKEN_LIFETIME') },
        );
        return tokens;
    }

    @ApiResponse(
        {
            status: 200,
            description: 'User successfully logged out',
        },
    )
    @ApiBearerAuth()
    @AuthAccess()
    @Post('/logout')
    async logout(@GetCurrentUser() user: JwtAccessPayload, @Res({ passthrough: true }) response: Response): Promise<void> {
        await this.authService.logout(user.sub);
        response.clearCookie('refreshToken');
    }

    @ApiResponse(
        {
            status: 200,
            type: AuthTokensDto,
            description: 'User tokens successfully refreshed',
        },
    )
    @ApiBearerAuth()
    @AuthRefresh()
    @Post('/refresh')
    async refreshTokens(@GetCurrentUser() user: JwtRefreshPayload, @Res({ passthrough: true }) response: Response): Promise<AuthTokensDto> {
        const tokens = await this.authService.refreshTokens(user.sub, user.refreshToken);
        response.cookie(
            'refreshToken',
            tokens.refreshToken,
            { httpOnly: true, expires: this.configService.get('JWT_REFRESH_TOKEN_LIFETIME') },
        );
        return tokens;
    }
}

