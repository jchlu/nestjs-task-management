import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { AuthCredsDto } from './dto/auth-creds.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './payload.interface'
import { AccessToken } from './access-token.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredsDto: AuthCredsDto): Promise<void> {
    return this.userRepository.signUp(authCredsDto)
  }

  async signIn(authCredsDto: AuthCredsDto): Promise<AccessToken> {
    const username = await this.userRepository.validateUser(authCredsDto)
    const payload: JwtPayload = { username }
    const accessToken = await this.jwtService.sign(payload)
    return { accessToken }
  }
}
