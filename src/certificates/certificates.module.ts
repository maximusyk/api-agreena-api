import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { CertificatesController } from './certificates.controller';
import { CertificatesService } from './certificates.service';
import { Certificate } from './entities/certificate.entity';

@Module({
    imports: [
        SequelizeModule.forFeature([Certificate]),
        UsersModule,
    ],
    controllers: [CertificatesController],
    providers: [CertificatesService],
})
export class CertificatesModule {}
