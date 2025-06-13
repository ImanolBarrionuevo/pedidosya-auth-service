import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Transform } from 'class-transformer';

export class PutUserDto {

    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @IsString({ message: 'El nombre debe ser un texto.' })
    name: string;

    @IsNotEmpty({ message: 'El email es obligatorio.' })
    @IsEmail({}, { message: 'El email debe ser válido.' })
    email: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
    @IsString({ message: 'La contraseña debe ser un texto.' })
    password: string;

    @IsNotEmpty({ message: 'El ID del rol es obligatorio.' })
    @Transform(({ value }) => ({ id: value}))
    roles: { id: number };
    
}
