import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'The email of the user',
    })
    @IsEmail()
    email!: string;

    @ApiProperty({
        example: 'strongPassword123',
        description: 'The password of the user',
        minLength: 8,
    })
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password!: string;
}
