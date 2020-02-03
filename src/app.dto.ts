import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateAuthUserDto {
    @IsEmail()
    public readonly email: string
    @IsNotEmpty()
    public readonly password: string
}
