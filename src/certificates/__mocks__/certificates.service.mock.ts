import { certificateStub

();
}
from;
'../test/stubs/certificate.stub';

export const CertificatesService = jest.fn().mockReturnValue({
    transferCurrentUserCertificate: jest.fn().mockResolvedValue(certificateStub()),
    findById: jest.fn().mockResolvedValue(certificateStub()),
    findMyCertificates: jest.fn().mockResolvedValue([certificateStub()]),
    findAvailableCertificates: jest.fn().mockResolvedValue([certificateStub()]),
});