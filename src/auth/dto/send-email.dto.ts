import { ApiProperty } from "@nestjs/swagger";

export class SendEmailDto {
    @ApiProperty()
    email: string;
}
