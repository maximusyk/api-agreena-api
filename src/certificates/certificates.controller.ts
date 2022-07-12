import { Body, Controller, Get, Patch } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificateEntityDto, TransferCertificateDto } from './dto/certificates.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { JwtAccessPayload } from '../auth/strategies/access-token.strategy';
import { AuthAccess } from '../auth/decorators/auth.decorator';

@Controller('certificates')
@ApiTags('Certificates')
export class CertificatesController {
    constructor(private readonly certificatesService: CertificatesService) {}

    @ApiResponse(
        {
            status: 200,
            type: CertificateEntityDto,
            description: 'Transfer my certificate',
        },
    )
    @ApiBearerAuth()
    @AuthAccess()
    @Patch('transfer')
    transferCurrentUserCertificate(@GetCurrentUser() user: JwtAccessPayload, @Body() transferCertificateDto: TransferCertificateDto) {
        return this.certificatesService.transferCurrentUserCertificate(user?.sub, transferCertificateDto);
    }

    @ApiResponse(
        {
            status: 200,
            type: CertificateEntityDto,
            isArray: true,
            description: 'Find my certificates',
        },
    )
    @ApiBearerAuth()
    @AuthAccess()
    @Get('/my')
    findMyCerificates(@GetCurrentUser() user: JwtAccessPayload) {
        return this.certificatesService.findMyCertificates(user?.sub);
    }

    @ApiResponse(
        {
            status: 200,
            type: CertificateEntityDto,
            isArray: true,
            description: 'Available certificates',
        },
    )
    @ApiBearerAuth()
    @AuthAccess()
    @Get('/available')
    findAvailable() {
        return this.certificatesService.findAvailableCertificates();
    }
}
