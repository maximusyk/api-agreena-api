import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Certificate } from './entities/certificate.entity';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Certificate]),
        UsersModule,
    ],
    controllers: [CertificatesController],
    providers: [CertificatesService],
})
export class CertificatesModule {}
