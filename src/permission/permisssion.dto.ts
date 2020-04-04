import { IsString, IsNotEmpty } from 'class-validator'
export class PermissionDto {
    public id: string
    @IsString()
    @IsNotEmpty()
    public readonly name: string

    @IsString()
    @IsNotEmpty()
    public readonly menuId: string

    @IsString()
    public readonly description: string
    @IsString()
    public readonly path: string

    public readonly slug: string

    public readonly methods: string
}
