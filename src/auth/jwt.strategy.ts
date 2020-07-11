import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { async } from 'rxjs'
import { validate } from 'class-validator'
import { JwtPayload } from './payload.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { User } from './user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    })
  }
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload
    const user = this.userRepository.findOne({ username })
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
