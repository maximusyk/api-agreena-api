import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthAccess } from '../auth/decorators/auth.decorator';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { JwtAccessPayload } from '../auth/strategies/access-token.strategy';
import { ParamsIdDto } from '../dto/main.dto';
import { CreateUserDto, UpdateUserDto, UserEntityDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiResponse(
        {
            status: 201,
            type: UserEntityDto,
            description: 'User successfully created',
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
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @ApiResponse(
        {
            status: 200,
            type: UserEntityDto,
            isArray: true,
            description: 'Get all users',
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
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @ApiResponse(
        {
            status: 200,
            type: UserEntityDto,
            isArray: true,
            description: 'Update user by ID',
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
    @Get('/me')
    findCurrentUser(@GetCurrentUser() user: JwtAccessPayload) {
        return this.usersService.findById(user?.sub);
    }

    @ApiResponse(
        {
            status: 200,
            type: UserEntityDto,
            description: 'Get user by ID',
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
        status: 404,
        description: 'User not found',
    })
    @ApiResponse({
        status: 500,
        description:
            'The server encountered an unexpected condition that prevented it from fulfilling the request',
    })
    @ApiBearerAuth()
    @AuthAccess()
    @Get(':id')
    findById(@Param() params: ParamsIdDto) {
        return this.usersService.findById(params?.id);
    }

    @ApiResponse(
        {
            status: 200,
            type: UserEntityDto,
            description: 'Update user by ID',
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
        status: 404,
        description: 'User not found',
    })
    @ApiResponse({
        status: 500,
        description:
            'The server encountered an unexpected condition that prevented it from fulfilling the request',
    })
    @ApiBearerAuth()
    @AuthAccess()
    @Patch(':id')
    update(@Param() params: ParamsIdDto, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(params?.id, updateUserDto);
    }

    @ApiResponse(
        {
            status: 200,
            description: 'Remove user by ID',
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
        status: 404,
        description: 'User not found',
    })
    @ApiResponse({
        status: 500,
        description:
            'The server encountered an unexpected condition that prevented it from fulfilling the request',
    })
    @ApiBearerAuth()
    @AuthAccess()
    @Delete(':id')
    remove(@Param() params: ParamsIdDto) {
        return this.usersService.remove(params?.id);
    }
}
