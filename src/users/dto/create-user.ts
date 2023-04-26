import { ApiProperty } from "@nestjs/swagger/dist";
import { IsString, IsEmail, Length } from "class-validator";

export class CreateUserDto {
   
    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    @IsString({message: 'должно быть строкой'})
    @IsEmail({}, {message: 'некорректный email'})
    readonly email: string;
    @ApiProperty({example: '12345', description: 'пароль'})
    @IsString({message: 'должно быть строкой'})
    @Length(4, 16, {message: 'не меньше 4 и не больше 16'})
    readonly password: string;
}