import { IsEmail, IsNotEmpty } from 'class-validator'
export class VerifyUserByEmailDto {
  @IsEmail()
  public readonly email: string
  @IsNotEmpty()
  public readonly password: string
}
