import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateAuthDto {
    @ApiProperty()
    @IsNotEmpty({ message: "L'email est obligatoire" })
    @IsEmail({}, { message: "L'email doit être valide" })
    email: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Le mot de passe est obligatoire" })
    @MinLength(8, { message: "Le mot de passe doit faire au moins 8 caractères." })
    password: string;
}
