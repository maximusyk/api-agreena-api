import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { CertificateStatusEnum } from '../enums/certificates.enum';

@Table({
    tableName: 'certificates',
    paranoid: true,
    defaultScope: { attributes: { exclude: ['deletedAt'] } },
    scopes: { withDeletedAt: { attributes: { include: ['deletedAt'] } } },
})
export class Certificate extends Model<Certificate> {
    @Column({
        type: DataType.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    country: string;

    @Column({ type: DataType.STRING, allowNull: false })
    status: CertificateStatusEnum;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    ownerId: string;

    @BelongsTo(() => User)
    owner: User;

    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    @Column({ type: DataType.DATE, allowNull: false })
    updatedAt: Date;

    @Column({ type: DataType.DATE })
    deletedAt: Date;
}
