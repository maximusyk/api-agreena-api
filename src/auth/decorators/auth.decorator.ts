import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const AuthAccess = () => {
    return applyDecorators(
        UseGuards(AuthGuard('jwt-access')),
    );
};

export const AuthRefresh = () => {
    return applyDecorators(
        UseGuards(AuthGuard('jwt-refresh')),
    );
};