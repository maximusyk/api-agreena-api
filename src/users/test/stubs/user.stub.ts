import { v4 as uuidv4 } from 'uuid';
import { certificateStub } from '../../../certificates/test/stubs/certificate.stub';
import { UserEntityDto } from '../../dto/users.dto';

const userId = uuidv4();

export const userStub = (): UserEntityDto => ({
    id: userId,
    firstName: 'Foo',
    lastName: 'Bar',
    email: 'foo.bar@example.com',
    username: 'foo.bar',
    phone: '+102022233344',
    password: 'pwdHash',
    certificates: [
        certificateStub(),
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
});