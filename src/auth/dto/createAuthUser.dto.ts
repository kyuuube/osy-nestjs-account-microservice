import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator'
import { Gender } from '../enum/gender.enum'
export class CreateAuthUserDto {
  @IsEmail()
  public readonly email: string
  @IsNotEmpty()
  public readonly password: string
  @IsEnum(Gender)
  public readonly gender: Gender
  @IsNotEmpty()
  public readonly name: string

  public readonly avatar: string

  public readonly roleIds: string[]
}
