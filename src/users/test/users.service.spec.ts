import { Test } from '@nestjs/testing';
import { JwtAccessPayload } from '../../auth/strategies/access-token.strategy';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';
import { User } from '../entities/user.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';

jest.mock('../users.service');

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [UsersController],
            providers: [UsersService],
        }).compile();

        usersController = moduleRef.get<UsersController>(UsersController);
        usersService = moduleRef.get<UsersService>(UsersService);
        jest.clearAllMocks();
    });

    describe('findById', () => {
        describe('when findById is called', () => {
            let user: User;

            beforeEach(async () => {
                user = await usersService.findById(userStub.id);
            });

            test('then it should call usersService', () => {
                expect(usersService.findById).toBeCalledWith(userStub.id);
            });

            test('then it should return user', () => {
                expect(user).toEqual(userStub);
            });
        });
    });

    describe('findCurrentUser', () => {
        describe('when findCurrentUser is called', () => {
                let user: User;
                const jwtAccessPayload: JwtAccessPayload = {
                    sub: userStub.id,
                    email: userStub.email,
                };

                beforeEach(async () => {
                    user = await usersService.findById(jwtAccessPayload.sub);
                });

                test('then it should call usersService', () => {
                    expect(usersService.findById).toBeCalledWith(jwtAccessPayload.sub);
                });

                test('then it should return user', () => {
                    expect(user).toEqual(userStub);
                });
            },
        );
    });

    describe('findAll', () => {
        describe('when findAll is called', () => {
            let users: User[];

            beforeEach(async () => {
                users = await usersService.findAll();
            });

            test('then it should call usersService', () => {
                expect(usersService.findAll).toBeCalled();
            });

            test('then it should return users', () => {
                expect(users).toEqual([userStub]);
            });
        });
    });

    describe('create', () => {
        describe('when create is called', () => {
            let user: User;
            let createUserDto: CreateUserDto;

            beforeEach(async () => {
                createUserDto = {
                    firstName: userStub.firstName,
                    lastName: userStub.lastName,
                    username: userStub.username,
                    email: userStub.email,
                    phone: userStub.phone,
                    password: userStub.password,
                };
                user = await usersService.create(createUserDto);
            });

            test('then it should call usersService', () => {
                expect(usersService.create).toHaveBeenCalledWith(createUserDto);
            });

            test('then it should return user', () => {
                expect(user).toEqual(userStub);
            });
        });
    });

    describe('update', () => {
        describe('when update is called', () => {
            let user: User;
            let updateUserDto: UpdateUserDto;

            beforeEach(async () => {
                updateUserDto = {
                    firstName: userStub.firstName,
                    lastName: userStub.lastName,
                    username: userStub.username,
                    email: userStub.email,
                    phone: userStub.phone,
                    password: userStub.password,
                };
                user = await usersService.update(userStub.id, updateUserDto);
            });

            test('then it should call usersService', () => {
                expect(usersService.update).toHaveBeenCalledWith(userStub.id, updateUserDto);
            });

            test('then it should return user', () => {
                expect(user).toEqual(userStub);
            });
        });
    });

});