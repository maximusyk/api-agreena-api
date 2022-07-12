import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './entities/token.entity';

@Module({
    imports: [
        SequelizeModule.forFeature([Token]),
    ],
    controllers: [],
    providers: [TokensService],
    exports: [TokensService],
})
export class TokensModule {}
