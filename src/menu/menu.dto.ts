import { IsString, IsNotEmpty } from 'class-validator'
export class MenuDto {
    public id: string
    @IsString()
    @IsNotEmpty()
    public readonly name: string
    @IsString()
    public readonly description: string
    @IsString()
    public readonly url: string

    public readonly icon: string

    public readonly parentId: string

    public readonly order: number
}
