import { IsString, MinLength, MaxLength, Matches } from 'class-validator'
export class AuthCredsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string

  @IsString()
  @MinLength(8)
  @MaxLength(256)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password doesn't meet complexity requirements",
  })
  password: string
}
