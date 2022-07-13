import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CertificateEntityDto } from '../../certificates/dto/certificates.dto';

export class UserEntityDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ isArray: true, type: () => CertificateEntityDto, required: false })
    certificates?: CertificateEntityDto[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

}

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    @ApiProperty()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;
}

export class RegisterUserDto extends CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    hashedPassword: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    firstName?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    lastName?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    username?: string;

    @IsOptional()
    @IsEmail()
    @ApiProperty({ required: false })
    email?: string;

    @IsOptional()
    @IsPhoneNumber()
    @ApiProperty({ required: false })
    phone?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    password?: string;
}