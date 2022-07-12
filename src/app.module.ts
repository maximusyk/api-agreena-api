import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { CertificatesModule } from './certificates/certificates.module';
import { TokensModule } from './tokens/tokens.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Certificate } from './certificates/entities/certificate.entity';
import { Token } from './tokens/entities/token.entity';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: `.${process.env.NODE_ENV}.env` }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                dialect: config.get('DATABASE_DIALECT'),
                host: config.get('DATABASE_HOST'),
                port: config.get('DATABASE_PORT'),
                username: config.get('DATABASE_USER'),
                password: config.get('DATABASE_PASSWORD'),
                database: config.get('DATABASE_NAME'),
                models: [
                    User,
                    Certificate,
                    Token,
                ],
            }),
        }),
        UsersModule,
        CertificatesModule,
        TokensModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}