import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common'
import { AuthCredsDto } from './dto/auth-creds.dto'
import { AuthService } from './auth.service'
import { AccessToken } from './access-token.interface'
import { AuthGuard } from '@nestjs/passport'

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
  guard(@Req() req) {
    const { username } = req.user
    return { username }
  }
}
