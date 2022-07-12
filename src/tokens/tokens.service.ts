import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUpdateTokenDto } from './dto/tokens.dto';
import { Token } from './entities/token.entity';

@Injectable()
export class TokensService {
    constructor(
        @InjectModel(Token) private readonly tokenRepository: typeof Token,
    ) {}

    async createOrUpdate(userId: string, refreshToken: string) {
        try {
            const existedToken = await this.tokenRepository.findOne({ where: { userId } });

            if (existedToken) {
                return this.update(userId, refreshToken);
            }

            return this.create({ userId, refreshToken });
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }

    async create(createTokenDto: CreateUpdateTokenDto) {
        try {
            return this.tokenRepository.create(createTokenDto, { include: { all: true } });
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }

    async findOne(userId: string) {
        try {
            const token = await this.tokenRepository.findOne({ where: { userId }, include: { all: true } });

            if (!token) {
                throw new HttpException('Token not found!', HttpStatus.NOT_FOUND);
            }

            return token;
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: string, refreshToken: string) {
        try {
            const token = await this.findOne(id);

            return token.update({ refreshToken }, { where: { id } });
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }

    async removeByUser(userId: string) {
        try {
            if (!userId) {
                throw new HttpException('User id is required!', HttpStatus.BAD_REQUEST);
            }

            const token = await this.findOne(userId);

            if (!token) {
                throw new HttpException('User already logout!', HttpStatus.NOT_FOUND);
            }

            await token.destroy();

            return { statusCode: HttpStatus.OK, message: 'Success!' };
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }
}
