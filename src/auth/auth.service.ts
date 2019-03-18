import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "./../config";
import { User, UserService } from "./../user";
import { LoginPayload } from "./login.payload";


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  async createToken(user: User) {
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign(Object.assign({}, user)),
    };
  }

  async validateUser(payload: LoginPayload): Promise<any> {
    return this.userService.getByEmailAndPass(payload.email, payload.password);
  }
}
