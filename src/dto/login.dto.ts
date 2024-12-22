import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'The email of the user',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'strongPassword123',
        description: 'The password of the user',
        minLength: 8,
    })
    @IsString()
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
