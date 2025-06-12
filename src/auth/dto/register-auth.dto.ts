import { PartialType } from "@nestjs/mapped-types";
import { LoginAuthDto } from "./login-auth.dto";
import { IsNotEmpty, IsNumber} from "class-validator";
import { Transform } from "class-transformer";

export class RegisterAuthDto extends PartialType(LoginAuthDto){
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Transform(({ value }) => ({ id: value }))
    role: number = 1
}