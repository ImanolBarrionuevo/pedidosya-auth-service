import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreatePermissionDto{
    
    @IsString()
    @IsNotEmpty()
    code: string

    @IsNotEmpty()
    @IsNumber()
    role: number; //Verificar si no hay que usar transform
}