import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: CreateUserDto) {
    return this.authService.login(loginDto);
  }

  // Ejemplo de ruta protegida para verificar el token
  @Get('check')
  @UseGuards(AuthGuard())
  checkToken(@Req() request: any) {
    return request.user;
  }
}
