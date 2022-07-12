import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './entities/token.entity';
import { TokensService } from './tokens.service';

@Module({
    imports: [
        SequelizeModule.forFeature([Token]),
    ],
    controllers: [],
    providers: [TokensService],
    exports: [TokensService],
})
export class TokensModule {}
