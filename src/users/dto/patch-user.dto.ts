import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsEmail, IsNumber, IsOptional } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsString({ message: 'El nombre debe ser un texto.' })
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: 'El email debe ser válido.' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'La contraseña debe ser un texto.' })
    password?: string;

    @IsOptional()
    @IsNumber({}, { message: 'El ID del rol debe ser numérico.' })
    role?: number;

}

