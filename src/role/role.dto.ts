import { IsString, IsNotEmpty } from 'class-validator'
export class RoleDto {
  public readonly id: number
  @IsString()
  @IsNotEmpty()
  public readonly name: string
  @IsString()
  public readonly description: string
  @IsString()
  public readonly status: string
}
