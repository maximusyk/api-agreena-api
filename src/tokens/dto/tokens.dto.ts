import { ApiProperty } from '@nestjs/swagger';
import { UserEntityDto } from '../../users/dto/users.dto';

export class TokenEntityDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    refreshToken: string;

    @ApiProperty()
    userId: string;

    @ApiProperty({ type: () => UserEntityDto })
    user: UserEntityDto;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

}

export class CreateUpdateTokenDto {
    @ApiProperty()
    refreshToken: string;

    @ApiProperty()
    userId: string;
}