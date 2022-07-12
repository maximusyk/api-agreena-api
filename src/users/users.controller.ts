import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserEntityDto } from './dto/users.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamsIdDto } from '../dto/main.dto';
import { AuthAccess } from '../auth/decorators/auth.decorator';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { JwtAccessPayload } from '../auth/strategies/access-token.strategy';

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
            description: 'Update user by ID',
        },
    )
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
    @ApiBearerAuth()
    @AuthAccess()
    @Delete(':id')
    remove(@Param() params: ParamsIdDto) {
        return this.usersService.remove(params?.id);
    }
}
