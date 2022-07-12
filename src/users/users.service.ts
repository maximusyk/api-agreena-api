import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto, UpdateUserDto } from './dto/users.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
    ) {}

    async create(createUserDto: CreateUserDto | RegisterUserDto) {
        try {
            const isDeleted = await this.userRepository.scope('withDeletedAt').findOne({
                paranoid: false,
                where: { email: createUserDto.email },
            });

            if (isDeleted && isDeleted?.deletedAt === null) {
                throw new HttpException('User with this email already exists!', HttpStatus.BAD_REQUEST);
            }

            const hashedPassword = 'hashedPassword' in createUserDto
                ? createUserDto.hashedPassword
                : await bcrypt.hash(createUserDto.password, 10);

            if (isDeleted) {
                await isDeleted.restore();
                const user = await isDeleted.update(createUserDto);
                await user.reload({ include: { all: true } });

                return user;
            } else {
                const newUser = await this.userRepository.create(
                    { ...createUserDto, password: hashedPassword },
                    { include: { all: true } },
                );
                await newUser.reload({ include: { all: true } });

                return newUser;
            }
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
            if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
            await user.reload({ include: { all: true } });
            return user;
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
            if (!user) throw new HttpException('User with given login does not exist!', HttpStatus.NOT_FOUND);

            await user.reload({ include: { all: true } });
            return user;
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
            const chapter = await this.userRepository.scope('withDeletedAt').findOne({ where: { id } });
            if (!chapter) {
                throw new HttpException('Chapter not found!', HttpStatus.NOT_FOUND);
            }

            await chapter.destroy();

            return { statusCode: HttpStatus.OK, message: 'Success!' };
        } catch (error) {
            throw new HttpException(error.message, error?.status || HttpStatus.BAD_REQUEST);
        }
    }
}
