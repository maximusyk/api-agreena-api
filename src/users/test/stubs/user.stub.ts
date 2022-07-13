import { v4 as uuidv4 } from 'uuid';
import { CertificateStatusEnum } from '../../../certificates/enums/certificates.enum';
import { UserEntityDto } from '../../dto/users.dto';

const userId = uuidv4();
const certificateId = uuidv4();

export const userStub: UserEntityDto = {
    id: userId,
    firstName: 'Foo',
    lastName: 'Bar',
    email: 'foo.bar@example.com',
    username: 'foo.bar',
    phone: '+102022233344',
    password: 'pwdHash',
    certificates: [
        {
            id: certificateId,
            country: 'Ukraine',
            status: CertificateStatusEnum.OWNED,
            ownerId: userId,
            owner: {
                id: userId,
                firstName: 'Foo',
                lastName: 'Bar',
                email: 'foo.bar@example.com',
                username: 'foo.bar',
                phone: '+102022233344',
                password: 'pwdHash',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
};