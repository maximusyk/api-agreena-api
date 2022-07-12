import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Certificate } from '../../certificates/entities/certificate.entity';
import { CreateUserDto } from '../dto/users.dto';

@Table({ tableName: 'users' })
export class User extends Model<User, CreateUserDto> {
    @Column({
        type: DataType.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    firstName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    username: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    phone: string;

    @HasMany(() => Certificate)
    certificates: Certificate[];

    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    @Column({ type: DataType.DATE, allowNull: false })
    updatedAt: Date;
}
