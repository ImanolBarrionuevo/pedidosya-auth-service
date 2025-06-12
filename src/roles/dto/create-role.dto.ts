import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {

    @IsString()
    @IsNotEmpty()
    name: string

    // Se reciben los IDs de los permisos para la asignación
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    permissionIds: number[];
}