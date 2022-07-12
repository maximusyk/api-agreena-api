import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserEntityDto } from '../../users/dto/users.dto';
import { User } from '../../users/entities/user.entity';
import { CertificateStatusEnum } from '../enums/certificates.enum';

export class CertificateEntityDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    country: string;

    @ApiProperty({ enum: CertificateStatusEnum })
    status: CertificateStatusEnum;

    @ApiProperty()
    ownerId: string;

    @ApiProperty({ type: () => UserEntityDto })
    owner: User;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    deletedAt: Date;
}

export class CreateCertificateDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    country: string;

    @IsOptional()
    @IsUUID(4)
    @ApiProperty({ required: false })
    ownerId?: string;
}

export class UpdateCertificateDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    country?: string;

    @IsOptional()
    @IsUUID(4)
    @ApiProperty({ required: false })
    ownerId?: string;
}

export class TransferCertificateDto {
    @IsNotEmpty()
    @IsUUID(4)
    @ApiProperty()
    ownerId: string;

    @IsNotEmpty()
    @IsUUID(4)
    @ApiProperty()
    certificateId: string;
}