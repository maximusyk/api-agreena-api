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
    @ApiResponse({
        status: 400,
        description: 'Required attributes were missing',
    })
    @ApiResponse({
        status: 403,
        description: 'Access to the requested resource is forbidden',
    })
    @ApiResponse({
        status: 500,
        description:
            'The server encountered an unexpected condition that prevented it from fulfilling the request',
    })
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
    @ApiResponse({
        status: 400,
        description: 'Required attributes were missing',
    })
    @ApiResponse({
        status: 403,
        description: 'Access to the requested resource is forbidden',
    })
    @ApiResponse({
        status: 500,
        description:
            'The server encountered an unexpected condition that prevented it from fulfilling the request',
    })
    @Post('/local/signin')
    async signinLocal(@Body() signinData: SigninLocalDto, @Res({ passthrough: true }) response: Response): Promise<AuthTokensDto> {
        const tokens = await this.authService.signinLocal(signinData);
        const expiresDate = Date.now() + eval(this.configService.get('JWT_REFRESH_TOKEN_LIFETIME') || '60*60*24*30');
        response.cookie(
            'refreshToken',
            tokens.refreshToken,
            { httpOnly: true, expires: new Date(expiresDate) },
        );
        return tokens;
    }

    @ApiResponse(
        {
            status: 200,
            description: 'User successfully logged out',
        },
    )
    @ApiResponse({
        status: 400,
        description: 'Required attributes were missing',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
    })
    @ApiResponse({
        status: 403,
        description: 'Access to the requested resource is forbidden',
    })
    @ApiResponse({
        status: 500,
        description:
            'The server encountered an unexpected condition that prevented it from fulfilling the request',
    })
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
    @ApiResponse({
        status: 400,
        description: 'Required attributes were missing',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
    })
    @ApiResponse({
        status: 403,
        description: 'Access to the requested resource is forbidden',
    })
    @ApiResponse({
        status: 500,
        description:
            'The server encountered an unexpected condition that prevented it from fulfilling the request',
    })
    @ApiBearerAuth()
    @AuthRefresh()
    @Post('/refresh')
    async refreshTokens(@GetCurrentUser() user: JwtRefreshPayload, @Res({ passthrough: true }) response: Response): Promise<AuthTokensDto> {
        const tokens = await this.authService.refreshTokens(user.sub, user.refreshToken);
        const expiresDate = Date.now() + eval(this.configService.get('JWT_REFRESH_TOKEN_LIFETIME') || '60*60*24*30');
        response.cookie(
            'refreshToken',
            tokens.refreshToken,
            { httpOnly: true, expires: new Date(expiresDate) },
        );
        return tokens;
    }
}

