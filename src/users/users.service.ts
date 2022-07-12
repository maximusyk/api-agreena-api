import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { checkStringHash } from '../utils/check-string-hash.util';
import { CreateUserDto, RegisterUserDto, UpdateUserDto } from './dto/users.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
    ) {}

    async create(createUserDto: CreateUserDto | RegisterUserDto) {
        try {
            if (!checkStringHash(createUserDto.password)) {
                createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
            }

            return this.userRepository.create(createUserDto, { include: { all: true } });
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }

    async findAll() {
        try {
            return this.userRepository.findAll({ include: { all: true } });
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id: string) {
        try {
            const user = await this.userRepository.findByPk(id, { include: { all: true } });

            if (!user) {
                throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
            }

            return user.reload({ include: { all: true } });
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }

    async findByLogin(search: string) {
        try {
            const user = await this.userRepository.findOne(
                {
                    where: {
                        [Op.or]: [
                            { email: { [Op.eq]: search } },
                            { username: { [Op.eq]: search } },
                        ],
                    },
                },
            );

            if (!user) {
                throw new HttpException('User with given login does not exist!', HttpStatus.NOT_FOUND);
            }

            return user.reload({ include: { all: true } });
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        try {
            return this.userRepository.update(updateUserDto, { where: { id } });
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }

    async remove(id: string) {
        try {
            if (!id) {
                throw new HttpException('id is required!', HttpStatus.BAD_REQUEST);
            }

            const chapter = await this.findById(id);

            await chapter.destroy();

            return { statusCode: HttpStatus.OK, message: 'Success!' };
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }
}
