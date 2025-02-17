import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
    @ApiProperty()
    @IsEmail({}, { message: "L'email doit être valide" })
    @IsNotEmpty({ message: "L'email est obligatoire" })
    email: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Le mot de passe est obligatoire" })
    password: string;
}