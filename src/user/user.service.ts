// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    private users: User[] = []; // for demonstration only

    // Find a user by email
    findByEmail(email: string): User | undefined {
        return this.users.find((user) => user.email === email);
    }

    // Create a new user
    createUser(email: string, hashedPassword: string): User {
        const newUser: User = {
            id: this.users.length + 1,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.users.push(newUser);
        return newUser;
    }
}
