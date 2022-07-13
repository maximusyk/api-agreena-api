import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthAccess } from '../auth/decorators/auth.decorator';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { JwtAccessPayload } from '../auth/strategies/access-token.strategy';
import { CertificatesService } from './certificates.service';
import { CertificateEntityDto, TransferCertificateDto } from './dto/certificates.dto';

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
    @ApiResponse({
        status: 400,
        description: 'Required attributes were missing',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
    })
    @ApiResponse({
        status: 403,
        description: 'Access to the requested resource is forbidden',
    })
    @ApiResponse({
        status: 404,
        description: 'User receiver not found',
    })
    @ApiResponse({
        status: 500,
        description:
            'The server encountered an unexpected condition that prevented it from fulfilling the request',
    })
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
    @ApiResponse({
        status: 400,
        description: 'Required attributes were missing',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
    })
    @ApiResponse({
        status: 403,
        description: 'Access to the requested resource is forbidden',
    })
    @ApiResponse({
        status: 500,
        description:
            'The server encountered an unexpected condition that prevented it from fulfilling the request',
    })
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
    @ApiResponse({
        status: 400,
        description: 'Required attributes were missing',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
    })
    @ApiResponse({
        status: 403,
        description: 'Access to the requested resource is forbidden',
    })
    @ApiResponse({
        status: 500,
        description:
            'The server encountered an unexpected condition that prevented it from fulfilling the request',
    })
    @ApiBearerAuth()
    @AuthAccess()
    @Get('/available')
    findAvailable() {
        return this.certificatesService.findAvailableCertificates();
    }
}
