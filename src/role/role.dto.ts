import { IsString, IsNotEmpty } from 'class-validator'
export class RoleDto {
  public id: string
  @IsString()
  @IsNotEmpty()
  public readonly name: string
  @IsString()
  public readonly description: string
  @IsString()
  public readonly status: string

  public readonly menuIdList: string[]

  public readonly permissionIdList: string[]
}
