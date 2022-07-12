import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';
import { TransferCertificateDto } from './dto/certificates.dto';
import { Certificate } from './entities/certificate.entity';
import { CertificateStatusEnum } from './enums/certificates.enum';

@Injectable()
export class CertificatesService {
    constructor(
        @InjectModel(Certificate) private readonly certificateRepository: typeof Certificate,
        private readonly usersService: UsersService,
    ) { }

    async transferCurrentUserCertificate(currentUserId: string, transferCertificateDto: TransferCertificateDto) {
        try {
            const currentUser = await this.usersService.findById(currentUserId);

            await this.usersService.findById(transferCertificateDto.ownerId);

            const certificateToTransfer = await this.findById(transferCertificateDto.certificateId);

            if (!currentUser.certificates.some((certificate) => certificate.id === transferCertificateDto.certificateId)) {
                throw new HttpException('This certificate doesn`t owned by current user', HttpStatus.BAD_REQUEST);
            }

            const updatedCertificate = await certificateToTransfer.update({
                ownerId: transferCertificateDto.ownerId,
                status: CertificateStatusEnum.TRANSFERRED,
            });

            return updatedCertificate.reload({ include: { all: true } });
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id: string) {
        try {
            const certificate = await this.certificateRepository.findByPk(id, { include: { all: true } });

            if (!certificate) {
                throw new HttpException('Certificate not found!', HttpStatus.NOT_FOUND);
            }

            return certificate.reload({ include: { all: true } });
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }

    async findMyCertificates(currentUserId: string) {
        try {
            if (!currentUserId) {
                throw new HttpException('currentUserId is required!', HttpStatus.NOT_FOUND);
            }

            await this.usersService.findById(currentUserId);

            return this.certificateRepository.findAll({
                where: { ownerId: currentUserId },
                include: { all: true },
            });
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }

    async findAvailableCertificates() {
        try {
            return this.certificateRepository.findAll({
                where: { status: CertificateStatusEnum.AVAILABLE },
                include: { all: true },
            });
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }
}
