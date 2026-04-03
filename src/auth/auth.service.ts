import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { password, email, ...userData } = createUserDto;
    
    try {
      const user = await this.userModel.create({
        ...userData,
        email: email.toLowerCase().trim(),
        password: bcrypt.hashSync(password, 10),
      });

      const { password: _, ...userObj } = user.toObject();
      return {
        ...userObj,
        token: this.getJwtToken({ id: user._id }),
      };

    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Ese correo ya está registrado');
      }
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async login(loginDto: CreateUserDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email: email.toLowerCase().trim() });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales no válidas');
    }

    const { password: _, ...userObj } = user.toObject();

    return {
      ...userObj,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  private getJwtToken(payload: { id: any }) {
    return this.jwtService.sign(payload);
  }
}
