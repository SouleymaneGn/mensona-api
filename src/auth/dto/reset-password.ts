import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, isNumber } from 'class-validator';
export class ResetPasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    newPassword: string;
    @ApiProperty()
    @IsNotEmpty()
    code: string;
}