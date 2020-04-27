import { Gender } from '../enum/gender.enum';
export declare class CreateAuthUserDto {
    readonly id: number;
    readonly email: string;
    readonly password: string;
    readonly gender: Gender;
    readonly name: string;
    readonly avatar: string;
    readonly roleIds: string[];
}
