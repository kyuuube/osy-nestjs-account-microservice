import { IsString, IsNotEmpty } from 'class-validator'
export class MenuDto {
  @IsNotEmpty()
  public readonly id: number
  @IsString()
  @IsNotEmpty()
  public readonly name: string
  @IsString()
  public readonly description: string
  @IsString()
  public readonly url: string

  public readonly parentId: number

  public readonly order: number
}
