import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInDto } from './dto/signIn.dto';
import { ResetPasswordDto } from './dto/reset-password';
import { SendEmailDto } from './dto/send-email.dto';
import { ValidateAccountDto } from './dto/validate-account-dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './authGuard';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  
  @Post('login')    
  signIn(@Body() signInDto:SignInDto) {
      return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post("register")
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post("validate-email")
  validateAccount(@Body() validateAccountDto: ValidateAccountDto){
    
    return this.authService.validateAccount(validateAccountDto.code)
  }
  @UseGuards(AuthGuard)
  @Get('request-reset-password')
   requestReset(@Param('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }
  
  @UseGuards(AuthGuard)
  @Post("reset-password")
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
// @Post('send-email')
//   sendEmail(@Body() email: SendEmailDto) {
//     return this.authService.sendEmail(email.email);
//   }
  

}
