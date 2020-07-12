import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common'
import { AuthCredsDto } from './dto/auth-creds.dto'
import { AuthService } from './auth.service'
import { AccessToken } from './access-token.interface'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './get-user.decorator'
import { User } from './user.entity'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredsDto: AuthCredsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredsDto)
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredsDto: AuthCredsDto,
  ): Promise<AccessToken> {
    return this.authService.signIn(authCredsDto)
  }

  @Post('/guard')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    const { username } = user
    return { username }
  }
}
