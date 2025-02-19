import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/reset-password';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(email: string, password: string):Promise<{access_token:string, data:any}>{
    // Récupération unique de l'utilisateur
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true, status:true }
    });
    
    ;
    if (!user || ! await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    if(!user.status){
      throw new UnauthorizedException('Email non vérifer démander une code de verification');
 
    }
    
    return { 
     access_token : (await this.jwtService.signAsync({ sub: user.id, email: user.email })).toString(),
     data:omit(user, 'password')
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    const code = this.generateCode();

    // Création du code de validation en une seule requête
    await this.prisma.verification_codes.create({
      data: { userId: newUser.id, code, type: 'email_verification', expiration: this.getExpiration() }
    });

    return { message: `Un code de vérification a été envoyé`, data: newUser };
  }

  async validateAccount(code: string) {
    // Vérification et mise à jour en une seule requête
    const updatedUser = await this.prisma.user.updateMany({
      where: { id: (await this.verifyCode(code, 'email_verification')).userId, status: false },
      data: { status: true }
    });

    if (!updatedUser.count) {
      throw new HttpException("L'email est déjà vérifié ou invalide", HttpStatus.CONFLICT);
    }

    return { message: 'Email vérifié avec succès' };
  }

  async requestValidationCode(email:string){
    return this.sendValidationCode(email, "email_verification")
  }

  async resetPassword(dto: ResetPasswordDto) {
    // Vérification et mise à jour du mot de passe en une seule requête
    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    const updatedUser = await this.prisma.user.updateMany({
      where: { id: (await this.verifyCode(dto.code, 'password_reset')).userId },
      data: { password: hashedPassword }
    });

    if (!updatedUser.count) {
      throw new HttpException('Le code est invalide', HttpStatus.NOT_FOUND);
    }

    return { message: 'Mot de passe modifié avec succès' };
  }

  async requestPasswordReset(email: string) {
   return this.sendValidationCode(email, "password_reset")
  }

  private async sendValidationCode(email:string, type:string){
    const user = await this.usersService.findEmail(email);

    if (!user) {
      throw new UnauthorizedException("Aucun utilisateur ne correspond à cet email");
    }
    

    const code = this.generateCode();
    
    // Mise à jour ou création du code en une seule requête
  const validate=  await this.prisma.verification_codes.upsert({
      where: { userId_type: { userId: user.id, type } },
      update: { code, expiration: this.getExpiration() },
      create: { userId: user.id, code, type, expiration: this.getExpiration() }
    });

    if (validate.type==="password_reset" && !user.status) {
        throw new UnauthorizedException("L'email de l'utilisateur n'a pas été vérifié");
      
    }

    return { message: 'Un code de vérification a été envoyé' };
  }

  private async verifyCode(code: string, type: string) {
    const verifyCode = await this.prisma.verification_codes.findFirst({
      where: { code, type }
    });

    if (!verifyCode) {
      throw new HttpException("Le code n'est pas valable, demande un autre code.", HttpStatus.NOT_FOUND);
    }
  
    // Vérification de l'expiration
    if (new Date() > verifyCode.expiration) {
      throw new HttpException("Le code a expiré, demande un nouveau code.", HttpStatus.GONE);
    }
  
    

    return verifyCode;
  }

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private getExpiration(): Date {
    return new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
  }
}
