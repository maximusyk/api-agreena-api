import { Test } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { JwtAccessPayload } from '../../auth/strategies/access-token.strategy';
import { userStub } from '../../users/test/stubs/user.stub';
import { CertificatesController } from '../certificates.controller';
import { CertificatesService } from '../certificates.service';
import { TransferCertificateDto } from '../dto/certificates.dto';
import { Certificate } from '../entities/certificate.entity';
import { certificateStub } from './stubs/certificate.stub';

jest.mock('../certificates.service');

describe('CertificatesController', () => {
    let certificatesController: CertificatesController;
    let certificatesService: CertificatesService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [CertificatesController],
            providers: [CertificatesService],
        }).compile();

        certificatesController = moduleRef.get<CertificatesController>(CertificatesController);
        certificatesService = moduleRef.get<CertificatesService>(CertificatesService);
        jest.clearAllMocks();
    });

    describe('transferCurrentUserCertificate', () => {
        describe('when transferCurrentUserCertificate is called', () => {
            let certificate: Certificate;
            const currentUser: JwtAccessPayload = {
                sub: userStub.id,
                email: userStub.email,
            };
            const transferCertificateDto: TransferCertificateDto = {
                ownerId: uuidv4(),
                certificateId: certificateStub.id,
            };

            beforeEach(async () => {
                certificate = await certificatesService.transferCurrentUserCertificate(
                    currentUser.sub,
                    transferCertificateDto,
                );
            });

            test('then it should call CertificatesService', () => {
                expect(certificatesService.transferCurrentUserCertificate).toBeCalledWith(
                    currentUser.sub,
                    transferCertificateDto,
                );
            });

            test('then it should return certificate', () => {
                expect(certificate).toEqual(certificateStub);
            });
        });
    });

    describe('findMyCerificates', () => {
        describe('when findMyCerificates is called', () => {
                let certificates: Certificate[];
                const currentUser: JwtAccessPayload = {
                    sub: userStub.id,
                    email: userStub.email,
                };

                beforeEach(async () => {
                    certificates = await certificatesService.findMyCertificates(currentUser.sub);
                });

                test('then it should call CertificatesService', () => {
                    expect(certificatesService.findMyCertificates).toBeCalledWith(currentUser.sub);
                });

                test('then it should return user', () => {
                    expect(certificates).toEqual([certificateStub]);
                });
            },
        );
    });

    describe('findAvailable', () => {
        describe('when findAll is called', () => {
            let certificates: Certificate[];

            beforeEach(async () => {
                certificates = await certificatesService.findAvailableCertificates();
            });

            test('then it should call CertificatesService', () => {
                expect(certificatesService.findAvailableCertificates).toBeCalled();
            });

            test('then it should return users', () => {
                expect(certificates).toEqual([certificateStub]);
            });
        });
    });
});