import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @ApiBody({ type: RegisterDto })
    async register(@Body() body: RegisterDto) {
        return this.authService.register(body.email, body.password);
    }

    @Post('login')
    @ApiBody({ type: LoginDto })
    async login(@Body() body: LoginDto) {
        const validationResponse = await this.authService.validateUser(body.email, body.password);

        if (validationResponse.status === 'error') {
            // Return error response if validation fails
            return {
                status: 'error',
                message: validationResponse.message,
            };
        }

        // Call login with the validated user
        return this.authService.login(validationResponse.user!);
    }

    @Post('test-protected')
    @ApiBearerAuth() // Adds Bearer auth to Swagger
    @UseGuards(AuthGuard('jwt'))
    testProtected(@Req() req: any) {
        return { message: 'This is a protected route!', user: req.user };
    }
}
