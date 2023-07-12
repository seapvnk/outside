import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { PublicRoute } from './decorators/public-route.decorator';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Login } from '../useCases/login';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private login: Login) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: LoginDto })
    signin(@Request() req): Promise<LoginResponseDto> {
        return this.login.handle(req.user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('profile')
        getProfile(@Request() req) {
        return req.user;
    }
}
