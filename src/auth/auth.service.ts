import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { signupDto, signinDto } from './dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }
    async signup(signupDto: signupDto) {
        try {
            const saltOrRounds = 10;
            const password = await bcrypt.hash(signupDto.password, saltOrRounds)
            const user = await this.prisma.user.create({
                data: {
                    firstName: signupDto.firstName,
                    lastName: signupDto.lastName,
                    email: signupDto.email,
                    password: password,
                },
            })
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials taken',
                    );
                }
            }
            throw error;
        }
    }
    async login(signinDto: signinDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: signinDto.email
            }
        });
        if (!user)
            throw new ForbiddenException(
                'Credentials incorrect',
            );
        const isMatch = await bcrypt.compare(signinDto.password, user.password);
        if (!isMatch)
            throw new ForbiddenException(
                'Credentials incorrect',
            );
        delete user.password
        return user;
    }
}
