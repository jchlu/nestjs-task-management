import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { AuthCredsDto } from './dto/auth-creds.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './payload.interface'
import { AccessToken } from './access-token.interface'

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService')
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
    try {
      const accessToken = await this.jwtService.sign(payload)
      this.logger.debug(
        `JWT created with the payload: ${JSON.stringify(payload)}`,
      )
      return { accessToken }
    } catch (error) {
      this.logger.error(
        `Unable to create a JWT for the user ${JSON.stringify(payload)}`,
      )
      throw new InternalServerErrorException()
    }
  }
}
