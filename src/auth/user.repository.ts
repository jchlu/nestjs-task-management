import * as bcrypt from 'bcryptjs'
import { Repository, EntityRepository } from 'typeorm'
import { User } from './user.entity'
import { AuthCredsDto } from './dto/auth-creds.dto'
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredsDto: AuthCredsDto): Promise<void> {
    const { username, password } = authCredsDto
    const user = new User()
    user.username = username
    user.password = await bcrypt.hash(password, 8)
    try {
      await user.save()
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists')
      }
      throw new InternalServerErrorException()
    }
  }

  async validateUser(authCredsDto: AuthCredsDto): Promise<string> {
    const { username, password } = authCredsDto
    const user = await this.findOne({ username })
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return user.username
  }
}
