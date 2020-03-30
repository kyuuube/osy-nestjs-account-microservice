import { Gender } from '../enum/gender.enum';
export declare class AuthUser {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    password: string;
    passwordSalt: string;
    gender: Gender;
    name: string;
    avatar: string;
    hashPasswordWithSalt(): Promise<void>;
    private generateRandomSalt;
}
