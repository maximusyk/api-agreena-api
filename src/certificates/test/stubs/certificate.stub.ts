import { v4 as uuidv4 } from 'uuid';
import { CertificateEntityDto } from '../../dto/certificates.dto';
import { CertificateStatusEnum } from '../../enums/certificates.enum';

const certificateId = uuidv4();
const userId = uuidv4();

export const certificateStub: CertificateEntityDto = {
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
};