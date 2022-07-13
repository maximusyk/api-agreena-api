import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { CertificatesModule } from './certificates/certificates.module';
import { Certificate } from './certificates/entities/certificate.entity';
import { Token } from './tokens/entities/token.entity';
import { TokensModule } from './tokens/tokens.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

const ENV_PATH = process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : '.env';

console.log(ENV_PATH);

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ENV_PATH }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                dialect: config.get('DATABASE_DIALECT'),
                // host: config.get('DATABASE_HOST'),
                // port: config.get('DATABASE_PORT'),
                username: config.get('DATABASE_USER'),
                password: config.get('DATABASE_PASSWORD'),
                database: config.get('DATABASE_NAME'),
                url: config.get('DATABASE_URL'),
                autoLoadModels: false,
                synchronize: false,
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