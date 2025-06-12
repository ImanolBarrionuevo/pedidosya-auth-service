import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsEmail, IsNumber } from "class-validator"; //Eliminar importaciones que no se utilicen
import { CreateUserDto } from "./create-user.dto";
//import { Transform } from "class-transformer";

export class UpdateUserDto extends PartialType(CreateUserDto){

    @IsString({ message: 'El nombre debe ser un texto.' })
    name?: string;

    @IsEmail({}, { message: 'El email debe ser válido.' })
    email?: string;

    @IsString({ message: 'La contraseña debe ser un texto.' })
    password?: string;

    @IsNumber({}, { message: 'El ID del rol debe ser numérico.' })
    //@Transform(({ value }) => ({ id: value }))
    role?: number ;

}

