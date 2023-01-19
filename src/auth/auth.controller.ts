import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from 'express';
import { signupDto, signinDto } from "./dto";
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }
    @Post('signup')
    signup(@Body() signupDto: signupDto) {
        return this.authService.signup(signupDto);
    }

    @Post('signin')
    signin(@Body() signinDto: signinDto) {
        return this.authService.login(signinDto);
    }
}

