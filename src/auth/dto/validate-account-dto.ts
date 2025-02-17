import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class ValidateAccountDto{
@ApiProperty()
@IsNotEmpty({ message: "Le code est obligatoire" })
@MinLength(6, { message: "Le code doit faire au moins 6 caractères." })

code:string
}