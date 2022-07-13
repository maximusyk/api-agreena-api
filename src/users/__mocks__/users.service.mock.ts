import { HttpStatus } from '@nestjs/common';
import { userStub } from '../test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
    create: jest.fn().mockResolvedValue(userStub()),
    findAll: jest.fn().mockResolvedValue([userStub()]),
    findById: jest.fn().mockResolvedValue(userStub()),
    findByLogin: jest.fn().mockResolvedValue(userStub()),
    update: jest.fn().mockResolvedValue(userStub()),
    remove: jest.fn().mockResolvedValue({ statusCode: HttpStatus.OK, message: 'Success!' }),
});