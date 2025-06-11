import { IsString, IsEmail, IsNumber } from "class-validator"; //Eliminar importaciones que no se utilicen

export class UpdateUserDto {

    @IsString({ message: 'El nombre debe ser un texto.' })
    name?: string;

    @IsEmail({}, { message: 'El email debe ser válido.' })
    email?: string;

    @IsString({ message: 'La contraseña debe ser un texto.' })
    password?: string;

    @IsNumber({}, { message: 'El ID del rol debe ser numérico.' })
    role?: { id: number };

}

