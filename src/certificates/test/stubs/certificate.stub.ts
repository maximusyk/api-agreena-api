import { v4 as uuidv4 } from 'uuid';
import { userStub } from '../../../users/test/stubs/user.stub';
import { CertificateEntityDto } from '../../dto/certificates.dto';
import { CertificateStatusEnum } from '../../enums/certificates.enum';

const certificateId = uuidv4();

export const certificateStub = (): CertificateEntityDto => ({
    id: certificateId,
    country: 'Ukraine',
    status: CertificateStatusEnum.OWNED,
    ownerId: userStub().id,
    owner: userStub(),
    createdAt: new Date(),
    updatedAt: new Date(),
});