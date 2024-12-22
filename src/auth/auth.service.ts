import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    // Validate user credentials
    async validateUser(email: string, pass: string): Promise<{ status: string; message: string; user?: User }> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return { status: 'error', message: 'User does not exist' };
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            return { status: 'error', message: 'Invalid credentials' };
        }

        console.log('User validated:', user);

        return { status: 'success', message: 'User validated', user };
    }


    // Login and return JWT token
    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            status: 'success',
            message: 'Login successful',
            access_token: this.jwtService.sign(payload),
        };
    }

    // Register a new user
    async register(email: string, password: string): Promise<{ status: string; message: string; user?: User }> {
        if (!email || !password) {
            return { status: 'error', message: 'Email and password are required' };
        }

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            return { status: 'error', message: 'Email is already in use' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({ email, password: hashedPassword });

        try {
            const savedUser = await this.userRepository.save(newUser);
            return { status: 'success', message: 'User registered successfully', user: savedUser };
        } catch (error) {
            console.error('Error creating user:', error);
            return { status: 'error', message: 'User registration failed' };
        }
    }
}
