import { PartialType } from "@nestjs/mapped-types";
import { LoginAuthDto } from "./login-auth.dto";
import { IsNotEmpty, IsNumber} from "class-validator";

export class RegisterAuthDto extends PartialType(LoginAuthDto){
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    role: number = 1
}