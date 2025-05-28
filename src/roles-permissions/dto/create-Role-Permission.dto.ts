import {IsNotEmpty, IsNumber} from "class-validator";

export class CreatePermissionDto{
    
    @IsNumber()
    @IsNotEmpty()
    role: number //Verificar que no haya que usar el transform

    @IsNumber()
    @IsNotEmpty()
    permission: number //Verificar que no haya que usar el transform
}