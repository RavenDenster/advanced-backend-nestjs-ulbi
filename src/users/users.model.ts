import { ApiProperty } from '@nestjs/swagger/dist';
import {Model, Table, DataType, Column, BelongsToMany, HasMany} from 'sequelize-typescript'
import { Post } from 'src/posts/posts.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface userCreationAttrs {
    email: string
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, userCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Забанен или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'за хулиганство', description: 'Причина блокировки'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles) // когда  мы используем в userService roles и задействуем поле roles информация попадает в таблицу UserRoles
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]
}